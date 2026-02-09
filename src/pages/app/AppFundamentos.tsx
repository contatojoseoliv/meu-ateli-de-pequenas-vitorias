import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";

export default function AppFundamentos() {
  return (
    <IntroPageLayout
      cardIndex={2}
      card={INTRO_CARD_CONTENTS[2]}
      shellTitle="Fundamentos"
    />
  );
}
