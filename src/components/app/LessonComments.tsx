import { useState } from "react";
import { MessageCircle, Send, Trash2, Loader2, CornerDownRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLessonComments, type LessonComment } from "@/hooks/useLessonComments";
import { cn } from "@/lib/utils";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function timeAgo(iso: string) {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ptBR });
  } catch {
    return "";
  }
}

type ItemProps = {
  comment: LessonComment;
  currentUserId: string | null;
  onReply: (parentId: string, content: string) => Promise<{ error: string | null }>;
  onDelete: (id: string) => Promise<{ error: string | null }>;
  isReply?: boolean;
};

function CommentItem({ comment, currentUserId, onReply, onDelete, isReply }: ItemProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isOwner = currentUserId === comment.user_id;

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    const { error } = await onReply(comment.id, replyText);
    setSubmitting(false);
    if (!error) {
      setReplyText("");
      setReplyOpen(false);
    }
  };

  return (
    <div className={cn("flex gap-3", isReply && "ml-8 md:ml-12")}>
      <Avatar className="h-9 w-9 flex-shrink-0 border border-border">
        {comment.author_avatar && <AvatarImage src={comment.author_avatar} alt={comment.author_name} />}
        <AvatarFallback className="bg-secondary/30 text-foreground text-xs font-bold">
          {initialsFrom(comment.author_name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-secondary/15 px-4 py-2.5">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-sm text-foreground">{comment.author_name}</span>
            <span className="text-xs text-muted-foreground">{timeAgo(comment.created_at)}</span>
          </div>
          <p className="text-sm text-foreground/90 whitespace-pre-line break-words leading-relaxed">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1.5 px-2 text-xs">
          {!isReply && (
            <button
              onClick={() => setReplyOpen((v) => !v)}
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Responder
            </button>
          )}
          {isOwner && (
            <button
              onClick={() => onDelete(comment.id)}
              className="text-muted-foreground hover:text-destructive font-medium transition-colors inline-flex items-center gap-1"
              aria-label="Excluir comentário"
            >
              <Trash2 className="h-3 w-3" />
              Excluir
            </button>
          )}
        </div>

        {replyOpen && (
          <div className="mt-2 flex gap-2 items-start animate-fade-in">
            <CornerDownRight className="h-4 w-4 text-muted-foreground mt-2 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva uma resposta carinhosa…"
                rows={2}
                maxLength={2000}
                className="text-sm resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setReplyOpen(false)} disabled={submitting}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleReply} disabled={!replyText.trim() || submitting}>
                  {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                  Responder
                </Button>
              </div>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((r) => (
              <CommentItem
                key={r.id}
                comment={r}
                currentUserId={currentUserId}
                onReply={onReply}
                onDelete={onDelete}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type Props = {
  stageKey: string;
};

export function LessonComments({ stageKey }: Props) {
  const { comments, loading, currentUserId, addComment, deleteComment } = useLessonComments(stageKey);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    const { error } = await addComment(text);
    setSubmitting(false);
    if (!error) setText("");
  };

  return (
    <Card className="app-stitch">
      <CardContent className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border/60">
          <MessageCircle className="h-4 w-4 text-primary" aria-hidden />
          <h2 className="font-serif text-lg md:text-xl text-foreground">
            Comentários {totalCount > 0 && <span className="text-muted-foreground text-base">({totalCount})</span>}
          </h2>
        </div>

        {/* Novo comentário */}
        {currentUserId ? (
          <div className="space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Deixe um comentário, conte sua experiência ou tire uma dúvida…"
              rows={3}
              maxLength={2000}
              className="resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{text.length}/2000</span>
              <Button onClick={handleSubmit} disabled={!text.trim() || submitting} size="sm">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Comentar
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Entre na sua conta para comentar.</p>
        )}

        {/* Lista */}
        <div className="space-y-5 pt-2">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Seja a primeira a comentar nesta aula 🧶
            </p>
          ) : (
            comments.map((c) => (
              <CommentItem
                key={c.id}
                comment={c}
                currentUserId={currentUserId}
                onReply={(pid, content) => addComment(content, pid)}
                onDelete={deleteComment}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
