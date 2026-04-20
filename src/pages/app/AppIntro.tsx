import { Link } from "react-router-dom";
import { VideoLessonLayout } from "@/components/app/VideoLessonLayout";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { Button } from "@/components/shared/Button";
import { INTRO_CARDS } from "@/components/app/IntroCard";

const CARD_INDEX = 0;
const STAGE_KEY = "intro-0";

export default function AppIntro() {
  const progress = useIntroProgress();
  const card = INTRO_CARDS[CARD_INDEX];

  const completionActions = (
    <>
      <Link to="/app">
        <Button variant="primary" size="default">Voltar para o início</Button>
      </Link>
      <Link to="/app/materiais">
        <Button variant="secondary" size="default">Próximo: Materiais →</Button>
      </Link>
    </>
  );

  return (
    <VideoLessonLayout
      stageKey={STAGE_KEY}
      shellTitle="Comece por aqui"
      title={card.title}
      emoji={card.emoji}
      unlocked={progress.isCardUnlocked(CARD_INDEX)}
      completed={progress.isCardCompleted(CARD_INDEX)}
      onComplete={() => progress.completeCard(CARD_INDEX)}
      completionActions={completionActions}
    />
  );
}
