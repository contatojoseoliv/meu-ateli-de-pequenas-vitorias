import { useParams, useNavigate, Link } from "react-router-dom";
import IntroPageLayout from "@/components/app/IntroPageLayout";
import { DAY_CONTENTS } from "@/content/dayContents";
import { useDayContentProgress } from "@/hooks/useDayContentProgress";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { Button } from "@/components/shared/Button";
import { toast } from "@/components/ui/sonner";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppDay() {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNumber = Number(day);
  const dayIndex = dayNumber - 1;

  const progress = useDayContentProgress();
  const journey = useJourneyProgress();

  const card = DAY_CONTENTS[dayIndex];

  if (!card || !Number.isFinite(dayNumber) || dayNumber < 1 || dayNumber > 7) {
    return (
      <AppShell title="Dia">
        <main className="container-main py-10">
          <Card className="app-stitch">
            <CardHeader>
              <CardTitle>Dia não encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/app" className="text-primary hover:underline">
                Voltar para a Jornada
              </Link>
            </CardContent>
          </Card>
        </main>
      </AppShell>
    );
  }

  const handleComplete = () => {
    journey.completeDay(dayNumber);
    toast("Vitória do dia!", {
      description: "Dia concluído — você merece esse momento.",
      icon: <Sparkles className="h-4 w-4" />,
    });
  };

  const nextDay = dayNumber < 7 ? dayNumber + 1 : null;

  const completionActions = (
    <>
      <Link to="/app">
        <Button variant="primary" size="default">Voltar para o início</Button>
      </Link>
      {nextDay && (
        <Link to={`/app/dia/${nextDay}`}>
          <Button variant="secondary" size="default">Próximo dia →</Button>
        </Link>
      )}
    </>
  );

  return (
    <IntroPageLayout
      cardIndex={dayIndex}
      card={card}
      shellTitle={`Dia ${dayNumber}`}
      progress={progress}
      onComplete={handleComplete}
      completionActions={completionActions}
    />
  );
}
