import { Section } from "@/components/shared/Section";

/**
 * Seção Bullets/Benefícios - Placeholder
 * Será preenchida no PROMPT 02
 */
const Bullets = () => {
  return (
    <Section id="bullets" background="cinza">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção Benefícios
        </h2>
        <p className="text-lead text-muted-foreground">
          [Conteúdo será adicionado no PROMPT 02 - Lista de benefícios e o que você vai aprender]
        </p>
      </div>
    </Section>
  );
};

export { Bullets };
