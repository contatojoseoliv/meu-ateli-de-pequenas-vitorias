
Objetivo
- Personalizar o fundo dos cards dos dias para ficar “artesanal” como no exemplo (fundo colorido por Dia + moldura + textura suave), com um “selo” no canto.
- Regras que você escolheu: 1) Um fundo por Dia (cores alternadas), 2) Com selo no canto, 3) Bloqueado fica cinza neutro.

O que será alterado (visão geral)
- Vamos criar um novo estilo de card específico para a grade “Meus Dias de Criação”, sem mexer no visual dos outros cards do app (perfil, suporte, etc.).
- O DayCard e o IntroCard vão receber classes novas (ex.: `app-daycard`, `app-daycard--mint`, `app-daycard--clay`, `app-daycard--gold`, `app-daycard--locked`).
- O “selo” do canto será feito via CSS (pseudo-elemento) para não poluir o JSX e manter tudo consistente.

Como vai ficar (comportamento)
- Dias desbloqueados:
  - Cada Dia recebe uma variação de fundo pastel (alternando entre tons derivados do Verde Eucalipto / Rosa Argila / Ocre Dourado em baixa opacidade).
  - Mantém o hover-lift atual.
- Dia atual:
  - Mantém o destaque atual (anel/realce) e o fundo do seu Dia.
- Concluído:
  - Mantém o badge “Primeira vitória”, e o selo do canto pode ficar “preenchidinho” (visual de concluído) via classe.
- Bloqueado:
  - Fundo neutro cinza (sem variação por Dia), com opacidade/contraste adequado e o cadeado como já existe.

Detalhes de UI (para aproximar da referência)
- Fundo com textura/papel:
  - Usar 2–3 gradientes leves (radial + linear) para simular papel tingido.
- Moldura:
  - Combinar “costura” (já existe no `app-stitch`) com uma borda externa mais marcadinha (box-shadow interno/externo) para lembrar o “cartão colado”.
- Selo no canto superior direito:
  - Um círculo (com leve relevo) posicionado no topo-direita do card.
  - Para não interferir no conteúdo, o card vai ter `position: relative` e o selo via `::after`.
  - No estado concluído, o selo pode ter um pequeno brilho/variação (ainda apenas decorativo).

Arquivos que vou ler/ajustar
1) CSS (principal)
- `src/styles/app-product.css`
  - Adicionar:
    - `.app-daycard` (base do fundo artesanal para os cards da grade)
    - Variantes de cor: `.app-daycard--mint` / `.app-daycard--clay` / `.app-daycard--gold` (nomes podem variar)
    - `.app-daycard--locked` (cinza neutro)
    - `.app-daycard--seal` + regras do `::after` (o “selo”)
    - Ajustes de dark mode para manter contraste (`.dark .app-daycard...`)

2) Componentes (aplicação das classes)
- `src/components/app/DayCard.tsx`
  - Adicionar um map de cor por dia (ex.: lista que alterna mint/clay/gold).
  - Se `unlocked === false`, aplicar `app-daycard--locked` (ignorando a cor do dia).
  - Aplicar também a classe do selo (ex.: `app-daycard--seal`) e uma classe extra quando concluído (ex.: `app-daycard--done`) se a gente quiser diferenciar o selo.
  - Manter `app-stitch` para a “costura” atual, mas com o novo fundo por baixo (ou substituir parte do background do `app-stitch` só nesses cards).

- `src/components/app/IntroCard.tsx`
  - Aplicar o mesmo estilo de card (para ficar consistente com a grade).
  - Usar uma variante própria (ex.: `app-daycard--intro` ou reusar uma das cores).

Critérios de aceite (como você valida em /app)
- Na Home (/app), na grade “Meus Dias de Criação”:
  - Os cards desbloqueados alternam cores de fundo (visualmente parecido com a imagem).
  - Cards bloqueados ficam cinza neutro (sem cor pastel).
  - Todos exibem o “selo” no canto superior direito.
  - O texto continua legível no mobile e no dark mode.
  - Hover e clique continuam funcionando normalmente.

Riscos/atenções
- Ocre Dourado é “cor de CTA/conversão” no seu manual; para respeitar isso, o fundo “gold” vai ser bem sutil (baixa opacidade), evitando “grandes blocos dourados”.
- Garantir contraste: fundos pastel podem reduzir legibilidade; vamos manter texto em `text-foreground` e limitar saturação/opacity do background.
- Dark mode: fundos pastel precisam ser recalibrados (menos “lavado” e mais contraste).

Sequência de implementação
1) Criar as classes novas no `app-product.css` (base + variantes + locked + selo + dark mode).
2) Aplicar as classes no `DayCard` com lógica de variante por dia e exceção para locked.
3) Aplicar as classes no `IntroCard` para ele entrar no mesmo “sistema” visual.
4) Revisar visual em /app (desktop + mobile) e ajustar opacidades/raios do selo.

Notas técnicas (para referência)
- Estratégia de cor por dia:
  - Ex.: `const variants = ["mint", "clay", "gold"]` e escolher por `(day - 1) % variants.length`.
- Estrutura de classes final no Card do DayCard (exemplo conceitual):
  - `"app-stitch app-daycard app-daycard--mint app-daycard--seal"`
  - locked: `"app-stitch app-daycard app-daycard--locked app-daycard--seal"`

Entrega
- Assim que você aprovar, eu implemento e você já vê os cards com o fundo personalizado na rota /app.
