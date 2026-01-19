import { Button } from "@/components/shared/Button";
import { Clock, Leaf, Users, Calendar, Check } from "lucide-react";

/**
 * Seção Hero - Landing Page Principal
 * Layout centralizado com imagem abaixo
 * Otimizado para CTA visível na primeira dobra
 */
const Hero = () => {
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
      className="pt-24 pb-10 md:pt-28 md:pb-12"
      style={{
        background: "linear-gradient(135deg, hsl(156 15% 42% / 0.15) 0%, hsl(0 0% 96%) 100%)"
      }}
    >
      <div className="container-main">
        {/* Conteúdo Centralizado */}
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {/* Headline */}
          <h1 className="font-serif text-2xl md:text-3xl text-grafite-suave mb-3 leading-tight">
            Como Desligar Sua Mente Acelerada Em{" "}
            <span className="text-verde-eucalipto">15 Minutos Por Dia</span>
            {" "}— Criando{" "}
            <span className="text-verde-eucalipto">Amigurumi</span>
            {" "}Com Suas Mãos
          </h1>

          {/* Sub-headline */}
          <p className="text-sm md:text-base text-grafite-suave/80 italic mb-4">
            Mesmo que você nunca tenha feito nada manual na vida — ou já tenha tentado antes e desistido.
          </p>

          {/* Bullets - Centralizados */}
          <ul className="space-y-2 mb-4 inline-block text-left">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-grafite-suave">
                <Check className="w-4 h-4 text-verde-eucalipto mt-0.5 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Linha final */}
          <div className="border-t border-rosa-argila/40 pt-3 mb-4 max-w-md mx-auto">
            <p className="text-xs font-bold text-rosa-argila">
              Se você se identificou, continue lendo. Isto foi feito para você.
            </p>
          </div>

          {/* CTA */}
          <Button variant="primary" size="lg">
            Quero Começar Agora
          </Button>

          {/* Badges compactos */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
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

          {/* Imagem Compacta Abaixo */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div 
              className="relative w-full max-w-[280px] aspect-square mx-auto rounded-2xl bg-gradient-to-br from-rosa-argila-10 to-verde-eucalipto-10 flex items-center justify-center"
              style={{
                boxShadow: "0 16px 48px hsl(156 15% 42% / 0.18)"
              }}
            >
              {/* Placeholder para imagem */}
              <div className="text-center p-4">
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-verde-eucalipto-10 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-verde-eucalipto" />
                </div>
                <p className="text-muted-foreground text-xs">
                  Mãos segurando amigurumi
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">280x280px</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
