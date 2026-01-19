import { Section } from "@/components/shared/Section";

/**
 * Seção FAQ - Placeholder
 * Será preenchida no PROMPT 02
 */
const FAQ = () => {
  return (
    <Section id="faq" background="cinza">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Perguntas Frequentes
        </h2>
        <p className="text-lead text-muted-foreground">
          [Conteúdo será adicionado no PROMPT 02 - Accordion com dúvidas comuns]
        </p>
      </div>
    </Section>
  );
};

export { FAQ };
