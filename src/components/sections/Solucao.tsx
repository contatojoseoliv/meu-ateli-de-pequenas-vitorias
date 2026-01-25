import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";
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
    texto: `Quando você está contando pontos e sentindo a textura do fio, isso força a mente ao presente, afastando pensamentos futuros e reduzindo a ansiedade.

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
                <span className="text-white/70">•</span>
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
            return;
          }
          return part;
        })}
        </p>;
    });
  };
  const handleVerMetodo = () => {
    const el = document.getElementById("metodo");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    window.location.hash = "#metodo";
  };
  return <>
      {/* DOBRA 1 (verde): descoberta + 3 mecanismos + CTA */}
      <Section id="solucao" background="verde" containerClassName="pt-10 pb-14 md:pt-12 md:pb-16">
        <div className="solucao-intro text-center max-w-4xl mx-auto mb-12 animate-fade-in">
        {/* Pré-headline */}
        <p className="text-xs font-semibold tracking-[0.32em] uppercase text-white/70 md:text-base">
          A Descoberta Que Muda Tudo
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl text-white leading-[1.12] md:text-5xl">
          <span className="block text-h2">Quando você cria Amigurumi com as mãos</span>
          <span className="block mt-2 text-2xl text-white/90 md:text-h2">
            — algo tangível, bonito, que você vê surgir —
          </span>
        </h2>

        {/* Subheadline */}
        <p className="mt-4 text-base text-white/85 md:text-lg">
          Três coisas acontecem no seu cérebro:
        </p>
      </div>

      {/* 3 Mecanismos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mecanismos.map((mec, index) => <div key={index} className="bg-white/10 border border-white/20 rounded-xl p-7 animate-fade-in" style={{
        animationDelay: `${index * 0.15}s`
      }}>
            <div className="flex items-start gap-4 mb-5">
              <span className="font-serif text-6xl text-white/35 leading-none flex-shrink-0">
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

       {/* Nota editorial (destaque como o texto final acima) */}
       <p className="mx-auto -mt-6 mb-8 max-w-2xl text-center text-base md:text-lg font-semibold text-white/85">
         É assim que a mente finalmente desacelera e o corpo relaxa.
       </p>

      {/* CTA logo abaixo das caixinhas */}
      <div className="flex justify-center animate-fade-in">
        <Button variant="primary" size="lg" onClick={handleVerMetodo} aria-label="Ir para o Método Primeira Vitória">
          Quero ver o método
        </Button>
      </div>
      </Section>

      {/* DOBRA 2 (papel): método (imagens + ícones + pilares) */}
      <Section
        id="metodo"
        background="cinza"
        className="scroll-mt-24"
        containerClassName="pt-10 pb-10 md:pt-12 md:pb-12"
      >
        {/* Método + Pilares (sessão única, full-width) */}
        <MetodoPrimeiraVitoria />

      </Section>

      {/* DOBRA 3 (branca): mapa + fechamento */}
      <Section background="white" containerClassName="pt-0 pb-10 md:pb-14">

        {/* Mapa de 7 Dias (visual) */}
        <Mapa7Dias />

        {/* Fechamento Emocional */}
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed">
            E quando você segura seu primeiro amigurumi completo — feito por{" "}
            <span className="text-rosa-argila">VOCÊ</span>, do início ao fim —
          </p>

          <div className="mt-8 space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>Algo muda.</p>
            <p>Não só a habilidade. A sensação.</p>
            <p>Você acabou de ter uma experiência que sua mente não pode negar:</p>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-secondary/10 px-6 py-5">
            <p className="font-serif text-2xl md:text-3xl text-foreground">
              “Eu comecei. Eu fiz. <span className="text-rosa-argila">EU TERMINEI.</span>”
            </p>
          </div>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            E pela primeira vez em muito tempo... você sente calma. Orgulho. Alívio.
          </p>
        </div>
      </Section>
    </>;
};
export { Solucao };