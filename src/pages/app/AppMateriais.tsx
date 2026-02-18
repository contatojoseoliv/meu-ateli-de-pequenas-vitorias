import { Link } from "react-router-dom";
import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";
import { Button } from "@/components/shared/Button";

export default function AppMateriais() {
  const progress = useIntroProgress();

  const completionActions = (
    <>
      <Link to="/app">
        <Button variant="primary" size="default">Voltar para o início</Button>
      </Link>
      <Link to="/app/fundamentos">
        <Button variant="secondary" size="default">Próximo: Fundamentos →</Button>
      </Link>
    </>
  );

  return (
    <IntroPageLayout
      cardIndex={1}
      card={INTRO_CARD_CONTENTS[1]}
      shellTitle="Materiais"
      progress={progress}
      completionActions={completionActions}
    />
  );
}
