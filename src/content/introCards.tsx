import { Check, ImageIcon, Info, Lightbulb, Target, BookOpen, Package, PenTool } from "lucide-react";
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
    <div className="app-tip rounded-lg border border-border p-4 my-3 flex gap-3 items-start">
      <Lightbulb className="h-5 w-5 text-ocre-dourado shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Types ── */

export type Topic = {
  id: string;
  title: string;
  emoji: React.ReactNode;
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
    emoji: "🌱",
    tintClass: "app-daycard--mint",
    topics: [
      {
        id: "bem-vinda",
        title: "Seja Muito Bem-vinda!",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este não é um curso comum de crochê.</p>
            <p>Este é um projeto guiado de 7 dias, onde você aprende fazendo, em partes pequenas, simples e possíveis.</p>
            <p>Você não precisa ter experiência, nem "levar jeito". Só precisa estar disposta a fazer um pouquinho por dia.</p>
            <p>A cada dia você vai avançar um pedacinho do seu amigurumi, até que, no final da semana, ele estará pronto, feito pelas suas próprias mãos.</p>
            <p className="italic text-muted-foreground">Sem pressa. Sem cobrança. Sem perfeição.</p>
          </div>
        ),
      },
      {
        id: "oque-criar",
        title: "O que vamos criar",
        emoji: <PenTool className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ao longo desses 7 dias, você vai produzir:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Um mini coelho amigurumi</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Em formato de chaveiro</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Pequeno, fofo e cheio de personalidade</span>
              </li>
            </ul>
            <p>Ele vai caber na palma da sua mão e vai ser a prova física de que você é capaz de aprender algo novo, com calma.</p>
            <ImagePlaceholder caption="O coelho que você terá em mãos ao final da jornada." />
          </div>
        ),
      },
      {
        id: "mais-que-croche",
        title: "Mais do que crochê",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este projeto também é um exercício de desacelerar.</p>
            <p>Enquanto suas mãos se movem, sua respiração fica mais calma, seus pensamentos diminuem e seu corpo relaxa.</p>
            <p>O movimento repetitivo do fio e da agulha ajuda a tirar a mente do excesso e trazer você para o presente.</p>
            <p>Aqui, o importante não é só o coelhinho. É o momento que você cria para você mesma.</p>
          </div>
        ),
      },
      {
        id: "como-funciona",
        title: "Como funciona a jornada",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada dia terá um objetivo simples e um tempo curto de prática. Você só precisa fazer o dia de hoje. Não pense no resto.</p>
            <Separator className="my-4" />
            <div className="text-center space-y-2">
              <p className="font-medium">Respire fundo.</p>
              <p>Seu coelhinho já está a caminho.</p>
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
        emoji: <Package className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começarmos, você precisará de alguns materiais simples. A simplicidade faz parte da experiência.</p>
            <p>Aqui você vai entender o que é cada item, para que serve e como reconhecer na loja.</p>
            <p className="font-medium text-primary underline cursor-pointer">Baixar Lista de Materiais em PDF</p>
          </div>
        ),
      },
      {
        id: "mat-fio",
        title: 'Fio — o "corpo" do seu coelho',
        emoji: <div className="h-5 w-5 rounded-full bg-rosa-argila/30" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio é o material principal, como se fosse o "tecido" do coelho. Ele vai formar cada ponto.</p>
            <StoreTip>
              <p className="font-medium">Peça na loja:</p>
              <p>"Fio de algodão para amigurumi, para usar com agulha 2.0 ou 2.5 mm"</p>
            </StoreTip>
            <p className="font-bold">Cores recomendadas</p>
            <p>Cores claras são melhores no começo (branco, bege, rosa claro ou cinza claro). Cores escuras dificultam ver os pontos enquanto você aprende.</p>
            <ImagePlaceholder caption="Novelo de fio claro, espessura média." />
          </div>
        ),
      },
      {
        id: "mat-agulha",
        title: "Agulha de crochê",
        emoji: <PenTool className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para esse mini coelho, o tamanho da agulha é importante para que ele fique firme e sem buracos.</p>
            <StoreTip>
              <p>Peça por: "Agulha de crochê 2.0 mm ou 2.5 mm"</p>
            </StoreTip>
            <p>Esse tamanho ajuda o coelho a ficar pequeno e segurar o enchimento sem aparecer.</p>
            <ImagePlaceholder caption="O número da agulha costuma estar marcado no cabo." />
          </div>
        ),
      },
      {
        id: "mat-resumo",
        title: "Resumo da lista",
        emoji: <Check className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Com isso você já consegue fazer seu coelho:</p>
            <ul className="space-y-2">
              {["Fio de algodão", "Agulha 2.0–2.5 mm", "Enchimento (fibra siliconada)", "Olhos de segurança (6mm a 8mm)", "Agulha de tapeçaria", "Marcador de ponto"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
        title: "O básico necessário",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você não precisa entender tudo sobre crochê agora. Só o suficiente para conseguir dar os primeiros pontos.</p>
            <p>Vamos por partes, bem devagar, focando no que realmente importa para o seu coelhinho.</p>
          </div>
        ),
      },
      {
        id: "fund-ponto",
        title: "O que é um ponto?",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada vez que você entra com a agulha, puxa o fio e forma uma laçada, você cria um ponto. Depois de pronto, ele parece um "V" deitado.</p>
            <ImagePlaceholder caption='O formato de "V" que você repetirá muitas vezes.' />
          </div>
        ),
      },
      {
        id: "fund-tecnicas",
        title: "As 4 técnicas principais",
        emoji: <Check className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Essas são as únicas que você precisa conhecer para este projeto:</p>
            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Sigla</TableHead>
                    <TableHead className="text-verde-eucalipto">Técnica</TableHead>
                    <TableHead className="text-verde-eucalipto">Função</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>MR</TableCell>
                    <TableCell className={tableCellClass}>Anel mágico</TableCell>
                    <TableCell className={tableCellClass}>Inicia o círculo central</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>pb</TableCell>
                    <TableCell className={tableCellClass}>Ponto baixo</TableCell>
                    <TableCell className={tableCellClass}>O ponto principal do corpo</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>aum</TableCell>
                    <TableCell className={tableCellClass}>Aumento</TableCell>
                    <TableCell className={tableCellClass}>Faz a peça crescer</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={`${tableCellClass} font-bold`}>dim</TableCell>
                    <TableCell className={tableCellClass}>Diminuição</TableCell>
                    <TableCell className={tableCellClass}>Faz a peça fechar</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ),
      },
    ],
  },
];