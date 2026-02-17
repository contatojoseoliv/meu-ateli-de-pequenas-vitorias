import { Check, Info, Lightbulb, Target, BookOpen, Scissors, Heart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImagePlaceholder } from "@/content/introCards";
import type { IntroCardData } from "@/content/introCards";

const tints = ["app-daycard--mint", "app-daycard--clay", "app-daycard--gold"];

// Estilos comuns para tabelas artesanais
const tableHeaderClass = "bg-verde-eucalipto/10 text-verde-eucalipto font-bold uppercase text-[10px] tracking-wider";
const tableRowClass = "hover:bg-verde-eucalipto/5 transition-colors border-b border-verde-eucalipto/10";
const tableCellClass = "py-3 text-grafite-suave";

export const DAY_CONTENTS: IntroCardData[] = [
  /* ═══════════════════════════════════════════
     DIA 1 — Seu primeiro ponto e o anel mágico
     ═══════════════════════════════════════════ */
  {
    title: "Seu primeiro ponto e o anel mágico",
    emoji: "1",
    tintClass: tints[0],
    topics: [
      {
        id: "d1-prep",
        title: "Preparação",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Respire fundo. Se a mão travar ou o fio embolar, saiba que isso é perfeitamente normal.</p>
            <p>Ninguém faz perfeito no primeiro dia. Seu objetivo hoje não é a estética, mas sim aprender o movimento básico.</p>
            <Separator className="my-4" />
            <p>Você vai aprender duas bases fundamentais:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Como começar uma peça (anel mágico)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>O ponto principal do amigurumi (ponto baixo)</span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "d1-receita",
        title: "Primeira Parte da Receita",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold text-primary">Peça: Base do corpo</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p>Volta 1: MR com 6 pb → (6)</p>
              <p>Volta 2: 6 aum → (12)</p>
            </div>
            <p className="text-xs text-muted-foreground">Nos próximos passos vamos explicar a execução detalhada.</p>
          </div>
        ),
      },
      {
        id: "d1-volta1",
        title: "Volta 1 — O Anel Mágico (MR)",
        emoji: <PenTool className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>O anel mágico cria um círculo fechado, sem buraco no meio. Vamos por etapas:</p>

            <h3 className="font-bold">Passo 1 — Enrolar o fio</h3>
            <p>Dê uma volta no dedo indicador formando um "X". A ponta do fio fica por baixo e o fio do novelo por cima.</p>
            <ImagePlaceholder caption="Fio enrolado no dedo formando um X." />

            <h3 className="font-bold">Passo 2 — A agulha</h3>
            <p>Coloque a agulha por baixo do primeiro fio, pegue o fio de trás com o gancho e puxe para frente.</p>
            <ImagePlaceholder caption="Agulha puxando o fio de dentro do círculo." />

            <h3 className="font-bold">Passo 3 — Travar e Pontuar</h3>
            <p>Faça uma correntinha para travar o anel e em seguida faça 6 pontos baixos dentro do círculo.</p>
            <ImagePlaceholder caption="6 pontos feitos ao redor do anel ainda solto." />
          </div>
        ),
      },
      {
        id: "d1-missao",
        title: "Missão do Dia 1",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-2">
              {["Fazer o anel mágico", "Colocar 6 pontos dentro", "Fechar o anel", "Fazer 1 volta de aumentos (12 pontos)"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã continuaremos crescendo a base do corpinho.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 2 — Fazendo o corpinho crescer
     ═══════════════════════════════════════════ */
  {
    title: "Fazendo o corpinho crescer",
    emoji: "2",
    tintClass: tints[1],
    topics: [
      {
        id: "d2-prep",
        title: "Preparação",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje seu coelhinho começa a ganhar forma. O pequeno círculo de ontem começará a virar um pequeno "potinho".</p>
            <p>Isso acontece porque vamos continuar aumentando, mas com mais espaço entre os aumentos.</p>
          </div>
        ),
      },
      {
        id: "d2-receita",
        title: "Receita do dia",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold text-primary">Peça: Base do corpo</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p>Volta 3: (1 pb, 1 aum) × 6 → 18 pontos</p>
              <p>Volta 4: (2 pb, 1 aum) × 6 → 24 pontos</p>
            </div>
          </div>
        ),
      },
      {
        id: "d2-missao",
        title: "Missão do Dia 2",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-2">
              {["Fazer a Volta 3 (18 pontos)", "Fazer a Volta 4 (24 pontos)"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã vamos subir as laterais sem aumentar.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 3 — Subindo as paredes
     ═══════════════════════════════════════════ */
  {
    title: "Subindo as paredes",
    emoji: "3",
    tintClass: tints[2],
    topics: [
      {
        id: "d3-prep",
        title: "O poder da repetição",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje você só vai repetir o ponto baixo. Essa repetição transforma o disco em um corpinho tridimensional.</p>
            <p>É o momento mais relaxante do processo. Respire junto com os pontos.</p>
          </div>
        ),
      },
      {
        id: "d3-receita",
        title: "Receita do dia",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold text-primary">Peça: Corpo do coelho</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Voltas 5 a 9:</p>
              <p>24 pb → (24)</p>
            </div>
            <p className="text-sm italic">5 voltas seguidas, todas iguais, sem aumentar e sem diminuir.</p>
          </div>
        ),
      },
      {
        id: "d3-missao",
        title: "Missão do Dia 3",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-2">
              {["Fazer as voltas 5 a 9", "Manter 24 pontos em todas"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã começaremos a fechar a parte de cima.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 4 — Fechando o corpinho
     ═══════════════════════════════════════════ */
  {
    title: "Fechando o corpinho",
    emoji: "4",
    tintClass: tints[0],
    topics: [
      {
        id: "d4-prep",
        title: "A técnica da diminuição",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje sua peça deixa de ser um copinho para virar uma bolinha. Para isso, aprenderemos a diminuição (dim).</p>
          </div>
        ),
      },
      {
        id: "d4-receita",
        title: "Receita do dia",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p>Volta 10: (2 pb, 1 dim) × 6 → 18 pontos</p>
              <p>Volta 11: (1 pb, 1 dim) × 6 → 12 pontos</p>
              <p>Volta 12: 12 pb → 12 pontos</p>
            </div>
          </div>
        ),
      },
      {
        id: "d4-missao",
        title: "Missão do Dia 4",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-2">
              {["Fazer as diminuições", "Colocar o enchimento", "Finalizar a Volta 12"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã fecharemos totalmente o corpo.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 5 — Fechamento total
     ═══════════════════════════════════════════ */
  {
    title: "Fechamento total",
    emoji: "5",
    tintClass: tints[1],
    topics: [
      {
        id: "d5-prep",
        title: "Finalizando a base",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje vamos fechar completamente o corpo do seu coelhinho. A parte mais estrutural do projeto termina aqui.</p>
          </div>
        ),
      },
      {
        id: "d5-receita",
        title: "Receita",
        emoji: <BookOpen className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p>Volta 13: (1 pb, 1 dim) × 6 → 9 pontos</p>
              <p>Volta 15: (1 pb, 1 dim) × 3 → 6 pontos</p>
              <p>Volta 16–18: 6 pb → 6 pontos</p>
            </div>
          </div>
        ),
      },
      {
        id: "d5-missao",
        title: "Resultado do dia",
        emoji: <Star className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você agora tem um corpinho redondo, firme e fechado. A parte mais complexa já passou.</p>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã começaremos as orelhas, braços e pernas.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 6 — Membros e detalhes
     ═══════════════════════════════════════════ */
  {
    title: "Membros e detalhes",
    emoji: "6",
    tintClass: tints[2],
    topics: [
      {
        id: "d6-prep",
        title: "Ganhando personalidade",
        emoji: <Info className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje é o dia em que ele realmente vira um coelho. Faremos as peças pequenas que dão vida ao personagem.</p>
          </div>
        ),
      },
      {
        id: "d6-missao",
        title: "Missão do Dia 6",
        emoji: <Target className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ao final de hoje, você terá:</p>
            <ul className="space-y-2">
              {["1 corpo", "2 orelhas", "2 braços", "2 pernas"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-center font-medium">Amanhã faremos a montagem final e o rostinho.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 7 — Montagem e Finalização
     ═══════════════════════════════════════════ */
  {
    title: "Montagem e Finalização",
    emoji: "7",
    tintClass: tints[0],
    topics: [
      {
        id: "d7-prep",
        title: "A grande vitória",
        emoji: <Heart className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje sua peça deixa de ser apenas partes e vira um personagem completo. Você já fez a parte difícil, agora é hora de dar o toque final.</p>
          </div>
        ),
      },
      {
        id: "d7-missao",
        title: "Sua Primeira Vitória",
        emoji: <Star className="h-5 w-5 text-primary" />,
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Olhe para o seu coelhinho. Você aprendeu do zero, construiu algo com as mãos e terminou um projeto.</p>
            <p className="font-medium text-primary">Parabéns! Esta é a sua primeira vitória em amigurumi.</p>
          </div>
        ),
      },
    ],
  },
];