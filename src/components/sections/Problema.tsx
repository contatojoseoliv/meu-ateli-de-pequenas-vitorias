import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

/**
 * Seção Problema - Tríade da Ansiedade
 * 3 cards explicando os vilões
 */
const Problema = () => {
  const handleVerSolucao = () => {
    const el = document.getElementById("solucao");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    // Fallback caso a âncora ainda não exista no DOM por algum motivo.
    window.location.hash = "#solucao";
  };
  const viloes = [{
    numero: "1",
    titulo: "Você Nunca Está Presente",
    texto: `Você vive pensando no passado ou no futuro, mantendo o cérebro em estado constante de alerta. [[green]]E aí a ansiedade nunca para.[[/green]]`,
    recap: "VILÃO 1: Nunca presente → Cérebro interpreta perigo → Ansiedade ↑"
  }, {
    numero: "2",
    titulo: "Você Acumula Tensão Sem Descarregar",
    texto: `O estresse do dia a dia se soma, sem um espaço real para descarregar. [[green]]Sem nunca ter por onde sair.[[/green]]`,
    recap: "VILÃO 2: Acumula sem descarregar → Sem dopamina → Estresse ↑"
  }, {
    numero: "3",
    titulo: "Você Está Desconectada Do Seu Corpo",
    texto: `Muitas horas em telas mantêm você só na mente, e o corpo fica esquecido. [[green]]Desconexão corpo-mente e maior a ansiedade.[[/green]]`,
    recap: "VILÃO 3: Desconectada do corpo → 100% mental → Ansiedade ↑"
  }];
  const formatText = (text: string) => {
    return text.split("\n\n").map((paragraph, i) => {
      // suporta **negrito** e [[green]]destaque[[/green]] dentro do texto
      const greenParts = paragraph.split(/(\[\[green\]\].*?\[\[\/green\]\])/g);
      return <p key={i} className="mb-3 last:mb-0">
          {greenParts.map((gp, j) => {
          const isGreen = gp.startsWith("[[green]]") && gp.endsWith("[[/green]]");
          const greenContent = isGreen ? gp.slice("[[green]]".length, -"[[/green]]".length) : gp;
          const boldParts = greenContent.split(/(\*\*.*?\*\*)/g);
          const inner = boldParts.map((part, k) => {
            const isBold = part.startsWith("**") && part.endsWith("**");
            const content = isBold ? part.slice(2, -2) : part;
            return isBold ? <strong key={k}>{content}</strong> : <span key={k}>{content}</span>;
          });
          return isGreen ? <span key={j} className="text-verde-eucalipto font-semibold">
                {inner}
                <br />
              </span> : <span key={j}>{inner}</span>;
        })}
        </p>;
    });
  };
  return <Section id="problema" background="cinza" containerClassName="pt-10 pb-8 md:pt-12 md:pb-10">
      {/* Título */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in">
        <h2 className="font-serif md:text-h2 text-grafite-suave mb-6 text-2xl">
          Por Que Você Está Ansiosa
          <span className="text-rosa-argila block">(E Não É Culpa Sua)</span>
        </h2>
        <p className="text-grafite-suave text-body">
          Você vive de três formas que <strong>GARANTEM</strong> que sua mente nunca vai parar:
        </p>
      </div>

      {/* 3 Cards */}
      <div className="mx-auto max-w-5xl grid gap-4 md:gap-6 md:grid-cols-3 mb-10 md:mb-12">
        {viloes.map((vilao, index) => <div key={index} className="bg-white border border-verde-eucalipto/20 rounded-2xl p-6 md:p-7 shadow-suave hover-lift animate-fade-in h-full" style={{
        animationDelay: `${index * 0.12}s`
      }}>
            <div className="flex items-start gap-4 mb-5">
              <div className="font-serif text-6xl leading-none text-verde-eucalipto/30 select-none" aria-hidden="true">
                {vilao.numero}
              </div>
              <h3 className="font-serif text-xl text-grafite-suave leading-snug pt-1">
                {vilao.titulo}
              </h3>
            </div>

            <div className="text-body text-grafite-suave/90 leading-relaxed">
              {formatText(vilao.texto)}
            </div>
          </div>)}
      </div>

      {/* Recap Visual */}
      

      {/* Resultado Final */}
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <p className="text-grafite-suave mb-3 text-base">
          <span className="font-semibold text-rosa-argila">Resultado:</span> sua mente nunca desliga. Seu corpo não relaxa. Você não sente calma de verdade.
        </p>
        <p className="font-bold text-verde-eucalipto text-xl">Mas existe uma forma de solucionar os três — de uma vez.</p>

        <div className="mt-6 mb-2 md:mb-4 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleVerSolucao}
            aria-label="Ir para a seção Solução"
          >
            Quero Começar
          </Button>
        </div>
      </div>
    </Section>;
};
export { Problema };