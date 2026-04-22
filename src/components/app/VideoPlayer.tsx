import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, PictureInPicture, Loader2, RotateCcw } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { cn } from "@/lib/utils";

type Props = {
  stageKey: string;
  videoUrl: string;
  posterUrl?: string | null;
  onProgress?: (percent: number) => void;
  onReady?: () => void;
  onDuration?: (seconds: number) => void;
};

const POS_KEY = (k: string) => `pv_video_pos_${k}`;
const PCT_KEY = (k: string) => `pv_video_pct_${k}`;
const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ stageKey, videoUrl, posterUrl, onProgress, onReady, onDuration }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<{ time: number; side: "L" | "R" | null }>({ time: 0, side: null });
  const hideControlsTimer = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [resumeFromSec, setResumeFromSec] = useState<number | null>(null);
  const [hoverPreview, setHoverPreview] = useState<{ x: number; time: number } | null>(null);

  // Restaurar posição
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const saved = localStorage.getItem(POS_KEY(stageKey));
    const handleLoaded = () => {
      setDuration(el.duration || 0);
      onDuration?.(el.duration || 0);
      if (saved) {
        const sec = Number(saved);
        if (Number.isFinite(sec) && sec > 5 && sec < (el.duration || 0) - 3) {
          el.currentTime = sec;
          setResumeFromSec(sec);
          // auto-esconde aviso após 6s
          window.setTimeout(() => setResumeFromSec(null), 6000);
        }
      }
      onReady?.();
    };
    el.addEventListener("loadedmetadata", handleLoaded);
    return () => el.removeEventListener("loadedmetadata", handleLoaded);
  }, [stageKey, videoUrl, onReady, onDuration]);

  // Eventos de progresso/estado
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    let lastSave = 0;

    const onTime = () => {
      const dur = el.duration || 0;
      setCurrentTime(el.currentTime);
      if (!dur) return;
      const pct = Math.min(100, Math.round((el.currentTime / dur) * 100));
      const now = Date.now();
      if (now - lastSave > 1500) {
        localStorage.setItem(POS_KEY(stageKey), String(el.currentTime));
        const prev = Number(localStorage.getItem(PCT_KEY(stageKey)) ?? "0");
        const next = Math.max(prev, pct);
        localStorage.setItem(PCT_KEY(stageKey), String(next));
        lastSave = now;
        onProgress?.(next);
      }
    };
    const onPlay = () => { setIsPlaying(true); setHasStarted(true); };
    const onPause = () => setIsPlaying(false);
    const onWait = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    const onVol = () => { setVolume(el.volume); setIsMuted(el.muted); };
    const onEnded = () => {
      // Forçar 100%
      localStorage.setItem(PCT_KEY(stageKey), "100");
      onProgress?.(100);
      setIsPlaying(false);
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("waiting", onWait);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("volumechange", onVol);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("waiting", onWait);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("volumechange", onVol);
      el.removeEventListener("ended", onEnded);
    };
  }, [stageKey, onProgress]);

  // Auto-hide controles
  const bumpControls = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 2800);
  }, []);

  // Ações
  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
    bumpControls();
  }, [bumpControls]);

  const seekBy = useCallback((delta: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min((el.duration || 0), el.currentTime + delta));
    bumpControls();
  }, [bumpControls]);

  const setVol = useCallback((v: number) => {
    const el = videoRef.current;
    if (!el) return;
    const nv = Math.max(0, Math.min(1, v));
    el.volume = nv;
    if (nv > 0 && el.muted) el.muted = false;
    bumpControls();
  }, [bumpControls]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    bumpControls();
  }, [bumpControls]);

  const toggleFullscreen = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      c.requestFullscreen?.().catch(() => {});
    }
  }, []);

  const togglePiP = useCallback(async () => {
    const el = videoRef.current as HTMLVideoElement & {
      requestPictureInPicture?: () => Promise<PictureInPictureWindow>;
    };
    if (!el) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (el.requestPictureInPicture) {
        await el.requestPictureInPicture();
      }
    } catch { /* ignore */ }
  }, []);

  const cycleSpeed = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const idx = SPEEDS.indexOf(speed as typeof SPEEDS[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    el.playbackRate = next;
    setSpeed(next);
    bumpControls();
  }, [speed, bumpControls]);

  const restart = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    setResumeFromSec(null);
    el.play().catch(() => {});
  }, []);

  // Atalhos teclado
  useKeyboardShortcuts({
    Space: (e) => { e.preventDefault(); togglePlay(); },
    ArrowLeft: (e) => { e.preventDefault(); seekBy(-10); },
    ArrowRight: (e) => { e.preventDefault(); seekBy(10); },
    ArrowUp: (e) => { e.preventDefault(); setVol((videoRef.current?.volume ?? 1) + 0.1); },
    ArrowDown: (e) => { e.preventDefault(); setVol((videoRef.current?.volume ?? 1) - 0.1); },
    f: () => toggleFullscreen(),
    F: () => toggleFullscreen(),
    m: () => toggleMute(),
    M: () => toggleMute(),
  });

  // Scrub click/touch
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = Math.max(0, Math.min(duration, pct * duration));
    bumpControls();
  };

  const handleScrubHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setHoverPreview({ x, time: pct * duration });
  };

  // Double-tap mobile
  const handleVideoTap = (e: React.MouseEvent<HTMLVideoElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const side: "L" | "R" = x < rect.width / 2 ? "L" : "R";
    const now = Date.now();
    if (now - lastTapRef.current.time < 300 && lastTapRef.current.side === side) {
      seekBy(side === "L" ? -10 : 10);
      lastTapRef.current = { time: 0, side: null };
    } else {
      lastTapRef.current = { time: now, side };
      // single tap = toggle play after delay (só se não for double)
      window.setTimeout(() => {
        if (lastTapRef.current.time === now) togglePlay();
      }, 280);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const muted = isMuted || volume === 0;

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg overflow-hidden bg-black ring-1 ring-border group app-stitch mx-auto w-full"
      style={{ maxHeight: "calc(100svh - 220px)", aspectRatio: "16 / 9", maxWidth: "calc((100svh - 220px) * 16 / 9)" }}
      onMouseMove={bumpControls}
      onMouseLeave={() => {
        if (videoRef.current && !videoRef.current.paused) setShowControls(false);
      }}
    >
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl ?? undefined}
          playsInline
          preload="metadata"
          className="h-full w-full object-contain bg-black"
          onClick={handleVideoTap}
          aria-label="Player de vídeo da aula"
        />

        {/* Big play button antes do primeiro start */}
        {!hasStarted && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group/play"
            aria-label="Assistir aula"
          >
            <span className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/95 text-foreground font-bold shadow-2xl group-hover/play:scale-105 transition-transform">
              <Play className="h-5 w-5 fill-current" />
              Assistir aula
            </span>
          </button>
        )}

        {/* Buffering overlay */}
        {buffering && hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          </div>
        )}

        {/* Resume toast */}
        {resumeFromSec !== null && hasStarted && (
          <div className="absolute top-3 left-3 right-3 md:right-auto md:max-w-sm flex items-center gap-2 px-3 py-2 rounded-lg bg-background/95 backdrop-blur shadow-lg text-xs md:text-sm animate-fade-in">
            <span className="text-foreground">
              Continuando de <span className="font-bold tabular-nums">{formatTime(resumeFromSec)}</span>
            </span>
            <button
              onClick={restart}
              className="ml-auto inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Recomeçar
            </button>
          </div>
        )}

        {/* Controles custom */}
        {hasStarted && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 px-3 pt-10 pb-2 md:px-4 md:pb-3",
              "bg-gradient-to-t from-black/85 via-black/40 to-transparent",
              "transition-opacity duration-300",
              showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {/* Scrub bar */}
            <div
              className="relative h-1.5 hover:h-2 transition-[height] w-full bg-white/25 rounded-full cursor-pointer mb-2 group/scrub"
              onClick={handleSeek}
              onMouseMove={handleScrubHover}
              onMouseLeave={() => setHoverPreview(null)}
              role="slider"
              aria-label="Posição do vídeo"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
            >
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover/scrub:opacity-100 transition-opacity shadow-lg"
                style={{ left: `${progress}%` }}
              />
              {hoverPreview && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] tabular-nums pointer-events-none"
                  style={{ left: hoverPreview.x }}
                >
                  {formatTime(hoverPreview.time)}
                </div>
              )}
            </div>

            {/* Buttons row */}
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:bg-white/15 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>

              <div className="hidden md:flex items-center gap-2 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
                  aria-label={muted ? "Ativar som" : "Mudo"}
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVol(Number(e.target.value))}
                  className="w-0 group-hover/vol:w-20 transition-all h-1 accent-primary cursor-pointer"
                  aria-label="Volume"
                />
              </div>

              <span className="text-xs md:text-sm tabular-nums opacity-90">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="ml-auto flex items-center gap-1 md:gap-2">
                <button
                  onClick={cycleSpeed}
                  className="px-2 py-1 hover:bg-white/15 rounded-md text-xs font-bold tabular-nums transition-colors"
                  aria-label={`Velocidade ${speed}x`}
                  title="Velocidade de reprodução"
                >
                  {speed}x
                </button>
                <button
                  onClick={togglePiP}
                  className="hidden md:inline-flex p-1.5 hover:bg-white/15 rounded-full transition-colors"
                  aria-label="Picture-in-picture"
                  title="Picture-in-picture"
                >
                  <PictureInPicture className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
                  aria-label="Tela cheia"
                  title="Tela cheia (F)"
                >
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function getWatchedPercent(stageKey: string): number {
  const raw = localStorage.getItem(PCT_KEY(stageKey));
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
}
