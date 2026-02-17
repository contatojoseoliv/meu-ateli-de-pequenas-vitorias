import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageIcon } from "lucide-react";

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
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este não é um curso comum de crochê.</p>
            <p>Este é um <strong>projeto guiado de 7 dias</strong>, onde você aprende fazendo, em partes pequenas, simples e possíveis.</p>
            <p>Você não precisa ter experiência, nem "levar jeito". Só precisa estar disposta a fazer um pouquinho por dia.</p>
            <p>A cada dia você vai avançar um pedacinho do seu amigurumi, até que, no final da semana, ele estará pronto, feito pelas suas próprias mãos.</p>
            <p className="italic text-muted-foreground">Sem pressa. Sem cobrança. Sem perfeição.</p>
          </div>
        ),
      },
      {
        id: "oque-criar",
        title: "O que vamos criar",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ao longo desses 7 dias, você vai produzir:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Um mini coelho amigurumi</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Em formato de chaveiro</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Pequeno, fofo e cheio de personalidade</span>
              </li>
            </ul>
            <p>Ele vai caber na palma da sua mão e vai ser a prova física de que você é capaz de aprender algo novo, com calma.</p>
            <ImagePlaceholder caption="Imagem ilustrativa do coelho." />
          </div>
        ),
      },
      {
        id: "mais-que-croche",
        title: "Mais do que crochê",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este projeto também é um exercício de desacelerar.</p>
            <p>Enquanto suas mãos se movem:</p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Sua respiração fica mais calma</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Seus pensamentos diminuem</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Seu corpo relaxa</span>
              </li>
            </ul>
            <p>O movimento repetitivo do fio e da agulha ajuda a tirar a mente do excesso e trazer você para o presente.</p>
          </div>
        ),
      },
      {
        id: "sem-jeito-certo",
        title: 'Não existe "jeito certo"',
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você vai errar pontos. Vai desmanchar partes. Vai achar que não está bonito.</p>
            <p><strong>Isso faz parte do processo.</strong></p>
            <p>Cada erro é só um passo aprendendo. Nada aqui precisa ser perfeito, só precisa ser seu.</p>
          </div>
        ),
      },
      {
        id: "como-funciona",
        title: "Como funciona a jornada",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada dia terá:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Objetivo simples</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Tempo curto de prática</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Parte do coelho para fazer</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Orientações passo a passo</span>
              </li>
            </ul>
            <Separator className="my-4" />
            <div className="text-center space-y-2">
              <p className="font-medium">Respire fundo.</p>
              <p className="text-primary">Seu coelhinho já está a caminho.</p>
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
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começarmos, você precisará de alguns materiais simples. Vamos usar apenas o necessário.</p>
            <p>Talvez os nomes sejam novos para você e está tudo bem. Aqui você vai entender o que é cada item e onde comprar.</p>
          </div>
        ),
      },
      {
        id: "mat-fio",
        title: 'Fio — o "corpo" do seu coelho',
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio é o material principal. Ele vai formar cada ponto.</p>
            <StoreTip>
              <p className="text-sm font-bold text-primary">Peça na loja:</p>
              <p className="text-sm mt-1">"Fio de algodão para amigurumi, para usar com agulha 2.0 ou 2.5 mm"</p>
            </StoreTip>
            <p><strong>Dica de Cor:</strong> Cores claras são melhores no começo (branco, bege, rosa claro) pois facilitam a visualização dos pontos.</p>
            <ImagePlaceholder caption="Novelo de fio claro, espessura média." />
          </div>
        ),
      },
      {
        id: "mat-agulha",
        title: "Agulha de crochê",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para esse mini coelho, o tamanho da agulha é importante.</p>
            <StoreTip>
              <p className="text-sm font-bold text-primary">Peça na loja:</p>
              <p className="text-sm mt-1">"Agulha de crochê 2.0 mm ou 2.5 mm"</p>
            </StoreTip>
            <p>Esse tamanho ajuda o coelho a ficar firme e sem buracos.</p>
            <ImagePlaceholder caption="Close do número da agulha marcado no cabo." />
          </div>
        ),
      },
      {
        id: "mat-enchimento",
        title: "Enchimento",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>É o material que vai dentro do coelhinho para deixá-lo fofinho.</p>
            <StoreTip>
              <p className="text-sm font-bold text-primary">Peça na loja:</p>
              <p className="text-sm mt-1">"Enchimento para almofada" ou "Fibra siliconada"</p>
            </StoreTip>
            <ImagePlaceholder caption="Mão segurando um pequeno tufo de enchimento." />
          </div>
        ),
      },
      {
        id: "mat-olhos",
        title: "Olhos",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para o tamanho de chaveiro, o ideal é:</p>
            <StoreTip>
              <p className="text-sm font-bold text-primary">Peça na loja:</p>
              <p className="text-sm mt-1">"Olhos de segurança entre 6 mm e 8 mm para amigurumi"</p>
            </StoreTip>
            <ImagePlaceholder caption="Olhos de segurança pequenos." />
          </div>
        ),
      },
      {
        id: "mat-resumo",
        title: "Resumo simples",
        emoji: "",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Com isso você já consegue fazer seu coelho:</p>
            <ul className="space-y-2 pl-1">
              {["Fio de algodão", "Agulha 2.0–2.5 mm", "Enchimento", "Olhos", "Agulha de tapeçaria", "Marcador"].map((item) => (
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
        title: "Antes de começar",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Vamos conhecer as técnicas básicas. Você não precisa entender tudo agora, apenas o suficiente para dar os primeiros pontos.</p>
          </div>
        ),
      },
      {
        id: "fund-agulha",
        title: "Como segurar a agulha",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Segure a agulha como se fosse um <strong>lápis</strong> ou um <strong>talher</strong>. O importante é que sua mão fique confortável.</p>
            <ImagePlaceholder caption="Mão segurando a agulha como lápis." />
          </div>
        ),
      },
      {
        id: "fund-ponto",
        title: "O que é um ponto?",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada vez que você entra com a agulha, puxa o fio e forma uma laçada, você cria um ponto. Depois de pronto, ele parece um <strong>"V" deitado</strong>.</p>
            <ImagePlaceholder caption='Formato de "V" dos pontos.' />
          </div>
        ),
      },
      {
        id: "fund-tecnicas",
        title: "Técnicas principais",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sigla</TableHead>
                  <TableHead>Significa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">MR</TableCell>
                  <TableCell>Anel mágico (início do círculo)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">pb</TableCell>
                  <TableCell>Ponto baixo (ponto principal)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">aum</TableCell>
                  <TableCell>Aumento (2 pontos no mesmo lugar)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">dim</TableCell>
                  <TableCell>Diminuição (2 pontos viram 1)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ),
      },
    ],
  },
];