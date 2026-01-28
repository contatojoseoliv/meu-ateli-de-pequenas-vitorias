import { Navigate, useNavigate } from "react-router-dom";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppAuth } from "@/hooks/useAppAuth";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { JOURNEY_DAYS } from "@/content/journey";

const DAYS = Array.from({ length: 7 }).map((_, i) => i + 1);

export default function AppMap() {
  const navigate = useNavigate();
  const { user, isLoading } = useAppAuth();
  const { data: entitlement, isLoading: entitlementLoading } = useEntitlement(user?.id);
  const { data: progress, isLoading: progressLoading } = useJourneyProgress(user?.id);

  if (isLoading || entitlementLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/app/login" replace />;
  if (!entitlement?.hasAccess) return <Navigate to="/app/acesso" replace />;

  const currentDay = progress?.current_day ?? 1;
  const completed = new Set(progress?.completed_days ?? []);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-foreground">Mapa da Jornada</h1>
          <p className="text-muted-foreground">
            Você só precisa fazer o dia de hoje. O resto fica quietinho, esperando.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">7 dias, 1 pequena vitória por vez</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DAYS.map((day) => {
              const isCompleted = completed.has(day);
              const isActive = day === currentDay;
              const isLocked = day > currentDay;

              return (
                <button
                  key={day}
                  type="button"
                  className="w-full text-left"
                  onClick={() => {
                    if (isLocked) return;
                    navigate(`/app/dia/${day}`);
                  }}
                >
                  <div
                    className={
                      "rounded-lg border bg-background p-4 transition-all hover-lift " +
                      (isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer")
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">Dia {day}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="text-foreground/80">
                            {JOURNEY_DAYS.find((d) => d.day === day)?.title ?? ""}
                          </span>
                          <span className="mx-2">•</span>
                          {isCompleted
                            ? "Concluído — sua vitória está registrada"
                            : isActive
                              ? "Disponível agora"
                              : "Bloqueado por enquanto"}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="pt-2">
              <Button className="w-full" onClick={() => navigate(`/app/dia/${currentDay}`)}>
                Continuar do Dia {currentDay}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
