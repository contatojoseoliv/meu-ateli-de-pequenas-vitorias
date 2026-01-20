import { Section } from "@/components/shared/Section";
import { Check, Sparkles, Target, Heart, TrendingUp } from "lucide-react";

/**
 * Seção Solução - Método Primeira Vitória
 * Fundo Verde Eucalipto (escuro), texto branco
 */
const Solucao = () => {
  const mecanismos = [
    {
      numero: "1",
      titulo: "Você Entra Em Flow State (Presença Forçada)",
      texto: `Quando suas mãos estão criando — contando pontos, seguindo um padrão, sentindo a textura do fio —

Sua mente não CONSEGUE estar no futuro. Ela é **forçada** para o agora.

E aí a ansiedade — aquela que vem de viver sempre "no depois" — **diminui**.

**Flow State é o oposto neurológico da ansiedade.**

*→ Isso quebra o VILÃO 1 (Nunca Estar Presente)*`
    },
    {
      numero: "2",
      titulo: "Você Finaliza Algo (Descarga Emocional)",
      texto: `Do início ao fim. Com suas próprias mãos.

E quando você **termina** — seu cérebro libera dopamina.

Não metáfora. Química real.

**E você descarrega.**

Pela primeira vez em muito tempo, você respira fundo e pensa: *"Eu fiz. Terminou. Está aqui."*

E aí vem o alívio.

*→ Isso quebra o VILÃO 2 (Acumular Sem Descarregar)*`
    },
    {
      numero: "3",
      titulo: "Você Reconecta Corpo E Mente",
      texto: `Porque você não está mais só na sua cabeça.

Você está sentindo. Tocando. Vendo surgir das suas mãos.

E isso — biologicamente — **reduz cortisol** (hormônio do estresse) em até 25%.

Estudos brasileiros (ESF): grupos de crochê reduziram ansiedade/depressão em 73% das participantes.

*→ Isso quebra o VILÃO 3 (Desconexão Corpo-Mente)*`
    }
  ];

  const pilares = [
    {
      numero: "1",
      titulo: "Pequeno e alcançável",
      texto: `Não é projeto de 3 meses que você abandona na metade.

É **7 dias, 15 minutos por dia**. Algo que você TERMINA.

E quando você termina = dopamina (química de realização).

**Seu cérebro registra:** *"Eu comecei. Eu fiz. EU TERMINEI."*

E isso reprograma a crença de "eu não consigo".`
    },
    {
      numero: "2",
      titulo: "Guiado passo a passo",
      texto: `Você nunca fica perdida.

Cada vídeo mostra exatamente o que fazer:

• Câmera lenta nos pontos críticos
• Ângulos múltiplos (cima + lateral + close)
• Narração calma e pausada

**Você sempre sabe qual é o próximo passo.**

E quando você sabe o próximo passo, você não trava. Você continua.`
    },
    {
      numero: "3",
      titulo: "Emocionalmente seguro",
      texto: `Erro não é falha aqui. **É parte do processo.**

Todo mundo erra no anel mágico. Todo mundo erra na costura. TODO MUNDO.

E quando você erra? Você tem suporte. Grupo ativo. Gente que já passou por isso.

**E aí erro vira aprendizado.** Não desistência.

Sem autocrítica brutal. Sem interpretar dificuldade como prova de incapacidade.`
    },
    {
      numero: "4",
      titulo: "Progressivo",
      texto: `Cada dia é uma conquista pequena e tangível.

**Vitória 1. Vitória 2. Vitória 3.**

A cada pequena vitória, sua confiança cresce.

E depois de 7 vitórias consecutivas — uma por dia, todas registradas —

**Sua identidade muda.**

Você não é mais "aquela que nunca consegue".

Você é "aquela que fez. Que terminou. Que É CAPAZ."`
    }
  ];

  const timeline = [
    {
      dia: "DIA 1",
      titulo: "Preparação",
      oque: "Materiais certos (menos de R$ 35) + primeiros pontos em câmera lenta + mindset",
      resultado: "Você sai sabendo que é possível. E já sabe fazer pontos básicos."
    },
    {
      dia: "DIAS 2-6",
      titulo: "Criação guiada",
      oque: "1 vídeo curto por dia (10-15min). Uma etapa de cada vez. Nunca sobrecarga.",
      resultado: "Pequenas vitórias diárias. Dopamina constante. Confiança crescendo."
    },
    {
      dia: "DIA 7",
      titulo: "Finalização",
      oque: "Costura invisível + acabamentos + celebração",
      resultado: "Amigurumi completo nas mãos. Prova física. Identidade mudada."
    }
  ];

  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      let content = paragraph;
      
      // Handle bullet points
      if (content.startsWith('•')) {
        const bullets = content.split('\n').filter(line => line.startsWith('•'));
        return (
          <ul key={i} className="list-none space-y-1 mb-4">
            {bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="text-ocre-dourado">•</span>
                {bullet.substring(2)}
              </li>
            ))}
          </ul>
        );
      }
      
      // Handle bold and italic
      const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <p key={i} className="mb-4 last:mb-0">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
              return <em key={j} className="text-rosa-argila">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <Section id="solucao" background="verde">
      <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-[42px] text-white mb-8 leading-tight">
          A Descoberta Que Muda Tudo
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          A ciência descobriu algo há décadas — mas quase ninguém está usando.
        </p>
        <p className="text-xl md:text-2xl text-white font-semibold mt-6">
          Quando você cria amigurumi com as mãos — algo tangível, bonito, que você vê surgir —
        </p>
        <p className="text-xl md:text-2xl text-ocre-dourado font-bold mt-4">
          Três coisas acontecem no seu cérebro:
        </p>
      </div>

      {/* 3 Mecanismos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mecanismos.map((mec, index) => (
          <div 
            key={index}
            className="bg-white/10 border border-white/20 rounded-xl p-8 animate-fade-in"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <span className="font-serif text-7xl text-ocre-dourado/50 block mb-4">
              {mec.numero}
            </span>
            <h3 className="font-serif text-xl text-white mb-6">
              {mec.titulo}
            </h3>
            <div className="text-white/80 text-body leading-relaxed">
              {formatText(mec.texto)}
            </div>
          </div>
        ))}
      </div>

      {/* Box de Transição */}
      <div className="bg-ocre-dourado/20 border-2 border-ocre-dourado rounded-xl p-8 text-center max-w-2xl mx-auto mb-20 animate-fade-in">
        <p className="text-xl text-white font-semibold">
          Isso quebra a Tríade da Mente Acelerada — de uma vez.
        </p>
      </div>

      {/* Naming do Método */}
      <div className="bg-white/8 rounded-2xl p-10 md:p-12 max-w-4xl mx-auto mb-20 animate-fade-in">
        <h3 className="font-serif text-2xl md:text-3xl text-white text-center mb-8">
          Por Isso Criamos O Método <span className="text-ocre-dourado">Primeira Vitória©</span>
        </h3>
        <p className="text-white/90 text-lg text-center mb-8">
          Um sistema de 7 dias que usa amigurumi — criação manual simples, bonita, alcançável — como veículo para:
        </p>
        <div className="space-y-4 max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-ocre-dourado flex-shrink-0" />
            <span className="text-white"><strong>Gerar Flow State</strong> (sua mente para)</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-ocre-dourado flex-shrink-0" />
            <span className="text-white"><strong>Criar descarga emocional</strong> (finalização = alívio)</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-ocre-dourado flex-shrink-0" />
            <span className="text-white"><strong>Reconectar corpo-mente</strong> (sai das telas, usa mãos)</span>
          </div>
        </div>
        <p className="text-white/90 text-lg text-center mt-8 font-semibold">
          Não para ensinar técnica. Mas para quebrar a Tríade — de uma vez.
        </p>
      </div>

      {/* 4 Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {pilares.map((pilar, index) => (
          <div 
            key={index}
            className="bg-white/8 rounded-xl p-8 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-xs uppercase tracking-wider font-bold text-ocre-dourado mb-4 block">
              PILAR {pilar.numero} — {pilar.titulo}
            </span>
            <div className="text-white/80 text-body leading-relaxed">
              {formatText(pilar.texto)}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline 7 Dias */}
      <div className="max-w-2xl mx-auto mb-20">
        <h3 className="font-serif text-2xl text-white text-center mb-12">
          Mapa de 7 Dias
        </h3>
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white/40" />
          
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-16 pb-12 last:pb-0 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
              {/* Círculo */}
              <div className="absolute left-0 w-12 h-12 rounded-full bg-ocre-dourado border-3 border-white flex items-center justify-center">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              
              {/* Card */}
              <div className="bg-white/12 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-ocre-dourado font-bold">🗓️ {item.dia}</span>
                  <span className="text-white font-semibold">— {item.titulo}</span>
                </div>
                <div className="mb-3">
                  <span className="text-white/70 text-sm font-medium">O que você faz:</span>
                  <p className="text-white/90">{item.oque}</p>
                </div>
                <div>
                  <span className="text-white/70 text-sm font-medium">Resultado:</span>
                  <p className="text-white font-medium">{item.resultado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fechamento Emocional */}
      <div className="bg-ocre-dourado/15 rounded-xl p-10 md:p-12 text-center max-w-3xl mx-auto animate-fade-in">
        <p className="font-serif text-xl md:text-2xl text-white italic leading-relaxed mb-6">
          E quando você segura seu primeiro amigurumi completo — feito por VOCÊ, do início ao fim —
        </p>
        <p className="text-white/90 text-lg mb-4">
          Algo muda.
        </p>
        <p className="text-white/90 text-lg mb-6">
          Não só a habilidade. <strong className="text-white">A sensação.</strong>
        </p>
        <p className="text-white/80 mb-6">
          Você acabou de ter uma experiência que sua mente não pode negar:
        </p>
        <p className="text-rosa-argila italic text-lg mb-6">
          "Eu comecei. Eu fiz. EU TERMINEI."
        </p>
        <p className="text-white text-xl font-semibold">
          E pela primeira vez em muito tempo... você sente <span className="text-ocre-dourado">calma. Orgulho. Alívio.</span>
        </p>
      </div>
    </Section>
  );
};

export { Solucao };
