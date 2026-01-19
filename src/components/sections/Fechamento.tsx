import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";
import { X, Check } from "lucide-react";

/**
 * Seção Fechamento + CTA Final
 * Duas opções lado a lado + P.S. triplo
 */
const Fechamento = () => {
  return (
    <Section 
      id="fechamento" 
      background="white"
      style={{
        background: "linear-gradient(180deg, hsl(156 15% 42% / 0.08) 0%, hsl(0 0% 96%) 100%)"
      }}
    >
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-h2 text-grafite-suave">
          Então, Aqui Está Sua Escolha:
        </h2>
      </div>

      {/* Duas Opções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {/* Opção 1 - Status Quo */}
        <div 
          className="bg-grafite-suave/5 border-2 border-grafite-suave/20 rounded-xl p-8 opacity-70 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-grafite-suave/10 flex items-center justify-center">
              <X className="w-6 h-6 text-grafite-suave/50" />
            </div>
            <span className="font-semibold text-grafite-suave/80 uppercase text-sm tracking-wide">
              Opção 1
            </span>
          </div>
          
          <div className="text-grafite-suave/80 space-y-4">
            <p className="flex items-start gap-2">
              <span className="text-grafite-suave/50">✗</span>
              Você fecha esta página. Volta para a rotina.
            </p>
            <p>
              E quando a ansiedade apertar de novo...
            </p>
            <p>
              Nada vai ter mudado.
            </p>
            <p className="italic">
              "Um dia eu faço isso." Um dia que nunca chega.
            </p>
          </div>
        </div>

        {/* Opção 2 - Ação */}
        <div 
          className="relative rounded-xl p-8 shadow-elevada animate-fade-in border-3 border-ocre-dourado"
          style={{ 
            background: "linear-gradient(135deg, hsl(156 15% 42% / 0.12) 0%, hsl(35 52% 50% / 0.08) 100%)",
            animationDelay: '0.2s'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-ocre-dourado flex items-center justify-center">
              <Check className="w-7 h-7 text-white" />
            </div>
            <span className="font-semibold text-ocre-dourado uppercase text-sm tracking-wide">
              Opção 2
            </span>
          </div>
          
          <div className="text-grafite-suave space-y-4">
            <p className="flex items-start gap-2">
              <span className="text-verde-eucalipto font-bold">✓</span>
              <span>Você dá um passo.</span>
            </p>
            
            <p className="font-semibold">
              Hoje. Agora.
            </p>
            
            <p>
              Você investe R$ 47 — menos que uma sessão de terapia — e nos próximos 7 dias você:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-verde-eucalipto mt-1 flex-shrink-0" />
                <span>Sente sua mente parar pela primeira vez em anos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-verde-eucalipto mt-1 flex-shrink-0" />
                <span>Cria algo com suas próprias mãos (do zero ao fim)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-verde-eucalipto mt-1 flex-shrink-0" />
                <span>Prova para si mesma que você é capaz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-verde-eucalipto mt-1 flex-shrink-0" />
                <span>Tem algo só seu — físico, tangível, real</span>
              </li>
            </ul>
            
            <div className="pt-4 border-t border-verde-eucalipto/20">
              <p className="font-serif text-lg italic text-verde-eucalipto">
                E quando você segurar esse amigurumi no Dia 7...
              </p>
              <p className="mt-2">
                Você vai entender.
              </p>
              <p>
                Não foi sobre o amigurumi. Nunca foi.
              </p>
              <p className="font-semibold">
                Foi sobre provar — para você mesma — que você consegue.
              </p>
              <p>
                Que você termina o que começa.
              </p>
              <p className="font-bold text-verde-eucalipto">
                Que você É capaz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contraste */}
      <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p className="font-serif text-xl md:text-2xl text-grafite-suave font-bold mb-6">
          A diferença entre essas duas opções?
        </p>
        <p className="text-3xl md:text-4xl font-serif text-verde-eucalipto mb-2">
          7 dias.
        </p>
        <p className="text-3xl md:text-4xl font-serif text-ocre-dourado mb-6">
          R$ 47.
        </p>
        <p className="text-lg text-grafite-suave">
          E uma decisão que você toma agora.
        </p>
        
        <div className="border-t border-verde-eucalipto/20 my-8" />
        
        <p className="text-lg text-grafite-suave">
          Quanto tempo você ainda vai esperar?
        </p>
        <p className="font-bold text-rosa-argila text-xl mt-4">
          Mais um mês? Mais um ano? Mais quanto?
        </p>
        <p className="text-grafite-suave/80 mt-4">
          Quanto tempo você ainda vai viver ansiosa, sem calma, sem nada só seu?
        </p>
        <p className="font-bold text-verde-eucalipto text-xl mt-4">
          Não espera mais.
        </p>
      </div>

      {/* CTA Final */}
      <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="inline-block animate-pulse">
          <Button variant="primary" size="lg" className="text-lg md:text-xl px-12 py-6">
            Não Vou Esperar Mais — Começar Agora
          </Button>
        </div>
      </div>

      {/* P.S. Triplo */}
      <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-grafite-suave/80 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p>
          <span className="font-bold text-verde-eucalipto">P.S.</span> Sua mente acelerada não vai parar sozinha. Você precisa fazer algo diferente. Comece hoje.
        </p>
        <p>
          <span className="font-bold text-verde-eucalipto">P.P.S.</span> Lembre-se: você tem 7 dias completos para testar sem risco. Se não funcionar para você, 1 e-mail e devolvemos 100% do dinheiro. O único risco real é não tentar.
        </p>
        <p>
          <span className="font-bold text-verde-eucalipto">P.P.P.S.</span> O bônus "Guia Como Corrigir Os 5 Erros Mais Comuns" (R$ 47) está disponível apenas para as primeiras 100 inscrições. Depois disso, só quem já está dentro recebe.
        </p>
      </div>
    </Section>
  );
};

export { Fechamento };
