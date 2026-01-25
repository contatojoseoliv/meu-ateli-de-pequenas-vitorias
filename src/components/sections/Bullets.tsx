import { Section } from "@/components/shared/Section";
import { Flower2 } from "lucide-react";

/**
 * Seção Bullets/Benefícios
 * Lista de 12 benefícios com hover effects
 */
const Bullets = () => {
  const bullets = [
    "Os fundamentos do amigurumi japonês, explicados desde a base — para você entender o \"porquê\" de cada ponto e ter resultados mais consistentes",
    "As 5 técnicas essenciais — anel mágico, ponto baixo, aumento, diminuição e costura invisível",
    "Materiais por R$ 25-35 no total — mais barato que uma sessão de terapia, funciona como 10",
    "Como corrigir os 3 erros mais comuns sem desfazer tudo — incluindo o truque da \"emenda invisível\" que salva horas",
    "Suporte em menos de 2 horas — grupo exclusivo onde você nunca fica travada sozinha",
    "87% sentem ansiedade diminuir nos primeiros 15 minutos — porque a mente é forçada a parar (neurologicamente)",
    "A sensação de segurar algo que VOCÊ criou — prova física que muda \"eu não consigo\" para \"EU CONSEGUI\"",
    "Mais calma em 15 minutos criando que 1 hora de scroll — presença real sem forçar, automática",
    "O momento \"onde você comprou isso?\" \"EU FIZ\" — olhar de admiração instantâneo, status imediato",
    "Presentes memoráveis por R$ 15 — nunca mais comprar genérico, todo presente vira especial",
    "Sua família vê você diferente — de \"sempre estressada\" para \"ela cria coisas lindas\"",
    "40+ comentários quando posta no Instagram — nova identidade social: você que ensina"
  ];

  const formatBold = (text: string) => {
    // Handle text in quotes and bold markers
    let parts = text.split(/(".*?")/g);
    return parts.map((part, i) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return <strong key={i} className="text-verde-eucalipto">{part}</strong>;
      }
      // Check for em-dash separated parts
      if (part.includes(' — ')) {
        const [before, after] = part.split(' — ');
        return (
          <span key={i}>
            <strong className="text-grafite-suave">{before}</strong>
            {' — '}
            <span>{after}</span>
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Section id="bullets" background="white">
      {/* Pré-headline + Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-verde-eucalipto mb-4">
          O que Você Vai Descobrir
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-grafite-suave">
          Do Primeiro Ponto ao Orgulho de Dizer{" "}
          <span className="text-verde-eucalipto">"Eu Que Fiz"</span>
        </h2>
      </div>

      {/* Lista de Bullets */}
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4">
          {bullets.map((bullet, index) => (
            <li 
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-cinza-nuvem hover:shadow-sm cursor-default animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Flower2 
                className="w-5 h-5 text-verde-eucalipto mt-1 flex-shrink-0" 
                strokeWidth={2}
              />
              <span className="text-body text-grafite-suave leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export { Bullets };
