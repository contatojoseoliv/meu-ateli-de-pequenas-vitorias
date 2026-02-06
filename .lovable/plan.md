
## O que eu consigo fazer (capacidade real de redesign)
Consigo transformar o app para ficar bem próximo do estilo do mock (“papel antigo + artesanal + fio de lã + cards polaroid”), mantendo:
- performance boa (sem imagens pesadas por padrão)
- responsividade (mobile primeiro)
- acessibilidade (contraste, foco, navegação por teclado)
- consistência com seu design system (fonts já estão configuradas: Playfair, Montserrat, Dancing Script)

O que eu **não** consigo “automaticamente” só com IA:
- criar ilustrações autorais no mesmo nível do Gemini dentro do código (a imagem é uma referência); mas consigo:
  - aplicar estética artesanal via CSS
  - criar elementos vetoriais simples (SVG) como “fio de lã”, “pontos de costura”, “mini coelho” estilizado (simples)
  - deixar tudo preparado para no futuro trocar os placeholders por ilustrações/ícones finais

Você aprovou: **Ocre também no progresso**. Então vou usar o ocre em pequenos destaques (barra/fio, marcador, estados), sem virar “fundo grande” ocre.

---

## Diagnóstico do estado atual (onde mexer)
Hoje:
- `/app` (AppHome) está funcional, mas com visual “shadcn padrão”: fundo `bg-muted`, cards simples, timeline em grid básica.
- `/app/dia/:day` (AppDay) já tem:
  - Tabs como mini-botões (pill)
  - Checklist por blocos fixos (Preparação/Voltas/Verificação/Objetivo final)
  - Progress bar do dia e CTA “Concluir dia”
- Tokens de cor e fontes já existem no Tailwind (`cinza-nuvem`, `ocre-dourado`, `verde-eucalipto`, `rosa-argila`, fontes serif/sans/handwritten).
- `Card` é genérico; se eu alterar globalmente, pode afetar landing/admin. Para evitar isso, o redesign do “app do produto” deve vir por **classes específicas** e/ou **novos componentes de app** (mais seguro).

---

## Redesign proposto (baseado no seu texto + imagem referência)

### 1) Fundo “papel antigo” (off-white/creme com textura leve)
Objetivo: reduzir contraste do branco puro e dar sensação artesanal.

Implementação:
- Criar um “AppSurface” visual para páginas `/app/*` com:
  - cor base creme (ex.: algo próximo a `#fbf6ee`)
  - textura sutil via CSS (camadas de `radial-gradient`/`linear-gradient` bem leves)
  - opcional: leve vinheta (borda mais escura) para profundidade

Arquivos:
- `src/index.css` (adicionar utilitários/classes específicas do app, ex.: `.app-paper` e `.app-paper::before` para textura)
- `src/pages/app/AppHome.tsx` e `src/pages/app/AppDay.tsx` (trocar wrapper `bg-muted` para `app-paper`)

### 2) Progresso como “fio de lã tecido” + marcador (mini coelho)
Objetivo: trocar a barra reta por algo mais imersivo.

Implementação (sem depender de imagens):
- Criar um componente `YarnProgress` (novo) que renderiza:
  - trilha com “torção” de fio (efeito com `repeating-linear-gradient` + blur/sombra leve)
  - preenchimento ocre “tecido” conforme % (mask/clip)
  - marcador (bunny) como SVG simples ou ícone custom (pode começar com um “coelhinho minimalista” em SVG)
  - posicionar o marcador ao longo do fio por `left: calc(percent% - ajuste)` com `position: absolute`
  - animação leve quando o progresso muda (framer-motion já existe no projeto; usar micro motion bem suave)

Arquivos:
- Criar `src/components/app/YarnProgress.tsx`
- Atualizar `src/pages/app/AppHome.tsx` para usar YarnProgress em vez de `Progress`
- (Opcional) também usar no topo do `AppDay` para “Seu progresso hoje”

### 3) Cards dos dias estilo “polaroid / papel com costura”
Objetivo: sair do “card cinza padrão” para cards com personalidade.

Estados visuais:
- Concluído:
  - fundo menta bem suave (verde-eucalipto-10)
  - selo “Primeira Vitória” (badge pequeno)
  - borda pontilhada/“costura” discreta
- Atual (desbloqueado e não concluído):
  - borda ocre
  - leve sombra elevada
  - pequeno “ícone/ilustração” simples (inicialmente SVG line-art: novelo, agulha, orelhinha, etc.)
- Bloqueado:
  - opacidade reduzida
  - ícone de cadeado “fofinho” (pode ser Lucide com estilização + “tag” circular como botão)

Implementação técnica:
- Criar componente `DayCard` para encapsular:
  - layout
  - estilos por estado
  - acessibilidade (botão/link com área clicável grande)
- “Costura”:
  - usar `outline` com `outline-dashed` ou pseudo-element com `border: 1px dashed` e `border-radius`
  - adicionar um “frame” interno com padding e borda costurada
