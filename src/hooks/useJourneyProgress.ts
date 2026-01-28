import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type JourneyProgressRow = {
  user_id: string;
  current_day: number;
  completed_days: number[];
};

function uniqSortedDays(days: number[]) {
  return Array.from(new Set(days)).sort((a, b) => a - b);
}

export function useJourneyProgress(userId?: string | null) {
  const qc = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ["journey_progress", userId],
    enabled: !!userId,
    queryFn: async (): Promise<JourneyProgressRow> => {
      if (!userId) throw new Error("missing userId");

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
      if (!userId) throw new Error("missing userId");
      const current = progressQuery.data;
      const completed = uniqSortedDays([...(current?.completed_days ?? []), day]);
      const nextDay = Math.min(Math.max(day + 1, 1), 7);
      const currentDay = Math.max(current?.current_day ?? 1, nextDay);

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
      qc.invalidateQueries({ queryKey: ["journey_progress", userId] });
    },
  });

  return {
    ...progressQuery,
    completeDay: completeDayMutation.mutateAsync,
    isCompleting: completeDayMutation.isPending,
  };
}
