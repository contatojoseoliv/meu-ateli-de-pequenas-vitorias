import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

/**
 * Seção Hero - Placeholder
 * Será preenchida no PROMPT 02
 */
const Hero = () => {
  return (
    <Section id="hero" background="white" className="pt-32 md:pt-40">
      <div className="text-center max-w-3xl mx-auto">
        <p className="font-handwritten text-2xl text-rosa-argila mb-4 animate-fade-in">
          Descubra o segredo das mãos ocupadas
        </p>
        <h1 className="font-serif text-h1 text-grafite-suave mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Primeira Vitória em Amigurumi©
        </h1>
        <p className="text-lead text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          [Conteúdo completo será adicionado no PROMPT 02]
        </p>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="primary" size="lg">
            Quero Começar Agora
          </Button>
        </div>
      </div>
    </Section>
  );
};

export { Hero };
