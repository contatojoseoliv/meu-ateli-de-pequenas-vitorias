import { Section } from "@/components/shared/Section";
import { Shield } from "lucide-react";

/**
 * Seção Garantia - Placeholder
 * Será preenchida no PROMPT 02
 */
const Garantia = () => {
  return (
    <Section id="garantia" background="verde">
      <div className="text-center max-w-2xl mx-auto">
        <Shield className="w-16 h-16 mx-auto mb-6 text-rosa-argila" />
        <h2 className="font-serif text-h2 mb-6">
          Garantia Incondicional
        </h2>
        <p className="text-lead text-white/80">
          [Conteúdo será adicionado no PROMPT 02 - Garantia de 7 dias sem riscos]
        </p>
      </div>
    </Section>
  );
};

export { Garantia };
