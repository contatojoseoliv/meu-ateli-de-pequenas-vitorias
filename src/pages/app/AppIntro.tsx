import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ImageIcon, Check, Lock, ChevronRight, ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/shared/Button";
import { AppShell } from "@/components/app/AppShell";
import { useIntroProgress } from "@/hooks/useIntroProgress";

/* ── Helpers ── */

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="app-photo-frame rounded-lg border border-border p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground my-4">
      <ImageIcon className="h-8 w-8" />
      <p className="text-xs text-center leading-relaxed">{caption}</p>
    </div>
  );
}

function StoreTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-tip rounded-lg border border-border p-4 my-3">
      {children}
    </div>
  );
}

/* ── Topic data types ── */

type Topic = {
  id: string;
  title: string;
  emoji: string;
  content: React.ReactNode;
};

type IntroCard = {
  title: string;
  emoji: string;
  tintClass: string;
  topics: Topic[];
};

/* ── Content definition ── */

const CARDS: IntroCard[] = [
  {
    title: "Seu primeiro amigurumi, um dia de cada vez",
    emoji: "🌱",
    tintClass: "app-daycard--mint",
    topics: [
      {
        id: "abertura",
        title: "Bem-vinda",
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Se você está aqui, provavelmente sente uma dessas coisas:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>sua mente está ansiosa</li>
              <li>você vive no automático</li>
              <li>sente que precisa de algo que acalme</li>
              <li>ou simplesmente quer aprender algo novo, mas sempre achou que "não leva jeito"</li>
            </ul>
            <p>Esse projeto foi criado exatamente para você.</p>
            <p>Você não precisa ter experiência.</p>
            <p>Você não precisa ser "boa com as mãos".</p>
            <p>Você não precisa entender crochê.</p>
            <p>Você só precisa estar disposta a fazer <strong>um pouquinho por dia</strong>.</p>
          </div>
        ),
      },
      {
        id: "oque-e",
        title: "O que é esse projeto?",
        emoji: "🌱",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este não é um plataforma comum de crochê.</p>
            <p>É um <strong>projeto guiado de 7 dias</strong>.</p>
            <p>Isso significa que você não vai "estudar crochê" primeiro para só depois tentar fazer algo.</p>
            <p>Você vai <strong>aprender fazendo</strong>, em partes pequenas, simples e possíveis.</p>
            <p>A cada dia você vai avançar um pedacinho do seu amigurumi, até que, no final da semana, ele estará pronto — feito pelas suas próprias mãos.</p>
            <p>Sem pressa.</p>
            <p>Sem cobrança.</p>
            <p>Sem perfeição.</p>
          </div>
        ),
      },
      {
        id: "oque-criar",
        title: "O que vamos criar",
        emoji: "🐰",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ao longo desses 7 dias, você vai produzir:</p>
            <p>✨ Um mini coelho amigurumi</p>
            <p>✨ Em formato de chaveiro</p>
            <p>✨ Pequeno, fofo e cheio de personalidade</p>
            <p>Ele vai caber na palma da sua mão — e vai ser a prova física de que você é capaz de aprender algo novo, com calma.</p>
            <p className="font-bold">O Símbolo da Sua Primeira Vitória</p>
            <p>Pensamos em algo que representasse o começo de uma jornada criativa: um símbolo de curiosidade, superação e delicadeza.</p>
            <p>O coelho foi escolhido porque ele traduz exatamente o que é dar os primeiros pontos no amigurumi: movimentos cuidadosos, atenção aos detalhes e pequenos avanços que, juntos, constroem algo vivo e cheio de significado.</p>
            <ImagePlaceholder caption="Imagem ilustrativa do coelho" />
            <p className="font-bold">🧶 Por que o coelho é ideal para quem está aprendendo</p>
            <p>Para quem está aprendendo, o coelho é um excelente modelo pedagógico. Ele permite ensinar:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Formas básicas: Cabeça e corpo arredondados.</li>
              <li>Detalhes longos: As orelhas, que ajudam a praticar aumentos e diminuições de forma clara.</li>
              <li>Expressividade: É muito fácil deixar um coelho "expressivo" apenas com pequenos detalhes nos olhos e focinho.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "mais-que-croche",
        title: "Mais do que crochê",
        emoji: "🧠",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Este projeto também é um exercício de desacelerar.</p>
            <p>Enquanto suas mãos se movem:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>sua respiração fica mais calma</li>
              <li>seus pensamentos diminuem</li>
              <li>seu corpo relaxa</li>
            </ul>
            <p>O movimento repetitivo do fio e da agulha ajuda a tirar a mente do excesso e trazer você para o presente.</p>
            <p>Aqui, o importante não é só o coelhinho.</p>
            <p>É o momento que você cria para você mesma.</p>
          </div>
        ),
      },
      {
        id: "sem-jeito-certo",
        title: 'Não existe "jeito certo"',
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você vai errar pontos.</p>
            <p>Vai desmanchar partes.</p>
            <p>Vai achar que não está bonito.</p>
            <p>Isso faz parte do processo.</p>
            <p>Cada erro é só um passo aprendendo.</p>
            <p>Nada aqui precisa ser perfeito — só precisa ser seu.</p>
          </div>
        ),
      },
      {
        id: "como-funciona",
        title: "Como funciona a jornada",
        emoji: "📆",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada dia terá:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Um objetivo simples</li>
              <li>Um tempo curto de prática</li>
              <li>Uma parte do coelho para fazer</li>
              <li>Orientações passo a passo</li>
              <li>Dicas para relaxar</li>
              <li>Ajuda com erros comuns</li>
            </ul>
            <p>Você só precisa fazer <strong>o dia de hoje</strong>.</p>
            <p>Não pense no resto.</p>
            <Separator className="my-4" />
            <div className="text-center space-y-2">
              <p>Respire fundo.</p>
              <p>Separe seus materiais.</p>
              <p>E quando estiver pronta, vamos começar pelo Dia 1.</p>
              <p>Seu coelhinho já está a caminho. 🐰✨</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    title: "Materiais (só o essencial)",
    emoji: "🧺",
    tintClass: "app-daycard--clay",
    topics: [
      {
        id: "mat-intro",
        title: "Antes de começar",
        emoji: "🧺",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começarmos, você precisará de alguns materiais simples.</p>
            <p>Para este projeto, vamos usar apenas o necessário.</p>
            <p>A simplicidade faz parte da experiência.</p>
            <p>Talvez os nomes sejam novos para você — e está tudo bem.</p>
            <p>Aqui você vai entender:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>qual e o que é cada item</li>
              <li>para que ele serve</li>
              <li>onde comprar e como reconhecer na loja</li>
              <li>o que pedir</li>
              <li>alternativas caso não encontre igual</li>
            </ul>
            <p>Respire. Nada aqui é complicado.</p>
          </div>
        ),
      },
      {
        id: "mat-fio",
        title: 'Fio — o "corpo" do seu coelho',
        emoji: "🧶",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio é o material principal, como se fosse o "tecido" do coelho.</p>
            <p>Ele vai formar cada ponto.</p>
            <p>Para que ele fique pequeno e delicado, você precisa de:</p>
            <p>Fio de algodão para amigurumi ou linha de algodão média</p>
            <StoreTip>
              <p className="text-sm font-medium">Peça na loja:</p>
              <p className="text-sm mt-1">🗣️ "Fio de algodão para amigurumi, para usar com agulha 2.0 ou 2.5 mm"</p>
            </StoreTip>
            <p>✔ Por que esse fio é o ideal para ESTE projeto?</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Ele é firme → o coelho mantém a forma</li>
              <li>Não estica demais → os pontos não abrem</li>
              <li>Ajuda o amigurumi a ficar bem definido</li>
            </ul>
            <p className="font-bold">🎨 Cor</p>
            <p>Cores claras são melhores no começo:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>branco (coelho clássico)</li>
              <li>bege</li>
              <li>rosa claro</li>
              <li>cinza claro</li>
            </ul>
            <p>Cores escuras dificultam ver os pontos enquanto você aprende.</p>
            <p className="font-bold">📍 Onde comprar</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>armarinhos</li>
              <li>lojas de artesanato</li>
              <li>lojas de aviamentos</li>
              <li>online (buscar: "fio amigurumi algodão")</li>
            </ul>
            <ImagePlaceholder caption="Novelo de fio claro, espessura média, em fundo neutro." />
          </div>
        ),
      },
      {
        id: "mat-agulha",
        title: "Agulha de crochê",
        emoji: "🪡",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para esse mini coelho, o tamanho da agulha é importante.</p>
            <p>Você vai pedir:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Agulha de crochê 2.0 mm ou 2.5 mm"</p>
            </StoreTip>
            <p>Isso costuma estar escrito no cabo da agulha.</p>
            <p>Esse tamanho ajuda o coelho a:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>ficar pequeno</li>
              <li>não ficar cheio de buracos</li>
              <li>segurar o enchimento sem aparecer</li>
            </ul>
            <p>Se usar agulha maior, o coelho fica frouxo.</p>
            <p>Se usar muito pequena, fica difícil de puxar o fio.</p>
            <p className="font-bold">📍 Onde encontrar</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>armarinhos</li>
              <li>lojas de artesanato</li>
              <li>kits de crochê online</li>
            </ul>
            <ImagePlaceholder caption="Close do número da agulha marcado no cabo." />
          </div>
        ),
      },
      {
        id: "mat-enchimento",
        title: "Enchimento",
        emoji: "☁️",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É o material que vai dentro do coelhinho.</p>
            <p>Você pode pedir:</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Enchimento para almofada" ou "Fibra siliconada"</p>
            </StoreTip>
            <p>Ele parece um algodão sintético.</p>
            <p>Não precisa de muito — um saquinho pequeno já serve.</p>
            <ImagePlaceholder caption="Mão segurando um pequeno tufo de enchimento." />
          </div>
        ),
      },
      {
        id: "mat-olhos",
        title: "Olhos",
        emoji: "👀",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Você tem duas opções:</p>
            <p className="font-bold">Opção 1 — Olhos de segurança (mais fácil)</p>
            <p>Para o tamanho de chaveiro, o ideal é:</p>
            <p>Olhos de segurança entre 6 mm e 8 mm</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Olhos de segurança pequenos para amigurumi"</p>
            </StoreTip>
            <p>Eles têm uma travinha atrás que prende na peça.</p>
            <p>Se não tiver, você pode bordar com linha preta depois.</p>
            <ImagePlaceholder caption="Olhos de segurança pequenos ao lado de uma moeda." />
          </div>
        ),
      },
      {
        id: "mat-marcador",
        title: "Marcador de ponto",
        emoji: "🧷",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Ajuda você a saber onde começa cada volta.</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Marcador de ponto para crochê"</p>
            </StoreTip>
            <p>Mas você também pode usar:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>fio de outra cor</li>
              <li>clipe</li>
              <li>grampo de cabelo</li>
            </ul>
            <p>Não precisa comprar se não quiser.</p>
            <ImagePlaceholder caption="Marcador preso em um ponto do crochê." />
          </div>
        ),
      },
      {
        id: "mat-tapecaria",
        title: "Agulha de tapeçaria",
        emoji: "🧵",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>É uma agulha de ponta arredondada usada para costurar as partes e esconder fios.</p>
            <StoreTip>
              <p className="text-sm">🗣️ "Agulha de tapeçaria" ou "Agulha de ponta arredondada para lã"</p>
            </StoreTip>
            <p>Ela é mais grossa que agulha de costura comum.</p>
            <ImagePlaceholder caption="Comparação entre agulha de tapeçaria e agulha comum." />
          </div>
        ),
      },
      {
        id: "mat-argola",
        title: "Argola de chaveiro",
        emoji: "🔑",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Para transformar seu coelho em chaveiro.</p>
            <p>Você encontra como:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>argola de chaveiro</li>
              <li>argola metálica com corrente</li>
            </ul>
            <ImagePlaceholder caption="Argola de chaveiro metálica simples." />
          </div>
        ),
      },
      {
        id: "mat-resumo",
        title: "Resumo simples",
        emoji: "💛",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Com isso você já consegue fazer seu coelho:</p>
            <ul className="space-y-1.5 pl-1">
              {["fio de algodão", "agulha 2.0–2.5 mm", "enchimento", "olhos", "agulha de tapeçaria", "marcador (ou improviso)"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Nada além disso é necessário.</p>
            <Separator className="my-4" />
            <h4 className="text-base font-bold">💛 O mais importante</h4>
            <p>Você não precisa acertar tudo perfeitamente.</p>
            <p>Não precisa do "material ideal".</p>
            <p>Precisa apenas de algo que funcione.</p>
            <p>Se tiver:</p>
            <ul className="space-y-1.5 pl-1">
              {["um fio", "uma agulha", "enchimento"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Você já consegue começar.</p>
            <p>No próximo passo, vamos tirar o maior medo de todos:</p>
          </div>
        ),
      },
    ],
  },
  {
    title: "Fundamentos sem complicação",
    emoji: "🧵",
    tintClass: "app-daycard--gold",
    topics: [
      {
        id: "fund-intro",
        title: "Antes de começar",
        emoji: "🧵",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Antes de começar o coelhinho, você só precisa entender algumas coisas simples.</p>
            <p>Você não precisa entender tudo sobre crochê agora. Só o suficiente para conseguir dar os primeiros pontos.</p>
            <p>Vamos por partes, bem devagar.</p>
          </div>
        ),
      },
      {
        id: "fund-agulha",
        title: "Como segurar a agulha",
        emoji: "✋",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Não existe uma única forma certa.</p>
            <p>O importante é que sua mão fique confortável.</p>
            <p>Segure a agulha como se fosse:</p>
            <p>✏️ um lápis</p>
            <p>ou</p>
            <p>🍴 um talher</p>
            <p>O cabo da agulha descansa na sua mão, e a ponta curva fica livre para trabalhar.</p>
            <p>Se sua mão cansar, pare um pouco. Isso é normal no começo.</p>
            <ImagePlaceholder caption="Close na mão segurando a agulha como lápis." />
          </div>
        ),
      },
      {
        id: "fund-fio",
        title: "Como segurar o fio",
        emoji: "🧶",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>O fio não precisa ficar apertado demais.</p>
            <p>Passe o fio:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>por cima do dedo indicador</li>
              <li>por baixo dos outros dedos</li>
            </ul>
            <p>Assim você controla a tensão (a "força" do fio).</p>
            <p>Se o ponto estiver difícil de puxar → está apertado demais.</p>
            <p>Se estiver frouxo e com buracos → está solto demais.</p>
            <p>O ponto ideal é firme, mas confortável.</p>
            <ImagePlaceholder caption="Fio passando pelo dedo indicador da mão." />
          </div>
        ),
      },
      {
        id: "fund-ponto",
        title: "O que é um ponto?",
        emoji: "🔄",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada vez que você:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Entra com a agulha no trabalho</li>
              <li>Puxa o fio</li>
              <li>Forma uma laçada</li>
            </ul>
            <p>Você cria um ponto.</p>
            <p>Depois de pronto, o ponto parece um "V" deitado.</p>
            <p>É isso que você vai repetir muitas vezes.</p>
            <ImagePlaceholder caption='Close mostrando o formato de "V" dos pontos.' />
          </div>
        ),
      },
      {
        id: "fund-contar",
        title: "Contar pontos e voltas",
        emoji: "🔢",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Cada ponto é como um "V" pequenininho.</p>
            <p>Quando a receita disser (12), significa:</p>
            <p>👉 aquela volta deve ter 12 pontos no total.</p>
            <p>Contar ajuda a peça ficar do tamanho certo.</p>
            <p>Não precisa contar toda hora — só no final da volta.</p>
            <ImagePlaceholder caption='Close mostrando vários "Vzinhos" alinhados.' />
            <Separator className="my-4" />
            <h4 className="text-base font-bold">🔄 O que são "voltas" ou "carreiras"</h4>
            <p>O amigurumi é feito em forma de espiral.</p>
            <p>Você começa no centro e vai girando ao redor, como um caracol 🐌</p>
            <p>Cada volta completa é chamada de:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>carreira</li>
              <li>ou volta</li>
            </ul>
            <p>Você não vira o trabalho. Só continua girando.</p>
            <ImagePlaceholder caption="Pequeno círculo de crochê mostrando formato espiral." />
          </div>
        ),
      },
      {
        id: "fund-tabela",
        title: "Técnicas que vamos usar",
        emoji: "🧩",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <p>Agora vamos conhecer as 4 técnicas que constroem quase todo o amigurumi.</p>
            <p>Essas são as únicas que você precisa saber agora:</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Sigla</TableHead>
                  <TableHead className="font-bold">Significa</TableHead>
                  <TableHead className="font-bold">O que acontece</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">MR</TableCell>
                  <TableCell>Anel mágico</TableCell>
                  <TableCell>Começa fazendo um círculo onde os primeiros pontos são feitos, sem deixar buraco</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">pb</TableCell>
                  <TableCell>Ponto baixo</TableCell>
                  <TableCell>O ponto principal do coelho: introduz a agulha no ponto, puxa o fio e fecha tudo de uma vez</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">aum</TableCell>
                  <TableCell>Aumento</TableCell>
                  <TableCell>Faz dois pontos baixos no mesmo ponto de base, aumentando a quantidade de pontos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">dim</TableCell>
                  <TableCell>Diminuição</TableCell>
                  <TableCell>Une dois pontos de base em um único ponto baixo, diminuindo a quantidade de pontos</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p>Você vai aprender cada uma enquanto usa.</p>
          </div>
        ),
      },
      {
        id: "fund-mr-pb",
        title: "MR e Ponto baixo",
        emoji: "🌀",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <h4 className="text-base font-bold">🌀 MR — Anel mágico (onde tudo começa)</h4>
            <p>É um jeito de começar fazendo um círculo bem fechadinho.</p>
            <p>Você vai:</p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Enrolar o fio no dedo formando um círculo</li>
              <li>Colocar a agulha por dentro desse círculo</li>
              <li>Puxar o fio</li>
              <li>Fazer pontos dentro desse círculo</li>
              <li>Puxar a ponta do fio para fechar</li>
            </ol>
            <p>Parece difícil, mas você fará devagar no Dia 1.</p>
            <ImagePlaceholder caption="Sequência mostrando o fio enrolado no dedo formando o círculo." />
            <Separator className="my-4" />
            <h4 className="text-base font-bold">➖ pb — Ponto baixo (o ponto principal)</h4>
            <p>Quase todo o coelho é feito com ele.</p>
            <p>Passo a passo do ponto baixo:</p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Insira a agulha no próximo ponto (embaixo do "V").</li>
              <li>Pegue o fio com a agulha.</li>
              <li>Puxe — agora há 2 laçadas na agulha.</li>
              <li>Pegue o fio novamente.</li>
              <li>Puxe passando pelas 2 laçadas.</li>
            </ol>
            <p>Pronto. Você fez 1 ponto baixo.</p>
            <ImagePlaceholder caption="Sequência mostrando 2 laçadas na agulha antes de fechar o ponto." />
          </div>
        ),
      },
      {
        id: "fund-aum-dim",
        title: "Aumento, diminuição e fechamento",
        emoji: "➕",
        content: (
          <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
            <h4 className="text-base font-bold">➕ aum — Aumento</h4>
            <p>É quando você faz 2 pontos no mesmo lugar.</p>
            <p>Isso faz a peça crescer e ficar redonda.</p>
            <p>Você faz:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>um ponto baixo</li>
              <li>sem sair do lugar, faz outro no mesmo ponto</li>
            </ul>
            <Separator className="my-4" />
            <h4 className="text-base font-bold">➖ dim — Diminuição</h4>
            <p>É quando você transforma 2 pontos em 1.</p>
            <p>Isso faz a peça fechar, como quando formamos a cabeça.</p>
            <p>Você vai:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>entrar no primeiro ponto</li>
              <li>depois no próximo</li>
              <li>puxar o fio</li>
              <li>fechar tudo junto</li>
            </ul>
            <p>Vamos ver isso na prática mais pra frente.</p>
            <Separator className="my-4" />
            <h4 className="text-base font-bold">💛 O que você precisa lembrar</h4>
            <p>Você não precisa decorar.</p>
            <p>Você só precisa tentar.</p>
            <p>O crochê é movimento repetido.</p>
            <p>Sua mão aprende aos poucos.</p>
            <p>Agora que você já sabe o básico, podemos começar de verdade.</p>
          </div>
        ),
      },
    ],
  },
];

