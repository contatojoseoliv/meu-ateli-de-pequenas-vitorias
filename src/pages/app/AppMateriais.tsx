import { useRef, useCallback, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/shared/Button";
import { AppShell } from "@/components/app/AppShell";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { INTRO_CARD_CONTENTS, type Topic } from "@/content/introCards";

const CARD_INDEX = 1;
const card = INTRO_CARD_CONTENTS[CARD_INDEX];

export default function AppMateriais() {
  const intro = useIntroProgress();
  const topicRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToTopic = useCallback((id: string) => {
    setTimeout(() => {
      topicRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, []);

  const unlocked = intro.isCardUnlocked(CARD_INDEX);
  const stepIds = card.topics.map((t) => t.id);
  const completed = intro.isCardCompleted(CARD_INDEX);
  const activeStepId = intro.getActiveStep(CARD_INDEX, stepIds);
  const allRead = intro.allStepsRead(CARD_INDEX, stepIds);

  const handleAdvance = useCallback(
    (currentStepId: string) => {
      intro.markStepRead(CARD_INDEX, currentStepId);
      const idx = stepIds.indexOf(currentStepId);
      if (idx < stepIds.length - 1) {
        scrollToTopic(stepIds[idx + 1]);
      }
    },
    [intro, stepIds, scrollToTopic],
  );

  const handleCompleteCard = useCallback(() => {
    intro.completeCard(CARD_INDEX);
  }, [intro]);

  if (!unlocked) {
    return (
      <AppShell title="Materiais">
        <main className="container-main py-8 space-y-6">
          <Card className="app-daycard app-daycard--locked">
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

  return (
    <AppShell title="Materiais">
      <main className="container-main py-8 space-y-6">
        <Card className={`app-daycard ${completed ? "app-daycard--done" : card.tintClass} app-daycard--seal`}>
          <div className="p-5 md:p-6 flex items-center gap-3">
            {completed ? (
              <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-primary" />
              </div>
            ) : (
              <ChevronDown className="h-5 w-5 text-foreground flex-shrink-0" />
            )}
            <p className="font-bold text-foreground truncate">
              {card.emoji} {card.title}
            </p>
          </div>

          <CardContent className="px-5 pb-6 md:px-6 space-y-2 pt-0">
            {card.topics.map((topic) => {
              const isRead = intro.getStepRead(CARD_INDEX, topic.id);
              const isActive = topic.id === activeStepId;
              const isFuture = !isRead && !isActive;

              return (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  isRead={isRead}
                  isActive={isActive}
                  isFuture={isFuture}
                  onAdvance={() => handleAdvance(topic.id)}
                  ref={(el) => { topicRefs.current[topic.id] = el; }}
                />
              );
            })}

            {allRead && !completed && (
              <div className="pt-4 flex justify-center">
                <Button variant="primary" size="default" onClick={handleCompleteCard}>
                  Concluir etapa ✓
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {completed && (
          <div className="flex flex-wrap gap-3 justify-center py-4 animate-fade-in">
            <Link to="/app">
              <Button variant="primary" size="default">Voltar para o início</Button>
            </Link>
          </div>
        )}
      </main>
    </AppShell>
  );
}

/* ── Topic row ── */

type TopicRowProps = {
  topic: Topic;
  isRead: boolean;
  isActive: boolean;
  isFuture: boolean;
  onAdvance: () => void;
};

const TopicRow = forwardRef<HTMLDivElement, TopicRowProps>(
  ({ topic, isRead, isActive, isFuture, onAdvance }, ref) => {
    return (
      <div ref={ref} style={{ scrollMarginTop: 90 }}>
        <Collapsible open={isActive} defaultOpen={false}>
          <CollapsibleTrigger asChild disabled={isFuture}>
            <button
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isFuture
                  ? "text-muted-foreground/50 cursor-default"
                  : isRead
                  ? "hover:bg-muted/40 cursor-pointer"
                  : "bg-primary/5 cursor-default"
              }`}
            >
              {isRead ? (
                <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              ) : isActive ? (
                <ChevronDown className="h-4 w-4 text-foreground flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-border flex-shrink-0" />
              )}
              <span className={`text-sm font-medium ${isFuture ? "text-muted-foreground/50" : "text-foreground"}`}>
                {topic.emoji} {topic.title}
              </span>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pl-11 pr-3 pb-3 pt-1">
              {topic.content}
              {!isRead && (
                <div className="pt-4 flex justify-start">
                  <Button variant="secondary" size="sm" onClick={onAdvance}>
                    Entendi, próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
);
TopicRow.displayName = "TopicRow";
