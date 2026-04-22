import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2, BookOpen, ChevronLeft, ChevronRight, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { VideoPlayer, getWatchedPercent } from "@/components/app/VideoPlayer";
import { useLessonVideo } from "@/hooks/useLessonVideo";
import { useLessonNavigation } from "@/hooks/useLessonNavigation";
import { LessonContextHeader } from "@/components/app/LessonContextHeader";
import { LessonStickyMobileCTA } from "@/components/app/LessonStickyMobileCTA";
import { LessonCompletionCelebration } from "@/components/app/LessonCompletionCelebration";
import { LessonEmptyState } from "@/components/app/LessonEmptyState";
import { LessonComments } from "@/components/app/LessonComments";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const COMPLETION_THRESHOLD = 90;

type Props = {
  stageKey: string;
  shellTitle: string;
  title: string;
  emoji?: string;
  unlocked: boolean;
  completed: boolean;
  onComplete: () => void;
  completionActions?: React.ReactNode;
};

export function VideoLessonLayout({
  stageKey,
  shellTitle,
  title,
  emoji,
  unlocked,
  completed,
  onComplete,
  completionActions,
}: Props) {
  const { videoUrl, posterUrl, summary, loading } = useLessonVideo(stageKey);
  const nav = useLessonNavigation(stageKey);
  const [watched, setWatched] = useState<number>(() => getWatchedPercent(stageKey));
  const [, setDuration] = useState<number>(0);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const justCompletedRef = useRef<boolean>(false);
  const [celebrate, setCelebrate] = useState<boolean>(false);
  const [descOpen, setDescOpen] = useState<boolean>(false);

  useEffect(() => {
    setWatched(getWatchedPercent(stageKey));
    justCompletedRef.current = false;
    setCelebrate(false);
    setDescOpen(false);
  }, [stageKey]);

  const handleProgress = useCallback((pct: number) => setWatched(pct), []);
  const handleDuration = useCallback((s: number) => setDuration(s), []);

  const canComplete = watched >= COMPLETION_THRESHOLD;
  const remaining = Math.max(0, COMPLETION_THRESHOLD - watched);

  const handleComplete = useCallback(() => {
    onComplete();
    justCompletedRef.current = true;
    setCelebrate(true);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  }, [onComplete]);

  // Bloqueado
  if (!unlocked) {
    return (
      <AppShell title={shellTitle}>
        <main className="container-main py-8">
          <LessonEmptyState
            kind="locked"
            previousLabel={nav.prev?.shortLabel}
            previousHref={nav.prev?.href}
          />
        </main>
      </AppShell>
    );
  }

  const showCelebration = completed && (celebrate || justCompletedRef.current === false);
  const cleanTitle = `${emoji ? `${emoji} ` : ""}${title}`;

  return (
    <AppShell title={shellTitle}>
      <main className="container-main py-5 md:py-8 space-y-5 md:space-y-6 pb-28 md:pb-10">
        {/* Header contextual: só "Jornada" e contador de etapas */}
        <LessonContextHeader position={nav.position} total={nav.total} />

        {/* Player */}
        {loading ? (
          <Card className="app-stitch">
            <CardContent className="p-12 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : videoUrl ? (
          <div ref={playerWrapperRef}>
            <VideoPlayer
              stageKey={stageKey}
              videoUrl={videoUrl}
              posterUrl={posterUrl}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
          </div>
        ) : (
          <LessonEmptyState kind="coming-soon" />
        )}

        {/* Bloco abaixo do vídeo: título + assistido + ações */}
        {videoUrl && (
          <section className="space-y-4">
            <div className="flex items-start gap-3">
              {completed && (
                <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
              <h1 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
                {cleanTitle}
              </h1>
            </div>

            {/* Watched bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-medium text-foreground tabular-nums">{watched}% assistido</span>
                {!completed && (
                  <span
                    className={cn(
                      "text-xs transition-colors",
                      canComplete ? "text-primary font-bold" : "text-muted-foreground"
                    )}
                  >
                    {canComplete ? "✓ pode concluir agora" : `faltam ${remaining}% para liberar a conclusão`}
                  </span>
                )}
              </div>
              <div
                className="h-2 w-full rounded-full bg-secondary/30 overflow-hidden"
                role="progressbar"
                aria-label="Progresso do vídeo"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={watched}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-out"
                  style={{ width: `${watched}%` }}
                />
              </div>
            </div>

            {/* Botões de ação (desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-3 pt-1">
              {!completed && (
                <Button
                  variant="primary"
                  size="default"
                  onClick={handleComplete}
                  disabled={!canComplete}
                  aria-disabled={!canComplete}
                  className={cn("transition-all", canComplete && "animate-fade-in")}
                >
                  <Sparkles className="h-4 w-4" />
                  Concluir etapa
                </Button>
              )}
              {nav.next && (
                <Link to={nav.next.href}>
                  <Button variant={completed ? "primary" : "secondary"} size="default">
                    Próxima aula
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {nav.prev && (
                <Link
                  to={nav.prev.href}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {nav.prev.shortLabel}
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Descrição colapsável */}
        {summary && (
          <Card className="app-stitch overflow-hidden">
            <Collapsible open={descOpen} onOpenChange={setDescOpen}>
              <CollapsibleTrigger asChild>
                <button
                  className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-secondary/10 transition-colors text-left"
                  aria-label={descOpen ? "Fechar descrição" : "Abrir descrição"}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                    <h2 className="font-serif text-lg md:text-xl text-foreground">Sobre esta aula</h2>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-300",
                      descOpen && "rotate-180"
                    )}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                  <div className="border-t border-border/60 pt-4">
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                      {summary}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Comentários */}
        <LessonComments stageKey={stageKey} />

        {/* Celebração */}
        {showCelebration && <LessonCompletionCelebration actions={completionActions} />}
      </main>

      {/* Sticky CTA mobile */}
      {videoUrl && (
        <LessonStickyMobileCTA
          canComplete={canComplete}
          completed={completed}
          watched={watched}
          threshold={COMPLETION_THRESHOLD}
          onComplete={handleComplete}
          nextHref={nav.next?.href ?? null}
          nextLabel={nav.next?.shortLabel}
        />
      )}
    </AppShell>
  );
}
