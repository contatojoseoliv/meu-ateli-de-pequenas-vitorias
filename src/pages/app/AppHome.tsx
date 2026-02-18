"use client";

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
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { AppFooterMinimal } from "@/components/app/AppFooterMinimal";
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

  const totalStages = INTRO_CARDS.length + journeyDays.length; // 3 intro + 7 days = 10
  const introCompletedCount = INTRO_CARDS.filter((_, idx) => introProgress.isCardCompleted(idx)).length;
  const allIntroCompleted = introCompletedCount === INTRO_CARDS.length;
  const completedCount = introCompletedCount + progress.completedDays.length;
  const percent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

  const introRoutes = [
    { href: "/app/comecar", label: "Introdução" },
    { href: "/app/materiais", label: "Materiais" },
    { href: "/app/fundamentos", label: "Fundamentos" },
  ];
  const nextIntroRoute = useMemo(() => {
    for (let i = 0; i < INTRO_CARDS.length; i++) {
      if (!introProgress.isCardCompleted(i)) return introRoutes[i];
    }
    return introRoutes[0];
  }, [introProgress]);

  const currentDayData = useMemo(
    () => journeyDays.find((d) => d.day === progress.currentDay),
    [progress.currentDay],
  );

  const stageImage = dayStageImages[progress.currentDay] ?? placeholderImg;

  const stagePercent = useMemo(() => {
    // If still in intro stages, calculate intro topic progress
    if (!allIntroCompleted) {
      // Find current intro card index
      let currentIntroIdx = 0;
      for (let i = 0; i < INTRO_CARDS.length; i++) {
        if (!introProgress.isCardCompleted(i)) { currentIntroIdx = i; break; }
      }
      const card = INTRO_CARD_CONTENTS[currentIntroIdx];
      if (!card) return 0;
      const stepIds = card.topics.map((t) => t.id);
      const readCount = stepIds.filter((id) => introProgress.getStepRead(currentIntroIdx, id)).length;
      return clamp(Math.round((readCount / stepIds.length) * 100));
    }

    const day = progress.currentDay;
    if (isDayCompleted(day)) return 100;

    const guided = currentDayData?.guided;
    if (!guided) return 0;

    const steps = Object.values(guided).flat();
    const total = steps.length;
    if (total === 0) return 0;

    const checked = steps.reduce((acc, step) => acc + (getStepChecked(day, step.id) ? 1 : 0), 0);
    return clamp(Math.round((checked / total) * 100));
  }, [allIntroCompleted, introProgress, currentDayData?.guided, getStepChecked, isDayCompleted, progress.currentDay]);

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
          <CardContent className="p-3 space-y-2">
            <p className="text-xl font-serif text-foreground">Bem-vinda ao Meu Ateliê, {profile.displayName}!</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Meu Progresso para o Primeiro Amigurumi</span>
              <span className="font-bold text-foreground">{percent}% concluído</span>
            </div>

            <JourneyMiniProgress currentDay={progress.currentDay} completedDays={progress.completedDays} percent={percent} />
          </CardContent>
        </Card>

        {/* Bloco principal (estilo imagem) */}
        <Card className="app-stitch">
          <CardContent className="p-7 md:p-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="shrink-0">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-2 ring-accent/30 bg-muted">
                  <img
                    src={stageImage}
                    alt={`Imagem da etapa do Dia ${progress.currentDay}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-lg md:text-xl font-serif text-foreground">Primeira Vitória em Amigurumi</p>
                {allIntroCompleted ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Etapa: Dia {progress.currentDay}
                      {currentDayData?.title ? ` — ${currentDayData.title}` : ""}
                    </p>
                    {currentDayData?.estimatedTime ? (
                      <p className="text-xs text-muted-foreground">Tempo estimado: {currentDayData.estimatedTime}</p>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Etapa: {nextIntroRoute.label}
                  </p>
                )}

                {/* Linha de progresso da etapa */}
                <div className="pt-3">
                  <div
                    className="h-2 w-full rounded-full overflow-hidden bg-secondary"
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

              <div className="md:self-center">
                <Link to={allIntroCompleted ? `/app/dia/${progress.currentDay}` : nextIntroRoute.href}>
                  <Button variant="primary" size="default" className="w-full md:w-auto">
                    {completedCount === 0 ? "Começar" : allIntroCompleted ? `Continuar do Dia ${progress.currentDay}` : `Continuar: ${nextIntroRoute.label}`}
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
              {completedCount}/{totalStages} etapas concluídas
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
              const unlocked = allIntroCompleted && isDayUnlocked(d.day);
              const completed = isDayCompleted(d.day);
              const isCurrent = unlocked && !completed && progress.currentDay === d.day;

              return (
                <DayCard
                  key={d.day}
                  day={d.day}
                  title={d.title}
                  tag={d.tag}
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

        <AppFooterMinimal />
      </main>
    </AppShell>
  );
}