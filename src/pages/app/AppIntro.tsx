import { Link } from "react-router-dom";
import { ImageIcon, Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

/* Placeholder de imagem reutilizável */
function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="app-photo-frame rounded-lg border border-border p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground my-4">
      <ImageIcon className="h-8 w-8" />
      <p className="text-xs text-center leading-relaxed">{caption}</p>
    </div>
  );
}

/* Bloco "Peça na loja" */
function StoreTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-tip rounded-lg border border-border p-4 my-3">
      {children}
    </div>
  );
}

/* Pill de âncora */
function AnchorPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="app-tab-pill rounded-full px-4 py-1.5 text-xs font-medium text-foreground no-underline transition-colors hover:opacity-80"
    >
      {children}
    </a>
  );
}

export default function AppIntro() {
  return (
    <AppShell title="Comece por aqui">
      <main className="container-main py-8 space-y-6">

        {/* ── Âncoras ── */}
        <nav className="flex flex-wrap gap-2 justify-center" aria-label="Seções da página">
          <AnchorPill href="#introducao">Introdução</AnchorPill>
          <AnchorPill href="#materiais">Materiais</AnchorPill>
          <AnchorPill href="#fundamentos">Fundamentos</AnchorPill>
        </nav>

        {/* ═══════════════════════════════════════════
            SEÇÃO 1 — INTRODUÇÃO
        ═══════════════════════════════════════════ */}
        <Card className="app-stitch" id="introducao" style={{ scrollMarginTop: 80 }}>
          <CardContent className="p-6 md:p-8 space-y-6">

            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              Seu primeiro amigurumi, um dia de cada vez
            </h2>

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

            <Separator />

            {/* O que é esse projeto */}
            <h3 className="text-xl font-bold text-foreground">🌱 O que é esse projeto?</h3>
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

            <Separator />

            {/* O que vamos criar */}
            <h3 className="text-xl font-bold text-foreground">🐰 O que vamos criar</h3>
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

            <Separator />

            {/* Mais do que crochê */}
            <h3 className="text-xl font-bold text-foreground">🧠 Mais do que crochê</h3>
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

            <Separator />

            {/* Não existe jeito certo */}
            <h3 className="text-xl font-bold text-foreground">💛 Não existe "jeito certo"</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <p>Você vai errar pontos.</p>
              <p>Vai desmanchar partes.</p>
              <p>Vai achar que não está bonito.</p>
              <p>Isso faz parte do processo.</p>
              <p>Cada erro é só um passo aprendendo.</p>
              <p>Nada aqui precisa ser perfeito — só precisa ser seu.</p>
            </div>

            <Separator />

            {/* Como funciona a jornada */}
            <h3 className="text-xl font-bold text-foreground">📆 Como funciona a jornada</h3>
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
            </div>

            <Separator />

            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed text-center">
              <p>Respire fundo.</p>
              <p>Separe seus materiais.</p>
              <p>E quando estiver pronta, vamos começar pelo Dia 1.</p>
              <p>Seu coelhinho já está a caminho. 🐰✨</p>
            </div>

          </CardContent>
        </Card>

        {/* ═══════════════════════════════════════════
            SEÇÃO 2 — MATERIAIS
        ═══════════════════════════════════════════ */}
        <Card className="app-stitch" id="materiais" style={{ scrollMarginTop: 80 }}>
          <CardContent className="p-6 md:p-8 space-y-6">

            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              🧺 Materiais (só o essencial)
            </h2>

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

            <Separator />

            <h3 className="text-lg font-bold text-foreground">Guia de compras sem medo</h3>

            {/* ─── 1. Fio ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">🧶 1. Fio — o "corpo" do seu coelho</h4>
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

            <Separator />

            {/* ─── 2. Agulha ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">🪡 2. Agulha de crochê (a ferramenta principal)</h4>
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

            <Separator />

            {/* ─── 3. Enchimento ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">☁️ 3. Enchimento (o que deixa o coelho fofinho)</h4>
              <p>É o material que vai dentro do coelhinho.</p>
              <p>Você pode pedir:</p>

              <StoreTip>
                <p className="text-sm">🗣️ "Enchimento para almofada" ou "Fibra siliconada"</p>
              </StoreTip>

              <p>Ele parece um algodão sintético.</p>
              <p>Não precisa de muito — um saquinho pequeno já serve.</p>

              <ImagePlaceholder caption="Mão segurando um pequeno tufo de enchimento." />
            </div>

            <Separator />

            {/* ─── 4. Olhos ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">👀 4. Olhos</h4>
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

            <Separator />

            {/* ─── 5. Marcador ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">🧷 5. Marcador de ponto</h4>
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

            <Separator />

            {/* ─── 6. Agulha de tapeçaria ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">🧵 6. Agulha de tapeçaria</h4>
              <p>É uma agulha de ponta arredondada usada para costurar as partes e esconder fios.</p>

              <StoreTip>
                <p className="text-sm">🗣️ "Agulha de tapeçaria" ou "Agulha de ponta arredondada para lã"</p>
              </StoreTip>

              <p>Ela é mais grossa que agulha de costura comum.</p>

              <ImagePlaceholder caption="Comparação entre agulha de tapeçaria e agulha comum." />
            </div>

            <Separator />

            {/* ─── 7. Argola ─── */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h4 className="text-base font-bold">🔑 7. Argola de chaveiro (opcional, mas recomendada)</h4>
              <p>Para transformar seu coelho em chaveiro.</p>
              <p>Você encontra como:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>argola de chaveiro</li>
                <li>argola metálica com corrente</li>
              </ul>

              <ImagePlaceholder caption="Argola de chaveiro metálica simples." />
            </div>

            <Separator />

            {/* ─── Resumo ─── */}
            <h3 className="text-lg font-bold text-foreground">💛 Resumo simples</h3>
            <p className="text-sm md:text-base text-foreground leading-relaxed">Com isso você já consegue fazer seu coelho:</p>
            <ul className="space-y-1.5 pl-1 text-sm md:text-base text-foreground">
              {[
                "fio de algodão",
                "agulha 2.0–2.5 mm",
                "enchimento",
                "olhos",
                "agulha de tapeçaria",
                "marcador (ou improviso)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm md:text-base text-foreground leading-relaxed">Nada além disso é necessário.</p>

            <Separator />

            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h3 className="text-lg font-bold text-foreground">💛 O mais importante</h3>
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

          </CardContent>
        </Card>

        {/* ═══════════════════════════════════════════
            SEÇÃO 3 — FUNDAMENTOS
        ═══════════════════════════════════════════ */}
        <Card className="app-stitch" id="fundamentos" style={{ scrollMarginTop: 80 }}>
          <CardContent className="p-6 md:p-8 space-y-6">

            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              🧵 Fundamentos sem complicação
            </h2>

            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <p>Antes de começar o coelhinho, você só precisa entender algumas coisas simples.</p>
              <p>Você não precisa entender tudo sobre crochê agora. Só o suficiente para conseguir dar os primeiros pontos.</p>
              <p>Vamos por partes, bem devagar.</p>
            </div>

            <Separator />

            {/* Segurar agulha */}
            <h3 className="text-xl font-bold text-foreground">✋ Como segurar a agulha</h3>
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

            <Separator />

            {/* Segurar fio */}
            <h3 className="text-xl font-bold text-foreground">🧶 Como segurar o fio</h3>
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

            <Separator />

            {/* O que é um ponto */}
            <h3 className="text-xl font-bold text-foreground">🔄 O que é um ponto?</h3>
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

            <Separator />

            {/* Contar pontos */}
            <h3 className="text-xl font-bold text-foreground">🔢 O que é "contar pontos"</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <p>Cada ponto é como um "V" pequenininho.</p>
              <p>Quando a receita disser (12), significa:</p>
              <p>👉 aquela volta deve ter 12 pontos no total.</p>
              <p>Contar ajuda a peça ficar do tamanho certo.</p>
              <p>Não precisa contar toda hora — só no final da volta.</p>
              <ImagePlaceholder caption='Close mostrando vários "Vzinhos" alinhados.' />
            </div>

            <Separator />

            {/* Voltas */}
            <h3 className="text-xl font-bold text-foreground">🔄 O que são "voltas" ou "carreiras"</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
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

            <Separator />

            {/* Tabela de técnicas */}
            <h3 className="text-xl font-bold text-foreground">🧩 Técnicas que vamos usar no coelho</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <p>Agora vamos conhecer as 4 técnicas que constroem quase todo o amigurumi.</p>
              <p>Essas são as únicas que você precisa saber agora:</p>
            </div>

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

            <p className="text-sm md:text-base text-foreground leading-relaxed">Você vai aprender cada uma enquanto usa.</p>

            <Separator />

            {/* MR */}
            <h3 className="text-xl font-bold text-foreground">🌀 MR — Anel mágico (onde tudo começa)</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
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
            </div>

            <Separator />

            {/* pb */}
            <h3 className="text-xl font-bold text-foreground">➖ pb — Ponto baixo (o ponto principal)</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
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

            <Separator />

            {/* aum */}
            <h3 className="text-xl font-bold text-foreground">➕ aum — Aumento</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <p>É quando você faz 2 pontos no mesmo lugar.</p>
              <p>Isso faz a peça crescer e ficar redonda.</p>
              <p>Você faz:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>um ponto baixo</li>
                <li>sem sair do lugar, faz outro no mesmo ponto</li>
              </ul>
            </div>

            <Separator />

            {/* dim */}
            <h3 className="text-xl font-bold text-foreground">➖ dim — Diminuição</h3>
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
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
            </div>

            <Separator />

            {/* Fechamento */}
            <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed">
              <h3 className="text-lg font-bold text-foreground">💛 O que você precisa lembrar</h3>
              <p>Você não precisa decorar.</p>
              <p>Você só precisa tentar.</p>
              <p>O crochê é movimento repetido.</p>
              <p>Sua mão aprende aos poucos.</p>
              <p>Agora que você já sabe o básico, podemos começar de verdade.</p>
            </div>

          </CardContent>
        </Card>

        {/* ═══════════════════════════════════════════
            FECHAMENTO + CTAs
        ═══════════════════════════════════════════ */}
        <div className="flex flex-wrap gap-3 justify-center py-4">
          <Link to="/app/dia/1">
            <Button variant="primary" size="default">Ir para o Dia 1</Button>
          </Link>
          <Link to="/app">
            <Button variant="ghost" size="default">Voltar</Button>
          </Link>
        </div>

      </main>
    </AppShell>
  );
}
