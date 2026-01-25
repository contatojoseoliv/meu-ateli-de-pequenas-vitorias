import { Section } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";
import { Check, Gift, Lock, CreditCard, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/**
 * Seção Oferta + Stack de Valor
 * Accordion com itens + breakdown de preço + CTA
 */
const Oferta = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const itens = [
    {
      titulo: "Acesso à Plataforma Primeira Vitória em Amigurumi©",
      valor: "R$ 197",
      descricao: "O passo a passo que te guia do zero absoluto ao primeiro amigurumi completo em 7 dias.",
      detalhes: [
        {
          modulo: "Módulo 1: Preparação e Fundamentos",
          items: [
            "Por que você VAI conseguir (mindset)",
            "Materiais exatos + onde comprar",
            "Primeiros pontos em câmera lenta",
            "PDF com lista de compras + glossário visual"
          ]
        },
        {
          modulo: "Módulo 2: Seu Primeiro Amigurumi",
          items: [
            "7 vídeos curtos (10-15min) — uma etapa por dia",
            "Ângulos múltiplos + câmera lenta + narração calma",
            "Você nunca fica perdida"
          ]
        },
        {
          modulo: "Módulo 3: Finalizando Sem Frustração",
          items: [
            "Costura invisível + acabamentos",
            "Vídeo bônus: \"Como corrigir os 5 erros mais comuns\"",
            "Celebração da vitória"
          ]
        }
      ]
    },
    {
      titulo: "Grupo Privado de Suporte",
      valor: "R$ 97",
      descricao: "Você não está sozinha.",
      texto: "Quando você trava, tem alguém para perguntar. Respostas em até 24h (geralmente menos).\n\n**Por que importa:** Quando você trava sozinha, interpreta como falha. Quando tem suporte, interpreta como aprendizado. **E aí você não desiste.**"
    },
    {
      titulo: "Receita em PDF",
      valor: "R$ 27",
      descricao: "Versão impressa da receita completa para ter ao lado enquanto cria.",
      texto: "Instruções escritas + ilustrações + contador de pontos.\n\nVocê escolhe como prefere aprender: vídeo, PDF, ou os dois."
    }
  ];

  const bonus = {
    titulo: "Guia Como Corrigir Os 5 Erros Mais Comuns",
    valor: "R$ 47",
    items: [
      "Anel frouxo",
      "Costura aparecendo",
      "Enchimento vazando",
      "Pontos desiguais",
      "Olhos tortos"
    ],
    destaque: "A diferença entre desistir no Dia 3 ou continuar até o fim."
  };

  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-3 last:mb-0">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-verde-eucalipto">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <Section 
      id="oferta" 
      background="white" 
      className="border-t-4 border-ocre-dourado"
      style={{ background: 'linear-gradient(180deg, hsl(156 15% 42% / 0.05) 0%, hsl(0 0% 100%) 100%)' }}
    >
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <h2 className="font-serif text-2xl md:text-4xl text-grafite-suave mb-6">
          Aqui Está Tudo Que Você Recebe Hoje:
        </h2>
        <p className="text-lead text-grafite-suave/80">
          Você está garantindo <strong className="text-grafite-suave">tudo que precisa</strong> para, em 7 dias, 
          segurar nas mãos um Amigurumi que VOCÊ criou — e sentir, pela primeira vez em muito tempo, 
          calma, orgulho e a certeza de <span className="text-verde-eucalipto font-semibold">"EU CONSEGUI"</span>.
        </p>
      </div>

      {/* Área de Imagem */}
      <div className="max-w-2xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="w-full aspect-[16/7] rounded-lg bg-cinza-nuvem shadow-lg" />
      </div>

      {/* Stack de Itens */}
      <div className="max-w-3xl mx-auto mb-12 space-y-4">
        {itens.map((item, index) => (
          <div 
            key={index}
            className="bg-white border border-verde-eucalipto/20 rounded-xl overflow-hidden shadow-suave animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-verde-eucalipto-10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-verde-eucalipto mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-grafite-suave text-lg">{item.titulo}</h3>
                  <span className="text-verde-eucalipto font-bold">Valor: {item.valor}</span>
                </div>
              </div>
              {openItem === index ? (
                <ChevronUp className="w-5 h-5 text-verde-eucalipto" />
              ) : (
                <ChevronDown className="w-5 h-5 text-verde-eucalipto" />
              )}
            </button>

            {/* Content */}
            {openItem === index && (
              <div className="px-6 pb-6 border-t border-verde-eucalipto/10">
                <div className="pt-4 pl-10">
                  <p className="text-grafite-suave mb-4">{item.descricao}</p>
                  
                  {item.detalhes && (
                    <div className="space-y-4">
                      {item.detalhes.map((modulo, mIndex) => (
                        <div key={mIndex}>
                          <p className="font-semibold text-verde-eucalipto mb-2">📍 {modulo.modulo}</p>
                          <ul className="space-y-1 ml-6">
                            {modulo.items.map((subItem, sIndex) => (
                              <li key={sIndex} className="text-grafite-suave/80 text-sm flex items-start gap-2">
                                <span className="text-rosa-argila">•</span>
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.texto && (
                    <div className="text-grafite-suave/80">
                      {formatText(item.texto)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bônus Card */}
      <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="relative bg-gradient-to-br from-ocre-dourado/10 to-rosa-argila/10 border-2 border-ocre-dourado rounded-xl p-8">
          {/* Selo */}
          <div className="absolute -top-3 -right-3 bg-ocre-dourado text-white font-bold text-xs px-3 py-1 rounded-lg rotate-6 shadow-lg">
            PRIMEIRAS 100
          </div>
          
          <div className="flex items-start gap-4">
            <Gift className="w-8 h-8 text-ocre-dourado flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-grafite-suave text-lg mb-2">
                🎁 BÔNUS: "{bonus.titulo}"
              </h3>
              <p className="text-verde-eucalipto font-bold mb-4">
                Valor: {bonus.valor} → <span className="text-ocre-dourado">GRÁTIS</span>
              </p>
              <ul className="space-y-1 mb-4">
                {bonus.items.map((item, index) => (
                  <li key={index} className="text-grafite-suave/80 flex items-center gap-2">
                    <span className="text-rosa-argila">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-grafite-suave/80">
                Como corrigir em 5 minutos sem desfazer tudo.
              </p>
              <p className="font-semibold text-verde-eucalipto mt-3">
                {bonus.destaque}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown de Valor */}
      <div className="max-w-xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white border-3 border-verde-eucalipto rounded-2xl p-8 md:p-10 shadow-elevada">
          <h3 className="font-bold text-grafite-suave text-center mb-6">
            Valor Se Comprado Separadamente:
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-grafite-suave">
              <span>✅ Plataforma Completa</span>
              <span>R$ 197</span>
            </div>
            <div className="flex justify-between text-grafite-suave">
              <span>✅ Grupo de Suporte</span>
              <span>R$ 97</span>
            </div>
            <div className="flex justify-between text-grafite-suave">
              <span>✅ Receita em PDF</span>
              <span>R$ 27</span>
            </div>
            <div className="flex justify-between text-grafite-suave">
              <span>🎁 BÔNUS</span>
              <span>R$ 47 <span className="text-ocre-dourado">(Grátis)</span></span>
            </div>
          </div>

          <div className="border-t border-verde-eucalipto/20 pt-4 mb-6">
            <div className="flex justify-between text-lg">
              <span className="font-bold text-grafite-suave">TOTAL:</span>
              <span className="line-through text-muted-foreground">R$ 368</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-2">Seu Investimento Hoje:</p>
            <p className="font-serif text-5xl md:text-6xl text-ocre-dourado font-bold">
              R$ 47
            </p>
            <p className="text-verde-eucalipto font-semibold mt-2">
              Ou 3x de R$ 17 sem juros
            </p>
          </div>

          <div className="text-center text-sm text-grafite-suave/80 space-y-1">
            <p>Isso é <strong>menos de R$ 7 por dia</strong>.</p>
            <p>Menos que um café.</p>
            <p>Para <strong className="text-verde-eucalipto">mudar como você se sente</strong>.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <Button variant="primary" size="lg" className="mb-4">
          SIM, Eu Quero Minha Primeira Vitória
        </Button>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lock className="w-4 h-4 text-verde-eucalipto" />
            Acesso imediato
          </span>
          <span className="flex items-center gap-1">
            <CreditCard className="w-4 h-4 text-verde-eucalipto" />
            3x R$ 17 sem juros
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-verde-eucalipto" />
            Garantia de 7 dias
          </span>
        </div>
      </div>
    </Section>
  );
};

export { Oferta };
