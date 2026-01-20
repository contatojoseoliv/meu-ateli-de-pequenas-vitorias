import { Section } from "@/components/shared/Section";

/**
 * Seção Lead Emocional
 * Texto centralizado, conexão emocional profunda
 */
const Lead = () => {
  return <Section id="lead" background="cinza">
      <div className="max-w-2xl mx-auto text-center">
        <div className="space-y-4 text-base md:text-lead text-grafite-suave leading-relaxed animate-fade-in">
          <p>
            Você acorda ansiosa. Passa o dia acelerada. {" "}
            <strong className="text-verde-eucalipto">Dorme inquieta.</strong>
          </p>

          <p className="font-bold text-verde-eucalipto">E no meio disso tudo?</p>

          <p>Você não tem nada que seja só seu.</p>

          

          <p>
            E quando você não tem nada só seu — nenhum espaço, nenhum momento, nenhuma
            identidade fora dos papéis que cumpre —
          </p>

          <p className="font-bold text-rosa-argila text-lg md:text-xl">Você desaparece.</p>

          <div className="border-t border-dashed border-verde-eucalipto/30 my-5" />

          <p>Mas não precisa ser assim.</p>

          
        </div>
      </div>
    </Section>;
};
export { Lead };