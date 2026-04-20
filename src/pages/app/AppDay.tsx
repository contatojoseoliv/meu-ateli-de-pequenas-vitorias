import { useParams, Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { VideoLessonLayout } from "@/components/app/VideoLessonLayout";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { Button } from "@/components/shared/Button";
import { toast } from "@/components/ui/sonner";
import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { journeyDays } from "@/content/journey";

export default function AppDay() {
  const { day } = useParams();
  const dayNumber = Number(day);
  const journey = useJourneyProgress();

  const dayData = journeyDays.find((d) => d.day === dayNumber);

  if (!dayData || !Number.isFinite(dayNumber) || dayNumber < 1 || dayNumber > 7) {
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

  const stageKey = `day-${dayNumber}`;
  const unlocked = journey.isDayUnlocked(dayNumber);
  const completed = journey.isDayCompleted(dayNumber);
  const nextDay = dayNumber < 7 ? dayNumber + 1 : null;

  const handleComplete = () => {
    journey.completeDay(dayNumber);
    toast("Vitória do dia!", {
      description: "Dia concluído — você merece esse momento.",
      icon: <Sparkles className="h-4 w-4" />,
    });
  };

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
    <VideoLessonLayout
      stageKey={stageKey}
      shellTitle={`Dia ${dayNumber}`}
      title={`Dia ${dayNumber} — ${dayData.title}`}
      emoji="📆"
      unlocked={unlocked}
      completed={completed}
      onComplete={handleComplete}
      completionActions={completionActions}
    />
  );
}
