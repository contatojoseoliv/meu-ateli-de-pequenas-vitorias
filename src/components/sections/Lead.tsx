import { Section } from "@/components/shared/Section";
import leadImage from "@/assets/lead-eu-vejo-voce.png";
import { ChevronDown } from "lucide-react";

/**
 * Seção Lead Emocional
 * Texto com imagem para aumentar impacto emocional (sem CTA)
 */
const Lead = () => {
  return (
    <Section id="lead" background="cinza">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="max-w-2xl text-center md:text-left">
          <div className="animate-fade-in space-y-5 text-base leading-relaxed text-grafite-suave md:text-lead">
            <header className="space-y-3">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
                Eu Vejo Você
              </h2>
              <div className="h-1 w-14 rounded-full bg-primary/20 mx-auto md:mx-0" />
            </header>

            <p>
              Você acorda{" "}
              <em className="text-verde-eucalipto font-semibold not-italic">ansiosa</em>. Passa o dia{" "}
              <em className="text-verde-eucalipto font-semibold not-italic">acelerada</em>.{" "}
              <em className="text-verde-eucalipto font-semibold not-italic">Dorme inquieta</em>.
            </p>

            <p className="font-semibold text-verde-eucalipto">E no meio disso tudo?</p>

            <p className="font-semibold text-foreground">
              <span className="inline-block rounded-lg bg-background/70 px-3 py-2 shadow-sm">
                Você não tem nada que seja só seu.
              </span>
            </p>

            <p>
              Tudo que você faz tem destinatário. O trabalho é para o chefe. A casa é para a família. O tempo é para todo mundo — menos você.
            </p>

            <p>
              E quando você não tem nada só seu — nenhum espaço, nenhum momento, nenhuma identidade fora dos papéis que cumpre —
            </p>

            <p className="font-bold text-rosa-argila text-lg md:text-xl">
              Você desaparece. Mas não precisa ser assim.
            </p>

            <div className="my-5 border-t border-dashed border-verde-eucalipto/30" />

            <p className="font-semibold text-foreground">
              <span className="inline-block rounded-lg bg-background/70 px-3 py-2 shadow-sm">
                Isso é construído, todos os dias, pelo jeito que você vive...
              </span>
            </p>

            <div className="pt-2">
              <a
                href="#problema"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background/60 px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Continue lendo"
              >
                Continue lendo
                <ChevronDown className="h-4 w-4 animate-pulse" />
              </a>
            </div>
          </div>
        </div>

        <div className="order-last md:order-none">
          <div className="mx-auto w-full max-w-[320px] rounded-2xl border-2 border-border bg-background/60 p-3 shadow-md backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-lg md:max-w-[420px] md:rotate-2 md:p-4">
            <img
              src={leadImage}
              alt="Mulher em momento de calma e respiração consciente"
              className="h-auto w-full rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export { Lead };
