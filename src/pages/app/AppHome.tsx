import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { journeyDays } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { useAppProfile } from "@/hooks/useAppProfile";
import { AppShell } from "@/components/app/AppShell";
import { DayCard } from "@/components/app/DayCard";
import { AppSupportSection } from "@/components/app/AppSupportSection";
import { AppFooterMinimal } from "@/components/app/AppFooterMinimal";
import { AppMaterialsTechniquesSection } from "@/components/app/AppMaterialsTechniquesSection";
import { JourneyMiniProgress } from "@/components/app/JourneyMiniProgress";

import heroAmigurumi from "@/assets/hero-amigurumi.png";
import bulletsCraftingScene from "@/assets/bullets-crafting-scene.jpg";
import leadVisual from "@/assets/lead-visual.png";
import mapa7Dias from "@/assets/mapa-7-dias-referencia.png";
import metodoTitulo from "@/assets/metodo-titulo-ref.png";
import provaCiencia from "@/assets/prova-ciencia.png";
import seloPrimeiraVitoria from "@/assets/selo-primeira-vitoria.png";

const dayStageImages: Record<number, string> = {
  1: heroAmigurumi,
  2: bulletsCraftingScene,
  3: leadVisual,
  4: mapa7Dias,
  5: metodoTitulo,
  6: provaCiencia,
  7: seloPrimeiraVitoria,
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted, getStepChecked } = useJourneyProgress();
  const { profile } = useAppProfile();
  const location = useLocation();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const currentDayData = useMemo(
    () => journeyDays.find((d) => d.day === progress.currentDay),
    [progress.currentDay],
  );

  const stageImage = dayStageImages[progress.currentDay] ?? heroAmigurumi;

  const stagePercent = useMemo(() => {
    const day = progress.currentDay;
    if (isDayCompleted(day)) return 100;

    const guided = currentDayData?.guided;
    if (!guided) return 0;

    const steps = Object.values(guided).flat();
    const total = steps.length;
    if (total === 0) return 0;

    const checked = steps.reduce((acc, step) => acc + (getStepChecked(day, step.id) ? 1 : 0), 0);
    return clamp(Math.round((checked / total) * 100));
  }, [currentDayData?.guided, getStepChecked, isDayCompleted, progress.currentDay]);

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
        {/* Mini-bloco de entrada */}
        <Card className="app-stitch">
          <CardHeader className="space-y-1 p-4">
            <CardTitle className="text-base sm:text-lg">Bem-vinda ao seu Ateliê, {profile.displayName}!</CardTitle>
          </CardHeader>

          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Meu progresso</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>

            <JourneyMiniProgress currentDay={progress.currentDay} completedDays={progress.completedDays} percent={percent} />
          </CardContent>
        </Card>

        {/* Bloco principal (estilo imagem) */}
        <Card className="app-stitch">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="shrink-0">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden ring-2 ring-accent/30">
                  <img
                    src={stageImage}
                    alt={`Imagem da etapa do Dia ${progress.currentDay}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-semibold text-foreground">Primeira Vitória em Amigurumi</p>
                <p className="text-sm text-muted-foreground">
                  Etapa: Dia {progress.currentDay}
                  {currentDayData?.title ? ` — ${currentDayData.title}` : ""}
                </p>
                {currentDayData?.estimatedTime ? (
                  <p className="text-xs text-muted-foreground">Tempo estimado: {currentDayData.estimatedTime}</p>
                ) : null}

                {/* Linha pequena de progresso da etapa */}
                <div className="pt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progresso desta etapa</span>
                    <span className="font-medium text-foreground">{stagePercent}%</span>
                  </div>

                  <div
                    className="h-2 w-full rounded-full overflow-hidden bg-secondary"
                    role="progressbar"
                    aria-label="Progresso desta etapa"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stagePercent}
                  >
                    <div
                      className="h-full rounded-full bg-accent transition-[width]"
                      style={{ width: `${stagePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="md:self-center">
                <Link to={`/app/dia/${progress.currentDay}`}>
                  <Button variant="primary" size="default" className="w-full md:w-auto">
                    {completedCount === 0 ? "Começar" : `Continuar do Dia ${progress.currentDay}`}
                  </Button>
                </Link>
              </div>
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
