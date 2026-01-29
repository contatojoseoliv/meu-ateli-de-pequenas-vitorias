import * as React from "react";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { AppLayout } from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { getJourneyDay } from "@/content/journey";
import { useJourneyCalendarProgress } from "@/hooks/useJourneyCalendarProgress";

function clampToDay(value: number) {
  return Math.max(1, Math.min(7, value));
}

export default function AppDay() {
  const params = useParams();
  const parsed = Number(params.day);
  const dayNumber = Number.isFinite(parsed) ? clampToDay(parsed) : null;

  const { isOnboarded, progress, getDayStatus, markDayComplete } = useJourneyCalendarProgress();

  const day = useMemo(() => (dayNumber ? getJourneyDay(dayNumber) : null), [dayNumber]);
  const status = dayNumber ? getDayStatus(dayNumber) : null;

  const stepsCount = day?.steps.length ?? 0;
  const [checks, setChecks] = useState<boolean[]>(() => Array.from({ length: stepsCount }, () => false));

  React.useEffect(() => {
    setChecks(Array.from({ length: stepsCount }, () => false));
  }, [stepsCount, dayNumber]);

  if (!isOnboarded) return <Navigate to="/app" replace />;
  if (!dayNumber || !day) return <Navigate to="/app" replace />;

  const isLocked = status?.status === "locked";
  const isCompleted = status?.status === "completed";
  const canComplete = status?.status === "available";

  const completedSteps = checks.filter(Boolean).length;
  const progressPct = stepsCount ? Math.round((completedSteps / stepsCount) * 100) : 0;
  const allChecked = stepsCount > 0 && completedSteps === stepsCount;

  return (
    <AppLayout
      title={`Dia ${day.day} — ${day.title}`}
      subtitle={`Objetivo: ${day.objective}`}
      rightSlot={
        <Button asChild variant="ghost" size="sm">
          <Link to="/app">Mapa</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Seu passo de hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">Tempo sugerido: {day.durationMinutes} min</p>
              <p className="text-sm text-muted-foreground">Olá, {progress?.name}</p>
            </div>

            {isLocked ? (
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-sm font-medium">Esse dia ainda está bloqueado.</p>
                <p className="text-xs text-muted-foreground">
                  Disponível em {status?.status === "locked" ? format(status.availableAt, "dd/MM/yyyy") : ""}.
                </p>
                <div className="mt-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/app">Voltar ao mapa</Link>
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Checklist do dia</p>
                <p className="text-xs text-muted-foreground">
                  {completedSteps}/{stepsCount}
                </p>
              </div>
              <Progress value={progressPct} />
            </div>

            <div className="grid gap-2">
              {day.steps.map((step, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-start gap-3 rounded-md border bg-background p-3"
                >
                  <Checkbox
                    checked={checks[idx]}
                    onCheckedChange={(v) => {
                      const checked = v === true;
                      setChecks((prev) => {
                        const next = [...prev];
                        next[idx] = checked;
                        return next;
                      });
                    }}
                    disabled={isLocked}
                  />
                  <span className="text-sm leading-relaxed">{step}</span>
                </label>
              ))}
            </div>

            {day.commonMistakes?.length ? (
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-sm font-medium">Se travar, veja isso</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {day.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button
                onClick={() => {
                  if (!canComplete) return;
                  if (!allChecked) {
                    toast("Antes de concluir, marque os passos que você já fez — sem pressa.");
                    return;
                  }
                  markDayComplete(day.day);
                  toast(day.tomorrowMessage ?? "Dia concluído! Amanhã tem mais.");
                }}
                disabled={isLocked || isCompleted}
              >
                {isCompleted ? "Dia concluído" : "Concluir o dia"}
              </Button>

              <Button asChild variant="outline">
                <Link to="/app">Voltar ao mapa</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
