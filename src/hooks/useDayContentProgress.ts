import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pv_day_content_progress_v1";

type DayContentProgress = {
  completedCards: number[];
  cardStepState: Record<string, Record<string, boolean>>;
};

const defaultProgress: DayContentProgress = {
  completedCards: [],
  cardStepState: {},
};

function safeParse(json: string | null): DayContentProgress | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Partial<DayContentProgress>;
    return {
      completedCards: Array.isArray(parsed.completedCards)
        ? parsed.completedCards.filter((n): n is number => typeof n === "number")
        : [],
      cardStepState:
        parsed.cardStepState && typeof parsed.cardStepState === "object"
          ? (parsed.cardStepState as any)
          : {},
    };
  } catch {
    return null;
  }
}

export function useDayContentProgress() {
  const [progress, setProgress] = useState<DayContentProgress>(() => {
    return safeParse(localStorage.getItem(STORAGE_KEY)) ?? defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const isCardUnlocked = useCallback(
    (cardIndex: number) => {
      if (cardIndex <= 0) return true;
      return progress.completedCards.includes(cardIndex - 1);
    },
    [progress.completedCards],
  );

  const isCardCompleted = useCallback(
    (cardIndex: number) => progress.completedCards.includes(cardIndex),
    [progress.completedCards],
  );

  const completeCard = useCallback((cardIndex: number) => {
    setProgress((prev) => {
      if (prev.completedCards.includes(cardIndex)) return prev;
      return {
        ...prev,
        completedCards: [...prev.completedCards, cardIndex].sort((a, b) => a - b),
      };
    });
  }, []);

  const getStepRead = useCallback(
    (cardIndex: number, stepId: string) => {
      const key = String(cardIndex);
      return Boolean(progress.cardStepState?.[key]?.[stepId]);
    },
    [progress.cardStepState],
  );

  const markStepRead = useCallback((cardIndex: number, stepId: string) => {
    const key = String(cardIndex);
    setProgress((prev) => ({
      ...prev,
      cardStepState: {
        ...prev.cardStepState,
        [key]: { ...(prev.cardStepState?.[key] ?? {}), [stepId]: true },
      },
    }));
  }, []);

  const getActiveStep = useCallback(
    (cardIndex: number, stepIds: string[]): string | null => {
      const key = String(cardIndex);
      const state = progress.cardStepState?.[key] ?? {};
      for (const id of stepIds) {
        if (!state[id]) return id;
      }
      return null;
    },
    [progress.cardStepState],
  );

  const allStepsRead = useCallback(
    (cardIndex: number, stepIds: string[]): boolean => {
      const key = String(cardIndex);
      const state = progress.cardStepState?.[key] ?? {};
      return stepIds.every((id) => Boolean(state[id]));
    },
    [progress.cardStepState],
  );

  const reset = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return useMemo(
    () => ({
      progress,
      isCardUnlocked,
      isCardCompleted,
      completeCard,
      getStepRead,
      markStepRead,
      getActiveStep,
      allStepsRead,
      reset,
    }),
    [progress, isCardUnlocked, isCardCompleted, completeCard, getStepRead, markStepRead, getActiveStep, allStepsRead, reset],
  );
}
