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

import heroAmigurumi from "@/assets/hero-amigurumi.png";
import stageGrid from "@/assets/stage-grid.png";

// 10 stages: 3 intro cards (0-2) + 7 days (3-9)
// Grid positions for the 3x3 sprite (indices 0-8), Day 7 uses separate image
const STAGE_THUMBNAILS: { src: string; bgPosition: string }[] = [
  { src: stageGrid, bgPosition: "0% 0%" },       // Comece por aqui
  { src: stageGrid, bgPosition: "50% 0%" },       // Materiais
  { src: stageGrid, bgPosition: "100% 0%" },      // Fundamentos
  { src: stageGrid, bgPosition: "0% 50%" },       // Dia 1
  { src: stageGrid, bgPosition: "50% 50%" },      // Dia 2
  { src: stageGrid, bgPosition: "100% 50%" },     // Dia 3
  { src: stageGrid, bgPosition: "0% 100%" },      // Dia 4
  { src: stageGrid, bgPosition: "50% 100%" },     // Dia 5
  { src: stageGrid, bgPosition: "100% 100%" },    // Dia 6
  { src: heroAmigurumi, bgPosition: "center" },    // Dia 7
];

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted, getStepChecked } = useJourneyProgress();
  const { profile } = useAppProfile();
  const introProgress = useIntroProgress();
  const location = useLocation();

  const totalSteps = 10; // 3 intro + 7 days
  const introCompletedCount = introProgress.progress.completedCards.length;
  const completedCount = introCompletedCount + progress.completedDays.length;
  const percent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const currentDayData = useMemo(
    () => journeyDays.find((d) => d.day === progress.currentDay),
    [progress.currentDay],
  );

  // Calculate current stage index: intro cards first, then days
  const currentStageIndex = useMemo(() => {
    const introCount = introProgress.progress.completedCards.length;
    if (introCount < 3) return introCount; // still in intro phase
    return 2 + progress.currentDay; // 3 intro + day offset (day1=index3, day7=index9)
  }, [introProgress.progress.completedCards.length, progress.currentDay]);

  const stageThumbnail = STAGE_THUMBNAILS[currentStageIndex] ?? STAGE_THUMBNAILS[0];

  const stagePercent = useMemo(() => {
    const introCount = introProgress.progress.completedCards.length;
    if (introCount < 3) return 0;

    const day = progress.currentDay;
    if (isDayCompleted(day)) return 100;

    const guided = currentDayData?.guided;
    if (!guided) return 0;

    const steps = Object.values(guided).flat();
    const total = steps.length;
    if (total === 0) return 0;

    const checked = steps.reduce((acc, step) => acc + (getStepChecked(day, step.id) ? 1 : 0), 0);
    return clamp(Math.round((checked / total) * 100));
  }, [currentDayData?.guided, getStepChecked, isDayCompleted, progress.currentDay, introProgress.progress.completedCards.length]);

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
            <CardTitle className="text-base sm:text-lg">Bem-vinda ao Meu Ateliê, {profile.displayName}!</CardTitle>
          </CardHeader>

          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Meu progresso</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>

            <JourneyMiniProgress percent={percent} />
          </CardContent>
        </Card>

        {/* Bloco principal (estilo imagem) */}
        <Card className="app-stitch">
          <CardContent className="p-7 md:p-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="shrink-0">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-2 ring-accent/30">
                  {currentStageIndex === 9 ? (
                    <img
                      src={stageThumbnail.src}
                      alt="Coelhinho amigurumi"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      role="img"
                      aria-label={`Imagem da etapa atual`}
                      style={{
                        backgroundImage: `url(${stageThumbnail.src})`,
                        backgroundSize: "500% 500%",
                        backgroundPosition: stageThumbnail.bgPosition,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-base font-semibold text-foreground">Primeira Vitória em Amigurumi</p>
                <p className="text-sm text-muted-foreground">
                  {currentStageIndex < 3
                    ? `Etapa: ${["Comece por aqui", "Materiais", "Fundamentos"][currentStageIndex]}`
                    : `Etapa: Dia ${progress.currentDay}${currentDayData?.title ? ` — ${currentDayData.title}` : ""}`}
                </p>
                {currentStageIndex >= 3 && currentDayData?.estimatedTime ? (
                  <p className="text-xs text-muted-foreground">Tempo estimado: {currentDayData.estimatedTime}</p>
                ) : null}

                {/* Linha pequena de progresso da etapa */}
                <div className="pt-2">
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden bg-secondary"
                    role="progressbar"
                    aria-label="Progresso desta etapa"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stagePercent}
                  >
                    <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${stagePercent}%` }} />
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
