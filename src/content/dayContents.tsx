import { Check, AlertCircle, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
"@/components/ui/table";
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
  emoji: "📆",
  tintClass: tints[0],
  topics: [
  {
    id: "d1-prep",
    title: "Preparação",
    emoji: "🌬️",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Respire fundo.</p>
            <p>Se a mão travar, se o fio embolar, se não ficar bonito…</p>
            <p>Isso é o normal.</p>
            <p>Ninguém faz perfeito no primeiro dia.</p>
            <p>Seu objetivo hoje NÃO é ficar lindo. É aprender o movimento.</p>
            <Separator className="my-4" />
            <p>Hoje você vai aprender duas coisas:</p>
            <p>🌀 Como começar uma peça (anel mágico)</p>
            <p>➖ Como fazer o ponto principal do amigurumi (ponto baixo)</p>
            <p>Só isso. E isso já é enorme.</p>
          </div>

  },
  {
    id: "d1-receita",
    title: "Primeira Parte da Receita",
    emoji: "📌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold">Peça: Base do corpo</p>
            <p>Volta 1:</p>
            <p className="pl-4">MR com 6 pb → (6)</p>
            <p>Volta 2:</p>
            <p className="pl-4">6 aum → (12)</p>
            <Separator className="my-4" />
            <p>Esta é a primeira parte da receita; nos próximos passos vamos explicar a execução — pode avançar.</p>
          </div>

  },
  {
    id: "d1-volta1",
    title: "Volta 1 — O Anel Mágico (MR) com 6 pb",
    emoji: "🌀",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>É assim que quase todo amigurumi começa. Ele cria um círculo fechado, sem buraco no meio.</p>
            <p>Vamos devagar.</p>

            <h3 className="font-bold">✋ Passo 1 — Enrolar o fio no dedo</h3>
            <p>Pegue a ponta do fio.</p>
            <p>Coloque sobre seu dedo indicador.</p>
            <p>Dê uma volta no dedo formando um "X".</p>
            <p>A ponta do fio fica por baixo, o fio do novelo por cima.</p>
            <p>Você formou um círculo em volta do dedo.</p>
            <ImagePlaceholder caption="Fio enrolado no dedo formando um X." />

            <h3 className="font-bold">🧵 Passo 2 — Entrar com a agulha</h3>
            <p>Coloque a agulha por baixo do primeiro fio.</p>
            <p>Pegue o fio de trás com o gancho.</p>
            <p>Puxe para frente.</p>
            <p>Agora há 1 laçada na agulha.</p>
            <ImagePlaceholder caption="Agulha puxando o fio de dentro do círculo." />

            <h3 className="font-bold">🔒 Passo 3 — Fazer uma correntinha para travar</h3>
            <p>Pegue o fio novamente.</p>
            <p>Puxe passando pela laçada da agulha.</p>
            <p>Isso só trava o anel.</p>
            <p>Ainda não conta como ponto.</p>

            <h3 className="font-bold">🔁 Passo 4 — Fazer pontos dentro do anel</h3>
            <p>Agora você vai fazer 6 pontos baixos DENTRO do círculo.</p>
            <p>Não no fio solto.</p>
            <p>Dentro do círculo que está no seu dedo.</p>
            <p>Vamos lembrar o ponto baixo:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Entra com a agulha no círculo</li>
              <li>Puxa o fio (2 laçadas na agulha)</li>
              <li>Puxa o fio de novo</li>
              <li>Passa pelas 2 laçadas</li>
            </ol>
            <p>Isso é 1 ponto baixo (pb).</p>
            <p>Repita até ter 6 pontos.</p>
            <ImagePlaceholder caption="6 pontos feitos ao redor do anel ainda solto." />

            <h3 className="font-bold">🤏 Passo 5 — Fechar o anel</h3>
            <p>Agora vem a parte mágica:</p>
            <p>Solte o fio do dedo.</p>
            <p>Puxe a ponta do fio que sobrou.</p>
            <p>O buraco do meio vai fechar sozinho.</p>
            <p>✨ Você acabou de criar a base da peça.</p>
            <p>Se não fechar totalmente, é normal. Ajuste puxando com cuidado.</p>
            <ImagePlaceholder caption="Antes e depois de puxar o fio e fechar o círculo." />
          </div>

  },
  {
    id: "d1-entendendo",
    title: "Entendendo o que você fez",
    emoji: "🔍",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Olhe para sua peça.</p>
            <p>Você deve ver um pequeno círculo com 6 "Vzinhos" na borda.</p>
            <p>Cada "V" = 1 ponto.</p>
            <p>Conte com calma.</p>
            <p>Se tiver:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>5 → escapou um ponto</li>
              <li>7 → entrou duas vezes sem perceber</li>
            </ul>
            <p>Errar aqui é comum. Pode refazer sem culpa 💛</p>
          </div>

  },
  {
    id: "d1-volta2",
    title: "Volta 2 — A Primeira Volta de Verdade",
    emoji: "🔄",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos começar a crescer o círculo.</p>
            <p>Hoje você só vai fazer aumentos.</p>
            <p>Em cada ponto, você fará 2 pontos baixos.</p>
            <p>Você tem 6 pontos. Vai terminar com 12.</p>

            <h3 className="font-bold">🧵 Como fazer</h3>
            <p>Entre no primeiro ponto.</p>
            <p>Faça 1 ponto baixo.</p>
            <p>Sem sair do mesmo lugar, faça outro ponto baixo.</p>
            <p>Isso é 1 aumento (aum).</p>
            <p>Repita nos 6 pontos.</p>
            <p>No final, conte os "Vzinhos" da borda.</p>
            <p>Você deve ter: 12</p>
            <ImagePlaceholder caption="Círculo maior mostrando 12 pontos." />
          </div>

  },
  {
    id: "d1-verificacao",
    title: "Verificação",
    emoji: "👀",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">😰 "Minha peça está estranha"</h3>
            <p>Normal se:</p>
            <ul className="space-y-1 pl-1">
              {["Está torto", "Está meio ondulado", "Os pontos parecem apertados", 'Parece um "chapéuzinho"'].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Isso tudo melhora com prática.</p>
            <p>O que importa é que você:</p>
            <p>✨ fez o anel mágico</p>
            <p>✨ fez ponto baixo</p>
            <p>✨ fez aumento</p>
            <p>Você já sabe a base de quase todo amigurumi.</p>

            <Separator className="my-4" />

            <h3 className="font-bold">👀 Como sua peça deve parecer agora</h3>
            <ul className="space-y-1 pl-1">
              {["Pequeno círculo", "Centro fechado", "Bordas arredondadas", "Não parece plano como um pano, nem fechado como uma bolinha ainda"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>

            <Separator className="my-4" />

            <h3 className="font-bold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-rosa-argila" />
              Se algo estiver diferente
            </h3>
            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Situação</TableHead>
                    <TableHead className="text-verde-eucalipto">Motivo</TableHead>
                    <TableHead className="text-verde-eucalipto">Solução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Buraco no meio</TableCell>
                    <TableCell className={tableCellClass}>fio do anel não foi puxado</TableCell>
                    <TableCell className={tableCellClass}>puxar a ponta com cuidado</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Peça dobrando</TableCell>
                    <TableCell className={tableCellClass}>ponto apertado</TableCell>
                    <TableCell className={tableCellClass}>relaxar a mão</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Ondulada</TableCell>
                    <TableCell className={tableCellClass}>ponto frouxo</TableCell>
                    <TableCell className={tableCellClass}>segurar o fio com mais firmeza</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

  },
  {
    id: "d1-missao",
    title: "Missão do Dia 1",
    emoji: "💛",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-1 pl-1">
              {["Fazer o anel mágico", "Colocar 6 pontos dentro", "Fechar o anel", "Fazer 1 volta de aumentos (12 pontos)"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Se conseguiu isso, você já começou de verdade.</p>
            <Separator className="my-4" />
            <p className="text-center">📆 Amanhã: vamos continuar crescendo a base do corpinho do coelhinho 🐰</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje seu coelhinho começa a ganhar forma 🐰</p>
            <p>Até agora você tem um pequeno círculo.</p>
            <p>Hoje ele deixa de ser um círculo e começa a virar um "potinho".</p>
            <p>Isso acontece porque vamos continuar aumentando… mas com mais espaço entre os aumentos.</p>
          </div>

  },
  {
    id: "d2-receita",
    title: "Receita do dia",
    emoji: "📌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold">Peça: Base do corpo</p>
            <p>Volta 3:</p>
            <p className="pl-4">(1 pb, 1 aum) × 6 → 18 pontos</p>
            <p>Volta 4:</p>
            <p className="pl-4">(2 pb, 1 aum) × 6 → 24 pontos</p>
            <Separator className="my-4" />
            <p>Agora vamos fazer isso devagar e detalhado.</p>
          </div>

  },
  {
    id: "d2-leitura",
    title: "O que significa essa receita?",
    emoji: "🧠",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Vamos pegar a Volta 3, somente de exemplo:</p>
            <p className="pl-4 font-medium">(1 pb, 1 aum) × 6 → (18)</p>
            <p>Significa:</p>
            <p>1 ponto baixo sozinho</p>
            <p>depois</p>
            <p>1 aumento (2 pontos baixos no mesmo lugar)</p>
            <p>Isso forma um bloquinho.</p>
            <p>Você vai repetir esse bloquinho 6 vezes.</p>
            <p>Ao final você terá 18 pontos.</p>
          </div>

  },
  {
    id: "d2-volta3",
    title: "Volta 3 — Crescendo com controle (18 pontos)",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você terminou o Dia 1 com 12 pontos.</p>
            <p>Coloque o marcador no primeiro ponto da volta.</p>
            <p>Agora vamos trabalhar alternando:</p>
            <p>👉 1 ponto sozinho</p>
            <p>👉 1 aumento</p>

            <h3 className="font-bold">✋ Passo 1 — Fazer 1 ponto baixo</h3>
            <p>Entre no primeiro ponto.</p>
            <p>Faça 1 ponto baixo normal.</p>
            <ImagePlaceholder caption='Close da agulha entrando em um ponto da borda (formato de "V") e puxando o fio.' />

            <h3 className="font-bold">✋ Passo 2 — Fazer um aumento</h3>
            <p>Vá para o próximo ponto.</p>
            <p>Aqui você fará um aumento (2 pontos baixos no mesmo lugar):</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Entre no ponto e faça 1 ponto baixo</li>
              <li>sem sair do mesmo lugar, faça outro ponto baixo</li>
            </ol>
            <p>Você colocou 2 pontos no mesmo ponto.</p>
            <p>Pronto. Você fez o primeiro conjunto.</p>
            <ImagePlaceholder caption="Mostrando a agulha entrando duas vezes no mesmo ponto da base." />

            <h3 className="font-bold">🔁 Agora repita isso</h3>
            <p>Você vai repetir essa sequência ao redor da peça:</p>
            <p>1 pb sozinho</p>
            <p>1 aumento</p>
            <p>Ao redor da peça inteira.</p>
            <ImagePlaceholder caption="Peça vista de cima mostrando alternância: um ponto sozinho, depois dois juntos." />

            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Conjunto</TableHead>
                    <TableHead className="text-verde-eucalipto">O que fazer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6].map((n) =>
            <TableRow key={n} className={tableRowClass}>
                      <TableCell className={tableCellClass}>{n}º</TableCell>
                      <TableCell className={tableCellClass}>1 pb, 1 aum</TableCell>
                    </TableRow>
            )}
                </TableBody>
              </Table>
            </div>

            <h3 className="font-bold">🔎 Conferência da Volta 3</h3>
            <p>No final, conte os pontos da borda.</p>
            <p>Você deve ter: 18 pontos</p>
            <p>Se tiver menos → faltou aumento.</p>
            <p>Se tiver mais → fez aumento onde não devia.</p>
            <ImagePlaceholder caption="Círculo um pouco maior, começando a curvar." />
          </div>

  },
  {
    id: "d2-volta4",
    title: "Volta 4 — A base ficando maior (24 pontos)",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora os aumentos ficam mais espaçados.</p>
            <p>Em vez de 1 ponto sozinho, agora serão 2 pontos sozinhos antes do aumento.</p>

            <h3 className="font-bold">✋ Passo 1 — Fazer 2 pontos baixos</h3>
            <p>No primeiro ponto → faça 1 pb</p>
            <p>No segundo ponto → faça 1 pb</p>
            <p>Agora você fez 2 pb sozinhos.</p>
            <ImagePlaceholder caption="Dois pontos baixos sendo feitos em pontos diferentes, lado a lado." />

            <h3 className="font-bold">✋ Passo 2 — Fazer 1 aumento</h3>
            <p>No próximo ponto:</p>
            <p>Faça 1 ponto baixo</p>
            <p>Faça outro ponto baixo no mesmo lugar</p>
            <p>Pronto. Esse é um conjunto.</p>
            <ImagePlaceholder caption="Dois pontos saindo do mesmo ponto da base." />

            <h3 className="font-bold">🔁 Passo 3 — Repetir o padrão</h3>
            <p>Repita ao redor:</p>
            <p>➡ 2 pontos baixos</p>
            <p>➡ 1 aumento</p>
            <p>Faça isso 6 vezes.</p>
            <ImagePlaceholder caption='Vista superior da peça mostrando grupos: dois pontos normais, um ponto "duplo".' />

            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Conjunto</TableHead>
                    <TableHead className="text-verde-eucalipto">O que fazer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6].map((n) =>
            <TableRow key={n} className={tableRowClass}>
                      <TableCell className={tableCellClass}>{n}º</TableCell>
                      <TableCell className={tableCellClass}>2 pb, 1 aum</TableCell>
                    </TableRow>
            )}
                </TableBody>
              </Table>
            </div>

            <h3 className="font-bold">🔎 Conferência da Volta 4</h3>
            <p>Conte os pontos.</p>
            <p>Agora devem ser: 24 pontos</p>
            <p>Sua peça deve estar:</p>
            <ul className="space-y-1 pl-1">
              {["maior", "começando a subir nas laterais", "parecendo um pratinho fundo"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <ImagePlaceholder caption="Base com curvinha suave formando o fundo do corpo." />
          </div>

  },
  {
    id: "d2-problemas",
    title: "Se algo parecer estranho",
    emoji: "❗",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Situação</TableHead>
                    <TableHead className="text-verde-eucalipto">Motivo</TableHead>
                    <TableHead className="text-verde-eucalipto">Solução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Continua plano</TableCell>
                    <TableCell className={tableCellClass}>pontos frouxos</TableCell>
                    <TableCell className={tableCellClass}>segure o fio com mais firmeza</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Está fechando rápido</TableCell>
                    <TableCell className={tableCellClass}>pontos apertados</TableCell>
                    <TableCell className={tableCellClass}>relaxe a mão</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Ondulado</TableCell>
                    <TableCell className={tableCellClass}>aumentou demais</TableCell>
                    <TableCell className={tableCellClass}>conte os pontos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

  },
  {
    id: "d2-missao",
    title: "Missão do Dia 2",
    emoji: "💛",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-1 pl-1">
              {["Fazer a Volta 3 → 18 pontos", "Fazer a Volta 4 → 24 pontos"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Agora seu coelhinho deixou de ser um círculo.</p>
            <p>Ele está começando a virar um corpinho.</p>
            <Separator className="my-4" />
            <p className="text-center">📆 Amanhã: vamos subir as laterais sem aumentar — é quando a peça vira uma "panelinha" 🐰✨</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje você não vai fazer nada "novo".</p>
            <p>E é exatamente isso que faz a mágica acontecer.</p>
            <p>Você só vai repetir ponto baixo.</p>
            <p>Mas isso transforma o disco em um corpinho.</p>
          </div>

  },
  {
    id: "d3-receita",
    title: "Receita do dia",
    emoji: "📌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p className="font-bold">Peça: Corpo do coelho</p>
            <p>Você terminou o Dia 2 com 24 pontos.</p>
            <p>Agora faça:</p>
            <p className="font-bold">Voltas 5 a 9:</p>
            <p className="pl-4">24 pb → (24)</p>
            <p>Isso significa:</p>
            <p>Você vai fazer 5 voltas seguidas, todas iguais,</p>
            <p>sem aumentar e sem diminuir.</p>
          </div>

  },
  {
    id: "d3-explicacao",
    title: "O que isso faz com a peça?",
    emoji: "🧠",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ontem você aumentava → ela crescia para os lados.</p>
            <p>Hoje você não aumenta → ela cresce para cima.</p>
            <p>É assim que criamos a lateral do corpo.</p>
          </div>

  },
  {
    id: "d3-voltas",
    title: "Voltas 5 a 9 — Repetição",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">🧵 Como fazer</h3>
            <p>Entre no primeiro ponto da volta.</p>
            <p>Faça 1 ponto baixo.</p>
            <p>Continue fazendo 1 ponto baixo em cada ponto ao redor.</p>
            <p>Sem aumento.</p>
            <p>Sem mudança.</p>
            <p>Só repetir.</p>
            <ImagePlaceholder caption='Peça começando a criar uma "parede".' />

            <h3 className="font-bold">🧷 Use o marcador</h3>
            <p>Agora ele vira seu melhor amigo.</p>
            <p>Coloque no primeiro ponto da volta.</p>
            <p>Quando chegar nele de novo, você terminou uma volta.</p>
            <p>Repita isso até completar 5 voltas.</p>

            <h3 className="font-bold">👀 Como saber se está certo</h3>
            <p>Sua peça vai começar a parecer:</p>
            <p>🥣 uma tigelinha</p>
            <p>ou</p>
            <p>🧺 um potinho</p>
            <p>As laterais vão subir sozinhas.</p>
            <p>Se estiver ficando plano → você aumentou sem querer.</p>
            <p>Se estiver fechando → você diminuiu sem perceber.</p>
          </div>

  },
  {
    id: "d3-dicas",
    title: "Dica importante e relaxamento",
    emoji: "😌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">✋ Dica importante</h3>
            <p>Não puxe o fio com força.</p>
            <p>Se apertar demais:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>a peça fica dura</li>
              <li>difícil de encher depois</li>
              <li>sua mão cansa</li>
            </ul>
            <p>Tente manter o ponto firme, mas macio.</p>

            <Separator className="my-4" />

            <h3 className="font-bold">😌 Parte relaxante do projeto</h3>
            <p>Este é o momento mais calmo do processo.</p>
            <p>É só repetir.</p>
            <p>Respire junto com os pontos.</p>
            <p>Puxa o fio.</p>
            <p>Entra no ponto.</p>
            <p>Fecha o ponto.</p>
            <p>Sem pressa.</p>
          </div>

  },
  {
    id: "d3-problemas",
    title: "Problemas comuns",
    emoji: "❗",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <div className="rounded-xl border border-verde-eucalipto/20 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className={tableHeaderClass}>
                    <TableHead className="text-verde-eucalipto">Situação</TableHead>
                    <TableHead className="text-verde-eucalipto">Motivo</TableHead>
                    <TableHead className="text-verde-eucalipto">Solução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Está fechando</TableCell>
                    <TableCell className={tableCellClass}>você diminuiu sem querer</TableCell>
                    <TableCell className={tableCellClass}>verifique se fez só pb</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Está abrindo muito</TableCell>
                    <TableCell className={tableCellClass}>pontos frouxos</TableCell>
                    <TableCell className={tableCellClass}>segure o fio mais firme</TableCell>
                  </TableRow>
                  <TableRow className={tableRowClass}>
                    <TableCell className={tableCellClass}>Está torto</TableCell>
                    <TableCell className={tableCellClass}>tensão desigual</TableCell>
                    <TableCell className={tableCellClass}>normal, melhora com prática</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

  },
  {
    id: "d3-missao",
    title: "Missão do Dia 3",
    emoji: "💛",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-1 pl-1">
              {["Fazer as voltas 5 a 9", "Manter 24 pontos em todas"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Seu coelho já tem um corpo.</p>
            <Separator className="my-4" />
            <p className="text-center">📆 Amanhã: vamos começar a fechar a parte de cima e ele vai deixar de ser um copinho para virar uma bolinha 🐰✨</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Até ontem sua peça parecia um copinho.</p>
            <p>Hoje ela vira uma bolinha 🐰</p>
            <p>Aqui aprendemos a diminuição (dim).</p>
            <p>Hoje você aprende a técnica nova: diminuição (dim).</p>
          </div>

  },
  {
    id: "d4-receita",
    title: "Receita do dia",
    emoji: "📌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Volta 10: (2 pb, 1 dim) × 6 → 18 pontos</p>
            <p>Volta 11: (1 pb, 1 dim) × 6 → 12 pontos</p>
            <p>Volta 12: 12 pb → 12 pontos</p>
          </div>

  },
  {
    id: "d4-dim",
    title: "Como fazer a diminuição (dim)",
    emoji: "➖",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você vai usar isso nas voltas 10 e 11.</p>

            <h3 className="font-bold">✋ Passo 1 — Entrar no primeiro ponto</h3>
            <p>Coloque a agulha no próximo ponto e puxe o fio.</p>
            <p>Ficam 2 laçadas na agulha.</p>
            <p>Não feche.</p>
            <ImagePlaceholder caption="Agulha dentro do primeiro ponto da diminuição, duas laçadas visíveis." />

            <h3 className="font-bold">✋ Passo 2 — Entrar no segundo ponto</h3>
            <p>Sem fechar, entre no ponto seguinte e puxe o fio.</p>
            <p>Agora há 3 laçadas na agulha.</p>
            <ImagePlaceholder caption="Agulha pegando o segundo ponto, três laçadas na agulha." />

            <h3 className="font-bold">✋ Passo 3 — Fechar tudo</h3>
            <p>Pegue o fio e passe pelas 3 laçadas de uma vez.</p>
            <p>Pronto. Dois pontos viraram um.</p>
            <ImagePlaceholder caption="Laçadas sendo fechadas juntas." />

            <p>Se entendeu até aqui, avance para a execução guiada</p>
          </div>

  },
  {
    id: "d4-volta10",
    title: "Volta 10 — (2 pb, 1 dim) × 6 → 18 pontos",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos fechar o corpo aos poucos.</p>

            <h3 className="font-bold">✋ Passo 1 — Fazer 1 ponto baixo</h3>
            <p>Entre no ponto e faça 1 pb.</p>
            <ImagePlaceholder caption="Agulha entrando em um ponto da borda." />

            <h3 className="font-bold">✋ Passo 2 — Fazer outro ponto baixo</h3>
            <p>No ponto seguinte, faça mais 1 pb.</p>
            <ImagePlaceholder caption="Dois pontos baixos lado a lado já feitos." />

            <h3 className="font-bold">✋ Passo 3 — Fazer 1 diminuição</h3>
            <p>Use a técnica que você aprendeu:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>entra no ponto</li>
              <li>entra no próximo</li>
              <li>puxa o fio</li>
              <li>fecha tudo</li>
            </ol>
            <ImagePlaceholder caption="Agulha atravessando dois pontos juntos." />

            <h3 className="font-bold">🔁 Repita isso</h3>
            <p>2 pb → 1 dim</p>
            <p>Faça isso 6 vezes ao redor.</p>
            <p>Resultado: 18 pontos</p>
            <p>A abertura começa a diminuir.</p>
            <ImagePlaceholder caption="Topo da peça começando a fechar." />
          </div>

  },
  {
    id: "d4-volta11",
    title: "Volta 11 — (1 pb, 1 dim) × 6 → 12 pontos",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora fecha mais rápido.</p>

            <h3 className="font-bold">✋ Passo 1 — Fazer 1 ponto baixo</h3>
            <ImagePlaceholder caption="Agulha fazendo ponto normal." />

            <h3 className="font-bold">✋ Passo 2 — Fazer 1 diminuição</h3>
            <p>Mesma técnica:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>entra em um ponto</li>
              <li>entra no próximo</li>
              <li>puxa o fio</li>
              <li>fecha tudo</li>
            </ol>
            <ImagePlaceholder caption="Diminuição em execução." />

            <h3 className="font-bold">🔁 Repita</h3>
            <p>1 pb → 1 dim</p>
            <p>6 vezes.</p>
            <p>Resultado: 12 pontos</p>
            <p>O buraco do topo fica pequeno.</p>
            <ImagePlaceholder caption="Topo quase fechado." />
          </div>

  },
  {
    id: "d4-enchimento",
    title: "Pare aqui para encher + Volta 12",
    emoji: "🧸",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">🧸 PARE AQUI PARA ENCHER</h3>
            <p>Antes da próxima volta, coloque enchimento.</p>
            <p>Coloque aos poucos.</p>
            <p>Empurre para o fundo e laterais.</p>
            <ImagePlaceholder caption="Mão colocando enchimento na peça." />

            <Separator className="my-4" />

            <h3 className="font-bold">🔄 Volta 12 — 12 pb</h3>
            <p>Agora só estabilizamos.</p>
            <h4 className="font-bold">✋ Passo único</h4>
            <p>Faça 1 ponto baixo em cada ponto da volta.</p>
            <p>Nenhum aumento.</p>
            <p>Nenhuma diminuição.</p>
            <ImagePlaceholder caption="Peça já parecendo bolinha." />
          </div>

  },
  {
    id: "d4-missao",
    title: "Sua peça agora",
    emoji: "💛",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <ul className="space-y-1 pl-1">
              {["redonda", "firme", "quase fechada em cima"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Seu coelho já tem corpo 🐰✨</p>
            <Separator className="my-4" />
            <p className="text-center">📆 Amanhã a gente fecha totalmente e começa as orelhas.</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ontem você:</p>
            <ul className="space-y-1 pl-1">
              {["diminuiu", "modelou o formato", "colocou enchimento"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Hoje vamos fechar completamente.</p>
          </div>

  },
  {
    id: "d5-receita",
    title: "Receita",
    emoji: "📌",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Volta 13: (1 pb, 1 dim) × 6 → 9 pontos</p>
            <p>Volta 14: 9 pb → 9 pontos</p>
            <p>Volta 15: (1 pb, 1 dim) × 3 → 6 pontos</p>
            <p>Volta 16–18: 6 pb → 6 pontos</p>
            <p>Depois: arrematar e fechar.</p>
          </div>

  },
  {
    id: "d5-volta13",
    title: "Volta 13 — (1 pb, 1 dim) × 6 → 9 pontos",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora a abertura já é pequena.</p>
            <h3 className="font-bold">✋ Passo 1 — Faça 1 ponto baixo</h3>
            <p>Normal.</p>
            <ImagePlaceholder caption="Ponto baixo sendo feito perto do topo da peça." />
            <h3 className="font-bold">✋ Passo 2 — Faça 1 diminuição</h3>
            <p>Pegando dois pontos juntos.</p>
            <ImagePlaceholder caption="Agulha atravessando dois pontos do topo." />
            <h3 className="font-bold">🔁 Repita 6 vezes</h3>
            <p>Resultado: 9 pontos</p>
            <p>O topo já parece um buraquinho.</p>
            <ImagePlaceholder caption="Abertura bem pequena." />
          </div>

  },
  {
    id: "d5-volta14-15",
    title: "Voltas 14 e 15",
    emoji: "🔄",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">🔄 Volta 14 — 9 pb</h3>
            <p>Só estabilizar.</p>
            <p>Faça 1 ponto baixo em cada ponto.</p>
            <ImagePlaceholder caption="Topo firme e arredondado." />

            <Separator className="my-4" />

            <h3 className="font-bold">🔄 Volta 15 — (1 pb, 1 dim) × 3 → 6 pontos</h3>
            <p>Agora quase fechando.</p>
            <p>Faça:</p>
            <p>1 pb → 1 dim</p>
            <p>Repita 3 vezes.</p>
            <p>Resultado: 6 pontos</p>
            <ImagePlaceholder caption="Buraquinho minúsculo no topo." />
          </div>

  },
  {
    id: "d5-volta16-18",
    title: "Voltas 16, 17 e 18 — 6 pb",
    emoji: "🔄",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você só vai dar voltinhas pequenas para reforçar.</p>
            <p>Faça 1 ponto baixo em cada ponto (6 no total) por 3 voltas.</p>
            <p>Isso ajuda o topo a ficar mais bonito e firme.</p>
            <ImagePlaceholder caption="Peça já parecendo uma bolinha completa." />
          </div>

  },
  {
    id: "d5-arremate",
    title: "Arremate",
    emoji: "✂️",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos finalizar.</p>
            <h3 className="font-bold">✋ Passo 1 — Corte o fio</h3>
            <p>Deixe um pedaço de uns 15 cm.</p>
            <ImagePlaceholder caption="Tesoura cortando o fio." />
            <h3 className="font-bold">✋ Passo 2 — Puxe o fio todo para fora</h3>
            <p>Passe o fio pela última laçada e puxe.</p>
            <p>Isso trava o trabalho.</p>
            <ImagePlaceholder caption="Laçada sendo puxada para fora." />
          </div>

  },
  {
    id: "d5-fechamento",
    title: "Fechando o buraco",
    emoji: "🪡",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Use a agulha de tapeçaria.</p>
            <h3 className="font-bold">✋ Passo 1</h3>
            <p>Passe a agulha por dentro de cada um dos 6 pontos da borda.</p>
            <ImagePlaceholder caption="Agulha entrando na borda do topo." />
            <h3 className="font-bold">✋ Passo 2</h3>
            <p>Depois de passar por todos, puxe o fio.</p>
            <p>O buraco fecha como um saquinho.</p>
            <ImagePlaceholder caption="Topo fechando ao puxar o fio." />
            <h3 className="font-bold">✋ Passo 3</h3>
            <p>Passe a agulha pelo meio da peça e saia em outro ponto.</p>
            <p>Puxe e corte o excesso.</p>
            <p>O fio some dentro.</p>
            <ImagePlaceholder caption="Fio sendo escondido dentro do amigurumi." />
          </div>

  },
  {
    id: "d5-missao",
    title: "Resultado do dia",
    emoji: "🎉",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você tem:</p>
            <p>🐰 Corpinho completo</p>
            <ul className="space-y-1 pl-1">
              {["redondo", "firme", "fechado"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>A parte "difícil" do amigurumi já foi. Sério.</p>
            <Separator className="my-4" />
            <p>Amanhã entram:</p>
            <p>👂 orelhas</p>
            <p>👐 braços</p>
            <p>🦵 pernas</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje é o dia do:</p>
            <p>"AAAAA agora virou um coelho mesmo" 🐰</p>
            <p>São peças pequenas → perfeitas pra iniciante ganhar confiança.</p>
          </div>

  },
  {
    id: "d6-orelhas",
    title: "Orelhas (faça 2)",
    emoji: "👂",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Peça fina, não leva enchimento.</p>

            <h3 className="font-bold">🔄 Volta 1 — MR com 5 pb</h3>
            <p>Passo 1 — Faça o anel mágico</p>
            <ImagePlaceholder caption="Fio enrolado no dedo." />
            <p>Passo 2 — Faça 5 pontos baixos dentro do anel</p>
            <ImagePlaceholder caption="Agulha entrando no anel." />
            <p>Passo 3 — Puxe o fio para fechar</p>
            <ImagePlaceholder caption="Círculo pequeno fechado." />
            <p>Resultado: bolinha minúscula.</p>

            <h3 className="font-bold">🔄 Volta 2 — (1 pb, 1 aum) x2, 1 pb → 7 pontos</h3>
            <p>Tradução:</p>
            <p>1 ponto normal</p>
            <p>1 aumento</p>
            <p>(repete 2x)</p>
            <p>1 ponto normal</p>
            <ImagePlaceholder caption="Peça levemente oval." />

            <h3 className="font-bold">🔄 Voltas 3 a 7 — 7 pb</h3>
            <p>Só subir.</p>
            <p>1 ponto baixo em cada ponto, por 5 voltas.</p>
            <p>Ela vira um "tubinho achatável".</p>
            <ImagePlaceholder caption="Orelha compridinha." />

            <h3 className="font-bold">✋ Finalização da orelha</h3>
            <ul className="space-y-1 pl-1">
              {["Não encher", "Achatar com os dedos", "Deixar fio longo"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <ImagePlaceholder caption="Orelha achatada." />
          </div>

  },
  {
    id: "d6-bracinhos",
    title: "Bracinhos (2x)",
    emoji: "🐾",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">Volta 1 — MR com 5 pb</h3>
            <ImagePlaceholder caption="Anel mágico com 5 pontos." />

            <h3 className="font-bold">Voltas 2–4 — 5 pb</h3>
            <p>Só subir 3 carreiras.</p>
            <p>Peça minúscula tipo "rolinho".</p>
            <ul className="space-y-1 pl-1">
              {["Pode não colocar enchimento", "Achate", "Feche com alguns pontos"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <ImagePlaceholder caption="Bracinho pequeno." />
          </div>

  },
  {
    id: "d6-perninhas",
    title: "Perninhas (2x)",
    emoji: "🦶",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <h3 className="font-bold">Volta 1 — MR com 6 pb</h3>
            <ImagePlaceholder caption="Anel mágico com 6 pontos." />

            <h3 className="font-bold">Voltas 2–3 — 6 pb</h3>
            <p>Coloque pouquinho enchimento.</p>
            <p>Ela fica tipo uma "gotinha".</p>
            <ImagePlaceholder caption="Perninha arredondada." />
            <p>Deixe fio longo.</p>
          </div>

  },
  {
    id: "d6-missao",
    title: "Missão do Dia 6",
    emoji: "🎯",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você agora tem:</p>
            <ul className="space-y-1 pl-1">
              {["1 corpo", "2 orelhas", "2 braços", "2 pernas"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Separados na mesa.</p>
            <p>É literalmente um kit de coelho desmontado 🥹</p>
            <Separator className="my-4" />
            <p className="text-center">📆 Amanhã (Dia 7):</p>
            <p className="text-center">✨ montagem ✨ costura ✨ rostinho ✨ argola de chaveiro ✨ toque final de fofura</p>
          </div>

  }]

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
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Hoje sua peça deixa de ser "partes" e vira um personagem.</p>
            <p>Respira fundo. Você já fez a parte difícil.</p>
          </div>

  },
  {
    id: "d7-orelhas",
    title: "Costurando as orelhas",
    emoji: "🧵",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Pegue:</p>
            <ul className="space-y-1 pl-1">
              {["Cabeça + corpo", "2 orelhas", "Agulha de tapeçaria"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>

            <h3 className="font-bold">📍 Onde colocar?</h3>
            <p>No topo da cabeça.</p>
            <p>Levemente inclinadas para trás (não retas).</p>
            <p>Isso deixa ele mais fofinho e não "assustado".</p>

            <h3 className="font-bold">Passo a passo</h3>
            <p>1️⃣ Achate a base da orelha</p>
            <ImagePlaceholder caption="Orelha sendo pressionada." />
            <p>2️⃣ Posicione no topo da cabeça</p>
            <ImagePlaceholder caption="Orelha encostada no topo." />
            <p>3️⃣ Passe a agulha por dentro dos pontos da cabeça</p>
            <p>Entre nas alcinhas, não atravesse o boneco.</p>
            <ImagePlaceholder caption="Agulha costurando base da orelha." />
            <p>4️⃣ Dê 3–4 pontos de costura</p>
            <p>A orelha não precisa ficar rígida.</p>
            <p>5️⃣ Arremate escondendo o fio dentro da cabeça</p>
            <p>Repita do outro lado.</p>
          </div>

  },
  {
    id: "d7-bracinhos",
    title: "Bracinhos",
    emoji: "🐾",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>📍 Posição: lateral do corpo, logo abaixo da cabeça.</p>
            <p>1️⃣ Achate levemente o bracinho</p>
            <ImagePlaceholder caption="Bracinho sendo achatado." />
            <p>2️⃣ Encoste na lateral</p>
            <ImagePlaceholder caption="Mostrando posição do bracinho." />
            <p>3️⃣ Costure apenas a parte de trás</p>
            <p>Isso deixa o braço soltinho na frente.</p>
            <ImagePlaceholder caption="Costura do bracinho." />
          </div>

  },
  {
    id: "d7-perninhas",
    title: "Perninhas",
    emoji: "🦶",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>📍 Parte da frente inferior do corpo.</p>
            <p>Ele vai parecer sentado.</p>
            <p>1️⃣ Posicione as duas primeiro (sem costurar)</p>
            <p>Veja se estão na mesma altura.</p>
            <ImagePlaceholder caption="Duas pernas posicionadas." />
            <p>2️⃣ Costure por baixo, bem firme</p>
            <ImagePlaceholder caption="Costura das perninhas." />
          </div>

  },
  {
    id: "d7-rostinho",
    title: "Rostinho (opcional, mas MUITO fofo)",
    emoji: "🐰",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Use linha rosa ou preta.</p>

            <h3 className="font-bold">👃 Nariz em "V"</h3>
            <p>Entre no centro do focinho</p>
            <p>Faça um ponto diagonal</p>
            <p>Depois outro pro outro lado</p>
            <p>Forma um "V" pequeno.</p>
            <ImagePlaceholder caption="Bordado do nariz." />

            <h3 className="font-bold">🙂 Boquinha</h3>
            <p>Dois pontinhos curtos abaixo do nariz.</p>
            <ImagePlaceholder caption="Bordado da boquinha." />
          </div>

  },
  {
    id: "d7-chaveiro",
    title: "Argola de chaveiro",
    emoji: "🔑",
    content:
    <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
            <p>Duas opções:</p>

            <h3 className="font-bold">Opção 1 (mais fácil)</h3>
            <p>Passe a argola entre os pontos do topo da cabeça.</p>
            <ImagePlaceholder caption="Argola passada nos pontos do topo." />

            <h3 className="font-bold">Opção 2 (mais seguro)</h3>
            <p>Faça 6–8 correntinhas</p>
            <p>Costure no topo</p>
            <p>Prenda a argola</p>
            <ImagePlaceholder caption="Corrente costurada no topo." />
          </div>

  },
  {
    id: "d7-toque-final",
    title: "Toque final secreto",
    emoji: "✨",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Se puxar um fio ao redor da base da cabeça e apertar levemente…</p>
            <p>Ele cria um "pescocinho" 🥹</p>
            <ImagePlaceholder caption="Pescocinho sendo criado." />
          </div>

  },
  {
    id: "d7-missao",
    title: "Missão final",
    emoji: "💛",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Olhe pra ele.</p>
            <p>Você:</p>
            <ul className="space-y-1 pl-1">
              {["aprendeu do zero", "fez pontos que nunca tinha feito", "construiu algo com as mãos", "terminou um projeto"].map((item) =>
        <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
        )}
            </ul>
            <p>Esse coelhinho é a sua primeira vitória em amigurumi.</p>
            <p>E é só o começo 🧶✨</p>
          </div>

  },
  {
    id: "d7-conclusao",
    title: "O significado da Primeira Vitória",
    emoji: "🏆",
    content:
    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Esse mini coelho não é apenas um projeto concluído —</p>
            <p>ele é a prova de que você começou, persistiu e criou algo com as próprias mãos.</p>
            <p>Ele simboliza:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>o primeiro passo,</li>
              <li>a coragem de tentar,</li>
              <li>e a alegria de ver algo nascer ponto por ponto.</li>
            </ul>
            <p>Guardar ou presentear esse coelho é lembrar que toda grande jornada no amigurumi começa com uma pequena vitória.</p>
          </div>

  }]

}];