import { Section } from "@/components/shared/Section";
import { AmigurumiThreadIllustration } from "@/components/sections/lead/AmigurumiThreadIllustration";
import { ChevronDown } from "lucide-react";

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

              {/* divisor em forma de “fio” */}
              <div className="mx-auto w-full max-w-[420px] md:mx-0">
                <svg
                  viewBox="0 0 520 22"
                  aria-hidden="true"
                  className="h-[22px] w-full text-verde-eucalipto/40"
                >
                  <path
                    d="M10 12 C 60 4, 90 20, 140 12 C 200 2, 230 20, 290 12 C 350 4, 380 20, 440 12 C 470 8, 495 10, 510 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="14" cy="12" r="4" fill="currentColor" opacity="0.45" />
                  <circle cx="510" cy="12" r="4" fill="currentColor" opacity="0.25" />
                </svg>
              </div>
            </header>

            <p>Você acorda ansiosa. Passa o dia acelerada. Dorme inquieta.</p>

            <p className="pt-1 font-medium text-foreground">E no meio disso tudo?</p>

            <p>
              Você não tem nada que seja só seu. Tudo que você faz tem destinatário.
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
          <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-border bg-cinza-nuvem/50 p-5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 md:max-w-[460px] md:rotate-1">
            <AmigurumiThreadIllustration className="text-verde-eucalipto/45" />

            <p className="mt-4 text-center text-xs text-foreground/70">
              Um fio de cada vez — até você voltar a caber em você.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { Lead };
