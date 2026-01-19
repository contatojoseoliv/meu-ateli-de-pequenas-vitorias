import { Section } from "@/components/shared/Section";
import { Shield } from "lucide-react";

/**
 * Seção Garantia - Garantia Incondicional de 7 Dias
 */
const Garantia = () => {
  return (
    <Section id="garantia" background="cinza">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start animate-fade-in">
          {/* Selo de Garantia */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-verde-eucalipto flex flex-col items-center justify-center text-white shadow-lg">
              <Shield className="w-12 h-12 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-center leading-tight">
                7 DIAS<br />100%<br />GARANTIDO
              </span>
            </div>
          </div>

          {/* Blockquote */}
          <div className="flex-1 bg-white border-l-4 border-verde-eucalipto rounded-r-xl p-8 md:p-10 shadow-suave">
            <h3 className="font-serif text-2xl md:text-3xl text-grafite-suave mb-6">
              Garantia Incondicional de 7 Dias
            </h3>
            
            <div className="text-body text-grafite-suave/90 space-y-4 leading-relaxed">
              <p>
                Faça o método completo. Crie seu primeiro amigurumi. Sinta a diferença.
              </p>
              
              <p className="font-semibold text-grafite-suave">
                Se, ao final dos 7 dias, você não sentir que valeu a pena — por QUALQUER motivo —
              </p>
              
              <p>
                Basta enviar 1 e-mail.
              </p>
              
              <p className="font-semibold text-verde-eucalipto">
                Sem formulários. Sem perguntas. Sem justificativas.
              </p>
              
              <p>
                Você recebe <strong className="text-verde-eucalipto">100% do seu dinheiro de volta em até 48 horas</strong>.
              </p>
              
              <p>
                Simples assim.
              </p>

              <div className="border-t border-verde-eucalipto/20 my-6" />

              <p>
                Eu confio que quando você:
              </p>
              
              <ul className="list-disc list-inside space-y-1 ml-4 text-grafite-suave/80">
                <li>Sentir sua mente finalmente parar</li>
                <li>Segurar algo que VOCÊ criou</li>
                <li>Provar para si mesma que é capaz</li>
              </ul>
              
              <p>
                ...você vai saber que valeu cada centavo.
              </p>
              
              <p className="font-semibold text-rosa-argila">
                Mas se não valer?
              </p>
              
              <p>
                Você não perde nada. Zero risco.
              </p>

              <div className="border-t border-verde-eucalipto/20 my-6" />

              <p className="font-bold text-grafite-suave">
                O único risco real é não tentar.
              </p>
              
              <p>
                É continuar vivendo ansiosa, sem nada só seu, sem nunca provar que você consegue.
              </p>
              
              <p className="font-bold text-verde-eucalipto text-lg">
                Esse é o verdadeiro risco.
              </p>
            </div>
          </div>
        </div>

        {/* Reframe Final */}
        <div className="bg-rosa-argila-10 rounded-xl p-6 text-center mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="font-serif text-lg md:text-xl text-grafite-suave italic">
            O risco está em <span className="text-rosa-argila">não</span> dar esse passo. 
            Não em dar.
          </p>
        </div>
      </div>
    </Section>
  );
};

export { Garantia };
