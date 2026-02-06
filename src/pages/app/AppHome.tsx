import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { journeyDays } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { useAppProfile } from "@/hooks/useAppProfile";
import { AppShell } from "@/components/app/AppShell";
import { YarnProgress } from "@/components/app/YarnProgress";
import { DayCard } from "@/components/app/DayCard";
import { AppSupportSection } from "@/components/app/AppSupportSection";
import { AppFooterMinimal } from "@/components/app/AppFooterMinimal";

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted } = useJourneyProgress();
  const { profile } = useAppProfile();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  return (
    <AppShell>
      <main className="container-main py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Sua jornada</h1>
        </header>

        <Card className="app-stitch">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl">
              Bem-vinda, {profile.displayName}! 🧶
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Você está na sua Primeira Vitória – <span className="font-medium text-foreground">{percent}%</span> concluída.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso geral</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>

            <YarnProgress value={percent} label="Progresso geral" />

            <div className="pt-2">
              <Link to={`/app/dia/${progress.currentDay}`}>
                <Button variant="primary" size="default">
                  {completedCount === 0 ? "Iniciar do Dia 1" : `Continuar do Dia ${progress.currentDay}`}
                </Button>
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


        <AppSupportSection />
        <AppFooterMinimal />
      </main>
    </AppShell>
  );
}
