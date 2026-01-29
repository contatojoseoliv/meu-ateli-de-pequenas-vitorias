import * as React from "react";
import { format } from "date-fns";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DayStatus } from "@/hooks/useJourneyCalendarProgress";
import { JOURNEY_DAYS } from "@/content/journey";

type JourneyMapProps = {
  getDayStatus: (day: number) => DayStatus;
  suggestedDay: number;
};

export function JourneyMap({ getDayStatus, suggestedDay }: JourneyMapProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Mapa dos 7 dias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            {JOURNEY_DAYS.map((d) => {
              const s = getDayStatus(d.day);
              const isSuggested = d.day === suggestedDay;

              const icon =
                s.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : s.status === "available" ? (
                  <PlayCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                );

              const line1 = `Dia ${d.day} — ${d.title}`;
              const line2 =
                s.status === "locked"
                  ? `Disponível em ${format(s.availableAt, "dd/MM")}`
                  : s.status === "completed"
                    ? "Concluído"
                    : "Disponível hoje";

              const content = (
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-md border p-3 transition-colors",
                    isSuggested && "border-primary/40 bg-primary/5",
                    s.status === "locked" && "opacity-80",
                  )}
                >
                  <div className="mt-0.5">{icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line1}</p>
                    <p className="text-xs text-muted-foreground">{line2}</p>
                  </div>
                  {s.status !== "locked" ? (
                    <Button asChild size="sm" variant={isSuggested ? "secondary" : "outline"}>
                      <Link to={`/app/dia/${d.day}`}>Abrir</Link>
                    </Button>
                  ) : null}
                </div>
              );

              return <React.Fragment key={d.day}>{content}</React.Fragment>;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
