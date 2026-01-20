import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";
import { Clock, Leaf, Users, Calendar, Check } from "lucide-react";

/**
 * Seção Hero - Landing Page Principal
 * Split 50/50 (desktop), Stack vertical (mobile)
 * Altura: 100vh
 */
const Hero = () => {
  const bullets = ["Sua mente nunca para — acorda ansiosa, dorme ansiosa", "Não tem nada que seja só seu — tudo é para os outros", "Vive nas telas mas nunca relaxou de verdade", "Acha que \"não leva jeito\" ou já tentou e travou sozinha", "Quer algo só seu que acalme de verdade — e prove que você consegue"];
  const cards = [{
    icon: Clock,
    label: "15 min/dia"
  }, {
    icon: Leaf,
    label: "Do Zero"
  }, {
    icon: Users,
    label: "Suporte"
  }, {
    icon: Calendar,
    label: "7 dias"
  }];
  return <section id="hero" className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24" style={{
    background: "linear-gradient(135deg, hsl(156 15% 42% / 0.15) 0%, hsl(0 0% 96%) 100%)"
  }}>
      <div className="container-main">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Coluna Texto */}
          <div className="order-2 lg:order-1 animate-fade-in">
            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl text-grafite-suave mb-6 leading-tight px-0 lg:text-3xl text-center">
              Como Desligar Sua Mente Acelerada Em{" "}
              <span className="text-verde-eucalipto">
15 Minutos Por Dia</span>
              {" "}— Criando{" "}
              <span className="text-verde-eucalipto">Amigurumi</span>
              {" "}Com Suas Mãos
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-grafite-suave/80 italic mb-8 md:text-body">Mesmo que você nunca tenha feito nada manual na vida ou já tenha tentado antes e desistido.</p>

            {/* Bullets */}
            

            {/* Linha final */}
            <div className="border-t border-rosa-argila/40 pt-4 mb-8">
              
            </div>

            {/* CTA */}
            <Button variant="primary" size="lg">
              Quero Começar Agora
            </Button>
          </div>

          {/* Coluna Imagem */}
          <div className="order-1 lg:order-2 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="relative w-full aspect-[6/7] max-w-[500px] mx-auto rounded-2xl bg-gradient-to-br from-rosa-argila-10 to-verde-eucalipto-10 flex items-center justify-center" style={{
            boxShadow: "0 20px 60px hsl(156 15% 42% / 0.2)"
          }}>
              {/* Placeholder para imagem */}
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-verde-eucalipto-10 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-verde-eucalipto" />
                </div>
                <p className="text-muted-foreground text-small">
                  Imagem: Mãos femininas segurando amigurumi kawaii em tons pastéis
                </p>
                <p className="text-muted-foreground text-xs mt-2">600x700px</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Inferiores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 md:mt-16 animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
          {cards.map((card, index) => <div key={index} className="bg-white border border-verde-eucalipto/20 rounded-xl p-5 text-center hover-lift">
              <card.icon className="w-8 h-8 mx-auto mb-3 text-verde-eucalipto" strokeWidth={1.5} />
              <span className="font-sans font-semibold text-grafite-suave text-sm md:text-base">
                {card.label}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
};
export { Hero };