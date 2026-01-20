import { Section } from "@/components/shared/Section";
import { Brain, Package, Smartphone } from "lucide-react";

/**
 * Seção Problema - Tríade da Ansiedade
 * 3 cards explicando os vilões
 */
const Problema = () => {
  const viloes = [{
    icon: Brain,
    numero: "1",
    titulo: "Você Nunca Está Presente",
    texto: `Você trabalha pensando nos problemas de casa. Almoça checando o celular. Tenta relaxar lembrando do que ainda precisa fazer.

**Sua mente NUNCA está onde seu corpo está.**

Estudos de Harvard (2010) comprovam: passamos 47% do tempo mentalmente divagando — pensando no passado ou futuro, nunca no agora.

E quanto MAIS a mente divaga, maior a ansiedade.

Porque quando você não está presente, seu cérebro interpreta como perigo constante.

**E aí a ansiedade nunca para.**`,
    recap: "VILÃO 1: Nunca presente → Cérebro interpreta perigo → Ansiedade ↑"
  }, {
    icon: Package,
    numero: "2",
    titulo: "Você Acumula Sem Descarregar",
    texto: `Todo dia você acumula estresse. Tensão. Frustração.

**Mas quando você descarga? Nunca.**

Trabalho nunca termina. Casa amanhã está suja de novo. Obrigações são infinitas.

A neurociência comprova: finalizar algo libera dopamina — química mensurável de alívio.

Sem finalizações, sem dopamina. Sem alívio.

**Só acúmulo. E o estresse nunca sai.**`,
    recap: "VILÃO 2: Acumula sem descarregar → Sem dopamina → Estresse ↑"
  }, {
    icon: Smartphone,
    numero: "3",
    titulo: "Você Está Desconectada Do Corpo",
    texto: `Você passa — em média — 9 horas por dia olhando para telas.

Seus olhos trabalham. Seu cérebro trabalha.

**Seu corpo? Esquecido.**

E quando você está 100% mental, 0% corporal, você perde a conexão com quem você é.

Pesquisas mostram: quanto mais tempo em telas, maior a desconexão corpo-mente — e maior a ansiedade.`,
    recap: "VILÃO 3: Desconectada do corpo → 100% mental → Ansiedade ↑"
  }];
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      // Handle bold text
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return <p key={i} className="mb-4 last:mb-0">
          {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-verde-eucalipto">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        </p>;
    });
  };
  return <Section id="problema" background="white">
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 className="font-serif md:text-h2 text-grafite-suave mb-6 text-2xl">
          Por Que Você Está Ansiosa
          <span className="text-rosa-argila block">(E Não É Culpa Sua)</span>
        </h2>
        <p className="text-grafite-suave text-small">Você vive de três formas que GARANTEM que sua mente nunca vai parar:<br />
          Você vive de três formas que <strong>GARANTEM</strong> que sua mente nunca vai parar:
        </p>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {viloes.map((vilao, index) => <div key={index} className="bg-rosa-argila-10 rounded-2xl p-8 md:p-10 shadow-suave hover-lift animate-fade-in" style={{
        animationDelay: `${index * 0.15}s`
      }}>
            <vilao.icon className="w-16 h-16 text-verde-eucalipto mb-6" strokeWidth={1.5} />
            <h3 className="font-serif text-xl md:text-2xl text-grafite-suave mb-6">
              {vilao.numero}. {vilao.titulo}
            </h3>
            <div className="text-body text-grafite-suave/90 leading-relaxed">
              {formatText(vilao.texto)}
            </div>
          </div>)}
      </div>

      {/* Recap Visual */}
      <div className="bg-verde-eucalipto-10 border-l-4 border-verde-eucalipto rounded-r-xl p-8 mb-12 animate-fade-in">
        <div className="space-y-3 font-medium text-grafite-suave">
          {viloes.map((vilao, index) => <p key={index} className="flex items-start gap-2">
              <span className="text-verde-eucalipto">→</span>
              {vilao.recap}
            </p>)}
        </div>
      </div>

      {/* Resultado Final */}
      <div className="bg-rosa-argila/15 rounded-xl p-8 text-center max-w-3xl mx-auto animate-fade-in">
        <p className="text-lg text-grafite-suave mb-2">
          Sua mente nunca desliga. Seu corpo nunca relaxa. Você nunca sente calma de verdade.
        </p>
        <p className="font-bold text-verde-eucalipto text-xl">
          Mas existe uma forma de quebrar os três — de uma vez.
        </p>
      </div>
    </Section>;
};
export { Problema };