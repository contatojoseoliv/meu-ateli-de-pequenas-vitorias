import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
import { AppMaterialsTechniquesSection } from "@/components/app/AppMaterialsTechniquesSection";

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted } = useJourneyProgress();
  const { profile } = useAppProfile();
  const location = useLocation();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <AppShell>
      <main className="container-main py-8 space-y-6">
        <Card className="app-stitch">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl">Bem-vinda ao seu Ateliê, {profile.displayName}!</CardTitle>
            <p className="text-sm font-medium text-foreground">
              Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?
            </p>
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
                  {completedCount === 0 ? "Começar" : `Continuar do Dia ${progress.currentDay}`}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Meus Dias de Criação</h2>
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

        <AppMaterialsTechniquesSection currentDay={progress.currentDay} />

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Meu Suporte</h2>
          <AppSupportSection />
        </section>

        <AppFooterMinimal />
      </main>
    </AppShell>
  );
}
