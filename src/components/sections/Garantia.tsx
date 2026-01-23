import { Section } from "@/components/shared/Section";
import { Shield } from "lucide-react";

/**
 * Seção Garantia - Garantia Incondicional de 7 Dias
 */
const Garantia = () => {
  return (
    <Section id="garantia" background="cinza" containerClassName="py-4 md:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start animate-fade-in">
          {/* Selo de Garantia */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-verde-eucalipto flex flex-col items-center justify-center text-white shadow-lg">
              <Shield className="w-9 h-9 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-center leading-tight">
                7 DIAS<br />100%<br />GARANTIDO
              </span>
            </div>
          </div>

          {/* Blockquote */}
          <div className="flex-1 bg-white border-l-4 border-verde-eucalipto rounded-r-xl p-6 md:p-8 shadow-suave">
            <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-4">
              Garantia Incondicional de 7 Dias
            </h3>
            
            <div className="text-body text-grafite-suave/90 space-y-3 leading-relaxed">
              <p>
                Faça o método completo. Crie seu primeiro amigurumi. Sinta a diferença.
              </p>

              <p className="font-semibold text-grafite-suave">
                Se, ao final dos 7 dias, você não sentir que valeu a pena — por QUALQUER motivo —
              </p>

              <p>
                Basta enviar 1 e-mail e você recebe <strong className="text-verde-eucalipto">100% do seu dinheiro de volta em até 48 horas</strong>.
              </p>

              <p className="font-semibold text-verde-eucalipto">
                Sem formulários. Sem perguntas. Sem justificativas.
              </p>

              <div className="border-t border-verde-eucalipto/20 my-4" />

              <p className="text-grafite-suave/80">
                Eu confio que quando você:
              </p>

              <ul className="list-disc list-inside space-y-1 ml-4 text-grafite-suave/80">
                <li>Sentir sua mente finalmente parar</li>
                <li>Segurar algo que VOCÊ criou</li>
                <li>Provar para si mesma que é capaz</li>
              </ul>

              <p className="font-semibold text-rosa-argila">
                Se não valer? Você não perde nada. Zero risco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { Garantia };
