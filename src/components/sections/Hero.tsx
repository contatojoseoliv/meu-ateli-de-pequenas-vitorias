import { Button } from "@/components/shared/Button";
import { Clock, Leaf, Users, Calendar, Check } from "lucide-react";

/**
 * Seção Hero - Landing Page Principal
 * Otimizada para CTA visível na primeira dobra
 * Mobile: Texto primeiro | Desktop: Split 50/50
 */
const Hero = () => {
  // Bullets reduzidos para 3 (mais impactantes)
  const bullets = [
    "Sua mente nunca para — acorda ansiosa, dorme ansiosa",
    "Não tem nada que seja só seu — tudo é para os outros",
    "Quer algo que acalme de verdade e prove que você consegue",
  ];

  const badges = [
    { icon: Clock, label: "15 min/dia" },
    { icon: Leaf, label: "Do Zero" },
    { icon: Users, label: "Suporte" },
    { icon: Calendar, label: "7 dias" },
  ];

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-20 pb-12 md:pt-28 md:pb-16"
      style={{
        background: "linear-gradient(135deg, hsl(156 15% 42% / 0.15) 0%, hsl(0 0% 96%) 100%)"
      }}
    >
      <div className="container-main">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coluna Texto - Primeiro no mobile */}
          <div className="order-1 lg:order-1 animate-fade-in">
            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-h1 text-grafite-suave mb-4 leading-tight">
              Como Desligar Sua Mente Acelerada Em{" "}
              <span className="text-verde-eucalipto">15 Minutos Por Dia</span>
              {" "}— Criando{" "}
              <span className="text-verde-eucalipto">Amigurumi</span>
              {" "}Com Suas Mãos
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-grafite-suave/80 italic mb-5">
              Mesmo que você nunca tenha feito nada manual na vida — ou já tenha tentado antes e desistido.
            </p>

            {/* Bullets - 3 itens compactos */}
            <ul className="space-y-2.5 mb-5">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm md:text-base text-grafite-suave">
                  <Check className="w-4 h-4 text-verde-eucalipto mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Linha final */}
            <div className="border-t border-rosa-argila/40 pt-3 mb-5">
              <p className="text-xs md:text-sm font-bold text-rosa-argila">
                Se você se identificou, continue lendo. Isto foi feito para você.
              </p>
            </div>

            {/* CTA */}
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Quero Começar Agora
            </Button>

            {/* Badges compactos - Abaixo do CTA */}
            <div className="flex flex-wrap gap-2 mt-4" style={{ animationDelay: '0.3s' }}>
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-white/80 border border-verde-eucalipto/20 rounded-full px-3 py-1.5"
                >
                  <badge.icon className="w-3.5 h-3.5 text-verde-eucalipto" strokeWidth={2} />
                  <span className="font-sans font-medium text-grafite-suave text-xs">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Imagem - Segundo no mobile */}
          <div className="order-2 lg:order-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div 
              className="relative w-full aspect-[6/7] max-w-[420px] mx-auto rounded-2xl bg-gradient-to-br from-rosa-argila-10 to-verde-eucalipto-10 flex items-center justify-center"
              style={{
                boxShadow: "0 20px 60px hsl(156 15% 42% / 0.2)"
              }}
            >
              {/* Placeholder para imagem */}
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-verde-eucalipto-10 flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-verde-eucalipto" />
                </div>
                <p className="text-muted-foreground text-xs">
                  Imagem: Mãos femininas segurando amigurumi kawaii
                </p>
                <p className="text-muted-foreground text-xs mt-1">600x700px</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
