import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pv_journey_progress_v1";

type JourneyProgress = {
  currentDay: number;
  completedDays: number[];
  dayStepState: Record<string, Record<string, boolean>>; // day -> stepId -> checked
};

const defaultProgress: JourneyProgress = {
  currentDay: 1,
  completedDays: [],
  dayStepState: {},
};

function safeParse(json: string | null): JourneyProgress | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Partial<JourneyProgress>;
    return {
      currentDay: typeof parsed.currentDay === "number" ? parsed.currentDay : 1,
      completedDays: Array.isArray(parsed.completedDays)
        ? parsed.completedDays.filter((n): n is number => typeof n === "number")
        : [],
      dayStepState: parsed.dayStepState && typeof parsed.dayStepState === "object" ? (parsed.dayStepState as any) : {},
    };
  } catch {
    return null;
  }
}

export function useJourneyProgress() {
  const [progress, setProgress] = useState<JourneyProgress>(() => {
    const fromStorage = safeParse(localStorage.getItem(STORAGE_KEY));
    return fromStorage ?? defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const isDayUnlocked = useCallback(
    (day: number) => {
      if (day <= 1) return true;
      if (progress.completedDays.includes(day)) return true;
      return progress.completedDays.includes(day - 1) || progress.currentDay >= day;
    },
    [progress.completedDays, progress.currentDay],
  );

  const getStepChecked = useCallback(
    (day: number, stepId: string) => {
      const dayKey = String(day);
      return Boolean(progress.dayStepState?.[dayKey]?.[stepId]);
    },
    [progress.dayStepState],
  );

  const setStepChecked = useCallback((day: number, stepId: string, checked: boolean) => {
    const dayKey = String(day);
    setProgress((prev) => {
      const nextDayState = { ...(prev.dayStepState?.[dayKey] ?? {}), [stepId]: checked };
      return {
        ...prev,
        dayStepState: {
          ...prev.dayStepState,
          [dayKey]: nextDayState,
        },
      };
    });
  }, []);

  const isDayCompleted = useCallback(
    (day: number) => progress.completedDays.includes(day),
    [progress.completedDays],
  );

  const completeDay = useCallback((day: number) => {
    setProgress((prev) => {
      const completedDays = prev.completedDays.includes(day) ? prev.completedDays : [...prev.completedDays, day].sort((a, b) => a - b);
      const nextCurrent = day >= prev.currentDay ? Math.min(day + 1, 7) : prev.currentDay;
      return {
        ...prev,
        completedDays,
        currentDay: nextCurrent,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const api = useMemo(
    () => ({
      progress,
      isDayUnlocked,
      isDayCompleted,
      getStepChecked,
      setStepChecked,
      completeDay,
      reset,
    }),
    [progress, isDayUnlocked, isDayCompleted, getStepChecked, setStepChecked, completeDay, reset],
  );

  return api;
}
