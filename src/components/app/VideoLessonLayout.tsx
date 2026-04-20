import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, Loader2, Film } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { VideoPlayer, getWatchedPercent } from "@/components/app/VideoPlayer";
import { useLessonVideo } from "@/hooks/useLessonVideo";

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
  const [watched, setWatched] = useState<number>(() => getWatchedPercent(stageKey));

  // Re-read watched percent on stage change
  useEffect(() => {
    setWatched(getWatchedPercent(stageKey));
  }, [stageKey]);

  const handleProgress = useCallback((pct: number) => {
    setWatched(pct);
  }, []);

  const canComplete = watched >= COMPLETION_THRESHOLD;

  if (!unlocked) {
    return (
      <AppShell title={shellTitle}>
        <main className="container-main py-8">
          <Card className="app-daycard app-daycard--locked">
            <CardContent className="p-8 text-center space-y-3">
              <div className="mx-auto h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Conclua a etapa anterior para desbloquear.</p>
              <Link to="/app">
                <Button variant="ghost" size="default">Voltar</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell title={shellTitle}>
      <main className="container-main py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          {completed && (
            <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
          <h1 className="font-bold text-lg md:text-xl text-foreground">
            {emoji ? `${emoji} ` : ""}{title}
          </h1>
        </div>

        {/* Video */}
        {loading ? (
          <Card className="app-stitch">
            <CardContent className="p-10 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : videoUrl ? (
          <>
            <VideoPlayer
              stageKey={stageKey}
              videoUrl={videoUrl}
              posterUrl={posterUrl}
              onProgress={handleProgress}
            />

            {/* Watched bar */}
            <div className="space-y-1.5">
              <div
                className="h-2 w-full rounded-full bg-secondary/40 overflow-hidden"
                role="progressbar"
                aria-label="Progresso do vídeo"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={watched}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                  style={{ width: `${watched}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {watched}% assistido {!completed && !canComplete && `· assista ao menos ${COMPLETION_THRESHOLD}% para concluir`}
              </p>
            </div>
          </>
        ) : (
          <Card className="app-stitch">
            <CardContent className="p-8 text-center space-y-3">
              <div className="mx-auto h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Film className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">Em breve</p>
              <p className="text-sm text-muted-foreground">
                O vídeo desta aula ainda não foi publicado. Volte em breve.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        {summary && (
          <Card className="app-stitch">
            <CardContent className="p-5 md:p-6 space-y-2">
              <h2 className="font-bold text-foreground text-base">Sobre esta aula</h2>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                {summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Complete button */}
        {videoUrl && !completed && (
          <div className="pt-2 flex flex-col items-center gap-2">
            <Button
              variant="primary"
              size="default"
              onClick={onComplete}
              disabled={!canComplete}
              aria-disabled={!canComplete}
            >
              Concluir etapa ✓
            </Button>
            {!canComplete && (
              <p className="text-xs text-muted-foreground">
                Faltam {Math.max(0, COMPLETION_THRESHOLD - watched)}% para liberar a conclusão
              </p>
            )}
          </div>
        )}

        {/* Completion actions */}
        {completed && (
          <div className="flex flex-wrap gap-3 justify-center py-2 animate-fade-in">
            {completionActions ?? (
              <Link to="/app">
                <Button variant="primary" size="default">Voltar para o início</Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </AppShell>
  );
}