- “Polaroid feel”:
  - leve rotação aleatória controlada (apenas desktop e muito discreto, ex. `-0.5deg / +0.5deg`) para não prejudicar legibilidade
  - sombra `shadow-elevada` e fundo creme

Arquivos:
- Criar `src/components/app/DayCard.tsx`
- Atualizar `src/pages/app/AppHome.tsx` para usar DayCard no grid dos dias

### 4) Tipografia e hierarquia (mais emocional e “atelie”)
- Título principal no Home:
  - trocar “Sua Jornada” para “Suas Pequenas Vitórias” (como na sua proposta), usando `font-handwritten` e tamanho moderado (sem exagerar)
- Subtítulo e microcopys:
  - manter Montserrat e tons `text-muted-foreground` para conforto
- Botão principal “Continuar”:
  - manter seu Button de marca (já tem gradiente) e reforçar protagonismo com:
    - ícone pequeno (agulha/linha) com Lucide
    - micro texto de apoio embaixo (“Você está indo muito bem.”)

Arquivos:
- `src/pages/app/AppHome.tsx` (ajustar header/cópias)

### 5) Checklist por blocos (no Dia) com “acabamento artesanal”
Sem mudar a estrutura (porque isso é regra do produto), só melhorar o visual:
- Cada bloco (Card) ganha:
  - uma “etiqueta” (chip) com o nome do bloco
  - borda costurada interna
  - fundo creme leve (em vez de branco puro)
- Cada item do checklist:
  - checkbox maior um pouco e alinhado
  - “Dica” vira um callout com ícone e tom verde suave
  - placeholder de imagem vira “porta-retrato” (frame) com textura e legenda

Tabs já estão como mini-botões; vamos refinar:
- inativo: creme claro + borda
- ativo: verde ou ocre suave? (recomendação: verde para estado ativo, mantendo ocre para progresso/CTA; mas posso harmonizar com ocre no estado ativo também desde que não “grite”)

Arquivos:
- `src/pages/app/AppDay.tsx` (classes e wrappers)
- (Opcional) criar componentes auxiliares:
  - `src/components/app/StitchedCard.tsx` para reutilizar o “frame costurado” dentro de cards

---

## Sequência de implementação (segura, incremental)
1) Aplicar “AppSurface” (papel/creme + textura) em `/app` e `/app/dia/:day`.
2) Implementar `YarnProgress` e substituir a barra de progresso do Home (e opcionalmente do Dia).
3) Implementar `DayCard` e redesenhar o grid de dias no Home com estados (concluído/atual/bloqueado).
4) Refinar visual do Dia:
   - blocos com costura
   - callout de dica
   - placeholder de imagem em “porta-retrato”
   - tabs com acabamento mais artesanal
5) Polimento:
   - micro-animações leves (hover/tap)
   - revisão mobile (toques, espaçamento, tipografia)
   - garantir contraste e foco visível

---

## Critérios de aceite (como você valida no preview)
- `/app` parece “papel antigo” (creme) com textura leve, sem ficar pesado.
- Progresso do Home é um “fio de lã” (ocre) com marcador (coelhinho) se movendo conforme %.
- Cards dos dias têm estados claros e bonitos:
  - concluído com selo
  - atual com borda ocre e destaque
  - bloqueado com cadeado e opacidade
- `/app/dia/1` mantém exatamente a estrutura do esboço:
  - Tabs como botões
  - Checklist por blocos fixos
  - Apenas com visual mais artesanal e acolhedor
- O fluxo ainda funciona (marcar passos, concluir dia, desbloquear próximo, persistir ao recarregar).

---

## Observações importantes
- Vou usar a imagem do Gemini apenas como **referência estética**, não vou “colá-la” dentro do app.
- Não vou alterar o `Card` global para não quebrar landing/admin; o redesign ficará isolado no “App do Produto”.
- Se depois você quiser um coelhinho mais “fofo” (mesmo nível da imagem), a melhor prática é você me enviar/definir um pacote de ícones/ilustrações (PNG/SVG) para eu aplicar no lugar dos SVGs simples.

---

## Arquivos que provavelmente serão criados/alterados
Criar:
- `src/components/app/YarnProgress.tsx`
- `src/components/app/DayCard.tsx`
- (opcional) `src/components/app/StitchedPanel.tsx` ou `StitchedCard.tsx`

Alterar:
- `src/index.css` (classes utilitárias do “papel/texture” e “costura”)
- `src/pages/app/AppHome.tsx` (layout do dashboard)
- `src/pages/app/AppDay.tsx` (refino visual mantendo estrutura)

---

## Perguntas (não bloqueiam, mas melhoram o resultado)
1) O “mini coelho” marcador: você prefere um coelho bem minimalista (linha/SVG simples) agora, ou você quer usar uma imagem/ícone específico seu (se tiver)?
2) O menu do app: por enquanto você quer manter sem topbar/bottom bar (como está), ou quer aproximar do mock com uma navegação inferior no mobile?

Se você não responder, eu sigo com:
- coelho minimalista em SVG
- navegação atual (sem bottom bar), focando primeiro em Home + Dia e na estética artesanal.
