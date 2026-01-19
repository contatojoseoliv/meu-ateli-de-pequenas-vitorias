import { Section } from "@/components/shared/Section";

/**
 * Seção Prova Social - Placeholder
 * Será preenchida no PROMPT 02
 */
const Prova = () => {
  return (
    <Section id="prova" background="white">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção Prova Social
        </h2>
        <p className="text-lead text-muted-foreground">
          [Conteúdo será adicionado no PROMPT 02 - Depoimentos e resultados de alunas]
        </p>
      </div>
    </Section>
  );
};

export { Prova };
