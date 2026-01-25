import { Section } from "@/components/shared/Section";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/shared/Button";

/**
 * Seção Bullets/Benefícios
 * Lista de 12 benefícios com hover effects
 */
const Bullets = () => {
 const bullets = [
   "Os fundamentos do amigurumi japonês, explicados desde a base",
   "As 5 técnicas essenciais (anel mágico, ponto baixo, aumento, diminuição e costura invisível)",
   "Como corrigir os 3 erros mais comuns sem desfazer tudo",
   "Suporte contínuo durante o aprendizado",
   "O momento em que alguém pergunta \"onde você comprou isso?\" e você responde \"EU FIZ\"",
   "Por que você nunca mais vai precisar comprar presente genérico"
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
        return <span key={i}>
            <strong className="text-grafite-suave">{before}</strong>
            {' — '}
            <span>{after}</span>
          </span>;
      }
      return part;
    });
  };
  return <Section id="bullets" background="white">
      {/* Pré-headline + Título */}
     <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
        <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-verde-eucalipto mb-4">
          O que Você Vai Descobrir
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-grafite-suave">
          Do Primeiro Ponto ao Orgulho de Dizer{" "}
          <span className="text-verde-eucalipto">
"Eu Que Fiz"</span>
        </h2>
      </div>

     {/* Grid com Imagem + Lista de Bullets */}
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
       {/* Coluna da Imagem */}
       <div className="order-2 md:order-1 animate-fade-in">
          <div className="w-full aspect-[4/3] rounded-lg bg-cinza-nuvem shadow-lg" />
       </div>

       {/* Coluna da Lista */}
       <div className="order-1 md:order-2">
         <ul className="space-y-4">
           {bullets.map((bullet, index) => (
             <li 
               key={index} 
               className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-cinza-nuvem hover:shadow-sm cursor-default animate-fade-in" 
               style={{ animationDelay: `${index * 0.05}s` }}
             >
               <Flower2 className="w-5 h-5 text-verde-eucalipto mt-1 flex-shrink-0" strokeWidth={2} />
               <span className="text-body text-grafite-suave leading-relaxed">
                 {bullet}
               </span>
             </li>
           ))}
         </ul>
       </div>
      </div>

    {/* CTA */}
    <div className="text-center mt-12 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
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
export { Bullets };