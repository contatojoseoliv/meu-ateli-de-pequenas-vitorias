import { Section } from "@/components/shared/Section";
import { Check, Quote } from "lucide-react";

/**
 * Seção Prova - Científica + Social
 * Dados, estudos e validação brasileira
 */
const Prova = () => {
  const estatisticas = [
    { valor: "89,5%", label: "se sentiram mais calmas" },
    { valor: "82%", label: "se sentiram mais felizes" },
    { valor: "74,7%", label: "se sentiram mais úteis" },
  ];

  const checkpoints = [
    { texto: "Neurologicamente, criar com as mãos **força presença** (reduz ansiedade)" },
    { texto: "Biologicamente, **libera dopamina** (gera alívio)" },
    { texto: "Cientificamente, **89,5% das pessoas sentem calma**" },
    { texto: "No Brasil, **funciona com mulheres como você**" },
  ];

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-verde-eucalipto">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <Section id="prova" background="cinza">
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-h2 text-grafite-suave">
          Isto Não É Teoria. <span className="text-verde-eucalipto">São Fatos.</span>
        </h2>
      </div>

      {/* Primeira Prova - Lógica */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-suave max-w-4xl mx-auto mb-12 animate-fade-in">
        <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">
          Primeiro, a matemática simples:
        </h3>
        <div className="text-body text-grafite-suave/90 space-y-4">
          <p>
            Estudos de Harvard comprovam: <strong className="text-verde-eucalipto">47% do tempo</strong> estamos divagando mentalmente.
          </p>
          <p>
            Quanto mais divaga, maior a ansiedade.
          </p>
          <p className="font-semibold">
            MAS: Quando você cria com as mãos, biologicamente não consegue divagar.
          </p>
          <p>
            Suas mãos ocupadas = mente forçada ao agora = ansiedade diminui.
          </p>
          <p className="text-verde-eucalipto font-bold text-lg mt-6">
            É matemática neurológica.
          </p>
        </div>
      </div>

      {/* Segunda Prova - Científica */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-suave max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">
          Segundo, a ciência específica:
        </h3>
        <div className="text-body text-grafite-suave/90 space-y-4 mb-8">
          <p>
            Em 2021, pesquisadores estudaram <strong className="text-verde-eucalipto">8.391 pessoas que fazem crochê</strong> em 87 países.
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
          {estatisticas.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-bold text-verde-eucalipto w-16 text-right">{stat.valor}</span>
              <div className="flex-1 h-8 bg-cinza-nuvem rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: stat.valor,
                    background: `linear-gradient(90deg, hsl(156 15% 42%) 0%, hsl(35 52% 50%) 100%)`
                  }}
                />
              </div>
              <span className="text-sm text-grafite-suave/80 w-40">{stat.label}</span>
            </div>
          ))}
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

      {/* Terceira Prova - Validação Brasileira */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-suave max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">
          Terceiro, a validação brasileira:
        </h3>
        <div className="text-body text-grafite-suave/90 space-y-4 mb-8">
          <p>
            Aqui no Brasil, unidades de saúde da Estratégia Saúde da Família (ESF) implementaram grupos de crochê para mulheres em sofrimento emocional.
          </p>
          <p className="font-bold text-grafite-suave text-lg">
            O que aconteceu?
          </p>
          <p>
            Melhora significativa da autoestima. Redução de sintomas de ansiedade e depressão. Empoderamento.
          </p>
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

        <div className="text-body text-grafite-suave/90 space-y-4 mt-8">
          <p>
            E isso não foi um grupo isolado. Foi replicado em múltiplas cidades brasileiras. Sempre com os mesmos resultados.
          </p>
          <p className="font-bold text-verde-eucalipto text-lg">
            Porque funciona.
          </p>
        </div>
      </div>

      {/* Resumo Final */}
      <div className="bg-verde-eucalipto-10 border-2 border-verde-eucalipto rounded-xl p-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {checkpoints.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-verde-eucalipto mt-0.5 flex-shrink-0" />
              <span className="text-grafite-suave">{formatBold(item.texto)}</span>
            </div>
          ))}
        </div>
        <p className="text-center font-bold text-grafite-suave text-lg">
          Isto não é promessa vazia. É ciência. É dados. <span className="text-verde-eucalipto">É realidade.</span>
        </p>
      </div>
    </Section>
  );
};

export { Prova };
