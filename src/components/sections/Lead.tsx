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

            <p className="font-bold text-verde-eucalipto">
              E se você pudesse ter 15 minutos só seus — que te acalmassem de verdade?
            </p>

            <p>
              E quando você não tem nada só seu — nenhum espaço, nenhum momento, nenhuma
              identidade fora dos papéis que cumpre —
            </p>

            <p className="font-bold text-rosa-argila text-lg md:text-xl">Você desaparece.</p>

            <div className="border-t border-dashed border-verde-eucalipto/30 my-5" />

            <p>Mas não precisa ser assim.</p>

            <p>
              Você não está “errada”. Você está sobrecarregada — e isso tem um porquê.
            </p>

            <p>
              Daqui a pouco, eu vou te mostrar os 3 motivos que fazem essa sensação se
              repetir… mesmo quando você tenta dar conta de tudo.
            </p>
          </div>
        </div>

        <div className="order-last md:order-none">
          <div className="mx-auto w-full max-w-[320px] rounded-2xl border border-border bg-background/40 p-4 shadow-sm md:max-w-[420px]">
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
