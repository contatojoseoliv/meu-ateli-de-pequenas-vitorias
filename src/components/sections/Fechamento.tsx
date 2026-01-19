import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

/**
 * Seção Fechamento - Placeholder
 * Será preenchida no PROMPT 02
 */
const Fechamento = () => {
  return (
    <Section id="fechamento" background="white">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção de Fechamento
        </h2>
        <p className="text-lead text-muted-foreground mb-8">
          [Conteúdo será adicionado no PROMPT 02 - Última chamada para ação]
        </p>
        <Button variant="primary" size="lg">
          Quero Começar Minha Jornada
        </Button>
      </div>
    </Section>
  );
};

export { Fechamento };
