import * as React from "react";
import { addDays, differenceInCalendarDays, startOfDay } from "date-fns";

export type JourneyProgress = {
  version: 1;
  name: string;
  startDateISO: string; // YYYY-MM-DD
  completedDays: number[];
};

export type DayStatus =
  | { status: "completed" }
  | { status: "available" }
  | { status: "locked"; availableAt: Date };

const STORAGE_KEY = "pv_journey_progress_v1";
const TOTAL_DAYS = 7;

function toISODate(d: Date) {
  // YYYY-MM-DD (local)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODate(iso: string) {
  // iso expected YYYY-MM-DD
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function clampDay(n: number) {
  return Math.max(1, Math.min(TOTAL_DAYS, n));
}

function readStorage(): JourneyProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as JourneyProgress;
    if (parsed?.version !== 1) return null;
    if (!parsed.name || !parsed.startDateISO) return null;
    return {
      version: 1,
      name: parsed.name,
      startDateISO: parsed.startDateISO,
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
    };
  } catch {
    return null;
  }
}

function writeStorage(value: JourneyProgress | null) {
  if (!value) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function useJourneyCalendarProgress() {
  // Importante: inicializa de forma síncrona para evitar “race” ao navegar
  // imediatamente após salvar nome/data (ex.: AppHome -> /app/dia/1).
  const [progress, setProgress] = React.useState<JourneyProgress | null>(() => {
    if (typeof window === "undefined") return null;
    return readStorage();
  });

  const isOnboarded = !!progress?.name && !!progress?.startDateISO;

  const startDate = React.useMemo(() => {
    if (!progress?.startDateISO) return null;
    return parseISODate(progress.startDateISO);
  }, [progress?.startDateISO]);

  const availableDay = React.useMemo(() => {
    if (!startDate) return 1;
    const today = startOfDay(new Date());
    const diff = differenceInCalendarDays(today, startOfDay(startDate));
    return clampDay(diff + 1);
  }, [startDate]);

  const completedSet = React.useMemo(() => {
    return new Set(progress?.completedDays ?? []);
  }, [progress?.completedDays]);

  const getDayStatus = React.useCallback(
    (day: number): DayStatus => {
      const d = clampDay(day);
      if (completedSet.has(d)) return { status: "completed" };
      if (d <= availableDay) return { status: "available" };
      const sd = startDate ? startOfDay(startDate) : startOfDay(new Date());
      return { status: "locked", availableAt: addDays(sd, d - 1) };
    },
    [availableDay, completedSet, startDate],
  );

  const getSuggestedDay = React.useCallback(() => {
    // primeiro dia disponível que ainda não foi concluído
    for (let d = 1; d <= availableDay; d++) {
      if (!completedSet.has(d)) return d;
    }
    // se já concluiu tudo que está liberado, sugere rever o último liberado
    return availableDay;
  }, [availableDay, completedSet]);

  function getBaseProgress(): JourneyProgress {
    // Fonte da verdade: localStorage (modo aberto sem login).
    // Isso garante que writes aconteçam antes de qualquer navigate().
    return (
      readStorage() ??
      ({ version: 1, name: "", startDateISO: "", completedDays: [] } as const)
    );
  }

  const setName = React.useCallback((name: string) => {
    const base = getBaseProgress();
    const next: JourneyProgress = {
      ...base,
      version: 1,
      name: name.trim(),
    };
    writeStorage(next);
    setProgress(next);
  }, []);

  const setStartDate = React.useCallback((date: Date) => {
    const iso = toISODate(startOfDay(date));
    const base = getBaseProgress();
    const next: JourneyProgress = {
      ...base,
      version: 1,
      startDateISO: iso,
    };
    writeStorage(next);
    setProgress(next);
  }, []);

  const markDayComplete = React.useCallback(
    (day: number) => {
      const d = clampDay(day);
      if (getDayStatus(d).status !== "available") return;
      const base = getBaseProgress();
      const set = new Set(base.completedDays);
      set.add(d);
      const next: JourneyProgress = {
        ...base,
        completedDays: Array.from(set).sort((a, b) => a - b),
      };
      writeStorage(next);
      setProgress(next);
    },
    [getDayStatus],
  );

  const resetJourney = React.useCallback(() => {
    setProgress(null);
    writeStorage(null);
  }, []);

  return {
    progress,
    isOnboarded,
    startDate,
    availableDay,
    getDayStatus,
    getSuggestedDay,
    setName,
    setStartDate,
    markDayComplete,
    resetJourney,
  };
}
