import { Button } from "@/components/shared/Button";
import { Clock, Leaf, Users } from "lucide-react";
import seloImage from "@/assets/selo-primeira-vitoria.png";
import heroBg from "@/assets/hero-bg.png";

/**
 * Seção Hero - Landing Page Principal
 * Split 50/50 (desktop), Stack vertical (mobile)
 * Altura: 100vh
 */
const Hero = () => {
  const highlights = {
    accent: "text-verde-eucalipto"
  };
  const infoBadges = [{
    icon: Clock,
    label: "15min/dia"
  }, {
    icon: Leaf,
    label: "Do Zero"
  }, {
    icon: Users,
    label: "Suporte Imediato"
  }] as const;
  return <section id="hero" className="min-h-screen pt-16 pb-12 md:pt-20 md:pb-16" style={{
    backgroundImage: `linear-gradient(135deg, hsl(0 0% 100% / 0.86) 0%, hsl(0 0% 96% / 0.92) 55%, hsl(156 15% 42% / 0.18) 100%), url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
      <div className="container-main">
        <div className="min-h-[70vh] flex items-center justify-center">
          {/* Conteúdo (texto) */}
          <div className="animate-fade-in text-center lg:text-left w-full max-w-[720px]">
            <div className="rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm shadow-suave px-5 py-6 md:px-8 md:py-8">
            {/* Nome do produto + selo */}
            <div className="inline-flex items-center gap-3 mb-4 px-3 py-2 rounded-full bg-white/70 border border-verde-eucalipto/15">
              <img src={seloImage} alt="Selo Primeira Vitória em Amigurumi" className="h-7 w-7 md:h-8 md:w-8 object-contain" loading="eager" decoding="async" />
              <span className="font-sans font-semibold text-grafite-suave text-sm md:text-base">Primeira Vitória em Amigurumi</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-bold tracking-tight text-[32px] leading-[1.12] md:text-[40px] lg:text-[44px] text-grafite-suave drop-shadow-sm mb-5">
              <span className="block">Desligue Sua Mente Acelerada</span>
              <span className="block">
                em <span className={highlights.accent}>15 Minutos por Dia</span>
              </span>
              <span className="block">
                Criando <span className={highlights.accent}>Amigurumi</span> com Suas Mãos
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-body text-grafite-suave/80 italic mb-5 max-w-[40ch] mx-auto lg:mx-0">
              Mesmo que você nunca tenha feito nada manual na vida ou já tenha tentado antes e desistido.
            </p>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <Button variant="primary" size="lg">
                Quero começar agora
              </Button>
            </div>

            {/* Ícones abaixo do botão */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {infoBadges.map(item => <div key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-verde-eucalipto/15 px-3 py-2">
                  <item.icon className="h-4 w-4 text-verde-eucalipto" aria-hidden="true" strokeWidth={1.8} />
                  <span className="font-sans font-semibold text-grafite-suave text-xs md:text-sm">
                    {item.label}
                  </span>
                </div>)}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export { Hero };