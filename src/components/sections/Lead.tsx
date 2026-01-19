import { Section } from "@/components/shared/Section";

/**
 * Seção Lead - Placeholder
 * Será preenchida no PROMPT 02
 */
const Lead = () => {
  return (
    <Section id="lead" background="cinza">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-h2 text-grafite-suave mb-6">
          Seção Lead
        </h2>
        <p className="text-lead text-muted-foreground">
          [Conteúdo será adicionado no PROMPT 02 - Conexão emocional com a avatar]
        </p>
      </div>
    </Section>
  );
};

export { Lead };
