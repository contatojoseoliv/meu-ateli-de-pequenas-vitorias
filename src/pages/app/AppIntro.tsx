import { Link } from "react-router-dom";
import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { Button } from "@/components/shared/Button";

export default function AppIntro() {
  const progress = useIntroProgress();

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
    <IntroPageLayout
      cardIndex={0}
      card={INTRO_CARD_CONTENTS[0]}
      shellTitle="Comece por aqui"
      progress={progress}
      completionActions={completionActions}
    />
  );
}
