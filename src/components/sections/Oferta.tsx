import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

/**
 * Seção Oferta/Stack - Placeholder
 * Será preenchida no PROMPT 02
 */
const Oferta = () => {
  return (
    <Section id="oferta" background="white">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção Oferta
        </h2>
        <p className="text-lead text-muted-foreground mb-8">
          [Conteúdo será adicionado no PROMPT 02 - Stack de valor e preço]
        </p>
        <Button variant="primary" size="lg">
          Quero Minha Vaga
        </Button>
      </div>
    </Section>
  );
};

export { Oferta };
