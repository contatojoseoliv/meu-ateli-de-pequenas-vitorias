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
    texto: `Quando suas mãos estão criando — contando pontos, sentindo a textura do fio — força a mente ao presente, afastando pensamentos futuros e reduzindo a ansiedade de forma natural.

*→ Isso quebra o VILÃO 1 (Nunca Estar Presente)*`
  }, {
    numero: "2",
    titulo: "Você Descarrega Emocionalmente",
    texto: `Criar e Finalizar uma peça gera dopamina, traz sensação de conclusão, alívio emocional e a calma de “eu consegui”.

*→ Isso quebra o VILÃO 2 (Acumular Sem Descarregar)*`
  }, {
    numero: "3",
    titulo: "Você Reconecta Corpo E Mente",
    texto: `O contato manual reconecta corpo e mente, reduz cortisol e estresse, ajudando a diminuir ansiedade e depressão.

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
        {/* Pré-headline */}
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/70 md:text-lead">
          A Descoberta Que Muda Tudo
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl text-white leading-tight md:text-h2">
          Quando você cria Amigurumi com as mãos
          <span className="block mt-2 text-2xl md:text-4xl text-white/90">
            — algo tangível, bonito, que você vê surgir —
          </span>
        </h2>

        {/* Subheadline */}
        <p className="mt-4 text-lg md:text-xl text-white/85">
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
       <div className="max-w-3xl mx-auto text-center animate-fade-in">
         <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
           E quando você segura seu primeiro amigurumi completo — feito por <span className="text-rosa-argila">VOCÊ</span>, do início ao fim —
         </p>

         <div className="mt-8 space-y-4 text-lg md:text-xl text-white/85 leading-relaxed">
           <p>Algo muda.</p>
           <p>Não só a habilidade. A sensação.</p>
           <p>
             Você acabou de ter uma experiência que sua mente não pode negar:
           </p>
         </div>

         <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
           <p className="font-serif text-2xl md:text-3xl text-white">
             “Eu comecei. Eu fiz. <span className="text-rosa-argila">EU TERMINEI.</span>”
           </p>
         </div>

         <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed">
           E pela primeira vez em muito tempo... você sente calma. Orgulho. Alívio.
         </p>
       </div>

    </Section>;
};
export { Solucao };