import { Section } from "@/components/shared/Section";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Seção FAQ - Accordion com 9 perguntas
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: "Eu nunca fiz isso na vida. Isso é para mim?",
      resposta: `Sim. Especialmente para você.

Este método foi criado **para quem nunca fez**.

Não assume que você sabe nada. Não pula etapas. Não usa jargão sem explicar.

**Você começa do zero absoluto.**

E em 7 dias, você tem algo nas mãos que VOCÊ criou.

**A única coisa que você precisa:**
• 15-20 minutos por dia
• Vontade de provar para si mesma que consegue

O resto, a gente te ensina.`
    },
    {
      pergunta: "Eu JÁ tentei fazer amigurumi antes e desisti. Por que vai funcionar agora?",
      resposta: `Porque desta vez você não está sozinha com tutoriais soltos.

**Você tentou antes e:**
• Achou 50 vídeos diferentes (cada um ensina diferente)
• Ficou perdida
• Travou em algum ponto (anel mágico? costura?)
• Não tinha ninguém para perguntar
• Interpretou dificuldade como "eu não levo jeito"
• Desistiu

**Aqui é diferente:**

✅ **Sistema estruturado** (não tutoriais soltos) — passo 1, 2, 3... sem pulos
✅ **Suporte constante** (grupo) — quando travar, tem alguém
✅ **Correção de erros ensinada** — "todo mundo erra aqui, faz assim"

**A diferença é o sistema, suporte e técnica.**`
    },
    {
      pergunta: "Eu não tenho tempo. Como vou encaixar isso?",
      resposta: `15 minutos por dia.

Menos tempo do que você passa no Instagram antes de dormir.

**E aqui está o que acontece:**

Esses 15 minutos vão se tornar **o seu momento favorito do dia**.

Porque não é mais uma obrigação na sua lista.

É o seu **respiro**.

É quando a mente para. É quando você faz algo só para VOCÊ.`
    },
    {
      pergunta: "Por quanto tempo tenho acesso ao conteúdo?",
      resposta: `Vitalício.

Você compra uma vez e acessa para sempre.

Quer refazer daqui 6 meses? Está lá. Quer pausar e voltar depois? Sem problema.

O acesso é seu. Sem expiração, sem renovação, sem pegadinha.`
    },
    {
      pergunta: "E se eu errar?",
      resposta: `Você VAI errar. E está tudo bem.

**Todo mundo erra.**

A gente te ensina a **corrigir sem frustração**.

Erro não é falha. É **aprendizado**.

Além disso, quando você trava, você tem **suporte**. Grupo no WhatsApp. Gente que já passou por isso.

**Você não está sozinha no erro.**

E quando você não está sozinha, você não interpreta erro como prova de incapacidade.

**Você interpreta como: "Estou aprendendo. E está tudo bem."**`
    },
    {
      pergunta: "E se não for para mim? E se eu realmente não levar jeito?",
      resposta: `Esse medo é real. E é exatamente por isso que existe a **Garantia Total — 7 dias**.

**Como funciona:**

Você tem 7 dias completos para testar tudo.

Assista os vídeos. Compre os materiais. Comece o projeto. Sinta se é para você.

Se em qualquer momento você sentir que não é o que esperava — **por qualquer motivo** —

Me manda um único e-mail.

E eu devolvo **100% do seu dinheiro**.

Sem perguntas. Sem burocracia. Sem julgamento.

**O risco é TODO meu.**

Mas eu confio que quando você sentir:
• A calma do primeiro ponto
• A concentração total no processo
• O orgulho de terminar algo do início ao fim

...você vai saber que encontrou algo especial.`
    },
    {
      pergunta: "Tenho vergonha de mostrar. E se ficar feio?",
      resposta: `Você não precisa mostrar para ninguém. Pode ser só SEU.

**Mas aqui está o que acontece:**

No início, pode parecer "torto". Diferente do que imaginou.

**E tudo bem — é assim que começa.**

Mas a cada projeto você evolui.

Os pontos ficam mais firmes. As mãos ganham segurança.

E sem perceber, o orgulho cresce junto.

Chega um momento em que você não só termina — você **quer mostrar**.

Não porque está perfeito. Mas porque foi feito por você.

**Imperfeito não é erro. É processo.**

E quando você vê outras mulheres no grupo mostrando seus primeiros — todos diferentes, todos únicos, todos lindos —

Você entende: o que é feito com presença e carinho **tem valor. Sempre.**`
    },
    {
      pergunta: "Sou velha demais para começar algo novo?",
      resposta: `Não existe "velha demais" para aprender algo que te faz bem.

**Aliás:**

Estudos mostram que atividades manuais são **especialmente benéficas** para manter o cérebro ativo e saudável em qualquer idade.

**Você não está "velha demais".**

Você está na **idade perfeita** para se presentear com algo que te traz calma, orgulho e reconexão.

Quantas mulheres de 60, 70, 80 anos você vê criando coisas lindas?

Idade nunca foi barreira.

**A única coisa que te impede de começar é a decisão de NÃO começar.**`
    },
    {
      pergunta: "Vou procrastinar. Vou deixar para depois.",
      resposta: `Quanto tempo você já passou **pensando** em fazer algo assim?

Meses? Anos?

Pensar mais não vai mudar nada.

**Mas começar hoje pode mudar tudo.**

A primeira vitória está a 7 dias de distância.

**7 dias.**

A pergunta é: você quer esperar mais quanto tempo?

Quanto tempo você ainda vai viver com ansiedade, autocrítica, sensação de "nunca consigo"?

**Ou você decide, hoje, que vai mudar isso.**

Não "um dia".

Não "quando tiver tempo".

**Hoje.**`
    }
  ];

  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      // Handle bullet points
      if (paragraph.includes('\n•') || paragraph.startsWith('•')) {
        const lines = paragraph.split('\n');
        const bullets = lines.filter(l => l.startsWith('•'));
        const intro = lines.filter(l => !l.startsWith('•')).join(' ');
        
        return (
          <div key={i} className="mb-4">
            {intro && <p className="mb-2">{formatInline(intro)}</p>}
            <ul className="list-none space-y-1 ml-4">
              {bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-rosa-argila">•</span>
                  <span>{formatInline(bullet.substring(2))}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Handle checkmark items
      if (paragraph.includes('\n✅') || paragraph.startsWith('✅')) {
        const lines = paragraph.split('\n');
        return (
          <div key={i} className="mb-4 space-y-2">
            {lines.map((line, j) => (
              <p key={j}>{formatInline(line)}</p>
            ))}
          </div>
        );
      }

      return (
        <p key={i} className="mb-4 last:mb-0">
          {formatInline(paragraph)}
        </p>
      );
    });
  };

  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-verde-eucalipto">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <Section id="faq" background="white">
      {/* Título */}
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
        <h2 className="font-serif text-3xl md:text-h2 text-grafite-suave">
          Perguntas Frequentes:
        </h2>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`
                w-full flex items-center justify-between p-5 md:p-6 text-left rounded-xl
                border transition-all duration-300
                ${openIndex === index 
                  ? 'bg-verde-eucalipto-10 border-verde-eucalipto' 
                  : 'bg-white border-verde-eucalipto/15 hover:bg-verde-eucalipto-10/50'
                }
              `}
            >
              <span className="font-semibold text-grafite-suave text-base md:text-lg pr-4">
                {faq.pergunta}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-verde-eucalipto flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {openIndex === index && (
              <div className="ml-5 md:ml-8 mt-2 pl-4 md:pl-6 border-l-3 border-verde-eucalipto bg-white rounded-r-lg p-4 md:p-6">
                <div className="text-body text-grafite-suave/90 leading-relaxed">
                  {formatText(faq.resposta)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export { FAQ };
