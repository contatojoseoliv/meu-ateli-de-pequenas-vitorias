import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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

function formatDuration(s: number): string {
  if (!Number.isFinite(s) || s <= 0) return "";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

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
  const [duration, setDuration] = useState<number>(0);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const justCompletedRef = useRef<boolean>(false);
  const [celebrate, setCelebrate] = useState<boolean>(false);

  useEffect(() => {
    setWatched(getWatchedPercent(stageKey));
    justCompletedRef.current = false;
    setCelebrate(false);
  }, [stageKey]);

  const handleProgress = useCallback((pct: number) => setWatched(pct), []);
  const handleDuration = useCallback((s: number) => setDuration(s), []);

  const canComplete = watched >= COMPLETION_THRESHOLD;
  const remaining = Math.max(0, COMPLETION_THRESHOLD - watched);
  const minutesLeft = duration ? Math.max(1, Math.round((duration * remaining) / 100 / 60)) : null;

  const handleComplete = useCallback(() => {
    onComplete();
    justCompletedRef.current = true;
    setCelebrate(true);
    // scroll suave para celebração
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  }, [onComplete]);

  // ────────────────────────────────────────────────────────
  // Estado: bloqueado
  // ────────────────────────────────────────────────────────
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
        {/* Header contextual */}
        <LessonContextHeader
          crumb={cleanTitle}
          position={nav.position}
          total={nav.total}
          durationLabel={duration ? formatDuration(duration) : null}
        />

        {/* Título */}
        <div className="flex items-center gap-3">
          {completed && (
            <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
          <h1 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
            {cleanTitle}
          </h1>
        </div>

        {/* Player + barra */}
        {loading ? (
          <Card className="app-stitch">
            <CardContent className="p-12 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : videoUrl ? (
          <>
            <div ref={playerWrapperRef}>
              <VideoPlayer
                stageKey={stageKey}
                videoUrl={videoUrl}
                posterUrl={posterUrl}
                onProgress={handleProgress}
                onDuration={handleDuration}
              />
            </div>

            {/* Watched progress bar enriquecida */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-medium text-foreground tabular-nums">{watched}% assistido</span>
                {!completed && (
                  <span className={cn(
                    "text-xs transition-colors",
                    canComplete ? "text-primary font-bold" : "text-muted-foreground"
                  )}>
                    {canComplete
                      ? "✓ pode concluir agora"
                      : minutesLeft
                        ? `faltam ~${minutesLeft} min para liberar a conclusão 🧶`
                        : `faltam ${remaining}% para liberar a conclusão`}
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
          </>
        ) : (
          <LessonEmptyState kind="coming-soon" />
        )}

        {/* Resumo */}
        {summary && (
          <Card className="app-stitch">
            <CardContent className="p-5 md:p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                <h2 className="font-serif text-lg md:text-xl text-foreground">Sobre esta aula</h2>
              </div>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                {summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Concluir (desktop) — escondido no mobile (substituído pelo sticky) */}
        {videoUrl && !completed && (
          <div className="hidden md:flex pt-2 flex-col items-center gap-2">
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
            {!canComplete && (
              <p className="text-xs text-muted-foreground">
                Faltam {remaining}% para liberar a conclusão
              </p>
            )}
          </div>
        )}

        {/* Celebração */}
        {showCelebration && (
          <LessonCompletionCelebration actions={completionActions} />
        )}

        {/* Navegação prev/next desktop */}
        <nav
          className="hidden md:flex items-center justify-between pt-4 mt-4 border-t border-border/60 text-sm"
          aria-label="Navegação entre aulas"
        >
          {nav.prev ? (
            <Link
              to={nav.prev.href}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">Aula anterior</span>
                <span className="block font-medium">{nav.prev.shortLabel}</span>
              </span>
            </Link>
          ) : <span />}
          {nav.next ? (
            <Link
              to={nav.next.href}
              className="inline-flex items-center gap-2 text-right text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">Próxima aula</span>
                <span className="block font-medium">{nav.next.shortLabel}</span>
              </span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <span />}
        </nav>
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
