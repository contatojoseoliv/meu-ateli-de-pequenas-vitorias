import { useMemo } from "react";

export type LessonStop = {
  stageKey: string;
  label: string;
  shortLabel: string;
  href: string;
};

// Ordem oficial das 10 etapas da jornada
export const LESSON_ORDER: LessonStop[] = [
  { stageKey: "intro-0", label: "Comece por aqui", shortLabel: "Comece por aqui", href: "/app/comecar" },
  { stageKey: "intro-1", label: "Materiais", shortLabel: "Materiais", href: "/app/materiais" },
  { stageKey: "intro-2", label: "Fundamentos", shortLabel: "Fundamentos", href: "/app/fundamentos" },
  { stageKey: "day-1", label: "Dia 1", shortLabel: "Dia 1", href: "/app/dia/1" },
  { stageKey: "day-2", label: "Dia 2", shortLabel: "Dia 2", href: "/app/dia/2" },
  { stageKey: "day-3", label: "Dia 3", shortLabel: "Dia 3", href: "/app/dia/3" },
  { stageKey: "day-4", label: "Dia 4", shortLabel: "Dia 4", href: "/app/dia/4" },
  { stageKey: "day-5", label: "Dia 5", shortLabel: "Dia 5", href: "/app/dia/5" },
  { stageKey: "day-6", label: "Dia 6", shortLabel: "Dia 6", href: "/app/dia/6" },
  { stageKey: "day-7", label: "Dia 7", shortLabel: "Dia 7", href: "/app/dia/7" },
];

export function useLessonNavigation(stageKey: string) {
  return useMemo(() => {
    const idx = LESSON_ORDER.findIndex((s) => s.stageKey === stageKey);
    const total = LESSON_ORDER.length;
    const current = idx >= 0 ? LESSON_ORDER[idx] : null;
    const prev = idx > 0 ? LESSON_ORDER[idx - 1] : null;
    const next = idx >= 0 && idx < total - 1 ? LESSON_ORDER[idx + 1] : null;
    return {
      currentIndex: idx >= 0 ? idx : 0,
      position: idx >= 0 ? idx + 1 : 1,
      total,
      current,
      prev,
      next,
    };
  }, [stageKey]);
}
