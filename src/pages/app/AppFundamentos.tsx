import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";
import { useIntroProgress } from "@/hooks/useIntroProgress";

export default function AppFundamentos() {
  const progress = useIntroProgress();
  return (
    <IntroPageLayout
      cardIndex={2}
      card={INTRO_CARD_CONTENTS[2]}
      shellTitle="Fundamentos"
      progress={progress}
    />
  );
}
