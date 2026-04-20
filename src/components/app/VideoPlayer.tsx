import { useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Props = {
  stageKey: string;
  videoUrl: string;
  posterUrl?: string | null;
  onProgress?: (percent: number) => void;
  onReady?: () => void;
};

const POS_KEY = (k: string) => `pv_video_pos_${k}`;
const PCT_KEY = (k: string) => `pv_video_pct_${k}`;

export function VideoPlayer({ stageKey, videoUrl, posterUrl, onProgress, onReady }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // Restore last position
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const saved = localStorage.getItem(POS_KEY(stageKey));
    const handleLoaded = () => {
      if (saved) {
        const sec = Number(saved);
        if (Number.isFinite(sec) && sec > 0 && sec < (el.duration || 0) - 2) {
          el.currentTime = sec;
        }
      }
      onReady?.();
    };
    el.addEventListener("loadedmetadata", handleLoaded);
    return () => el.removeEventListener("loadedmetadata", handleLoaded);
  }, [stageKey, videoUrl, onReady]);

  // Track progress
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastSave = 0;
    const onTime = () => {
      const dur = el.duration || 0;
      if (!dur) return;
      const pct = Math.min(100, Math.round((el.currentTime / dur) * 100));
      const now = Date.now();
      if (now - lastSave > 1500) {
        localStorage.setItem(POS_KEY(stageKey), String(el.currentTime));
        // Persist max watched percent (never decrease)
        const prev = Number(localStorage.getItem(PCT_KEY(stageKey)) ?? "0");
        const next = Math.max(prev, pct);
        localStorage.setItem(PCT_KEY(stageKey), String(next));
        lastSave = now;
        onProgress?.(next);
      }
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [stageKey, onProgress]);

  return (
    <div className="rounded-lg overflow-hidden bg-black ring-1 ring-border">
      <AspectRatio ratio={16 / 9}>
        <video
          ref={ref}
          src={videoUrl}
          poster={posterUrl ?? undefined}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-contain bg-black"
        />
      </AspectRatio>
    </div>
  );
}

export function getWatchedPercent(stageKey: string): number {
  const raw = localStorage.getItem(PCT_KEY(stageKey));
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
}
