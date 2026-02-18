import { Link } from "react-router-dom";
import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { Button } from "@/components/shared/Button";

export default function AppFundamentos() {
  const progress = useIntroProgress();

  const completionActions = (
    <>
      <Link to="/app">
        <Button variant="primary" size="default">Voltar para o início</Button>
      </Link>
      <Link to="/app/dia/1">
        <Button variant="secondary" size="default">Começar Dia 1 →</Button>
      </Link>
    </>
  );

  return (
    <IntroPageLayout
      cardIndex={2}
      card={INTRO_CARD_CONTENTS[2]}
      shellTitle="Fundamentos"
      progress={progress}
      completionActions={completionActions}
    />
  );
}
