import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
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
import { useDayContentProgress } from "@/hooks/useDayContentProgress";

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
  const dayContentProgress = useDayContentProgress();
  const location = useLocation();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  const currentDayData = useMemo(
    () => journeyDays.find((d) => d.day === progress.currentDay),
    [progress.currentDay],
  );

  const stageImage = dayStageImages[progress.currentDay] ?? placeholderImg;

  // Encontrar o tópico atual (primeiro passo não concluído)
  const currentTopic = useMemo(() => {
    if (!currentDayData) return null;
    const allSteps = [
      ...currentDayData.guided.preparacao,
      ...currentDayData.guided.voltas,
      ...currentDayData.guided.verificacao,
      ...currentDayData.guided.objetivoFinal,
    ];
    return allSteps.find(step => !getStepChecked(progress.currentDay, step.id))?.text || "Concluir dia";
  }, [currentDayData, getStepChecked, progress.currentDay]);

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
      <main className="container-main py-8 space-y-8">
        {/* Mini-bloco de entrada - Mais compacto */}
        <Card className="app-stitch">
          <CardContent className="p-3 space-y-2">
            <p className="text-xl font-serif text-foreground">Bem-vinda ao Meu Ateliê, {profile.displayName}!</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Meu Progresso para o Primeiro Amigurumi</span>
              <span className="font-bold text-foreground">{percent}% concluído</span>
            </div>

            <JourneyMiniProgress currentDay={progress.currentDay} completedDays={progress.completedDays} percent={percent} />
          </CardContent>
        </Card>

        {/* Bloco principal de destaque - Maior e mais proeminente */}
        <Card className="app-stitch border-2 border-accent/20 shadow-elevada overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Área da Imagem - Maior no desktop */}
              <div className="md:w-1/3 bg-muted relative min-h-[200px] md:min-h-full">
                <img
                  src={stageImage}
                  alt={`Imagem da etapa do Dia ${progress.currentDay}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
                <div className="absolute bottom-4 left-4 md:hidden">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Dia {progress.currentDay}
                  </span>
                </div>
              </div>

              {/* Área de Conteúdo */}
              <div className="flex-1 p-6 md:p-10 space-y-6 flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="hidden md:block">
                    <span className="text-accent text-xs font-bold uppercase tracking-widest">
                      Etapa Atual • Dia {progress.currentDay}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
                    Primeira Vitória em Amigurumi
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-medium">Tópico:</span>
                    <span className="text-sm italic truncate max-w-[250px] md:max-w-none">
                      {currentTopic}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                  {currentDayData?.estimatedTime && (
                    <div className="flex items-center gap-1.5 bg-secondary/20 px-3 py-1.5 rounded-full">
                      <span>⏱️ Tempo estimado: {currentDayData.estimatedTime}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium">
                    <span>{stagePercent}% da etapa concluída</span>
                  </div>
                </div>

                {/* Linha de progresso minimalista e fina */}
                <div className="space-y-2">
                  <div
                    className="h-1 w-full rounded-full overflow-hidden bg-secondary/20"
                    role="progressbar"
                    aria-label="Progresso desta etapa"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stagePercent}
                  >
                    <div 
                      className="h-full rounded-full bg-accent transition-[width] duration-700 ease-in-out" 
                      style={{ width: `${stagePercent}%` }} 
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Link to={`/app/dia/${progress.currentDay}`}>
                    <Button variant="primary" size="lg" className="w-full md:w-auto shadow-cta hover:shadow-cta-hover">
                      {completedCount === 0 ? "Começar Jornada" : `Continuar do Dia ${progress.currentDay}`}
                    </Button>
                  </Link>
                </div>
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