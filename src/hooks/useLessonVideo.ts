import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LessonVideoData = {
  videoUrl: string | null;
  posterUrl: string | null;
  summary: string | null;
  loading: boolean;
  error: string | null;
};

export function useLessonVideo(stageKey: string): LessonVideoData {
  const [state, setState] = useState<LessonVideoData>({
    videoUrl: null,
    posterUrl: null,
    summary: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }));
      const { data, error } = await supabase
        .from("lesson_videos")
        .select("video_path, poster_path, summary")
        .eq("stage_key", stageKey)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setState({ videoUrl: null, posterUrl: null, summary: null, loading: false, error: error.message });
        return;
      }

      const videoUrl = data?.video_path
        ? supabase.storage.from("lesson-videos").getPublicUrl(data.video_path).data.publicUrl
        : null;
      const posterUrl = data?.poster_path
        ? supabase.storage.from("lesson-videos").getPublicUrl(data.poster_path).data.publicUrl
        : null;

      setState({
        videoUrl,
        posterUrl,
        summary: data?.summary ?? null,
        loading: false,
        error: null,
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [stageKey]);

  return state;
}
