import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { journeyDays } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { AppShell } from "@/components/app/AppShell";
import { YarnProgress } from "@/components/app/YarnProgress";
import { DayCard } from "@/components/app/DayCard";

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted } = useJourneyProgress();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = Math.round((completedCount / totalDays) * 100);

  return (
    <AppShell title="Jornada" backTo="/" backLabel="Início">
      <main className="container-main py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            <span className="font-handwritten font-normal tracking-tight">Suas Pequenas Vitórias</span>
          </h1>
          <p className="text-muted-foreground">Um dia de cada vez — com calma, carinho e orgulho do que você já fez.</p>
        </header>

        <Card className="app-stitch">
          <CardHeader>
            <CardTitle className="text-lg">Progresso geral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Concluído</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>
            <YarnProgress value={percent} label="Progresso geral" />
            <div className="pt-2">
              <Link to={`/app/dia/${progress.currentDay}`}>
                <Button variant="primary" size="default">Continuar do Dia {progress.currentDay}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Dias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {journeyDays.map((d) => {
              const unlocked = isDayUnlocked(d.day);
              const completed = isDayCompleted(d.day);
              const isCurrent = unlocked && !completed && progress.currentDay === d.day;

              return (
                <DayCard
                  key={d.day}
                  day={d.day}
                  title={d.title}
                  estimatedTime={d.estimatedTime}
                  unlocked={unlocked}
                  completed={completed}
                  isCurrent={isCurrent}
                  href={`/app/dia/${d.day}`}
                />
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
