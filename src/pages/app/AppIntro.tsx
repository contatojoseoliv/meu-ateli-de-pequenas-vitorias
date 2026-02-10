import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";

export default function AppIntro() {
  const progress = useIntroProgress();
  return (
    <IntroPageLayout
      cardIndex={0}
      card={INTRO_CARD_CONTENTS[0]}
      shellTitle="Comece por aqui"
      progress={progress}
    />
  );
}
