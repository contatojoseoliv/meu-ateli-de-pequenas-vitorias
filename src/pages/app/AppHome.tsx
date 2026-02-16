import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { journeyDays } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { useAppProfile } from "@/hooks/useAppProfile";
import { AppShell } from "@/components/app/AppShell";
import { DayCard } from "@/components/app/DayCard";
import { IntroCard, INTRO_CARDS } from "@/components/app/IntroCard";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { AppSupportSection } from "@/components/app/AppSupportSection";
import { AppFooterMinimal } from "@/components/app/AppFooterMinimal";
import { AppMaterialsTechniquesSection } from "@/components/app/AppMaterialsTechniquesSection";
import { JourneyMiniProgress } from "@/components/app/JourneyMiniProgress";

// Placeholder para as novas imagens que serão enviadas
const placeholderImg = "/placeholder.svg";

const dayStageImages: Record<number, string> = {
  1: placeholderImg,
  2: placeholderImg,
  3: placeholderImg,
  4: placeholderImg,
  5: placeholderImg,
  6: placeholderImg,
  7: placeholderImg,
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted, getStepChecked } = useJourneyProgress();
  const { profile } = useAppProfile();
  const introProgress = useIntroProgress();
  const location = useLocation();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const currentDayData = useMemo(
    () => journeyDays.find((d) => d.day === progress.currentDay),
    [progress.currentDay],
  );

  const stageImage = dayStageImages[progress.currentDay] ?? placeholderImg;

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
        {/* Mini-bloco de entrada - Mais compacto */}
        <Card className="app-stitch">
          <CardContent className="p-2 md:p-3 space-y-1">
            <p className="text-lg md:text-xl font-serif text-foreground">Bem-vinda ao Meu Ateliê, {profile.displayName}!</p>
            <div className="flex items-center justify-between text-[11px] md:text-sm text-muted-foreground">
              <span>Meu Progresso para o Primeiro Amigurumi</span>
              <span className="font-bold text-foreground">{percent}% concluído</span>
            </div>

            <JourneyMiniProgress currentDay={progress.currentDay} completedDays={progress.completedDays} percent={percent} />
          </CardContent>
        </Card>

        {/* Bloco principal (estilo imagem) - Mais destaque */}
        <Card className="app-stitch border-2 border-accent/10 shadow-elevada">
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="shrink-0 flex justify-center">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden ring-4 ring-accent/20 bg-muted shadow-lg">
                  <img
                    src={stageImage}
                    alt={`Imagem da etapa do Dia ${progress.currentDay}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-xl md:text-2xl font-serif text-foreground">Primeira Vitória em Amigurumi</p>
                <p className="text-base text-muted-foreground">
                  Etapa: Dia {progress.currentDay}
                  {currentDayData?.title ? ` — ${currentDayData.title}` : ""}
                </p>
                {currentDayData?.estimatedTime ? (
                  <p className="text-sm text-muted-foreground">Tempo estimado: {currentDayData.estimatedTime}</p>
                ) : null}

                {/* Linha fina de progresso da etapa */}
                <div className="pt-4">
                  <div
                    className="h-1 w-full rounded-full overflow-hidden bg-secondary/30"
                    role="progressbar"
                    aria-label="Progresso desta etapa"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stagePercent}
                  >
                    <div 
                      className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out" 
                      style={{ width: `${stagePercent}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="md:self-center pt-4 md:pt-0">
                <Link to={`/app/dia/${progress.currentDay}`}>
                  <Button variant="primary" size="lg" className="w-full md:w-auto px-10">
                    {completedCount === 0 ? "Começar" : `Continuar do Dia ${progress.currentDay}`}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Meus Dias de Criação</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {completedCount}/{totalDays} dias concluídos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {INTRO_CARDS.map((_, idx) => (
              <IntroCard
                key={`intro-${idx}`}
                cardIndex={idx}
                unlocked={introProgress.isCardUnlocked(idx)}
                completed={introProgress.isCardCompleted(idx)}
              />
            ))}

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