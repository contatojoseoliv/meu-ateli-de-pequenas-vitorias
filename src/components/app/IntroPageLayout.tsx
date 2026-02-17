import { useRef, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { AppShell } from "@/components/app/AppShell";
import { useIsMobile } from "@/hooks/use-mobile";
import type { IntroCardData, Topic } from "@/content/introCards";

export type ContentProgressAPI = {
  isCardUnlocked: (idx: number) => boolean;
  isCardCompleted: (idx: number) => boolean;
  completeCard: (idx: number) => void;
  getStepRead: (idx: number, stepId: string) => boolean;
  markStepRead: (idx: number, stepId: string) => void;
  getActiveStep: (idx: number, stepIds: string[]) => string | null;
  allStepsRead: (idx: number, stepIds: string[]) => boolean;
};

type Props = {
  cardIndex: number;
  card: IntroCardData;
  shellTitle: string;
  progress: ContentProgressAPI;
  onComplete?: () => void;
  completionActions?: React.ReactNode;
};

export default function IntroPageLayout({ cardIndex, card, shellTitle, progress, onComplete, completionActions }: Props) {
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const topicRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [visibleTopicId, setVisibleTopicId] = useState<string | null>(null);

  const unlocked = cardIndex === 0 || progress.isCardUnlocked(cardIndex);
  const stepIds = card.topics.map((t) => t.id);
  const completed = progress.isCardCompleted(cardIndex);
  const activeStepId = progress.getActiveStep(cardIndex, stepIds);
  const allRead = progress.allStepsRead(cardIndex, stepIds);

  // Track which topic is currently in view
  useEffect(() => {
    if (!contentRef.current) return;
    const observers: IntersectionObserver[] = [];

    stepIds.forEach((id) => {
      const el = topicRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleTopicId(id);
        },
        { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [stepIds, unlocked]);

  const scrollToTopic = useCallback((id: string) => {
    setTimeout(() => {
      topicRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const handleAdvance = useCallback(
    (currentStepId: string) => {
      progress.markStepRead(cardIndex, currentStepId);
      const idx = stepIds.indexOf(currentStepId);
      if (idx < stepIds.length - 1) {
        scrollToTopic(stepIds[idx + 1]);
      }
    },
    [progress, cardIndex, stepIds, scrollToTopic],
  );

  const handleCompleteCard = useCallback(() => {
    progress.completeCard(cardIndex);
    onComplete?.();
  }, [progress, cardIndex, onComplete]);

  if (!unlocked) {
    return (
      <AppShell title={shellTitle}>
        <main className="container-main py-8 space-y-6">
          <Card className="bg-white border border-verde-eucalipto/15 shadow-sm">
            <CardContent className="p-8 text-center space-y-3">
              <p className="text-muted-foreground">Conclua a etapa anterior para desbloquear.</p>
              <Link to="/app">
                <Button variant="ghost" size="default">Voltar</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </AppShell>
    );
  }

  const currentVisible = visibleTopicId ?? activeStepId ?? stepIds[0];

  return (
    <AppShell title={shellTitle}>
      <main className="container-main py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {completed && (
            <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
          <h1 className="font-bold text-lg md:text-xl text-foreground">
            {card.emoji} {card.title}
          </h1>
        </div>

        {/* Mobile: horizontal scrollable TOC */}
        {isMobile && (
          <nav className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-none">
            {card.topics.map((topic) => {
              const isRead = progress.getStepRead(cardIndex, topic.id);
              const isCurrent = topic.id === currentVisible;
              const isLocked = !isRead && topic.id !== activeStepId;

              return (
                <button
                  key={topic.id}
                  onClick={() => !isLocked && scrollToTopic(topic.id)}
                  disabled={isLocked}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isCurrent
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : isRead
                      ? "border-border bg-muted/40 text-foreground"
                      : "border-border/50 bg-muted/20 text-muted-foreground/50"
                  }`}
                >
                  {isRead && <Check className="h-3 w-3" />}
                  <span className="truncate max-w-[120px]">{topic.emoji} {topic.title}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Desktop: sidebar + content */}
        <div className="flex gap-6">
          {/* Sidebar TOC - desktop only */}
          {!isMobile && (
            <nav className="w-56 flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="space-y-0.5">
                {card.topics.map((topic) => {
                  const isRead = progress.getStepRead(cardIndex, topic.id);
                  const isCurrent = topic.id === currentVisible;
                  const isLocked = !isRead && topic.id !== activeStepId;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => !isLocked && scrollToTopic(topic.id)}
                      disabled={isLocked}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        isCurrent
                          ? "bg-primary/8 text-primary font-medium border-l-2 border-primary"
                          : isRead
                          ? "text-foreground hover:bg-muted/40 cursor-pointer"
                          : "text-muted-foreground/40 cursor-default"
                      }`}
                    >
                      {isRead ? (
                        <div className="h-4 w-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </div>
                      ) : isCurrent ? (
                        <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-border/50 flex-shrink-0" />
                      )}
                      <span className="truncate">{topic.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div className="mt-4 px-3">
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${(stepIds.filter((id) => progress.getStepRead(cardIndex, id)).length / stepIds.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {stepIds.filter((id) => progress.getStepRead(cardIndex, id)).length}/{stepIds.length} tópicos
                </p>
              </div>
            </nav>
          )}

          {/* Content area */}
          <div ref={contentRef} className="flex-1 min-w-0 space-y-6">
            {card.topics.map((topic) => {
              const isRead = progress.getStepRead(cardIndex, topic.id);
              const isActive = topic.id === activeStepId;
              const isLocked = !isRead && !isActive;

              if (isLocked) return null;

              return (
                <div
                  key={topic.id}
                  ref={(el) => { topicRefs.current[topic.id] = el; }}
                  style={{ scrollMarginTop: 90 }}
                >
                  <Card className="bg-white border border-verde-eucalipto/15 shadow-sm overflow-hidden relative">
                    <CardContent className="p-5 md:p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        {isRead && (
                          <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <h2 className="font-bold text-foreground">
                          {topic.emoji} {topic.title}
                        </h2>
                      </div>

                      {topic.content}

                      {!isRead && isActive && (
                        <div className="pt-2 flex justify-start">
                          <Button variant="secondary" size="sm" onClick={() => handleAdvance(topic.id)}>
                            Entendi, próximo <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}

            {allRead && !completed && (
              <div className="pt-2 flex justify-center">
                <Button variant="primary" size="default" onClick={handleCompleteCard}>
                  Concluir etapa ✓
                </Button>
              </div>
            )}

            {completed && (
              <div className="flex flex-wrap gap-3 justify-center py-4 animate-fade-in">
                {completionActions ?? (
                  <Link to="/app">
                    <Button variant="primary" size="default">Voltar para o início</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}