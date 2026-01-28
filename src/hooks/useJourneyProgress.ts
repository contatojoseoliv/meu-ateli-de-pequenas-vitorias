import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type JourneyProgressRow = {
  user_id: string;
  current_day: number;
  completed_days: number[];
};

const LOCAL_STORAGE_KEY = "pv_journey_progress_v1";

function defaultProgress(): JourneyProgressRow {
  return { user_id: "local", current_day: 1, completed_days: [] };
}

function clampDay(day: number) {
  if (!Number.isFinite(day)) return 1;
  return Math.min(Math.max(Math.floor(day), 1), 7);
}

function parseLocalProgress(raw: unknown): JourneyProgressRow {
  const fallback = defaultProgress();
  if (!raw || typeof raw !== "object") return fallback;

  const obj = raw as Record<string, unknown>;
  const current = clampDay(Number(obj.current_day));
  const completedRaw = Array.isArray(obj.completed_days) ? obj.completed_days : [];
  const completed = completedRaw
    .map((d) => clampDay(Number(d)))
    .filter((d) => Number.isFinite(d));

  return {
    user_id: "local",
    current_day: current,
    completed_days: uniqSortedDays(completed),
  };
}

function readLocalProgress(): JourneyProgressRow {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return defaultProgress();
    return parseLocalProgress(JSON.parse(raw));
  } catch {
    return defaultProgress();
  }
}

function writeLocalProgress(progress: JourneyProgressRow) {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ current_day: clampDay(progress.current_day), completed_days: uniqSortedDays(progress.completed_days) }),
    );
  } catch {
    // ignore write errors (storage full, private mode, etc.)
  }
}

function uniqSortedDays(days: number[]) {
  return Array.from(new Set(days)).sort((a, b) => a - b);
}

export function useJourneyProgress(userId?: string | null) {
  const qc = useQueryClient();

  const isLocal = !userId;

  const progressQuery = useQuery({
    queryKey: isLocal ? ["journey_progress", "local"] : ["journey_progress", userId],
    enabled: true,
    queryFn: async (): Promise<JourneyProgressRow> => {
      if (!userId) return readLocalProgress();

      const { data, error } = await supabase
        .from("journey_progress")
        .select("user_id, current_day, completed_days")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { data: inserted, error: insertError } = await supabase
          .from("journey_progress")
          .insert({ user_id: userId, current_day: 1, completed_days: [] })
          .select("user_id, current_day, completed_days")
          .single();

        if (insertError) throw insertError;
        return {
          user_id: inserted.user_id,
          current_day: inserted.current_day,
          completed_days: (inserted.completed_days as unknown as number[]) ?? [],
        };
      }

      return {
        user_id: data.user_id,
        current_day: data.current_day,
        completed_days: (data.completed_days as unknown as number[]) ?? [],
      };
    },
    staleTime: 5_000,
  });

  const completeDayMutation = useMutation({
    mutationFn: async (day: number) => {
      const current = progressQuery.data;
      const completed = uniqSortedDays([...(current?.completed_days ?? []), day]);
      const nextDay = Math.min(Math.max(day + 1, 1), 7);
      const currentDay = Math.max(current?.current_day ?? 1, nextDay);

      if (!userId) {
        const next: JourneyProgressRow = {
          user_id: "local",
          current_day: clampDay(currentDay),
          completed_days: completed.map(clampDay),
        };
        writeLocalProgress(next);
        return next;
      }

      const { data, error } = await supabase
        .from("journey_progress")
        .update({ completed_days: completed, current_day: currentDay })
        .eq("user_id", userId)
        .select("user_id, current_day, completed_days")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: isLocal ? ["journey_progress", "local"] : ["journey_progress", userId] });
    },
  });

  return {
    ...progressQuery,
    completeDay: completeDayMutation.mutateAsync,
    isCompleting: completeDayMutation.isPending,
  };
}
