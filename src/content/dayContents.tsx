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
import { ImagePlaceholder } from "@/content/introCards";
import type { IntroCardData } from "@/content/introCards";

const tints = ["app-daycard--mint", "app-daycard--clay", "app-daycard--gold"];

export const DAY_CONTENTS: IntroCardData[] = [
  /* ═══════════════════════════════════════════
     DIA 1 — Seu primeiro ponto e o anel mágico
     ═══════════════════════════════════════════ */
  {
    title: "Seu primeiro ponto e o anel mágico",
    emoji: "📆",
    tintClass: tints[0],
    topics: [
      {
        id: "d1-prep",
        title: "Preparação",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Respire fundo. Se a mão travar ou o fio embolar, <strong>isso é normal</strong>.</p>
            <p>Seu objetivo hoje não é a perfeição, é aprender o movimento.</p>
            <Separator className="my-4" />
            <p>Hoje você vai aprender:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Como começar uma peça (anel mágico)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>O ponto principal (ponto baixo)</span>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "d1-receita",
        title: "Primeira Parte da Receita",
        emoji: "",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
            <p className="font-bold text-primary">Peça: Base do corpo</p>
            <p><strong>Volta 1:</strong> MR com 6 pb → (6)</p>
            <p><strong>Volta 2:</strong> 6 aum → (12)</p>
          </div>
        ),
      },
      {
        id: "d1-volta1",
        title: "Volta 1 — O Anel Mágico (MR)",
        emoji: "",
        content: (
          <div className="space-y-6 text-sm md:text-base text-foreground leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-primary">Passo 1 — Enrolar o fio</h3>
              <p>Dê uma volta no dedo indicador formando um "X". A ponta do fio fica por baixo.</p>
              <ImagePlaceholder caption="Fio enrolado no dedo formando um X." />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-primary">Passo 2 — Entrar com a agulha</h3>
              <p>Coloque a agulha por baixo do primeiro fio, pegue o de trás e puxe para frente.</p>
              <ImagePlaceholder caption="Agulha puxando o fio de dentro do círculo." />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-primary">Passo 3 — Fazer pontos</h3>
              <p>Faça 6 pontos baixos dentro do círculo. Depois, puxe a ponta do fio para fechar o buraco.</p>
              <ImagePlaceholder caption="6 pontos feitos ao redor do anel." />
            </div>
          </div>
        ),
      },
      {
        id: "d1-volta2",
        title: "Volta 2 — Aumentos",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos crescer o círculo fazendo <strong>2 pontos baixos em cada ponto</strong> da volta anterior.</p>
            <p>No final, você deve contar 12 "Vzinhos" na borda.</p>
            <ImagePlaceholder caption="Círculo maior mostrando 12 pontos." />
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
    emoji: "📆",
    tintClass: tints[1],
    topics: [
      {
        id: "d2-prep",
        title: "Preparação",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje seu coelhinho começa a ganhar forma. Ele deixará de ser um círculo plano e começará a virar um "potinho".</p>
          </div>
        ),
      },
      {
        id: "d2-receita",
        title: "Receita do dia",
        emoji: "",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
            <p className="font-bold text-primary">Peça: Base do corpo</p>
            <p><strong>Volta 3:</strong> (1 pb, 1 aum) × 6 → 18 pontos</p>
            <p><strong>Volta 4:</strong> (2 pb, 1 aum) × 6 → 24 pontos</p>
          </div>
        ),
      },
      {
        id: "d2-volta3",
        title: "Volta 3 — Crescendo com controle",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Alterne entre 1 ponto sozinho e 1 aumento (2 pontos no mesmo lugar).</p>
            <p>Repita essa sequência 6 vezes ao redor da peça.</p>
            <ImagePlaceholder caption="Alternância: um ponto sozinho, depois dois juntos." />
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
    emoji: "📆",
    tintClass: tints[2],
    topics: [
      {
        id: "d3-prep",
        title: "Preparação",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje você só vai repetir o ponto baixo. Isso transforma o disco em um corpinho, criando as laterais.</p>
          </div>
        ),
      },
      {
        id: "d3-receita",
        title: "Receita do dia",
        emoji: "",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
            <p className="font-bold text-primary">Voltas 5 a 9:</p>
            <p>24 pb em cada volta → (24)</p>
          </div>
        ),
      },
      {
        id: "d3-voltas",
        title: "Repetição e Calma",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Faça 1 ponto baixo em cada ponto ao redor. Sem aumentos. Sua peça começará a parecer uma tigelinha.</p>
            <ImagePlaceholder caption='Peça começando a criar uma "parede".' />
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
    emoji: "📆",
    tintClass: tints[0],
    topics: [
      {
        id: "d4-prep",
        title: "Preparação",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje a peça vira uma bolinha. Vamos aprender a <strong>diminuição (dim)</strong>, que serve para fechar o trabalho.</p>
          </div>
        ),
      },
      {
        id: "d4-dim",
        title: "Como fazer a diminuição",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Entre no primeiro ponto e puxe o fio. Sem fechar, entre no segundo ponto e puxe o fio. Agora, feche as 3 laçadas juntas.</p>
            <ImagePlaceholder caption="Dois pontos virando um." />
          </div>
        ),
      },
      {
        id: "d4-enchimento",
        title: "Enchimento",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de fechar totalmente, coloque o enchimento aos poucos, empurrando para o fundo e laterais.</p>
            <ImagePlaceholder caption="Mão colocando enchimento na peça." />
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 5 — Fechamento total
     ═══════════════════════════════════════════ */
  {
    title: "Fechamento total do corpo",
    emoji: "📆",
    tintClass: tints[1],
    topics: [
      {
        id: "d5-prep",
        title: "Finalização do Corpo",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Vamos fechar completamente o topo da bolinha e arrematar o fio.</p>
          </div>
        ),
      },
      {
        id: "d5-fechamento",
        title: "Fechando o buraco",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Use a agulha de tapeçaria para passar por dentro dos últimos pontos e puxar, fechando como um saquinho.</p>
            <ImagePlaceholder caption="Topo fechando ao puxar o fio." />
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 6 — Membros e Orelhas
     ═══════════════════════════════════════════ */
  {
    title: "Orelhas, bracinhos e perninhas",
    emoji: "📆",
    tintClass: tints[2],
    topics: [
      {
        id: "d6-prep",
        title: "Pequenas Partes",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje faremos as partes menores. Elas são rápidas e ajudam a ganhar confiança.</p>
          </div>
        ),
      },
      {
        id: "d6-orelhas",
        title: "Orelhas",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Faça 2 orelhas. Elas são tubinhos achatados que não levam enchimento.</p>
            <ImagePlaceholder caption="Orelha compridinha e achatada." />
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 7 — Montagem Final
     ═══════════════════════════════════════════ */
  {
    title: "Montagem, rostinho e chaveiro",
    emoji: "📆",
    tintClass: tints[0],
    topics: [
      {
        id: "d7-prep",
        title: "O Nascimento do Personagem",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje sua peça deixa de ser apenas "partes" e ganha vida.</p>
          </div>
        ),
      },
      {
        id: "d7-orelhas",
        title: "Costura das Orelhas",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Posicione as orelhas no topo da cabeça e costure com pontos firmes, mas delicados.</p>
            <ImagePlaceholder caption="Agulha costurando base da orelha." />
          </div>
        ),
      },
      {
        id: "d7-conclusao",
        title: "Sua Primeira Vitória",
        emoji: "",
        content: (
          <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed text-center">
            <p className="font-bold text-primary text-lg">Parabéns!</p>
            <p>Você começou, persistiu e criou algo com as próprias mãos. Este coelhinho é a prova da sua capacidade.</p>
          </div>
        ),
      },
    ],
  },
];