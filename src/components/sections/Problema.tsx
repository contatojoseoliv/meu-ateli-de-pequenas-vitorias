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

A Neurociência mostra que passamos cerca de 47% do tempo pensando no passado ou no futuro — e isso faz o cérebro ficar em alerta constante.

**E aí a ansiedade nunca para.**`,
    recap: "VILÃO 1: Nunca presente → Cérebro interpreta perigo → Ansiedade ↑"
  }, {
    icon: Package,
    numero: "2",
    titulo: "Você Acumula Tensão Sem Descarregar",
    texto: `Todo dia você acumula estresse. Tensão. Frustração.

**Mas quando você descarrega?**

Nunca.

Você não tem nada que seja só seu.
Nada que exista só para você.
Nada que você termine e possa olhar e dizer: "Isso aqui, eu fiz."

Trabalho? É para a empresa.
Casa? É para a família.
Obrigações? Infinitas.

**A tensão se acumula, dia após dia, sem nunca ter por onde sair.**`,
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
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in">
        <h2 className="font-serif md:text-h2 text-grafite-suave mb-6 text-2xl">
          Por Que Você Está Ansiosa
          <span className="text-rosa-argila block">(E Não É Culpa Sua)</span>
        </h2>
        <p className="text-grafite-suave text-small">
          Você vive de três formas que <strong>GARANTEM</strong> que sua mente nunca vai parar:
        </p>
      </div>

      {/* 3 Cards */}
      <div className="mx-auto max-w-3xl space-y-4 md:space-y-6 mb-12 md:mb-16">
        {viloes.map((vilao, index) => <div key={index} className="bg-rosa-argila-10 rounded-2xl p-5 md:p-7 shadow-suave hover-lift animate-fade-in" style={{
        animationDelay: `${index * 0.12}s`
      }}>
            <div className="mb-5">
              <vilao.icon className="w-10 h-10 text-verde-eucalipto mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-xl md:text-2xl text-grafite-suave leading-tight">
                {vilao.numero}. {vilao.titulo}
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
        <p className="text-lg text-grafite-suave mb-3">
          <span className="font-semibold text-rosa-argila">Por causa disso:</span> Sua mente nunca desliga. Seu corpo nunca relaxa. Você nunca sente calma de verdade.
        </p>
        <p className="font-bold text-verde-eucalipto text-xl">
          Mas existe uma forma de quebrar os três — de uma vez.
        </p>
      </div>
    </Section>;
};
export { Problema };