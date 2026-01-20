import { Section } from "@/components/shared/Section";

/**
 * Seção Lead Emocional
 * Texto centralizado, conexão emocional profunda
 */
const Lead = () => {
  return <Section id="lead" background="cinza">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-6 text-lg md:text-lead text-grafite-suave leading-relaxed animate-fade-in">
          <p>
            Você acorda ansiosa. Passa o dia acelerada. <strong className="text-verde-eucalipto">Dorme ansiosa.</strong>
          </p>
          
          <p className="font-bold text-verde-eucalipto">
            E no meio disso tudo?
          </p>
          
          <p>
            Você não tem nada que seja só seu.
          </p>
          
          <p>
            Tudo que você faz tem destinatário. O trabalho é para o chefe. A casa é para a família. O tempo é para todo mundo menos você.
          </p>
          
          
          
          
          
          
          
          <p>
            E quando você não tem nada só seu — nenhum espaço, nenhum momento, nenhuma identidade fora dos papéis que cumpre —
          </p>
          
          <p className="font-bold text-rosa-argila text-xl">
            Você desaparece.
          </p>
          
          <div className="border-t border-dashed border-verde-eucalipto/30 my-8" />
          
          <p>
            Mas não precisa ser assim.
          </p>
          
          <p className="font-serif text-2xl md:text-3xl italic text-verde-eucalipto pt-4">
            E se você pudesse ter 15 minutos só seus — que te acalmassem de verdade?
          </p>
        </div>
      </div>
    </Section>;
};
export { Lead };