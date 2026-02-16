export type DayBlockKey = "preparacao" | "voltas" | "verificacao" | "objetivoFinal";

export type GuidedStep = {
  id: string;
  text: string;
  tip?: string;
  details?: string[];
  imagePlaceholderLabel?: string;
};

export type JourneyDay = {
  day: number;
  title: string;
  tag: string;
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
    title: "Seu primeiro ponto e o anel mágico",
    tag: "Anel mágico",
    estimatedTime: "15–20 min",
    guided: {
      preparacao: [
        {
          id: "d1-prep-1",
          text: "🌬️ Respire fundo e separe seus materiais",
          tip: "Se a mão travar, se o fio embolar, se não ficar bonito… 👉 isso é o normal. Ninguém faz perfeito no primeiro dia. Seu objetivo hoje NÃO é ficar lindo. É aprender o movimento.",
        },
        {
          id: "d1-prep-2",
          text: "📌 Leia a receita do dia",
          tip: "Peça: Base do corpo\n\nVolta 1: MR com 6 pb → (6)\nVolta 2: 6 aum → (12)\n\nHoje você vai aprender duas coisas:\n1. 🌀 Como começar uma peça (anel mágico)\n2. ➖ Como fazer o ponto principal do amigurumi (ponto baixo)\n\nSó isso. E isso já é enorme.",
        },
      ],
      voltas: [
        {
          id: "d1-voltas-1",
          text: "✋ Passo 1 — Enrolar o fio no dedo",
          details: [
            "Pegue a ponta do fio.",
            "Coloque sobre seu dedo indicador.",
            "Dê uma volta no dedo formando um \"X\".",
            "A ponta do fio fica por baixo, o fio do novelo por cima.",
          ],
          tip: "Você formou um círculo em volta do dedo.",
          imagePlaceholderLabel: "Fio enrolado no dedo formando um X",
        },
        {
          id: "d1-voltas-2",
          text: "🧵 Passo 2 — Entrar com a agulha",
          details: [
            "Coloque a agulha por baixo do primeiro fio.",
            "Pegue o fio de trás com o gancho.",
            "Puxe para frente.",
          ],
          tip: "Agora há 1 laçada na agulha.",
          imagePlaceholderLabel: "Agulha puxando o fio de dentro do círculo",
        },
        {
          id: "d1-voltas-3",
          text: "🔒 Passo 3 — Fazer uma correntinha para travar",
          details: [
            "Pegue o fio novamente.",
            "Puxe passando pela laçada da agulha.",
          ],
          tip: "Isso só trava o anel. Ainda não conta como ponto.",
        },
        {
          id: "d1-voltas-4",
          text: "🔁 Passo 4 — Fazer 6 pontos baixos dentro do anel",
          details: [
            "Entra com a agulha no círculo",
            "Puxa o fio (2 laçadas na agulha)",
            "Puxa o fio de novo",
            "Passa pelas 2 laçadas",
          ],
          tip: "Isso é 1 ponto baixo (pb). Repita até ter 6 pontos. 👉 Faça os pontos DENTRO do círculo que está no seu dedo, não no fio solto.",
          imagePlaceholderLabel: "6 pontos feitos ao redor do anel ainda solto",
        },
        {
          id: "d1-voltas-5",
          text: "🤏 Passo 5 — Fechar o anel",
          details: [
            "Solte o fio do dedo.",
            "Puxe a ponta do fio que sobrou.",
          ],
          tip: "✨ O buraco do meio vai fechar sozinho. Você acabou de criar a base da peça. Se não fechar totalmente, é normal. Ajuste puxando com cuidado.",
          imagePlaceholderLabel: "Antes e depois de puxar o fio e fechar o círculo",
        },
        {
          id: "d1-voltas-6",
          text: "Confira: conte 6 \"Vzinhos\" na borda do círculo",
          tip: "Cada \"V\" = 1 ponto. Conte com calma.\n\n• 5 → escapou um ponto\n• 7 → entrou duas vezes sem perceber\n\nErrar aqui é comum. Pode refazer sem culpa 💛",
        },
        {
          id: "d1-voltas-7",
          text: "🔄 Volta 2 — Faça 1 aumento em cada ponto (6 aum = 12 pontos)",
          details: [
            "Entre no primeiro ponto.",
            "Faça 1 ponto baixo.",
            "Sem sair do mesmo lugar, faça outro ponto baixo.",
          ],
          tip: "Isso é 1 aumento (aum). Repita nos 6 pontos. No final, conte os \"Vzinhos\" da borda — você deve ter 12.",
          imagePlaceholderLabel: "Círculo maior mostrando 12 pontos",
        },
      ],
      verificacao: [
        {
          id: "d1-check-1",
          text: "👀 Verifique se sua peça tem centro fechado e bordas arredondadas",
          tip: "Sua peça deve ser:\n✔ Pequeno círculo\n✔ Centro fechado\n✔ Bordas arredondadas\n✔ Não parece plano como um pano, nem fechado como uma bolinha ainda",
        },
        {
          id: "d1-check-2",
          text: "⚠ Consulte a tabela de problemas comuns se algo estiver diferente",
          tip: "😰 \"Minha peça está estranha\" — Normal se:\n✔ Está torto\n✔ Está meio ondulado\n✔ Os pontos parecem apertados\n✔ Parece um \"chapéuzinho\"\n\n— Problemas comuns —\n• Buraco no meio → fio do anel não foi puxado → puxar a ponta com cuidado\n• Peça dobrando → ponto apertado → relaxar a mão\n• Ondulada → ponto frouxo → segurar o fio com mais firmeza\n\nIsso tudo melhora com prática.",
        },
      ],
      objetivoFinal: [
        {
          id: "d1-goal-1",
          text: "💛 Missão do Dia 1 completa!",
          tip: "✔ Fazer o anel mágico\n✔ Colocar 6 pontos dentro\n✔ Fechar o anel\n✔ Fazer 1 volta de aumentos (12 pontos)\n\nSe conseguiu isso, você já começou de verdade.\n\n📆 Amanhã: vamos continuar crescendo a base do corpinho do coelhinho 🐰",
        },
      ],
    },
    tabs: {
      fullRecipe: [
        "Peça: Base do corpo",
        "",
        "Volta 1: MR com 6 pb → (6)",
        "Volta 2: 6 aum → (12)",
      ],
      materials: [
        "Linha amigurumi",
        "Agulha de crochê 2.0–2.5 mm",
        "Marcador de ponto (ou clipe)",
        "Tesoura",
      ],
      techniquesAndResources: [
        "🌀 Anel mágico (MR) — cria um círculo fechado, sem buraco no meio. É assim que quase todo amigurumi começa.",
        "➖ Ponto baixo (pb) — o ponto principal do amigurumi. Entra, puxa, puxa de novo, passa pelas 2 laçadas.",
        "⬆ Aumento (aum) — fazer 2 pontos baixos no mesmo ponto. Faz o círculo crescer.",
        "🔢 Como contar pontos — cada \"V\" na borda = 1 ponto. Conte com calma antes de seguir.",
      ],
    },
  },
  {
    day: 2,
    title: "Fazendo o corpinho crescer",
    tag: "Base",
    estimatedTime: "15–20 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 3,
    title: "Subindo as paredes (sem aumentar)",
    tag: "Repetição",
    estimatedTime: "15–20 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 4,
    title: "Fechando o corpinho do coelho",
    tag: "Corpinho",
    estimatedTime: "15–20 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 5,
    title: "Fechamento total do corpo",
    tag: "Arremate",
    estimatedTime: "15–20 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 6,
    title: "Orelhas, bracinhos e perninhas",
    tag: "Orelhas",
    estimatedTime: "15–20 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
  {
    day: 7,
    title: "Montagem, rostinho e chaveiro",
    tag: "Finalização",
    estimatedTime: "20–30 min",
    guided: { preparacao: [], voltas: [], verificacao: [], objetivoFinal: [] },
    tabs: { fullRecipe: ["(em breve)"], materials: ["(em breve)"], techniquesAndResources: ["(em breve)"] },
  },
];

export const getJourneyDay = (dayNumber: number): JourneyDay | undefined =>
  journeyDays.find((d) => d.day === dayNumber);