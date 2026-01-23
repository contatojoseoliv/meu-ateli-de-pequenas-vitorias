import { Section } from "@/components/shared/Section";
import { ChevronDown } from "lucide-react";
import leadVisual from "@/assets/lead-visual.png";

/**
 * Seção Lead Emocional
 * Texto com imagem para aumentar impacto emocional (sem CTA)
 */
const Lead = () => {
  return (
    <Section id="lead" background="white">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* Coluna de texto */}
        <div className="max-w-2xl text-center md:text-left">
          <div className="animate-fade-in space-y-4 text-sm leading-relaxed text-grafite-suave md:space-y-5 md:text-base">
            <header className="space-y-4">
              <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl">
                Talvez Você se Identifique com Isso...
              </h2>

              {/* divisor pontilhado */}
              <div className="mx-auto w-full max-w-[420px] md:mx-0">
                <div
                  aria-hidden="true"
                  className="h-3 w-full text-verde-eucalipto/40 [background-image:radial-gradient(currentColor_1.2px,transparent_1.2px)] [background-size:12px_4px] [background-position:left_center]"
                />
              </div>
            </header>

            <p>
              Você acorda{" "}
              <span className="font-semibold text-verde-eucalipto">ansiosa</span>. Passa o
              dia{" "}
              <span className="font-semibold text-verde-eucalipto">acelerada</span>. Dorme{" "}
              <span className="font-semibold text-verde-eucalipto">inquieta</span>.
            </p>

            <p className="pt-1 font-medium text-foreground">E no meio disso tudo?</p>

            <p>
              <span className="font-semibold text-verde-eucalipto">
                Você não tem nada que seja só seu.
              </span>{" "}
              Tudo que você faz tem destinatário.
            </p>

            <p>
              E quando você não tem nada só seu — nenhum espaço, nenhum momento,
              nenhuma identidade fora dos papéis que cumpre.
            </p>

            <p className="font-bold text-rosa-argila text-base md:text-lg">
              Você desaparece.
            </p>

            <p className="font-semibold text-foreground">Mas não precisa ser assim.</p>

            <p>
              E se você pudesse{" "}
              <span className="font-semibold text-verde-eucalipto">
                ter 15 minutos só seus
              </span>
              {" — que te acalmassem de verdade?"}
            </p>

            <p className="pt-1">
              Antes de te mostrar como, deixa eu te explicar uma coisa importante:
            </p>

            {/* Seta sutil */}
            <div className="pt-1">
              <a
                href="#problema"
                aria-label="Ir para a próxima seção"
                className="inline-flex items-center justify-center rounded-full p-2 text-foreground/70 transition-transform duration-300 hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Coluna visual */}
        <div className="order-last md:order-none">
          <figure className="mx-auto w-full max-w-[360px] rounded-2xl border border-border bg-cinza-nuvem/50 p-4 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:max-w-[460px] md:rotate-1">
            <img
              src={leadVisual}
              alt="Mulher descansando em ambiente aconchegante, evocando calma e autocuidado"
              loading="lazy"
              className="h-auto w-full rounded-xl object-cover"
            />
          </figure>
        </div>
      </div>
    </Section>
  );
};

export { Lead };
