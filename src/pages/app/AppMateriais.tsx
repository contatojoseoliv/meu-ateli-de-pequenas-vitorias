import IntroPageLayout from "@/components/app/IntroPageLayout";
import { INTRO_CARD_CONTENTS } from "@/content/introCards";

export default function AppMateriais() {
  return (
    <IntroPageLayout
      cardIndex={1}
      card={INTRO_CARD_CONTENTS[1]}
      shellTitle="Materiais"
    />
  );
}
