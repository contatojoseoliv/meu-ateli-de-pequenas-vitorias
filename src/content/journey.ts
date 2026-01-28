export type JourneyStep = {
  title: string;
  instruction: string;
  microMessage?: string;
  imageAlt: string;
};

export type JourneyDayContent = {
  day: number;
  title: string;
  objective: string;
  steps: JourneyStep[];
  mistakes: { situation: string; cause: string; fix: string }[];
  calmNotes: string[];
};

export const JOURNEY_DAYS: JourneyDayContent[] = [
  {
    day: 1,
    title: "Seu primeiro ponto e o anel mágico",
    objective: "Aprender o anel mágico (MR) e o ponto baixo (pb) — só isso.",
    steps: [
      {
        title: "Respire antes de começar",
        instruction:
          "Se a mão travar, se o fio embolar, se não ficar bonito… isso é normal. Hoje o objetivo não é ficar lindo: é aprender o movimento.",
        microMessage: "Vai devagar. Você está começando do jeito certo.",
        imageAlt: "Respire fundo antes de começar",
      },
      {
        title: "Passo 1 — Enrolar o fio no dedo",
        instruction:
          "Coloque a ponta do fio sobre o dedo indicador e dê uma volta formando um “X”. A ponta fica por baixo; o fio do novelo, por cima.",
        microMessage: "Se sair do lugar, faça de novo — sem culpa.",
        imageAlt: "Fio enrolado no dedo formando um X",
      },
      {
        title: "Passo 2 — Entrar com a agulha",
        instruction: "Coloque a agulha por baixo do primeiro fio, pegue o fio de trás e puxe para frente. Fica 1 laçada na agulha.",
        imageAlt: "Agulha puxando o fio de dentro do círculo",
      },
      {
        title: "Passo 3 — Fazer uma correntinha para travar",
        instruction:
          "Pegue o fio e puxe pela laçada da agulha. Isso só trava o anel — ainda não conta como ponto.",
        imageAlt: "Correntinha para travar o anel mágico",
      },
      {
        title: "Passo 4 — Fazer 6 pontos dentro do anel (pb)",
        instruction:
          "Faça 6 pontos baixos dentro do círculo: entra no anel, puxa o fio (2 laçadas), puxa o fio de novo e passa pelas 2 laçadas.",
        microMessage: "Um pontinho de cada vez. Você consegue.",
        imageAlt: "Seis pontos baixos feitos dentro do anel",
      },
      {
        title: "Passo 5 — Fechar o anel",
        instruction:
          "Solte o fio do dedo e puxe a ponta que sobrou. O buraco do meio fecha. Se não fechar totalmente, ajuste com cuidado.",
        microMessage: "Perfeito não. Feito — e seu.",
        imageAlt: "Antes e depois de fechar o anel mágico",
      },
      {
        title: "Volta 2 — Aumentos (12 pontos)",
        instruction:
          "Em cada ponto, faça 2 pontos baixos no mesmo lugar. Você tinha 6 pontos e vai terminar com 12.",
        imageAlt: "Círculo maior com 12 pontos",
      },
    ],
    mistakes: [
      { situation: "Buraco no meio", cause: "fio do anel não foi puxado", fix: "puxe a ponta com cuidado" },
      { situation: "Peça dobrando", cause: "ponto apertado", fix: "relaxe a mão e a tensão do fio" },
      { situation: "Peça ondulada", cause: "ponto frouxo", fix: "segure o fio com mais firmeza" },
    ],
    calmNotes: [
      "Você não precisa acertar tudo perfeitamente.",
      "Hoje é movimento, não perfeição.",
    ],
  },
  {
    day: 2,
    title: "Fazendo o corpinho crescer",
    objective: "Continuar aumentando, com mais espaço entre os aumentos.",
    steps: [
      {
        title: "Entenda a ideia do dia",
        instruction:
          "Você tem um círculo. Hoje ele começa a virar um “potinho”. Vamos continuar aumentando — só que com mais espaço entre os aumentos.",
        imageAlt: "Base começando a curvar e ganhar altura",
      },
      {
        title: "Volta 3 — (1 pb, 1 aum) × 6 → 18",
        instruction:
          "Faça 1 ponto baixo sozinho. No próximo ponto, faça 1 aumento (2 pontos no mesmo lugar). Repita essa sequência 6 vezes.",
        microMessage: "Conte no final da volta, com calma.",
        imageAlt: "Alternância de um ponto sozinho e um aumento",
      },
      {
        title: "Volta 4 — (2 pb, 1 aum) × 6 → 24",
        instruction:
          "Agora são 2 pontos baixos sozinhos e, no próximo ponto, 1 aumento. Repita 6 vezes.",
        microMessage: "Você está dando forma — é normal parecer estranho no meio.",
        imageAlt: "Grupos: dois pontos normais e um ponto duplo",
      },
      {
        title: "Conferência",
        instruction: "No final: Volta 3 deve ter 18 pontos e Volta 4 deve ter 24 pontos.",
        imageAlt: "Contagem de pontos na borda",
      },
    ],
    mistakes: [
      { situation: "Continua plano", cause: "pontos frouxos", fix: "segure o fio com mais firmeza" },
      { situation: "Está fechando rápido", cause: "pontos apertados", fix: "relaxe a mão" },
      { situation: "Ondulado", cause: "aumentou demais", fix: "conte os pontos e refaça um trecho" },
    ],
    calmNotes: ["Você só precisa fazer o dia de hoje."],
  },
  {
    day: 3,
    title: "Subindo as paredes (sem aumentar)",
    objective: "Repetir ponto baixo para transformar o “pratinho” em um corpinho.",
    steps: [
      {
        title: "Hoje é repetição",
        instruction:
          "Você não vai fazer nada novo — e é isso que faz a mágica. Só ponto baixo, sem aumentar e sem diminuir.",
        imageAlt: "Repetição de pontos baixos em espiral",
      },
      {
        title: "Voltas 5 a 9 — 24 pb (5 voltas)",
        instruction:
          "Faça 1 ponto baixo em cada ponto, mantendo 24 pontos em todas as voltas. Use o marcador para saber onde começa.",
        microMessage: "Respire junto com os pontos.",
        imageAlt: "Peça virando uma tigelinha",
      },
      {
        title: "Como saber se está certo",
        instruction:
          "A peça começa a parecer uma tigelinha/potinho. Se ficar plano, você aumentou sem querer. Se fechar, você diminuiu sem perceber.",
        imageAlt: "Parede subindo nas laterais",
      },
    ],
    mistakes: [
      { situation: "Está fechando", cause: "diminuiu sem querer", fix: "verifique se fez só pb" },
      { situation: "Está abrindo muito", cause: "pontos frouxos", fix: "segure o fio mais firme" },
      { situation: "Está torto", cause: "tensão desigual", fix: "normal; melhora com prática" },
    ],
    calmNotes: ["Este é o momento mais calmo do processo.", "Sem pressa."],
  },
  {
    day: 4,
    title: "Fechando o corpinho do coelho",
    objective: "Aprender diminuição (dim) e começar a fechar a peça.",
    steps: [
      {
        title: "Aprenda a diminuição (dim)",
        instruction:
          "Entre no primeiro ponto e puxe o fio (2 laçadas). Sem fechar, entre no ponto seguinte e puxe (3 laçadas). Pegue o fio e feche as 3 laçadas de uma vez.",
        microMessage: "Se não sair de primeira, tudo bem.",
        imageAlt: "Diminuição com três laçadas na agulha",
      },
      {
        title: "Volta 10 — (2 pb, 1 dim) × 6 → 18",
        instruction:
          "Faça 2 pontos baixos e 1 diminuição. Repita 6 vezes ao redor.",
        imageAlt: "Topo começando a fechar",
      },
      {
        title: "Volta 11 — (1 pb, 1 dim) × 6 → 12",
        instruction: "Agora fecha mais rápido: 1 pb e 1 dim, 6 vezes.",
        imageAlt: "Topo quase fechado",
      },
      {
        title: "Pausa para encher",
        instruction:
          "Antes da próxima volta, coloque enchimento aos poucos, empurrando para o fundo e laterais.",
        microMessage: "Pouquinho de cada vez já muda tudo.",
        imageAlt: "Mão colocando enchimento na peça",
      },
      {
        title: "Volta 12 — 12 pb",
        instruction: "Só estabilizar: 1 ponto baixo em cada ponto, sem aumento e sem diminuição.",
        imageAlt: "Peça parecendo uma bolinha",
      },
    ],
    mistakes: [
      { situation: "Diminuição com buracos", cause: "tensão irregular", fix: "faça a dim mais firme, sem apertar demais" },
      { situation: "Peça ficou dura", cause: "ponto muito apertado", fix: "relaxe a mão; tente ponto firme e macio" },
      { situation: "Enchimento irregular", cause: "colocou de uma vez", fix: "coloque aos poucos e distribua" },
    ],
    calmNotes: ["Você já fez a parte mais importante: continuar."],
  },
  {
    day: 5,
    title: "Fechamento total do corpo",
    objective: "Fechar completamente, arrematar e esconder o fio.",
    steps: [
      {
        title: "Receita do dia",
        instruction:
          "Volta 13: (1 pb, 1 dim) × 6 → 9. Volta 14: 9 pb. Volta 15: (1 pb, 1 dim) × 3 → 6. Voltas 16–18: 6 pb.",
        imageAlt: "Sequência de voltas para fechar",
      },
      {
        title: "Arremate",
        instruction: "Corte o fio deixando cerca de 15 cm e passe o fio pela última laçada para travar.",
        imageAlt: "Corte do fio e laçada final",
      },
      {
        title: "Fechando o buraco",
        instruction:
          "Passe a agulha pelos 6 pontos da borda e puxe para fechar como um saquinho. Depois esconda o fio passando por dentro da peça e corte o excesso.",
        microMessage: "Você está finalizando. Respira.",
        imageAlt: "Fechando o topo puxando o fio",
      },
    ],
    mistakes: [
      { situation: "Buraco não fechou", cause: "não passou por todos os pontos", fix: "volte e passe por todos os 6 pontos" },
      { situation: "Fio aparecendo", cause: "não escondeu por dentro", fix: "passe a agulha pelo meio e corte o excesso" },
      { situation: "Topo frouxo", cause: "poucas voltas finais", fix: "faça as voltas 16–18 para reforçar" },
    ],
    calmNotes: ["A parte “difícil” já foi. Sério."],
  },
  {
    day: 6,
    title: "Orelhas, bracinhos e perninhas",
    objective: "Criar peças pequenas (2 orelhas, 2 braços, 2 pernas) para montar amanhã.",
    steps: [
      {
        title: "Orelhas (faça 2)",
        instruction:
          "Volta 1: MR com 5 pb. Volta 2: (1 pb, 1 aum) ×2, 1 pb → 7. Voltas 3 a 7: 7 pb. Não precisa encher; achate e deixe fio longo.",
        imageAlt: "Orelha compridinha pronta",
      },
      {
        title: "Bracinhos (faça 2)",
        instruction:
          "Volta 1: MR com 5 pb. Voltas 2–4: 5 pb. Achate e feche com 2–3 pontos. Enchimento é opcional.",
        imageAlt: "Bracinho pequeno tipo rolinho",
      },
      {
        title: "Perninhas (faça 2)",
        instruction:
          "Volta 1: MR com 6 pb. Voltas 2–3: 6 pb. Coloque pouquinho enchimento e deixe fio longo.",
        imageAlt: "Perninha tipo gotinha",
      },
      {
        title: "Missão do dia",
        instruction: "No final, você tem 1 corpo + 2 orelhas + 2 braços + 2 pernas, separadinhos na mesa.",
        microMessage: "É literalmente um kit de coelho desmontado.",
        imageAlt: "Peças separadas para montagem",
      },
    ],
    mistakes: [
      { situation: "Peças muito apertadas", cause: "tensão alta", fix: "relaxe o fio; mantenha firme e macio" },
      { situation: "Orelhas tortas", cause: "achatou de forma desigual", fix: "achate com carinho e re-modela" },
      { situation: "Pernas moles", cause: "enchimento insuficiente", fix: "coloque um pouquinho a mais" },
    ],
    calmNotes: ["Hoje é confiança: peças pequenas, vitórias rápidas."],
  },
  {
    day: 7,
    title: "Montagem, rostinho e chaveiro",
    objective: "Costurar, bordar o rostinho (opcional) e colocar a argola do chaveiro.",
    steps: [
      {
        title: "Costurar as orelhas",
        instruction:
          "No topo da cabeça, levemente inclinadas para trás. Achate a base, posicione e dê 3–4 pontos. Arremate escondendo o fio.",
        imageAlt: "Orelhas costuradas no topo da cabeça",
      },
      {
        title: "Costurar os bracinhos",
        instruction:
          "Na lateral do corpo, logo abaixo da cabeça. Costure apenas a parte de trás para deixar o braço soltinho na frente.",
        imageAlt: "Bracinhos posicionados na lateral",
      },
      {
        title: "Costurar as perninhas",
        instruction:
          "Na frente inferior do corpo (parece sentado). Posicione as duas antes de costurar e depois costure firme por baixo.",
        imageAlt: "Perninhas costuradas na parte de baixo",
      },
      {
        title: "Rostinho (opcional, mas muito fofo)",
        instruction:
          "Nariz em “V” com linha rosa e dois pontinhos curtos abaixo para boquinha.",
        imageAlt: "Rostinho bordado com nariz em V",
      },
      {
        title: "Argola de chaveiro",
        instruction:
          "Opção fácil: passe a argola entre os pontos no topo da cabeça. Opção segura: faça 6–8 correntinhas, costure e prenda a argola.",
        imageAlt: "Argola de chaveiro presa no topo",
      },
      {
        title: "Toque final secreto",
        instruction:
          "Se puxar um fio ao redor da base da cabeça e apertar levemente, cria um “pescocinho” e fica ainda mais bonequinho.",
        microMessage: "Olhe pra ele. Você terminou.",
        imageAlt: "Toque final criando um pescocinho",
      },
    ],
    mistakes: [
      { situation: "Peças desalinhadas", cause: "costurou sem posicionar", fix: "posicione com calma antes de dar pontos" },
      { situation: "Costura aparente", cause: "pontos muito externos", fix: "passe a agulha por dentro dos pontos" },
      { situation: "Argola frouxa", cause: "poucos pontos", fix: "reforce com mais alguns pontinhos" },
    ],
    calmNotes: ["Você aprendeu do zero e terminou um projeto. Isso é enorme."],
  },
];

export function getJourneyDay(day: number) {
  return JOURNEY_DAYS.find((d) => d.day === day) ?? JOURNEY_DAYS[0];
}
