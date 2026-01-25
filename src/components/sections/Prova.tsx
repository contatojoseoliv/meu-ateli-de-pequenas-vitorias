import { Section } from "@/components/shared/Section";
import { Check, Quote } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import provaCienciaImg from "@/assets/prova-ciencia.png";

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
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] items-start">
          <div>
            <div className="text-body text-grafite-suave/90 space-y-4 mb-8">
              <p>
                Em 2021, pesquisadores estudaram  em 87 países.
              </p>
              <p className="text-muted-foreground italic">
                (Sim, crochê específico. Não artesanato genérico.)
              </p>
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
          </div>

          {/* Imagem ao lado do texto */}
          <div className="w-full max-w-sm md:max-w-none mx-auto">
            
          </div>
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
          <p className="mt-6 italic text-muted-foreground">
            O estudo concluiu: "Crochê oferece benefícios positivos reais para bem-estar pessoal."
          </p>
          <p className="text-sm text-muted-foreground">
            Publicado em <em>Perspectives in Public Health</em> — uma das principais revistas de saúde pública do mundo.
          </p>
        </div>
      </div>

      {/* Segunda Prova - Validação Brasileira */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-suave max-w-4xl mx-auto mb-12 animate-fade-in" style={{
      animationDelay: '0.2s'
    }}>
        <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">
          Segundo, a validação brasileira:
        </h3>
        <div className="text-body text-grafite-suave/90 space-y-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Aqui no Brasil, unidades de saúde da Estratégia Saúde da Família (ESF) implementaram grupos de crochê para mulheres em sofrimento emocional.
          </p>
          <p className="font-bold text-grafite-suave text-lg">
            O que aconteceu?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-verde-eucalipto/20 bg-verde-eucalipto-10 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-suave">
                  <Check className="h-4 w-4 text-verde-eucalipto" />
                </span>
                <p className="font-semibold text-grafite-suave">Autoestima</p>
              </div>
              <p className="mt-2 text-sm text-grafite-suave/80">Melhora significativa</p>
            </div>
            <div className="rounded-xl border border-rosa-argila/20 bg-rosa-argila-10 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-suave">
                  <Check className="h-4 w-4 text-rosa-argila" />
                </span>
                <p className="font-semibold text-grafite-suave">Ansiedade</p>
              </div>
              <p className="mt-2 text-sm text-grafite-suave/80">Redução de sintomas</p>
            </div>
            <div className="rounded-xl border border-verde-eucalipto/20 bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-verde-eucalipto-10 shadow-suave">
                  <Check className="h-4 w-4 text-verde-eucalipto" />
                </span>
                <p className="font-semibold text-grafite-suave">Empoderamento</p>
              </div>
              <p className="mt-2 text-sm text-grafite-suave/80">Mais presença e voz</p>
            </div>
          </div>
        </div>

        {/* Depoimento */}
        <div className="bg-rosa-argila-10 rounded-2xl p-8 md:p-10 relative">
          <Quote className="absolute top-6 left-6 w-16 h-16 text-rosa-argila/30" />
          <p className="font-serif text-xl md:text-2xl text-grafite-suave italic text-center relative z-10 pt-8">
            "Eu acho que todo mundo tinha que ir lá, faz tão bem... ajuda muito a cabeça, ajuda em tudo."
          </p>
          <p className="text-center text-muted-foreground mt-4 text-sm">
            — Participante de grupo de crochê terapêutico
          </p>
        </div>

        
      </div>

      {/* Resumo Final */}
      <div className="bg-verde-eucalipto-10 border-2 border-verde-eucalipto rounded-xl p-8 max-w-4xl mx-auto animate-fade-in" style={{
      animationDelay: '0.3s'
    }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checkpoints.map((item, index) => <div key={index} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-suave flex-shrink-0">
                <Check className="h-3.5 w-3.5 text-verde-eucalipto" />
              </span>
              <span className="text-grafite-suave">{formatBold(item.texto)}</span>
            </div>)}
        </div>
      </div>
    </Section>;
};
export { Prova };