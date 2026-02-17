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
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Respire fundo.</p>
            <p>Se a mão travar, se o fio embolar, se não ficar bonito…</p>
            <p className="font-bold text-primary">👉 isso é o normal.</p>
            <p>Ninguém faz perfeito no primeiro dia.</p>
            <p>Seu objetivo hoje NÃO é ficar lindo. É aprender o movimento.</p>
            <Separator className="my-6" />
            <p>Hoje você vai aprender duas coisas:</p>
            <p>🌀 Como começar uma peça (anel mágico)</p>
            <p>➖ Como fazer o ponto principal do amigurumi (ponto baixo)</p>
            <p className="font-medium">Só isso. E isso já é enorme.</p>
          </div>
        ),
      },
      {
        id: "d1-receita",
        title: "Primeira Parte da Receita",
        emoji: "📌",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-xl font-serif">Peça: Base do corpo</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Volta 1:</p>
              <p className="pl-4">MR com 6 pb → (6)</p>
              <p className="font-bold mt-2">Volta 2:</p>
              <p className="pl-4">6 aum → (12)</p>
            </div>
            <Separator className="my-6" />
            <p className="italic">Esta é a primeira parte da receita; nos próximos passos vamos explicar a execução — pode avançar.</p>
          </div>
        ),
      },
      {
        id: "d1-volta1",
        title: "Volta 1 — O Anel Mágico (MR) com 6 pb",
        emoji: "🌀",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>É assim que quase todo amigurumi começa. Ele cria um círculo fechado, sem buraco no meio.</p>
            <p className="font-medium text-primary">Vamos devagar.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Enrolar o fio no dedo</h3>
              <p>Pegue a ponta do fio.</p>
              <p>Coloque sobre seu dedo indicador.</p>
              <p>Dê uma volta no dedo formando um "X".</p>
              <p>A ponta do fio fica por baixo, o fio do novelo por cima.</p>
              <p className="text-sm italic">Você formou um círculo em volta do dedo.</p>
              <ImagePlaceholder caption="Fio enrolado no dedo formando um X." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🧵 Passo 2 — Entrar com a agulha</h3>
              <p>Coloque a agulha por baixo do primeiro fio.</p>
              <p>Pegue o fio de trás com o gancho.</p>
              <p>Puxe para frente.</p>
              <p className="text-sm italic">Agora há 1 laçada na agulha.</p>
              <ImagePlaceholder caption="Agulha puxando o fio de dentro do círculo." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔒 Passo 3 — Fazer uma correntinha para travar</h3>
              <p>Pegue o fio novamente.</p>
              <p>Puxe passando pela laçada da agulha.</p>
              <p>Isso só trava o anel. Ainda não conta como ponto.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔁 Passo 4 — Fazer pontos dentro do anel</h3>
              <p>Agora você vai fazer 6 pontos baixos DENTRO do círculo.</p>
              <p className="font-bold text-primary">👉 Dentro do círculo que está no seu dedo.</p>
              <p>Vamos lembrar o ponto baixo:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Entra com a agulha no círculo</li>
                <li>Puxa o fio (2 laçadas na agulha)</li>
                <li>Puxa o fio de novo</li>
                <li>Passa pelas 2 laçadas</li>
              </ol>
              <p>Isso é 1 ponto baixo (pb). Repita até ter 6 pontos.</p>
              <ImagePlaceholder caption="6 pontos feitos ao redor do anel ainda solto." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🤏 Passo 5 — Fechar o anel</h3>
              <p>Agora vem a parte mágica:</p>
              <p>Solte o fio do dedo.</p>
              <p>Puxe a ponta do fio que sobrou.</p>
              <p>O buraco do meio vai fechar sozinho.</p>
              <p className="font-bold text-primary">✨ Você acabou de criar a base da peça.</p>
              <p className="text-sm italic">Se não fechar totalmente, é normal. Ajuste puxando com cuidado.</p>
              <ImagePlaceholder caption="Antes e depois de puxar o fio e fechar o círculo." />
            </div>
          </div>
        ),
      },
      {
        id: "d1-entendendo",
        title: "Entendendo o que você fez",
        emoji: "🔍",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Olhe para sua peça.</p>
            <p>Você deve ver um pequeno círculo com 6 "Vzinhos" na borda.</p>
            <p className="font-bold text-primary">Cada "V" = 1 ponto.</p>
            <p>Conte com calma.</p>
            <p>Se tiver:</p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>5 → escapou um ponto</li>
              <li>7 → entrou duas vezes sem perceber</li>
            </ul>
            <p className="italic">Errar aqui é comum. Pode refazer sem culpa 💛</p>
          </div>
        ),
      },
      {
        id: "d1-volta2",
        title: "Volta 2 — A Primeira Volta de Verdade",
        emoji: "🔄",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Agora vamos começar a crescer o círculo.</p>
            <p>Hoje você só vai fazer aumentos.</p>
            <p className="font-bold text-primary">👉 Em cada ponto, você fará 2 pontos baixos.</p>
            <p>Você tem 6 pontos. Vai terminar com 12.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🧵 Como fazer</h3>
              <p>Entre no primeiro ponto.</p>
              <p>Faça 1 ponto baixo.</p>
              <p>Sem sair do mesmo lugar, faça outro ponto baixo.</p>
              <p className="font-medium">Isso é 1 aumento (aum).</p>
              <p>Repita nos 6 pontos.</p>
              <p>No final, conte os "Vzinhos" da borda. Você deve ter: 12</p>
              <ImagePlaceholder caption="Círculo maior mostrando 12 pontos." />
            </div>
          </div>
        ),
      },
      {
        id: "d1-verificacao",
        title: "Verificação",
        emoji: "👀",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-terra-cota">😰 "Minha peça está estranha"</h3>
              <p>Normal se:</p>
              <ul className="space-y-2 pl-1">
                {["Está torto", "Está meio ondulado", "Os pontos parecem apertados", 'Parece um "chapéuzinho"'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm italic">Isso tudo melhora com prática.</p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="font-bold text-xl">👀 Como sua peça deve parecer agora</h3>
              <ul className="space-y-2 pl-1">
                {["Pequeno círculo", "Centro fechado", "Bordas arredondadas", "Não parece plano como um pano, nem fechado como uma bolinha ainda"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="font-bold text-xl">⚠ Se algo estiver diferente</h3>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-bold">Situação</TableHead>
                      <TableHead className="font-bold">Motivo</TableHead>
                      <TableHead className="font-bold">Solução</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Buraco no meio</TableCell>
                      <TableCell>fio do anel não foi puxado</TableCell>
                      <TableCell>puxar a ponta com cuidado</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Peça dobrando</TableCell>
                      <TableCell>ponto apertado</TableCell>
                      <TableCell>relaxar a mão</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ondulada</TableCell>
                      <TableCell>ponto frouxo</TableCell>
                      <TableCell>segurar o fio com mais firmeza</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "d1-missao",
        title: "Missão do Dia 1",
        emoji: "💛",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <ul className="space-y-2 pl-1">
              {["Fazer o anel mágico", "Colocar 6 pontos dentro", "Fechar o anel", "Fazer 1 volta de aumentos (12 pontos)"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-primary">Se conseguiu isso, você já começou de verdade.</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">📆 Amanhã: vamos continuar crescendo a base do corpinho do coelhinho 🐰</p>
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
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Hoje seu coelhinho começa a ganhar forma 🐰</p>
            <p>Até agora você tem um pequeno círculo.</p>
            <p>Hoje ele deixa de ser um círculo e começa a virar um "potinho".</p>
            <p>Isso acontece porque vamos continuar aumentando… mas com mais espaço entre os aumentos.</p>
          </div>
        ),
      },
      {
        id: "d2-receita",
        title: "Receita do dia",
        emoji: "📌",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-xl font-serif">Peça: Base do corpo</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Volta 3:</p>
              <p className="pl-4">(1 pb, 1 aum) × 6 → 18 pontos</p>
              <p className="font-bold mt-2">Volta 4:</p>
              <p className="pl-4">(2 pb, 1 aum) × 6 → 24 pontos</p>
            </div>
            <Separator className="my-6" />
            <p className="italic">Agora vamos fazer isso devagar e detalhado.</p>
          </div>
        ),
      },
      {
        id: "d2-leitura",
        title: "O que significa essa receita?",
        emoji: "🧠",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Vamos pegar a Volta 3, somente de exemplo:</p>
            <p className="pl-4 font-bold text-primary text-xl">(1 pb, 1 aum) × 6 → (18)</p>
            <p>Significa:</p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>1 ponto baixo sozinho</li>
              <li>depois 1 aumento (2 pontos baixos no mesmo lugar)</li>
            </ul>
            <p>Isso forma um bloquinho. Você vai repetir esse bloquinho 6 vezes.</p>
            <p className="font-medium">Ao final você terá 18 pontos.</p>
          </div>
        ),
      },
      {
        id: "d2-volta3",
        title: "Volta 3 — Crescendo com controle (18 pontos)",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Você terminou o Dia 1 com 12 pontos.</p>
            <p className="font-bold text-primary">Coloque o marcador no primeiro ponto da volta.</p>
            <p>Agora vamos trabalhar alternando:</p>
            <p>👉 1 ponto sozinho | 👉 1 aumento</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Fazer 1 ponto baixo</h3>
              <p>Entre no primeiro ponto. Faça 1 ponto baixo normal.</p>
              <ImagePlaceholder caption='Close da agulha entrando em um ponto da borda (formato de "V") e puxando o fio.' />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Fazer um aumento</h3>
              <p>Vá para o próximo ponto. Aqui você fará um aumento (2 pontos baixos no mesmo lugar):</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Entre no ponto e faça 1 ponto baixo</li>
                <li>sem sair do mesmo lugar, faça outro ponto baixo</li>
              </ol>
              <p className="text-sm italic">Você colocou 2 pontos no mesmo ponto. Pronto. Você fez o primeiro conjunto.</p>
              <ImagePlaceholder caption="Mostrando a agulha entrando duas vezes no mesmo ponto da base." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔁 Agora repita isso</h3>
              <p>Você vai repetir essa sequência ao redor da peça: 1 pb sozinho, 1 aumento.</p>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-bold">Conjunto</TableHead>
                      <TableHead className="font-bold">O que fazer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <TableRow key={n}>
                        <TableCell>{n}º</TableCell>
                        <TableCell>1 pb, 1 aum</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔎 Conferência da Volta 3</h3>
              <p>No final, conte os pontos da borda. Você deve ter: <span className="font-bold text-primary">18 pontos</span></p>
              <p className="text-sm italic">Se tiver menos → faltou aumento. Se tiver mais → fez aumento onde não devia.</p>
              <ImagePlaceholder caption="Círculo um pouco maior, começando a curvar." />
            </div>
          </div>
        ),
      },
      {
        id: "d2-volta4",
        title: "Volta 4 — A base ficando maior (24 pontos)",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Agora os aumentos ficam mais espaçados.</p>
            <p>Em vez de 1 ponto sozinho, agora serão 2 pontos sozinhos antes do aumento.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Fazer 2 pontos baixos</h3>
              <p>No primeiro ponto → faça 1 pb</p>
              <p>No segundo ponto → faça 1 pb</p>
              <p className="text-sm italic">Agora você fez 2 pb sozinhos.</p>
              <ImagePlaceholder caption="Dois pontos baixos sendo feitos em pontos diferentes, lado a lado." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Fazer 1 aumento</h3>
              <p>No próximo ponto: Faça 1 ponto baixo, faça outro ponto baixo no mesmo lugar.</p>
              <p className="text-sm italic">Pronto. Esse é um conjunto.</p>
              <ImagePlaceholder caption="Dois pontos saindo do mesmo ponto da base." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔁 Passo 3 — Repetir o padrão</h3>
              <p>Repita ao redor: 2 pontos baixos, 1 aumento. Faça isso 6 vezes.</p>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-bold">Conjunto</TableHead>
                      <TableHead className="font-bold">O que fazer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <TableRow key={n}>
                        <TableCell>{n}º</TableCell>
                        <TableCell>2 pb, 1 aum</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔎 Conferência da Volta 4</h3>
              <p>Conte os pontos. Agora devem ser: <span className="font-bold text-primary">24 pontos</span></p>
              <p>Sua peça deve estar:</p>
              <ul className="space-y-2 pl-1">
                {["maior", "começando a subir nas laterais", "parecendo um pratinho fundo"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImagePlaceholder caption="Base com curvinha suave formando o fundo do corpo." />
            </div>
          </div>
        ),
      },
      {
        id: "d2-problemas",
        title: "Se algo parecer estranho",
        emoji: "❗",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Situação</TableHead>
                    <TableHead className="font-bold">Motivo</TableHead>
                    <TableHead className="font-bold">Solução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Continua plano</TableCell>
                    <TableCell>pontos frouxos</TableCell>
                    <TableCell>segure o fio com mais firmeza</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Está fechando rápido</TableCell>
                    <TableCell>pontos apertados</TableCell>
                    <TableCell>relaxe a mão</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ondulado</TableCell>
                    <TableCell>aumentou demais</TableCell>
                    <TableCell>conte os pontos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ),
      },
      {
        id: "d2-missao",
        title: "Missão do Dia 2",
        emoji: "💛",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <ul className="space-y-2 pl-1">
              {["Fazer a Volta 3 → 18 pontos", "Fazer a Volta 4 → 24 pontos"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Agora seu coelhinho deixou de ser um círculo. Ele está começando a virar um corpinho.</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">📆 Amanhã: vamos subir as laterais sem aumentar — é quando a peça vira uma "panelinha" 🐰✨</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 3 — Subindo as paredes (sem aumentar)
     ═══════════════════════════════════════════ */
  {
    title: "Subindo as paredes (sem aumentar)",
    emoji: "📆",
    tintClass: tints[2],
    topics: [
      {
        id: "d3-prep",
        title: "Preparação",
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Hoje você não vai fazer nada "novo". E é exatamente isso que faz a mágica acontecer.</p>
            <p>Você só vai repetir ponto baixo. Mas isso transforma o disco em um corpinho.</p>
          </div>
        ),
      },
      {
        id: "d3-receita",
        title: "Receita do dia",
        emoji: "📌",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-xl font-serif">Peça: Corpo do coelho</p>
            <p>Você terminou o Dia 2 com 24 pontos.</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Voltas 5 a 9:</p>
              <p className="pl-4">24 pb → (24)</p>
            </div>
            <p className="text-sm italic">Isso significa: Você vai fazer 5 voltas seguidas, todas iguais, sem aumentar e sem diminuir.</p>
          </div>
        ),
      },
      {
        id: "d3-explicacao",
        title: "O que isso faz com a peça?",
        emoji: "🧠",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Ontem você aumentava → ela crescia para os lados.</p>
            <p className="font-bold text-primary">Hoje você não aumenta → ela cresce para cima.</p>
            <p>É assim que criamos a lateral do corpo.</p>
          </div>
        ),
      },
      {
        id: "d3-voltas",
        title: "Voltas 5 a 9 — Repetição",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">🧵 Como fazer</h3>
              <p>Entre no primeiro ponto da volta. Faça 1 ponto baixo. Continue fazendo 1 ponto baixo em cada ponto ao redor. Sem aumento. Sem mudança. Só repetir.</p>
              <ImagePlaceholder caption='Peça começando a criar uma "parede".' />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🧷 Use o marcador</h3>
              <p>Agora ele vira seu melhor amigo. Coloque no primeiro ponto da volta. Quando chegar nele de novo, você terminou uma volta. Repita isso até completar 5 voltas.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">👀 Como saber se está certo</h3>
              <p>Sua peça vai começar a parecer: 🥣 uma tigelinha ou 🧺 um potinho.</p>
              <p className="text-sm italic">As laterais vão subir sozinhas. Se estiver ficando plano → você aumentou sem querer. Se estiver fechando → você diminuiu sem perceber.</p>
            </div>
          </div>
        ),
      },
      {
        id: "d3-dicas",
        title: "Dica importante e relaxamento",
        emoji: "😌",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Dica importante</h3>
              <p>Não puxe o fio com força. Se apertar demais:</p>
              <ul className="list-disc list-inside space-y-2 pl-1">
                <li>a peça fica dura</li>
                <li>difícil de encher depois</li>
                <li>sua mão cansa</li>
              </ul>
              <p className="font-medium text-primary">Tente manter o ponto firme, mas macio.</p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="font-bold text-xl">😌 Parte relaxante do projeto</h3>
              <p>Este é o momento mais calmo do processo. É só repetir. Respire junto com os pontos. Puxa o fio. Entra no ponto. Fecha o ponto. Sem pressa.</p>
            </div>
          </div>
        ),
      },
      {
        id: "d3-problemas",
        title: "Problemas comuns",
        emoji: "❗",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Situação</TableHead>
                    <TableHead className="font-bold">Motivo</TableHead>
                    <TableHead className="font-bold">Solução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Está fechando</TableCell>
                    <TableCell>você diminuiu sem querer</TableCell>
                    <TableCell>verifique se fez só pb</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Está abrindo muito</TableCell>
                    <TableCell>pontos frouxos</TableCell>
                    <TableCell>segure o fio mais firme</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Está torto</TableCell>
                    <TableCell>tensão desigual</TableCell>
                    <TableCell>normal, melhora com prática</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ),
      },
      {
        id: "d3-missao",
        title: "Missão do Dia 3",
        emoji: "💛",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <ul className="space-y-2 pl-1">
              {["Fazer as voltas 5 a 9", "Manter 24 pontos em todas"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-primary">Seu coelho já tem um corpo.</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">📆 Amanhã: vamos começar a fechar a parte de cima e ele vai deixar de ser um copinho para virar uma bolinha 🐰✨</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 4 — Fechando o corpinho do coelho
     ═══════════════════════════════════════════ */
  {
    title: "Fechando o corpinho do coelho",
    emoji: "📆",
    tintClass: tints[0],
    topics: [
      {
        id: "d4-prep",
        title: "Preparação",
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Até ontem sua peça parecia um copinho. Hoje ela vira uma bolinha 🐰</p>
            <p>Aqui aprendemos a diminuição (dim). É a técnica que faz a peça fechar.</p>
          </div>
        ),
      },
      {
        id: "d4-receita",
        title: "Receita do dia",
        emoji: "📌",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Volta 10:</p>
              <p className="pl-4">(2 pb, 1 dim) × 6 → 18 pontos</p>
              <p className="font-bold mt-2">Volta 11:</p>
              <p className="pl-4">(1 pb, 1 dim) × 6 → 12 pontos</p>
              <p className="font-bold mt-2">Volta 12:</p>
              <p className="pl-4">12 pb → 12 pontos</p>
            </div>
          </div>
        ),
      },
      {
        id: "d4-dim",
        title: "Como fazer a diminuição (dim)",
        emoji: "➖",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Você vai usar isso nas voltas 10 e 11.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Entrar no primeiro ponto</h3>
              <p>Coloque a agulha no próximo ponto e puxe o fio. Ficam 2 laçadas na agulha. Não feche.</p>
              <ImagePlaceholder caption="Agulha dentro do primeiro ponto da diminuição, duas laçadas visíveis." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Entrar no segundo ponto</h3>
              <p>Sem fechar, entre no ponto seguinte e puxe o fio. Agora há 3 laçadas na agulha.</p>
              <ImagePlaceholder caption="Agulha pegando o segundo ponto, três laçadas na agulha." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 3 — Fechar tudo</h3>
              <p>Pegue o fio e passe pelas 3 laçadas de uma vez. Pronto. Dois pontos viraram um.</p>
              <ImagePlaceholder caption="Laçadas sendo fechadas juntas." />
            </div>
          </div>
        ),
      },
      {
        id: "d4-volta10",
        title: "Volta 10 — (2 pb, 1 dim) × 6 → 18 pontos",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Agora vamos fechar o corpo aos poucos.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Fazer 2 pontos baixos</h3>
              <p>Faça 1 pb no primeiro ponto e 1 pb no segundo ponto.</p>
              <ImagePlaceholder caption="Dois pontos baixos lado a lado já feitos." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Fazer 1 diminuição</h3>
              <p>Use a técnica que você aprendeu: entra no ponto, entra no próximo, puxa o fio, fecha tudo.</p>
              <ImagePlaceholder caption="Agulha atravessando dois pontos juntos." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔁 Repita isso</h3>
              <p>2 pb → 1 dim. Faça isso 6 vezes ao redor. Resultado: <span className="font-bold text-primary">18 pontos</span>.</p>
              <ImagePlaceholder caption="Topo da peça começando a fechar." />
            </div>
          </div>
        ),
      },
      {
        id: "d4-volta11",
        title: "Volta 11 — (1 pb, 1 dim) × 6 → 12 pontos",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Agora fecha mais rápido.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Fazer 1 ponto baixo</h3>
              <ImagePlaceholder caption="Agulha fazendo ponto normal." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Fazer 1 diminuição</h3>
              <p>Mesma técnica: entra em um ponto, entra no próximo, puxa o fio, fecha tudo.</p>
              <ImagePlaceholder caption="Diminuição em execução." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔁 Repita</h3>
              <p>1 pb → 1 dim. 6 vezes. Resultado: <span className="font-bold text-primary">12 pontos</span>.</p>
              <ImagePlaceholder caption="Topo quase fechado." />
            </div>
          </div>
        ),
      },
      {
        id: "d4-enchimento",
        title: "Pare aqui para encher + Volta 12",
        emoji: "🧸",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-primary">🧸 PARE AQUI PARA ENCHER</h3>
              <p>Antes da próxima volta, coloque enchimento. Coloque aos poucos. Empurre para o fundo e laterais.</p>
              <ImagePlaceholder caption="Mão colocando enchimento na peça." />
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Volta 12 — 12 pb</h3>
              <p>Agora só estabilizamos. Faça 1 ponto baixo em cada ponto da volta. Nenhum aumento. Nenhuma diminuição.</p>
              <ImagePlaceholder caption="Peça já parecendo bolinha." />
            </div>
          </div>
        ),
      },
      {
        id: "d4-missao",
        title: "Sua peça agora",
        emoji: "💛",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <ul className="space-y-2 pl-1">
              {["redonda", "firme", "quase fechada em cima"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium text-primary">Seu coelho já tem corpo 🐰✨</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">📆 Amanhã a gente fecha totalmente e começa as orelhas.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 5 — Fechamento total do corpo
     ═══════════════════════════════════════════ */
  {
    title: "Fechamento total do corpo",
    emoji: "📆",
    tintClass: tints[1],
    topics: [
      {
        id: "d5-prep",
        title: "Preparação",
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Ontem você diminuiu, modelou o formato e colocou enchimento. Hoje vamos fechar completamente.</p>
          </div>
        ),
      },
      {
        id: "d5-receita",
        title: "Receita",
        emoji: "📌",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="font-bold">Volta 13:</p>
              <p className="pl-4">(1 pb, 1 dim) × 6 → 9 pontos</p>
              <p className="font-bold mt-2">Volta 14:</p>
              <p className="pl-4">9 pb → 9 pontos</p>
              <p className="font-bold mt-2">Volta 15:</p>
              <p className="pl-4">(1 pb, 1 dim) × 3 → 6 pontos</p>
              <p className="font-bold mt-2">Volta 16–18:</p>
              <p className="pl-4">6 pb → 6 pontos</p>
            </div>
            <p className="text-sm italic">Depois: arrematar e fechar.</p>
          </div>
        ),
      },
      {
        id: "d5-volta13",
        title: "Volta 13 — (1 pb, 1 dim) × 6 → 9 pontos",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Agora a abertura já é pequena.</p>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Faça 1 ponto baixo</h3>
              <ImagePlaceholder caption="Ponto baixo sendo feito perto do topo da peça." />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Faça 1 diminuição</h3>
              <ImagePlaceholder caption="Agulha atravessando dois pontos do topo." />
            </div>
            <p className="font-medium">Repita 6 vezes. Resultado: <span className="font-bold text-primary">9 pontos</span>.</p>
            <ImagePlaceholder caption="Abertura bem pequena." />
          </div>
        ),
      },
      {
        id: "d5-volta14-15",
        title: "Voltas 14 e 15",
        emoji: "🔄",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Volta 14 — 9 pb</h3>
              <p>Só estabilizar. Faça 1 ponto baixo em cada ponto.</p>
              <ImagePlaceholder caption="Topo firme e arredondado." />
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Volta 15 — (1 pb, 1 dim) × 3 → 6 pontos</h3>
              <p>Agora quase fechando. Faça: 1 pb → 1 dim. Repita 3 vezes. Resultado: <span className="font-bold text-primary">6 pontos</span>.</p>
              <ImagePlaceholder caption="Buraquinho minúsculo no topo." />
            </div>
          </div>
        ),
      },
      {
        id: "d5-volta16-18",
        title: "Voltas 16, 17 e 18 — 6 pb",
        emoji: "🔄",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Você só vai dar voltinhas pequenas para reforçar. Faça 1 ponto baixo em cada ponto (6 no total) por 3 voltas. Isso ajuda o topo a ficar mais bonito e firme.</p>
            <ImagePlaceholder caption="Peça já parecendo uma bolinha completa." />
          </div>
        ),
      },
      {
        id: "d5-arremate",
        title: "Arremate",
        emoji: "✂️",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1 — Corte o fio</h3>
              <p>Deixe um pedaço de uns 15 cm.</p>
              <ImagePlaceholder caption="Tesoura cortando o fio." />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2 — Puxe o fio todo para fora</h3>
              <p>Passe o fio pela última laçada e puxe. Isso trava o trabalho.</p>
              <ImagePlaceholder caption="Laçada sendo puxada para fora." />
            </div>
          </div>
        ),
      },
      {
        id: "d5-fechamento",
        title: "Fechando o buraco",
        emoji: "🪡",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Use a agulha de tapeçaria.</p>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 1</h3>
              <p>Passe a agulha por dentro de cada um dos 6 pontos da borda.</p>
              <ImagePlaceholder caption="Agulha entrando na borda do topo." />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 2</h3>
              <p>Depois de passar por todos, puxe o fio. O buraco fecha como um saquinho.</p>
              <ImagePlaceholder caption="Topo fechando ao puxar o fio." />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Passo 3</h3>
              <p>Passe a agulha pelo meio da peça e saia em outro ponto. Puxe e corte o excesso. O fio some dentro.</p>
              <ImagePlaceholder caption="Fio sendo escondido dentro do amigurumi." />
            </div>
          </div>
        ),
      },
      {
        id: "d5-missao",
        title: "Resultado do dia",
        emoji: "🎉",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-primary">Você tem: 🐰 Corpinho completo</p>
            <ul className="space-y-2 pl-1">
              {["redondo", "firme", "fechado"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-medium">A parte "difícil" do amigurumi já foi. Sério.</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">Amanhã entra as orelhas, braços e pernas.</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 6 — Orelhas, bracinhos e perninhas
     ═══════════════════════════════════════════ */
  {
    title: "Orelhas, bracinhos e perninhas",
    emoji: "📆",
    tintClass: tints[2],
    topics: [
      {
        id: "d6-prep",
        title: "Preparação",
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Hoje é o dia do: "AAAAA agora virou um coelho mesmo" 🐰</p>
            <p>São peças pequenas → perfeitas pra iniciante ganhar confiança.</p>
          </div>
        ),
      },
      {
        id: "d6-orelhas",
        title: "Orelhas (faça 2)",
        emoji: "👂",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="text-sm italic">Peça fina, não leva enchimento.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Volta 1 — MR com 5 pb</h3>
              <p>Faça o anel mágico com 5 pontos baixos dentro e feche.</p>
              <ImagePlaceholder caption="Círculo pequeno fechado." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Volta 2 — (1 pb, 1 aum) x2, 1 pb → 7 pontos</h3>
              <p>Tradução: 1 ponto normal, 1 aumento (repete 2x), 1 ponto normal.</p>
              <ImagePlaceholder caption="Peça levemente oval." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🔄 Voltas 3 a 7 — 7 pb</h3>
              <p>Só subir. 1 ponto baixo em cada ponto, por 5 voltas. Ela vira um "tubinho achatável".</p>
              <ImagePlaceholder caption="Orelha compridinha." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">✋ Finalização da orelha</h3>
              <ul className="space-y-2 pl-1">
                {["Não encher", "Achatar com os dedos", "Deixar fio longo"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImagePlaceholder caption="Orelha achatada." />
            </div>
          </div>
        ),
      },
      {
        id: "d6-bracinhos",
        title: "Bracinhos (2x)",
        emoji: "🐾",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">Volta 1 — MR com 5 pb</h3>
              <ImagePlaceholder caption="Anel mágico com 5 pontos." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">Voltas 2–4 — 5 pb</h3>
              <p>Só subir 3 carreiras. Peça minúscula tipo "rolinho".</p>
              <ul className="space-y-2 pl-1">
                {["Pode não colocar enchimento", "Achate", "Feche com alguns pontos"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ImagePlaceholder caption="Bracinho pequeno." />
            </div>
          </div>
        ),
      },
      {
        id: "d6-perninhas",
        title: "Perninhas (2x)",
        emoji: "🦶",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">Volta 1 — MR com 6 pb</h3>
              <ImagePlaceholder caption="Anel mágico com 6 pontos." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">Voltas 2–3 — 6 pb</h3>
              <p>Coloque pouquinho enchimento. Ela fica tipo uma "gotinha". Deixe fio longo.</p>
              <ImagePlaceholder caption="Perninha arredondada." />
            </div>
          </div>
        ),
      },
      {
        id: "d6-missao",
        title: "Missão do Dia 6",
        emoji: "🎯",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-primary">Você agora tem:</p>
            <ul className="space-y-2 pl-1">
              {["1 corpo", "2 orelhas", "2 braços", "2 pernas"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>É literalmente um kit de coelho desmontado 🥹</p>
            <Separator className="my-6" />
            <p className="text-center font-serif text-xl">📆 Amanhã (Dia 7): montagem, costura e rostinho!</p>
          </div>
        ),
      },
    ],
  },

  /* ═══════════════════════════════════════════
     DIA 7 — Montagem, rostinho e chaveiro
     ═══════════════════════════════════════════ */
  {
    title: "Montagem, rostinho e chaveiro",
    emoji: "📆",
    tintClass: tints[0],
    topics: [
      {
        id: "d7-prep",
        title: "Preparação",
        emoji: "🌬️",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Hoje sua peça deixa de ser "partes" e vira um personagem. Respira fundo. Você já fez a parte difícil.</p>
          </div>
        ),
      },
      {
        id: "d7-orelhas",
        title: "Costurando as orelhas",
        emoji: "🧵",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">📍 Onde colocar?</h3>
              <p>No topo da cabeça. Levemente inclinadas para trás (não retas). Isso deixa ele mais fofinho.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">Passo a passo</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Achate a base da orelha</li>
                <li>Posicione no topo da cabeça</li>
                <li>Passe a agulha por dentro dos pontos da cabeça (não atravesse o boneco)</li>
                <li>Dê 3–4 pontos de costura</li>
                <li>Arremate escondendo o fio dentro da cabeça</li>
              </ol>
              <ImagePlaceholder caption="Agulha costurando base da orelha." />
            </div>
          </div>
        ),
      },
      {
        id: "d7-bracinhos",
        title: "Bracinhos",
        emoji: "🐾",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-medium">📍 Posição: lateral do corpo, logo abaixo da cabeça.</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Achate levemente o bracinho</li>
              <li>Encoste na lateral</li>
              <li>Costure apenas a parte de trás (deixa o braço soltinho na frente)</li>
            </ol>
            <ImagePlaceholder caption="Costura do bracinho." />
          </div>
        ),
      },
      {
        id: "d7-perninhas",
        title: "Perninhas",
        emoji: "🦶",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-medium">📍 Parte da frente inferior do corpo. Ele vai parecer sentado.</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Posicione as duas primeiro (veja se estão na mesma altura)</li>
              <li>Costure por baixo, bem firme</li>
            </ol>
            <ImagePlaceholder caption="Costura das perninhas." />
          </div>
        ),
      },
      {
        id: "d7-rostinho",
        title: "Rostinho (opcional, mas MUITO fofo)",
        emoji: "🐰",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="text-sm italic">Use linha rosa ou preta.</p>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">👃 Nariz em "V"</h3>
              <p>Entre no centro do focinho, faça um ponto diagonal e depois outro pro outro lado. Forma um "V" pequeno.</p>
              <ImagePlaceholder caption="Bordado do nariz." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">🙂 Boquinha</h3>
              <p>Dois pontinhos curtos abaixo do nariz.</p>
              <ImagePlaceholder caption="Bordado da boquinha." />
            </div>
          </div>
        ),
      },
      {
        id: "d7-chaveiro",
        title: "Argola de chaveiro",
        emoji: "🔑",
        content: (
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">Opção 1 (mais fácil)</h3>
              <p>Passe a argola entre os pontos do topo da cabeça.</p>
              <ImagePlaceholder caption="Argola passada nos pontos do topo." />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl">Opção 2 (mais seguro)</h3>
              <p>Faça 6–8 correntinhas, costure no topo e prenda a argola.</p>
              <ImagePlaceholder caption="Corrente costurada no topo." />
            </div>
          </div>
        ),
      },
      {
        id: "d7-toque-final",
        title: "Toque final secreto",
        emoji: "✨",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>Se puxar um fio ao redor da base da cabeça e apertar levemente… Ele cria um "pescocinho" 🥹</p>
            <ImagePlaceholder caption="Pescocinho sendo criado." />
          </div>
        ),
      },
      {
        id: "d7-missao",
        title: "Missão final",
        emoji: "💛",
        content: (
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p className="font-bold text-primary">Olhe pra ele. Você:</p>
            <ul className="space-y-2 pl-1">
              {["aprendeu do zero", "fez pontos que nunca tinha feito", "construiu algo com as mãos", "terminou um projeto"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-serif text-xl">Esse coelhinho é a sua primeira vitória em amigurumi. E é só o começo 🧶✨</p>
          </div>
        ),
      },
    ],
  },
];