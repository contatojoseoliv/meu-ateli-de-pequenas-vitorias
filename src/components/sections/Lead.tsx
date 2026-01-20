import { Section } from "@/components/shared/Section";
import heroAmigurumi from "@/assets/hero-amigurumi.png";

/**
 * Seção Lead Emocional
 * Texto com imagem para aumentar impacto emocional (sem CTA)
 */
const Lead = () => {
  return (
    <Section id="lead" background="cinza">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
        <div className="max-w-2xl text-center md:text-left">
          <div className="space-y-4 text-base md:text-lead text-grafite-suave leading-relaxed animate-fade-in">
            <p>
              Você acorda ansiosa. Passa o dia acelerada.{" "}
              <strong className="text-verde-eucalipto">Dorme inquieta.</strong>
            </p>

            <p className="font-bold text-verde-eucalipto">E no meio disso tudo?</p>

            <p>Você não tem nada que seja só seu.</p>

            <p>
              Tudo que você faz tem destinatário. O trabalho é para o chefe. A casa é
              para a família. O tempo é para todo mundo — menos você.
            </p>

            <p>
              E quando você não tem nada só seu — nenhum espaço, nenhum momento, nenhuma
              identidade fora dos papéis que cumpre —
            </p>

            <p className="font-bold text-rosa-argila text-lg md:text-xl">Você desaparece.</p>

            <div className="border-t border-dashed border-verde-eucalipto/30 my-5" />

            <p>Mas não precisa ser assim.</p>

            <p>
              Isso é construído, todos os dias, pelo jeito que você vive...
            </p>
          </div>
        </div>

        <div className="order-last md:order-none">
          <div className="mx-auto w-full max-w-[320px] rounded-2xl border-2 border-border bg-background/60 p-3 shadow-md backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-lg md:max-w-[420px] md:rotate-2 md:p-4">
            <img
              src={heroAmigurumi}
              alt="Amigurumi feito à mão"
              className="h-auto w-full rounded-xl"
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