/* ── Main component ── */

export default function AppIntro() {
  const intro = useIntroProgress();
  const topicRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToTopic = useCallback((id: string) => {
    setTimeout(() => {
      topicRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, []);

  const totalCards = CARDS.length;
  const completedCount = intro.progress.completedCards.length;
  const allDone = completedCount >= totalCards;
  const progressPct = Math.round((completedCount / totalCards) * 100);

  return (
    <AppShell title="Comece por aqui">
      <main className="container-main py-8 space-y-6">

        {/* ── Progress bar ── */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span>{completedCount} de {totalCards}</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>

        {/* ── Cards ── */}
        {CARDS.map((card, cardIndex) => {
          const unlocked = intro.isCardUnlocked(cardIndex);
          const completed = intro.isCardCompleted(cardIndex);
          const stepIds = card.topics.map((t) => t.id);
          const activeStepId = intro.getActiveStep(cardIndex, stepIds);
          const allRead = intro.allStepsRead(cardIndex, stepIds);

          return (
            <IntroCardBlock
              key={cardIndex}
              card={card}
              cardIndex={cardIndex}
              unlocked={unlocked}
              completed={completed}
              activeStepId={activeStepId}
              allRead={allRead}
              intro={intro}
              topicRefs={topicRefs}
              scrollToTopic={scrollToTopic}
            />
          );
        })}

        {/* ── Final CTAs (only after all done) ── */}
        {allDone && (
          <div className="flex flex-wrap gap-3 justify-center py-4 animate-fade-in">
            <Link to="/app/dia/1">
              <Button variant="primary" size="default">Ir para o Dia 1</Button>
            </Link>
            <Link to="/app">
              <Button variant="ghost" size="default">Voltar</Button>
            </Link>
          </div>
        )}

      </main>
    </AppShell>
  );
}

/* ── Card block component ── */

type IntroCardBlockProps = {
  card: IntroCard;
  cardIndex: number;
  unlocked: boolean;
  completed: boolean;
  activeStepId: string | null;
  allRead: boolean;
  intro: ReturnType<typeof useIntroProgress>;
  topicRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  scrollToTopic: (id: string) => void;
};

function IntroCardBlock({
  card,
  cardIndex,
  unlocked,
  completed,
  activeStepId,
  allRead,
  intro,
  topicRefs,
  scrollToTopic,
}: IntroCardBlockProps) {
  const stepIds = card.topics.map((t) => t.id);

  const handleAdvance = useCallback(
    (currentStepId: string) => {
      intro.markStepRead(cardIndex, currentStepId);
      const idx = stepIds.indexOf(currentStepId);
      if (idx < stepIds.length - 1) {
        scrollToTopic(stepIds[idx + 1]);
      }
    },
    [intro, cardIndex, stepIds, scrollToTopic],
  );

  const handleCompleteCard = useCallback(() => {
    intro.completeCard(cardIndex);
  }, [intro, cardIndex]);

  // Locked card
  if (!unlocked) {
    return (
      <Card className="app-daycard app-daycard--locked">
        <CardContent className="p-5 md:p-6 flex items-center gap-3">
          <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-muted-foreground truncate">
              {card.emoji} {card.title}
            </p>
            <p className="text-xs text-muted-foreground">Conclua a etapa anterior</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Completed or active card — wrapped in a Collapsible so completed ones can be re-read
  return (
    <Collapsible defaultOpen={!completed}>
      <Card className={`app-daycard ${completed ? "app-daycard--done" : card.tintClass} app-daycard--seal`}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left p-5 md:p-6 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-lg">
            {completed ? (
              <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-primary" />
              </div>
            ) : (
              <ChevronDown className="h-5 w-5 text-foreground flex-shrink-0" />
            )}
            <p className="font-bold text-foreground truncate">
              {card.emoji} {card.title}
            </p>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="px-5 pb-6 md:px-6 space-y-2 pt-0">
            {card.topics.map((topic) => {
              const isRead = intro.getStepRead(cardIndex, topic.id);
              const isActive = topic.id === activeStepId;
              const isFuture = !isRead && !isActive;

              return (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  isRead={isRead}
                  isActive={isActive}
                  isFuture={isFuture}
                  onAdvance={() => handleAdvance(topic.id)}
                  ref={(el) => { topicRefs.current[topic.id] = el; }}
                />
              );
            })}

            {/* Complete card button */}
            {allRead && !completed && (
              <div className="pt-4 flex justify-center">
                <Button variant="primary" size="default" onClick={handleCompleteCard}>
                  Concluir etapa ✓
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

/* ── Topic row component ── */

import { forwardRef } from "react";

type TopicRowProps = {
  topic: Topic;
  isRead: boolean;
  isActive: boolean;
  isFuture: boolean;
  onAdvance: () => void;
};

const TopicRow = forwardRef<HTMLDivElement, TopicRowProps>(
  ({ topic, isRead, isActive, isFuture, onAdvance }, ref) => {
    return (
      <div ref={ref} style={{ scrollMarginTop: 90 }}>
        <Collapsible open={isActive} defaultOpen={false}>
          {/* Trigger — always visible */}
          <CollapsibleTrigger
            asChild
            disabled={isFuture}
          >
            <button
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isFuture
                  ? "text-muted-foreground/50 cursor-default"
                  : isRead
                  ? "hover:bg-muted/40 cursor-pointer"
                  : "bg-primary/5 cursor-default"
              }`}
            >
              {/* Status icon */}
              {isRead ? (
                <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              ) : isActive ? (
                <ChevronDown className="h-4 w-4 text-foreground flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-border flex-shrink-0" />
              )}

              <span className={`text-sm font-medium ${isFuture ? "text-muted-foreground/50" : "text-foreground"}`}>
                {topic.emoji} {topic.title}
              </span>
            </button>
          </CollapsibleTrigger>

          {/* Content — visible when active or when re-reading a completed topic */}
          <CollapsibleContent>
            <div className="pl-11 pr-3 pb-3 pt-1">
              {topic.content}

              {/* Advance button (only for active, not-yet-read step) */}
              {!isRead && (
                <div className="pt-4 flex justify-start">
                  <Button variant="secondary" size="sm" onClick={onAdvance}>
                    Entendi, próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
);
TopicRow.displayName = "TopicRow";
