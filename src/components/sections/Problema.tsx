import { Section } from "@/components/shared/Section";

/**
 * Seção Problema (Tríade) - Placeholder
 * Será preenchida no PROMPT 02
 */
const Problema = () => {
  return (
    <Section id="problema" background="white">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção Problema
        </h2>
        <p className="text-lead text-muted-foreground">
          [Conteúdo será adicionado no PROMPT 02 - Tríade da Dor: Exaustão, Ansiedade, Vazio]
        </p>
      </div>
    </Section>
  );
};

export { Problema };
