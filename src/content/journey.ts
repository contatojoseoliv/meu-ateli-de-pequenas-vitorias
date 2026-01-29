export type JourneyDay = {
  day: number;
  title: string;
  objective: string;
  durationMinutes: number;
  steps: string[];
  commonMistakes?: string[];
  tomorrowMessage?: string;
};

export const JOURNEY_DAYS: JourneyDay[] = [
  {
    day: 1,
    title: "Começo seguro: anel mágico + ponto baixo",
    objective: "Fazer a base do coelhinho com calma e sem se perder.",
    durationMinutes: 15,
    steps: [
      "Separe sua agulha, fio e marcador (ou um pedacinho de linha).",
      "Faça um anel mágico e coloque 6 pontos baixos dentro dele (Volta 1).",
      "Puxe o anel para fechar bem — sem pressa.",
      "Agora faça 6 aumentos (2 pontos no mesmo ponto) para chegar em 12 pontos (Volta 2).",
      "Marque o início da volta e conte os pontos com carinho: contar é o seu superpoder aqui.",
    ],
    commonMistakes: [
      "Perder a contagem: use marcador e confira no fim da volta.",
      "Fechar o anel frouxo: puxe devagar até encostar e firme o nó.",
    ],
    tomorrowMessage: "Amanhã a gente faz a base crescer — um passo por vez.",
  },
  {
    day: 2,
    title: "Crescer a base (aumentos organizados)",
    objective: "Deixar a base maior, mantendo tudo bem redondinho.",
    durationMinutes: 15,
    steps: [
      "Revise seus 12 pontos do Dia 1 (sem se julgar, só conferindo).",
      "Volta 3: faça aumentos espaçados para crescer de forma uniforme.",
      "Volta 4: repita a lógica — sempre contando no fim.",
      "Se algo parecer tortinho, desmanche só um pouquinho e refaça: isso é normal.",
    ],
    commonMistakes: [
      "Apertar demais o fio: tente manter a mesma tensão do começo ao fim.",
      "Esquecer onde era o começo: mantenha o marcador sempre no primeiro ponto da volta.",
    ],
    tomorrowMessage: "Amanhã você vai ver: quando as paredes sobem, tudo começa a parecer ‘real’.",
  },
  {
    day: 3,
    title: "Subir as paredes (pontos retinhos)",
    objective: "Transformar a base em um ‘copinho’ (o corpo do coelho).",
    durationMinutes: 15,
    steps: [
      "A partir daqui, a ideia é manter a mesma quantidade de pontos por volta.",
      "Voltas 5 a 9: faça pontos baixos, um em cada ponto, sem aumentos.",
      "Conte no fim de cada volta para confirmar que não ganhou nem perdeu pontos.",
      "Se o formato ficar ‘fechado’ demais, relaxe um pouco a tensão.",
    ],
    commonMistakes: [
      "Pular ponto sem perceber: conte e use o marcador como guia.",
    ],
    tomorrowMessage: "Amanhã a gente começa a fechar — e isso dá uma sensação ótima de progresso.",
  },
  {
    day: 4,
    title: "Começar a fechar (diminuições + enchimento)",
    objective: "Fechar o corpo com segurança e colocar enchimento na hora certa.",
    durationMinutes: 15,
    steps: [
      "Faça diminuições com calma (sem apertar demais).",
      "Quando a abertura estiver menor, coloque enchimento aos poucos.",
      "Aperte o enchimento com delicadeza para ficar firme, mas sem esticar os pontos.",
      "Continue as diminuições seguindo a sequência do dia.",
    ],
    commonMistakes: [
      "Colocar enchimento demais: é melhor ir aos poucos e testar o formato.",
    ],
    tomorrowMessage: "Amanhã é o fechamento final — você vai sentir que ‘terminou uma parte importante’.",
  },
  {
    day: 5,
    title: "Fechamento total + acabamento",
    objective: "Encerrar o corpo e deixar um acabamento limpinho.",
    durationMinutes: 15,
    steps: [
      "Finalize as voltas de fechamento até encerrar a abertura.",
      "Arremate e esconda o fio por dentro do corpo.",
      "Aperte levemente para ajustar o formato final.",
      "Tire um minutinho para comemorar: você já fez a parte ‘principal’.",
    ],
    tomorrowMessage: "Amanhã entram as partes fofas: orelhas, bracinhos e perninhas.",
  },
  {
    day: 6,
    title: "Partes: orelhas, bracinhos e perninhas",
    objective: "Criar as partes separadas com repetição simples.",
    durationMinutes: 15,
    steps: [
      "Faça as orelhas seguindo a sequência (uma de cada vez).",
      "Faça os bracinhos e as perninhas — devagar, contando.",
      "Deixe as peças separadas e organize para montar amanhã.",
    ],
    commonMistakes: [
      "As duas peças saírem diferentes: isso acontece; ajuste na montagem (posicionando) e siga.",
    ],
    tomorrowMessage: "Amanhã é a montagem — é quando vira coelhinho de verdade.",
  },
  {
    day: 7,
    title: "Montagem + rosto + argola do chaveiro (missão final)",
    objective: "Montar, dar expressão e finalizar como chaveirinho.",
    durationMinutes: 20,
    steps: [
      "Posicione orelhas e membros antes de costurar, só para visualizar.",
      "Costure as partes com pontos pequenos, escondendo o fio.",
      "Faça o rosto com calma: pequenos detalhes mudam tudo.",
      "Prenda a argola do chaveiro com firmeza.",
      "Missão final: tire uma foto do seu coelhinho e comemore sua primeira vitória.",
    ],
    tomorrowMessage: "Você conseguiu. Pequenas vitórias constroem coisas grandes.",
  },
];

export function getJourneyDay(day: number) {
  return JOURNEY_DAYS.find((d) => d.day === day);
}
