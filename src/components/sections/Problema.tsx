import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";
import { Brain, Package, Smartphone } from "lucide-react";

/**
 * Seção Problema - Tríade da Ansiedade
 * 3 cards explicando os vilões
 */
const Problema = () => {
  const handleVerSolucao = () => {
    const el = document.getElementById("solucao");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Fallback caso a âncora ainda não exista no DOM por algum motivo.
    window.location.hash = "#solucao";
  };

  const viloes = [{
    icon: Brain,
    numero: "1",
    titulo: "Você Nunca Está Presente",
    texto: `Você vive pensando no passado ou no futuro, mantendo o cérebro em estado constante de alerta. [[green]]E aí a ansiedade nunca para.[[/green]]`,
    recap: "VILÃO 1: Nunca presente → Cérebro interpreta perigo → Ansiedade ↑"
  }, {
    icon: Package,
    numero: "2",
    titulo: "Você Acumula Tensão Sem Descarregar",
    texto: `O estresse se soma todos os dias, sem um espaço real para descarregar. [[green]]Sem nunca ter por onde sair.[[/green]]`,
    recap: "VILÃO 2: Acumula sem descarregar → Sem dopamina → Estresse ↑"
  }, {
    icon: Smartphone,
    numero: "3",
    titulo: "Você Está Desconectada Do Corpo",
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
  return <Section id="problema" background="white" containerClassName="pt-12 pb-12 md:pt-16 md:pb-14">
      {/* Título */}
      <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10 animate-fade-in">
        <h2 className="font-serif md:text-h2 text-grafite-suave mb-6 text-2xl">
          Por Que Você Está Ansiosa
          <span className="text-rosa-argila block">(E Não É Culpa Sua)</span>
        </h2>
        <p className="text-grafite-suave text-body">
          Você vive de três formas que <strong>GARANTEM</strong> que sua mente nunca vai parar:
        </p>
      </div>

      {/* 3 Cards */}
      <div className="mx-auto max-w-5xl grid gap-3 md:grid-cols-3 mb-10 md:mb-12">
        {viloes.map((vilao, index) => <div key={index} className="bg-rosa-argila-10 rounded-2xl p-4 md:p-4 shadow-suave hover-lift animate-fade-in h-full" style={{
        animationDelay: `${index * 0.12}s`
      }}>
            <div className="mb-3 md:mb-4">
              <vilao.icon className="w-8 h-8 md:w-8 md:h-8 text-verde-eucalipto mb-2" strokeWidth={1.5} />
              <h3 className="font-serif text-base md:text-lg text-grafite-suave leading-tight">
                {vilao.numero}. {vilao.titulo}
              </h3>
            </div>

            <div className="text-sm md:text-sm text-grafite-suave/90 leading-snug md:leading-relaxed">
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
        <p className="font-bold text-verde-eucalipto text-xl">
          Mas existe uma forma de quebrar os três — de uma vez.
        </p>

        <div className="mt-6">
          <Button variant="primary" onClick={handleVerSolucao} aria-label="Ir para a seção Solução">
            Quero Começar
          </Button>
        </div>
      </div>
    </Section>;
};
export { Problema };