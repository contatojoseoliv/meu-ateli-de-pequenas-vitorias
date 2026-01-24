import { Section } from "@/components/shared/Section";
import seloGarantia from "@/assets/selo-garantia-7-dias.png";

/**
 * Seção Garantia - Garantia Incondicional de 7 Dias
 */
const Garantia = () => {
  return <Section id="garantia" background="cinza" containerClassName="py-4 md:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="bg-white border-l-4 border-verde-eucalipto rounded-xl shadow-suave p-5 md:p-6">
            {/* Cabeçalho com selo integrado */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  src={seloGarantia}
                  alt="Selo de garantia de 7 dias"
                  loading="lazy"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-serif text-lg md:text-xl text-grafite-suave">
                  Garantia Incondicional de 7 Dias
                </h3>
                <p className="text-body text-grafite-suave/80 mt-1 leading-relaxed">
                  Faça o método completo. Crie seu primeiro amigurumi. Sinta a diferença.
                </p>
              </div>
            </div>

            <div className="border-t border-verde-eucalipto/20 my-4" />

            <div className="text-body text-grafite-suave/90 space-y-2 leading-relaxed">
              <p className="text-grafite-suave">
                Se, ao final dos 7 dias, <span className="text-verde-eucalipto font-semibold">você não sentir que valeu a pena</span> — por QUALQUER motivo —
              </p>

              <p>
                Basta enviar 1 e-mail e você recebe <span className="text-verde-eucalipto font-semibold">100% do seu dinheiro</span> de volta em até 48 horas.
              </p>

              

              <ul className="list-disc list-inside space-y-1 text-grafite-suave/80">
                
                
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>;
};
export { Garantia };