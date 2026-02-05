export type DayBlockKey = "preparacao" | "voltas" | "verificacao" | "objetivoFinal";

export type GuidedStep = {
  id: string;
  text: string;
  tip?: string;
  imagePlaceholderLabel?: string;
};

export type JourneyDay = {
  day: number;
  title: string;
  estimatedTime: string;
  guided: Record<DayBlockKey, GuidedStep[]>;
  tabs: {
    fullRecipe: string[];
    materials: string[];
    techniquesAndResources: string[];
  };
};

// Conteúdo inicial (placeholders) — vamos substituindo pelos textos finais dos PDFs
export const journeyDays: JourneyDay[] = [
  {
    day: 1,
    title: "Começando com calma",
    estimatedTime: "10–15 min",
    guided: {
      preparacao: [
        {
          id: "d1-prep-1",
          text: "Separe linha, agulha e enchimento (sem pressa).",
          tip: "Se você estiver tremendo ou insegura, tudo bem — hoje é só para começar.",
        },
      ],
      voltas: [
        {
          id: "d1-voltas-1",
          text: "Faça o início da peça seguindo a indicação do dia (ponto a ponto).",
          imagePlaceholderLabel: "Imagem ilustrativa (em breve)",
        },
      ],
      verificacao: [
        {
          id: "d1-check-1",
          text: "Confira se a tensão está confortável (nem apertado, nem frouxo).",
          tip: "Se estiver estranho, respire e refaça só este trecho — isso já é vitória.",
        },
      ],
      objetivoFinal: [
        {
          id: "d1-goal-1",
          text: "Objetivo de hoje: terminar o primeiro pedacinho do corpo/base.",
        },
      ],
    },
    tabs: {
      fullRecipe: [
        "Hoje a missão é começar — siga as voltas do início com tranquilidade.",
        "(Conteúdo completo será preenchido a partir dos PDFs.)",
      ],
      materials: ["Linha (amigurumi)", "Agulha", "Marcador de ponto (ou clipe)", "Tesoura"],
      techniquesAndResources: [
        "Anel mágico (MR) — explicação em breve",
        "Ponto baixo (pb) — explicação em breve",
        "Dica: marcar o início da volta ajuda muito",
      ],
    },
  },
  {
    day: 2,
    title: "Ganhando ritmo",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 3,
    title: "Primeiras formas",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 4,
    title: "Diminuindo sem medo",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 5,
    title: "Detalhes fofinhos",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 6,
    title: "Montagem guiada",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 7,
    title: "Sua Primeira Vitória",
    estimatedTime: "10–15 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
];

export const getJourneyDay = (dayNumber: number): JourneyDay | undefined =>
  journeyDays.find((d) => d.day === dayNumber);
