import { Check, ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ── Helpers ── */

export function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="app-photo-frame rounded-lg border border-border p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground my-4">
      <ImageIcon className="h-8 w-8" />
      <p className="text-xs text-center leading-relaxed">{caption}</p>
    </div>
  );
}

export function StoreTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-tip rounded-lg border border-border p-4 my-3">
      {children}
    </div>
  );
}

/* ── Types ── */

export type Topic = {
  id: string;
  title: string;
  emoji: string;
  content: React.ReactNode;
};

export type IntroCardData = {
  title: string;
  emoji: string;
  tintClass: string;
  topics: Topic[];
};

// Estilos comuns para tabelas artesanais
const tableHeaderClass = "bg-verde-eucalipto/10 text-verde-eucalipto font-bold uppercase text-[10px] tracking-wider";
const tableRowClass = "hover:bg-verde-eucalipto/5 transition-colors border-b border-verde-eucalipto/10";
const tableCellClass = "py-3 text-grafite-suave";

/* ── Card content ── */

export const INTRO_CARD_CONTENTS: IntroCardData[] = [
  /* ═══ Card 0: Comece Por Aqui ═══ */
  {
    title: "Seu primeiro amigurumi, um dia de cada vez",
    emoji: "💛",
    tintClass: "app-daycard--mint",
    topics: [
      {
        id: "bem-vinda",
        title: "Seja Muito Bem-vinda!",
        emoji: "🤗",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este não é um curso comum de crochê.</p>
            <p>Este é um projeto guiado de 7 dias, onde você aprende fazendo, em partes pequenas, simples e possíveis.</p>
            <p>Você não precisa ter experiência, nem "levar jeito".</p>
            <p>Só precisa estar disposta a fazer um pouquinho por dia 💫</p>
            <p>A cada dia você vai avançar um pedacinho do seu amigurumi, até que, no final da semana, ele estará pronto, feito pelas suas próprias mãos.</p>
            <p>Sem pressa. Sem cobrança. Sem perfeição.</p>
          </div>
        ),
      },
      {
        id: "oque-criar",
        title: "O que vamos criar",
        emoji: "🐰",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ao longo desses 7 dias, você vai produzir:</p>
            <p>✨ Um mini coelho amigurumi</p>
            <p>✨ Em formato de chaveiro</p>
            <p>✨ Pequeno, fofo e cheio de personalidade</p>
            <p>Ele vai caber na palma da sua mão e vai ser a prova física de que você é capaz de aprender algo novo, com calma.</p>
            <p>Pensamos em algo que representasse o começo da sua jornada criativa: um símbolo de curiosidade, superação e delicadeza.</p>
            <ImagePlaceholder caption="Imagem ilustrativa do coelho." />
          </div>
        ),
      },
      {
        id: "mais-que-croche",
        title: "Mais do que crochê",
        emoji: "🧠",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este projeto também é um exercício de desacelerar.</p>
            <p>Enquanto suas mãos se movem:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>sua respiração fica mais calma</li>
              <li>seus pensamentos diminuem</li>
              <li>seu corpo relaxa</li>
            </ul>
            <p>O movimento repetitivo do fio e da agulha ajuda a tirar a mente do excesso e trazer você para o presente.</p>
            <p>Aqui, o importante não é só o coelhinho.</p>
            <p>É o momento que você cria para você mesma.</p>
          </div>
        ),
      },
      {
        id: "sem-jeito-certo",
        title: 'Não existe "jeito certo"',
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você vai errar pontos.</p>
            <p>Vai desmanchar partes.</p>
            <p>Vai achar que não está bonito.</p>
            <p>Isso faz parte do processo.</p>
            <p>Cada erro é só um passo aprendendo.</p>
            <p>Nada aqui precisa ser perfeito, só precisa ser seu.</p>
          </div>
        ),
      },
      {
        id: "como-funciona",
        title: "Como funciona a jornada",
        emoji: "📆",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada dia terá:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Um objetivo simples</li>
              <li>Um tempo curto de prática</li>
              <li>Uma parte do coelho para fazer</li>
              <li>Orientações passo a passo</li>
              <li>Dicas para relaxar</li>
              <li>Ajuda com erros comuns</li>
            </ul>
            <p>Você só precisa fazer o dia de hoje.</p>
            <p>Não pense no resto.</p>
            <Separator className="my-4" />
            <div className="text-center space-y-2">
              <p>Respire fundo.</p>
              <p>Seu coelhinho já está a caminho. 🐰✨</p>
            </div>
          </div>
        ),
      },
    ],
  },

  /* ═══ Card 1: Materiais ═══ */
  {
    title: "Materiais (só o essencial)",
    emoji: "🧺",
    tintClass: "app-daycard--clay",
    topics: [
      {
        id: "mat-intro",
        title: "Antes de começar",
        emoji: "🧺",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começarmos, você precisará de alguns materiais simples.</p>
            <p>Para este projeto, vamos usar apenas o necessário. A simplicidade faz parte da experiência.</p>
            <p>Talvez os nomes sejam novos para você e está tudo bem.</p>
            <p>Aqui você vai entender:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>O que é cada item</li>
              <li>para que ele serve</li>
              <li>onde comprar e como reconhecer na loja</li>
              <li>o que pedir</li>
              <li>alternativas caso não encontre igual</li>
            </ul>
            <p>Respire. Nada aqui é complicado.</p>
            <p className="font-medium">Lista de Materiais em PDF (LINK)</p>
          </div>
        ),
      },
      {
        id: "mat-fio",
        title: 'Fio — o "corpo" do seu coelho',
        emoji: "🧶",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio é o material principal, como se fosse o "tecido" do coelho.</p>
            <p>Ele vai formar cada ponto.</p>
            <StoreTip>
              <p className="text-sm font-medium">Peça na loja:</p>
              <p className="text-sm mt-1">🗣️ "Fio de algodão para amigurumi, para usar com agulha 2.0 ou 2.5 mm"</p>
            </StoreTip>
            <p>✔ Por que esse fio é o ideal para ESTE projeto?</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Ele é firme → o coelho mantém a forma</li>
              <li>Não estica demais → os pontos não abrem</li>
              <li>Ajuda o amigurumi a ficar bem definido</li>
            </ul>
            <p className="font-bold">🎨 Cor</p>
            <p>Cores claras são melhores no começo:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>branco (coelho clássico)</li>
              <li>bege</li>
              <li>rosa claro</li>
              <li>cinza claro</li>
            </ul>
            <p>Cores escuras dificultam ver os pontos enquanto você aprende.</p>
            <p className="font-bold">📍 Onde comprar</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>armarinhos</li>
              <li>lojas de artesanato</li>
              <li>lojas de aviamentos</li>
              <li>online (buscar: "fio amigurumi algodão")</li>
            </ul>
            <ImagePlaceholder caption="Novelo de fio claro, espessura média, em fundo neutro." />
          </div>
        ),
      },
      {
        id: "mat-agulha",
        title: "Agulha de crochê (a ferramenta principal)",
        emoji: "🪡",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para esse mini coelho, o tamanho da agulha é importante.</p>
            <p>Você vai pedir:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Agulha de crochê 2.0 mm ou 2.5 mm"</p>
            </StoreTip>
            <p>Isso costuma estar escrito no cabo da agulha.</p>
            <p>Esse tamanho ajuda o coelho a:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>ficar pequeno</li>
              <li>não ficar cheio de buracos</li>
              <li>segurar o enchimento sem aparecer</li>
            </ul>
            <p>Se usar agulha maior, o coelho fica frouxo.</p>
            <p>Se usar muito pequena, fica difícil de puxar o fio.</p>
            <p className="font-bold">📍 Onde encontrar</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>armarinhos</li>
              <li>lojas de artesanato</li>
              <li>kits de crochê online</li>
            </ul>
            <ImagePlaceholder caption="Close do número da agulha marcado no cabo." />
          </div>
        ),
      },
      {
        id: "mat-enchimento",
        title: "Enchimento (o que deixa o coelho fofinho)",
        emoji: "☁️",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É o material que vai dentro do coelhinho.</p>
            <p>Você pode pedir:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Enchimento para almofada" ou "Fibra siliconada"</p>
            </StoreTip>
            <p>Ele parece um algodão sintético.</p>
            <p>Não precisa de muito — um saquinho pequeno já serve.</p>
            <ImagePlaceholder caption="Mão segurando um pequeno tufo de enchimento." />
          </div>
        ),
      },
      {
        id: "mat-olhos",
        title: "Olhos",
        emoji: "👀",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para o tamanho de chaveiro, o ideal é:</p>
            <p>Peça:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Olhos de segurança entre 6 mm e 8 mm para amigurumi"</p>
            </StoreTip>
            <p>Eles têm uma travinha atrás que prende na peça.</p>
            <p>Se não tiver, você pode bordar com linha preta depois.</p>
            <ImagePlaceholder caption="Olhos de segurança pequenos ao lado de uma moeda." />
          </div>
        ),
      },
      {
        id: "mat-marcador",
        title: "Marcador de ponto",
        emoji: "🧷",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ajuda você a saber onde começa cada volta.</p>
            <p>Peça:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Marcador de ponto para crochê"</p>
            </StoreTip>
            <p>Mas você também pode usar:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>fio de outra cor</li>
              <li>clipe</li>
              <li>grampo de cabelo</li>
            </ul>
            <ImagePlaceholder caption="Marcador preso em um ponto do crochê." />
          </div>
        ),
      },
      {
        id: "mat-tapecaria",
        title: "Agulha de tapeçaria",
        emoji: "🧵",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É uma agulha de ponta arredondada usada para costurar as partes e esconder fios.</p>
            <p>Peça:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Agulha de tapeçaria" ou "Agulha de ponta arredondada para lã"</p>
            </StoreTip>
            <p>Ela é mais grossa que agulha de costura comum.</p>
            <ImagePlaceholder caption="Comparação entre agulha de tapeçaria e agulha comum." />
          </div>
        ),
      },
      {
        id: "mat-argola",
        title: "Argola de chaveiro (opcional, mas recomendada)",
        emoji: "🔑",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para transformar seu coelho em chaveiro.</p>
            <p>Você encontra como:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>argola de chaveiro</li>
              <li>argola metálica com corrente</li>
            </ul>
            <ImagePlaceholder caption="Argola de chaveiro metálica simples." />
          </div>
        ),
      },
      {
        id: "mat-resumo",
        title: "Resumo simples",
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Com isso você já consegue fazer seu coelho:</p>
            <ul className="space-y-1.5 pl-1">
              {["fio de algodão", "agulha 2.0–2.5 mm", "enchimento", "olhos", "agulha de tapeçaria", "marcador (ou improviso)"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Nada além disso é necessário.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══ Card 2: Fundamentos ═══ */
  {
    title: "Técnicas sem complicação",
    emoji: "🧵",
    tintClass: "app-daycard--gold",
    topics: [
      {
        id: "fund-intro",
        title: "Antes de começar",
        emoji: "🧵",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começar o coelhinho, você só precisa entender algumas coisas simples. Você não precisa entender tudo sobre crochê agora. Só o suficiente para conseguir dar os primeiros pontos.</p>
            <p>Vamos por partes, bem devagar.</p>
          </div>
        ),
      },
      {
        id: "fund-agulha",
        title: "Como segurar a agulha",
        emoji: "✋",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Não existe uma única forma certa.</p>
            <p>O importante é que sua mão fique confortável.</p>
            <p>Segure a agulha como se fosse:</p>
            <p>✏️ um lápis ou 🍴 um talher</p>
            <p>O cabo da agulha descansa na sua mão, e a ponta curva fica livre para trabalhar.</p>
            <p>Se sua mão cansar, pare um pouco. Isso é normal no começo.</p>
            <ImagePlaceholder caption="Close na mão segurando a agulha como lápis." />
          </div>
        ),
      },
      {
        id: "fund-fio",
        title: "Como segurar o fio",
        emoji: "🧶",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio não precisa ficar apertado demais.</p>
            <p>Passe o fio:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>por cima do dedo indicador</li>
              <li>por baixo dos outros dedos</li>
            </ul>
            <p>Assim você controla a tensão (a "força" do fio).</p>
            <p>Se o ponto estiver difícil de puxar → está apertado demais.</p>
            <p>Se estiver frouxo e com buracos → está solto demais.</p>
            <p>O ponto ideal é firme, mas confortável.</p>
            <ImagePlaceholder caption="Fio passando pelo dedo indicador da mão." />
          </div>
        ),
      },
      {
        id: "fund-ponto",
        title: "O que é um ponto?",
        emoji: "🔄",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada vez que você:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Entra com a agulha no trabalho</li>
              <li>Puxa o fio</li>
              <li>Forma uma laçada</li>
            </ol>
            <p>Você cria um ponto.</p>
            <p>Depois de pronto, o ponto parece um "V" deitado.</p>
            <p>É isso que você vai repetir muitas vezes.</p>
            <ImagePlaceholder caption='Close mostrando o formato de "V" dos pontos.' />
          </div>
        ),
      },
      {
        id: "fund-contar",
        title: 'O que é "contar pontos"',
        emoji: "🔢",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada ponto é como um "V" pequenininho.</p>
            <p>Quando a receita disser (12), significa:</p>
            <p>👉 aquela volta deve ter 12 pontos no total.</p>
            <p>Contar ajuda a peça ficar do tamanho certo.</p>
            <p>Não precisa contar toda hora — só no final da volta.</p>
            <ImagePlaceholder caption='Close mostrando vários "Vzinhos" alinhados.' />
          </div>
        ),
      },
      {
        id: "fund-voltas",
        title: 'O que são "voltas" ou "carreiras"',
        emoji: "🔄",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O amigurumi é feito em forma de espiral.</p>
            <p>Você começa no centro e vai girando ao redor, como um caracol 🐌</p>
            <p>Cada volta completa é chamada de:</p>
            <p className="font-medium">carreira ou volta</p>
            <p>Você não vira o trabalho. Só continua girando.</p>
            <ImagePlaceholder caption="Pequeno círculo de crochê mostrando formato espiral." />
          </div>
        ),
      },
      {
        id: "fund-tecnicas",
        title: "Técnicas que vamos usar no coelho",
        emoji: "🧩",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos conhecer as 4 técnicas que constroem quase todo o amigurumi.</p>
            <p>Essas são as únicas que você precisa saber agora:</p>
            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Sigla</TableHead>
                    <TableHead className="text-verde-eucalipto">Significa</TableHead>
                    <TableHead className="text-verde-eucalipto">O que acontece</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>MR</TableCell>
                    <TableCell className={tableCellClass}>Anel mágico</TableCell>
                    <TableCell className={tableCellClass}>Começa fazendo um círculo onde os primeiros pontos são feitos, sem deixar buraco</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>pb</TableCell>
                    <TableCell className={tableCellClass}>Ponto baixo</TableCell>
                    <TableCell className={tableCellClass}>O ponto principal do coelho: introduz a agulha no ponto, puxa o fio e fecha tudo de uma vez</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>aum</TableCell>
                    <TableCell className={tableCellClass}>Aumento</TableCell>
                    <TableCell className={tableCellClass}>Faz dois pontos baixos no mesmo ponto de base, aumentando a quantidade de pontos</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>dim</TableCell>
                    <TableCell className={tableCellClass}>Diminuição</TableCell>
                    <TableCell className={tableCellClass}>Une dois pontos de base em um único ponto baixo, diminuindo a quantidade de pontos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p>Você vai aprender cada uma enquanto usa.</p>
          </div>
        ),
      },
      {
        id: "fund-mr",
        title: "MR — Anel mágico (onde tudo começa)",
        emoji: "🌀",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É um jeito de começar fazendo um círculo bem fechadinho.</p>
            <p>Você vai:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Enrolar o fio no dedo formando um círculo</li>
              <li>Colocar a agulha por dentro desse círculo</li>
              <li>Puxar o fio</li>
              <li>Fazer pontos dentro desse círculo</li>
              <li>Puxar a ponta do fio para fechar</li>
            </ol>
            <p>Parece difícil, mas você fará devagar no Dia 1.</p>
            <ImagePlaceholder caption="Sequência mostrando o fio enrolado no dedo formando o círculo." />
          </div>
        ),
      },
      {
        id: "fund-pb",
        title: "pb — Ponto baixo (o ponto principal)",
        emoji: "➖",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Quase todo o coelho é feito com ele.</p>
            <p className="font-bold">Passo a passo do ponto baixo:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Insira a agulha no próximo ponto (embaixo do "V").</li>
              <li>Pegue o fio com a agulha.</li>
              <li>Puxe — agora há 2 laçadas na agulha.</li>
              <li>Pegue o fio novamente.</li>
              <li>Puxe passando pelas 2 laçadas.</li>
            </ol>
            <p>Pronto. Você fez 1 ponto baixo.</p>
            <ImagePlaceholder caption="Sequência mostrando 2 laçadas na agulha antes de fechar o ponto." />
          </div>
        ),
      },
      {
        id: "fund-aum",
        title: "aum — Aumento",
        emoji: "➕",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É quando você faz 2 pontos no mesmo lugar.</p>
            <p>Isso faz a peça crescer e ficar redonda.</p>
            <p>Você faz:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>um ponto baixo</li>
              <li>sem sair do lugar, faz outro no mesmo ponto</li>
            </ul>
          </div>
        ),
      },
      {
        id: "fund-dim",
        title: "dim — Diminuição",
        emoji: "➖",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É quando você transforma 2 pontos em 1.</p>
            <p>Isso faz a peça fechar, como quando formamos a cabeça.</p>
            <p>Você vai:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>entrar no primeiro ponto</li>
              <li>depois no próximo</li>
              <li>puxar o fio</li>
              <li>fechar tudo junto</li>
            </ul>
            <p>Vamos ver isso na prática mais pra frente.</p>
          </div>
        ),
      },
      {
        id: "fund-lembrar",
        title: "O que você precisa lembrar",
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você não precisa decorar.</p>
            <p>Você só precisa tentar.</p>
            <p>O crochê é movimento repetido.</p>
            <p>Sua mão aprende aos poucos.</p>
            <Separator className="my-4" />
            <p>Agora que você já sabe o básico, podemos começar de verdade.</p>
          </div>
        ),
      },
    ],
  },
];