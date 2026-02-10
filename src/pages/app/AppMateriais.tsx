import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";

export default function AppMateriais() {
  const progress = useIntroProgress();
  return (
    <IntroPageLayout
      cardIndex={1}
      card={INTRO_CARD_CONTENTS[1]}
      shellTitle="Materiais"
      progress={progress}
    />
  );
}
