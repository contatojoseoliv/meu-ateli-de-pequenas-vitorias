import { Link } from "react-router-dom";
import { VideoLessonLayout } from "@/components/app/VideoLessonLayout";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { Button } from "@/components/shared/Button";
import { INTRO_CARDS } from "@/components/app/IntroCard";

const CARD_INDEX = 1;
const STAGE_KEY = "intro-1";

export default function AppMateriais() {
  const progress = useIntroProgress();
  const card = INTRO_CARDS[CARD_INDEX];

  const completionActions = (
    <>
      <Link to="/app">
        <Button variant="primary" size="sm">Voltar para o início</Button>
      </Link>
      <Link to="/app/fundamentos">
        <Button variant="secondary" size="sm">Próximo: Fundamentos →</Button>
      </Link>
    </>
  );

  return (
    <VideoLessonLayout
      stageKey={STAGE_KEY}
      shellTitle="Materiais"
      title={card.title}
      emoji={card.emoji}
      unlocked={progress.isCardUnlocked(CARD_INDEX)}
      completed={progress.isCardCompleted(CARD_INDEX)}
      onComplete={() => progress.completeCard(CARD_INDEX)}
      completionActions={completionActions}
    />
  );
}
