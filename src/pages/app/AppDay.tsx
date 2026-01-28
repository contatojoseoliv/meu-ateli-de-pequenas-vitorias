import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { useAppAuth } from "@/hooks/useAppAuth";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { getJourneyDay } from "@/content/journey";
import { ProgressIndicator } from "@/components/app/journey/ProgressIndicator";
import { StepCard } from "@/components/app/journey/StepCard";
import { CalmNote } from "@/components/app/journey/CalmNote";
import { MistakeAlertBox } from "@/components/app/journey/MistakeAlertBox";

export default function AppDay() {
  const navigate = useNavigate();
  const params = useParams();
  const day = Number(params.day);

  const { user, isLoading } = useAppAuth();
  const { data: entitlement, isLoading: entitlementLoading } = useEntitlement(user?.id);
  const { data: progress, isLoading: progressLoading, completeDay, isCompleting } = useJourneyProgress(
    user?.id,
  );

  const safeDay = useMemo(() => {
    if (!Number.isFinite(day)) return 1;
    return Math.min(Math.max(day, 1), 7);
  }, [day]);

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
  const isLocked = safeDay > currentDay;

  if (isLocked) {
    toast.error("Esse dia ainda está bloqueado. Conclua o dia atual primeiro.");
    return <Navigate to="/app" replace />;
  }

  const isCompleted = completed.has(safeDay);
  const content = getJourneyDay(safeDay);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="space-y-2">
          <ProgressIndicator day={safeDay} />
          <h1 className="font-serif text-3xl font-bold text-foreground">Dia {safeDay} — {content.title}</h1>
          <p className="text-muted-foreground">{content.objective}</p>
        </header>

        {content.calmNotes.map((n, idx) => (
          <CalmNote key={idx} text={n} />
        ))}

        <section className="space-y-4">
          {content.steps.map((s, idx) => (
            <StepCard
              key={idx}
              title={s.title}
              instruction={s.instruction}
              microMessage={s.microMessage}
              imageAlt={s.imageAlt}
            />
          ))}
        </section>

        <section>
          <MistakeAlertBox mistakes={content.mistakes} />
        </section>

        <section className="space-y-3">
          <Button variant="secondary" className="w-full" onClick={() => navigate("/app")}>
            Voltar ao mapa
          </Button>
          <Button
            variant="default"
            onClick={async () => {
              if (isCompleted) {
                toast.message("Esse dia já está concluído.");
                navigate("/app");
                return;
              }
              await completeDay(safeDay);
              toast.success("Dia concluído. Próximo desbloqueado.");
              navigate("/app");
            }}
            disabled={isCompleting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isCompleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Concluir o Dia"
            )}
          </Button>
        </section>
      </div>
    </AppLayout>
  );
}
