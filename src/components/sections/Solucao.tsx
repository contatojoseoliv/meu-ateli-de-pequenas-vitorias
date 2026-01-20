import { Section } from "@/components/shared/Section";
import { MetodoPrimeiraVitoria } from "@/components/sections/solucao/MetodoPrimeiraVitoria";
import { Mapa7Dias } from "@/components/sections/solucao/Mapa7Dias";

/**
 * Seção Solução - Método Primeira Vitória
 * Fundo Verde Eucalipto (escuro), texto branco
 */
const Solucao = () => {
  const mecanismos = [{
    numero: "1",
    titulo: "Você Entra Em Estado De Atenção Plena",
    texto: `Quando suas mãos estão criando — contando pontos, seguindo um padrão, sentindo a textura do fio —

 Sua mente não CONSEGUE estar no futuro. Ela é **forçada** para o aqui e agora.

 E aí a ansiedade — aquela que vem de viver sempre "no depois" — **diminui**.

 **Atenção Plena é o oposto neurológico da ansiedade.**

 *→ Isso quebra o VILÃO 1 (Nunca Estar Presente)*`
  }, {
    numero: "2",
    titulo: "Você Descarrega Emocionalmente",
    texto: `Do início ao fim. Com suas próprias mãos.

E quando você **termina** — seu cérebro libera dopamina.

Não metáfora. Química real.

**E você descarrega.**

Pela primeira vez em muito tempo, você respira fundo e pensa: *"Eu fiz. Terminou. Está aqui."*

E aí vem o alívio.

*→ Isso quebra o VILÃO 2 (Acumular Sem Descarregar)*`
  }, {
    numero: "3",
    titulo: "Você Reconecta Corpo E Mente",
    texto: `Porque você não está mais só na sua cabeça.

Você está sentindo. Tocando. Vendo surgir das suas mãos.

E isso — biologicamente — **reduz cortisol** (hormônio do estresse) em até 25%.

Estudos brasileiros (ESF): grupos de crochê reduziram ansiedade/depressão em 73% das participantes.

*→ Isso quebra o VILÃO 3 (Desconexão Corpo-Mente)*`
  }];
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      let content = paragraph;

      // Handle bullet points
      if (content.startsWith('•')) {
        const bullets = content.split('\n').filter(line => line.startsWith('•'));
        return <ul key={i} className="list-none space-y-1 mb-4">
            {bullets.map((bullet, j) => <li key={j} className="flex items-start gap-2">
                <span className="text-ocre-dourado">•</span>
                {bullet.substring(2)}
              </li>)}
          </ul>;
      }

      // Handle bold and italic
      const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return <p key={i} className="mb-4 last:mb-0">
          {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
            return <em key={j} className="text-rosa-argila">{part.slice(1, -1)}</em>;
          }
          return part;
        })}
        </p>;
    });
  };
  return <Section id="solucao" background="verde">
      <div className="solucao-intro text-center max-w-4xl mx-auto mb-12 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-[42px] text-white mb-6 leading-tight">
          A Descoberta Que Muda Tudo
        </h2>
        
        <p className="text-xl text-ocre-dourado font-bold mt-6 md:text-h4 py-0 my-0">
          Quando você cria Amigurumi com as mãos
          <br />
          <span className="block">— algo tangível, bonito, que você vê surgir —</span>
        </p>
        <p className="text-lg md:text-xl text-white f mt-2 md:text-lead">
          Três coisas acontecem no seu cérebro:
        </p>
      </div>

      {/* 3 Mecanismos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mecanismos.map((mec, index) => <div key={index} className="bg-white/10 border border-white/20 rounded-xl p-7 animate-fade-in" style={{
        animationDelay: `${index * 0.15}s`
      }}>
            <div className="flex items-start gap-4 mb-5">
              <span className="font-serif text-6xl text-ocre-dourado/50 leading-none flex-shrink-0">
                {mec.numero}
              </span>
              <h3 className="font-serif text-xl text-white leading-snug pt-1">
                {mec.titulo}
              </h3>
            </div>

            <div className="text-white/80 text-body leading-relaxed">
              {formatText(mec.texto)}
            </div>
          </div>)}
      </div>

      {/* Box de Transição */}
      <div className="bg-ocre-dourado/20 border-2 border-ocre-dourado rounded-xl p-8 text-center max-w-2xl mx-auto mb-20 animate-fade-in">
        <p className="text-xl text-white font-semibold">
          Isso quebra a Tríade da Mente Acelerada — de uma vez.
        </p>
      </div>

      {/* Método + Pilares (sessão única, full-width) */}
      <MetodoPrimeiraVitoria />

      {/* Mapa de 7 Dias (visual) */}
      <Mapa7Dias />

      {/* Fechamento Emocional */}
      
    </Section>;
};
export { Solucao };