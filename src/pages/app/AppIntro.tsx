import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";

export default function AppIntro() {
  return (
    <IntroPageLayout
      cardIndex={0}
      card={INTRO_CARD_CONTENTS[0]}
      shellTitle="Comece por aqui"
    />
  );
}
