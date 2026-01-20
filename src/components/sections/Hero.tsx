import { Button } from "@/components/shared/Button";
import { ChevronDown, Clock, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";
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
  return <section id="hero" className="relative min-h-screen pt-10 pb-6 md:pt-20 md:pb-16 bg-cover bg-no-repeat bg-[position:50%_4%] md:bg-center" style={{
    // Overlay mais leve para deixar a imagem mais “viva/nítida”, sem perder legibilidade.
    backgroundImage: `linear-gradient(135deg, hsl(0 0% 100% / 0.56) 0%, hsl(0 0% 96% / 0.44) 55%, hsl(156 15% 42% / 0.12) 100%), url(${heroBg})`
  }}>
      <div className="container-main">
        <div className="min-h-[46vh] md:min-h-[70vh] flex items-center justify-center">
          {/* Conteúdo (texto) */}
          <div className="animate-fade-in text-center w-full max-w-[720px]">
            <div className="relative px-5 py-4 md:px-8 md:py-8 -mt-9 sm:mt-0">
            {/* Nome do produto + selo */}
            <div className="inline-flex items-center gap-3 mb-4 px-3 py-2 rounded-full bg-white/70 border border-verde-eucalipto/15">
              <img src={seloImage} alt="Selo Primeira Vitória em Amigurumi" className="h-7 w-7 md:h-8 md:w-8 object-contain" loading="eager" decoding="async" />
              <span className="font-sans font-semibold text-grafite-suave text-sm md:text-base">Primeira Vitória em Amigurumi</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-bold tracking-tight text-[28px] sm:text-[30px] leading-[1.1] md:text-[40px] lg:text-[44px] text-grafite-suave drop-shadow-sm mb-4">
              <span className="block whitespace-nowrap">Desligue Sua Mente Acelerada</span>
              <span className="block whitespace-nowrap">
                em <span className={highlights.accent}>15 Minutos por Dia</span>
              </span>
              <span className="block whitespace-nowrap">
                Criando <span className={highlights.accent}>Amigurumi</span> com Suas Mãos
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-body text-grafite-suave/90 italic drop-shadow-sm mb-3 max-w-[40ch] mx-auto">
              Mesmo que você nunca tenha feito nada manual na vida ou já tenha tentado antes e desistido.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <motion.div
                initial={{ y: 6, scale: 0.99, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button variant="primary" size="lg">
                  Quero começar agora
                </Button>
              </motion.div>
            </div>

            {/* Ícones abaixo do botão */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
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

      {/* Indicador de rolagem (discreto) */}
      <motion.a
        href="#lead"
        aria-label="Role para ver a próxima seção"
        className="inline-flex absolute bottom-2 md:bottom-5 left-1/2 -translate-x-1/2 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm border border-verde-eucalipto/15 text-verde-eucalipto shadow-suave h-9 w-9 md:h-10 md:w-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.span
          aria-hidden
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>;
};
export { Hero };