import { Section } from "@/components/shared/Section";
import { Check, Quote } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import provaCienciaImg from "@/assets/prova-ciencia.png";
import { Button } from "@/components/shared/Button";

/**
 * Seção Prova - Científica + Social
 * Dados, estudos e validação brasileira
 */
const Prova = () => {
  const estatisticas = [{
    valor: "89,5%",
    label: "se sentiram mais calmas"
  }, {
    valor: "82%",
    label: "se sentiram mais felizes"
  }, {
    valor: "74,7%",
    label: "se sentiram mais úteis"
  }];
  const checkpoints = [{
    texto: "Neurologicamente, criar com as mãos **força presença** (reduz ansiedade)"
  }, {
    texto: "Biologicamente, **libera dopamina** (gera alívio)"
  }, {
    texto: "Cientificamente, **89,5% das pessoas sentem calma**"
  }, {
    texto: "No Brasil, **funciona com mulheres como você**"
  }];
  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-verde-eucalipto">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };
  return <Section id="prova" background="white">
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-h2 text-grafite-suave">
          Isto não é teoria. <span className="text-verde-eucalipto">São fatos.</span>
        </h2>
      </div>

      {/* Primeira Prova - Lógica */}
      

      {/* Primeira Prova - Científica */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-suave max-w-4xl mx-auto mb-12 animate-fade-in" style={{
      animationDelay: '0.1s'
    }}>
        <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">Evidências Científicas sobre:</h3>
        <div className="text-body text-grafite-suave/90 space-y-4 mb-8">
              <p>Em 2021, um estudo publicada na revista Perspectives in Public Health analisou especificamente os <strong className="text-verde-eucalipto">efeitos do crochê no bem-estar psicológico</strong>, com uma amostra de 8.391 praticantes em 87 países.</p>
              
              <p className="font-bold text-grafite-suave text-lg">
                O resultado?
              </p>
        </div>

        {/* Gráfico de barras */}
        <div className="space-y-4 mb-8">
              {estatisticas.map((stat, index) => <div key={index} className="flex items-center gap-4">
                  <span className="font-bold text-verde-eucalipto w-16 text-right">{stat.valor}</span>
                  <div className="flex-1 h-8 bg-cinza-nuvem rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{
              width: stat.valor,
              background: `linear-gradient(90deg, hsl(156 15% 42%) 0%, hsl(35 52% 50%) 100%)`
            }} />
                  </div>
                  <span className="text-sm text-grafite-suave/80 w-40">{stat.label}</span>
                </div>)}
        </div>

        <div className="text-body text-grafite-suave/90 space-y-4">
          <p>
            E quando perguntaram <strong>POR QUÊ</strong> faziam crochê, as três respostas mais comuns foram:
          </p>
          <p className="text-verde-eucalipto">
            Para relaxar (78,5%). Para ter senso de realização (75,2%). Para ser criativa (82,1%).
          </p>
          <p className="font-bold text-rosa-argila">
            As mesmas coisas que VOCÊ quer.
          </p>
          <p className="mt-6 text-muted-foreground">O estudo concluiu que o crochê oferece benefícios positivos reais para o bem-estar pessoal. </p>
          <p className="text-sm text-muted-foreground">
            Publicado em <em>Perspectives in Public Health</em> — uma das principais revistas de saúde pública do mundo.
          </p>
        </div>
      </div>

      {/* Segunda Prova - Validação Brasileira */}
      

      {/* Resumo Final */}
      <div className="text-center mt-12 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Button
          size="lg"
          onClick={() => {
            document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Quero começar agora
        </Button>
      </div>
    </Section>;
};
export { Prova };