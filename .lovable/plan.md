
## Objetivo (o que você pediu agora)
Garantir que, na página interna do produto (Receita Guiada / Dia X), **as Tabs sejam botões** e que o **Checklist seja organizado por blocos** exatamente como está descrito no seu esboço do produto (PDFs).

Isso vai orientar toda a UI do “Dia” para ficar:
- intuitiva para iniciante
- guiada por etapas
- consistente com a identidade visual (Verde Eucalipto / Rosa Argila / Ocre só em CTA)
- preparada para receber imagens reais depois (por enquanto placeholders)

---

## O que já está definido pelos seus esboços (fonte de verdade)
### 1) Tabs como “mini botões”
No “Esboço da aplicação” você descreve explicitamente:
- “Mini botões: Receita Completa, Materiais, Técnicas e Recursos”

Como você também pediu **“Guiado + receita completa”**, vamos ter:
- **Guiado** (principal, com checklist por blocos)
- **Receita completa** (consulta corrida)
- **Materiais**
- **Técnicas e recursos**

Regra de UX:
- **Guiado** é a aba padrão.
- As outras abas são “consulta”, e devem parecer **botões pequenos** (pill/chip) e não abas grandes.

### 2) Checklist por blocos
No “Esboço da aplicação”:
- Blocos: **preparação**, **voltas**, **verificação**, **objetivo final**

Regra de estrutura:
- O conteúdo do “Guiado” deve ser um fluxo vertical com esses 4 blocos fixos (mesmo que um dia tenha pouco conteúdo em algum bloco; nesse caso o bloco pode aparecer com 1 item curto, ou ficar oculto se você preferir — definiremos isso no padrão).

---

## Exploração do que existe hoje no projeto (para reaproveitar padrões)
- Já existe o componente `Tabs` em `src/components/ui/tabs.tsx` (Radix Tabs) com `TabsTrigger` e `TabsList`.
- Já existe `Checkbox` em `src/components/ui/checkbox.tsx`.
- Já existe um sistema visual próprio (manual da marca) e o Button premium em `src/components/shared/Button.tsx` (CTA em gradiente ocre).
- Já existe `Progress` em `src/components/ui/progress.tsx`, útil para “% do dia” e “% geral”.

---

## Decisões de implementação (para bater 100% com o esboço)
### A) Como as Tabs vão virar “botões”
Em vez de “tabs tradicionais”, vamos estilizar o `TabsList`/`TabsTrigger` para ficar como “mini botões”:

**Estilo sugerido (identidade visual):**
- Fundo geral do container: Cinza Nuvem
- “Botões” (triggers):
  - Inativos: `bg-background` (branco), `border border-border`, texto grafite
  - Ativo: `bg-verde-eucalipto` com `text-white` (ou `bg-secondary` Rosa Argila se você preferir; minha recomendação é verde para reforçar “guia”)
  - Tamanho compacto: height menor, padding curto, bordas arredondadas bem suaves (pill)
- Nada de Ocre aqui (ocre fica só para CTA de concluir/continuar)

**Aba Guiado**
- Nome do botão: “Guiado”
- Ícone opcional (ex.: list/check) — discreto, sem poluir.

**Aba Receita Completa**
- Deve mostrar a receita corrida daquele dia (texto organizado por voltas/carreiras), fácil de copiar/ler.

**Aba Materiais**
- Lista simples (bullet list) e um aviso acolhedor “não precisa ser perfeito”.

**Aba Técnicas e recursos**
- Conteúdo de técnicas (MR, pb, aum, dim) e dicas rápidas, com placeholders de imagem quando o PDF indicar “[IMAGEM SUGERIDA]”.

### B) Como o checklist por blocos vai funcionar (Guiado)
Vamos criar um componente de “Bloco do dia”, com:
- Título do bloco (H3 pequeno): “Preparação”, “Voltas”, “Verificação”, “Objetivo final”
- Uma lista de itens com checkbox (cada item é uma ação simples)
- Dentro de cada item, suportar:
  - texto principal (curto e direto)
  - “Dica” (callout pequeno em verde suave)
  - placeholder de imagem (card cinza com legenda “Imagem ilustrativa (em breve)”)

**Ordem fixa de blocos (sempre):**
1. Preparação  
2. Voltas  
3. Verificação  
4. Objetivo final  

**Conclusão do dia**
- O botão principal “Concluir dia” (CTA ocre) só aparece/habilita quando:
  - todos os itens do dia (todos os blocos) estiverem marcados
- Ao concluir:
  - salvar progresso
  - desbloquear próximo dia
  - toast discreto de “vitória”

---

## Estrutura de dados (para garantir que UI siga o esboço e não vire bagunça)
Vamos estruturar o conteúdo do “Dia” já separando por blocos e por tabs, para a interface ficar automática e consistente:

- `day.guisado.blocks.preparacao[]`
- `day.guisado.blocks.voltas[]`
- `day.guisado.blocks.verificacao[]`
- `day.guisado.blocks.objetivoFinal[]`

E para as tabs:
- `day.tabs.fullRecipe` (texto corrido em seções)
- `day.tabs.materials` (lista)
- `day.tabs.techniques` (lista + dicas + placeholders)

Isso garante que:
- o checklist sempre nasce por blocos
- as tabs sempre têm o mesmo formato
- futuramente dá para plugar imagens reais sem refatorar telas

---

## Plano de execução (sequência segura)
### 1) Mapear a “estrutura do Dia” a partir dos PDFs
- Usar o “Esboço da aplicação” como guia de layout (tabs + blocos)
- Usar o “Esboço do Produto” e a “Receita Amigurumi” para preencher:
  - o que entra em “Voltas”
  - o que entra em “Verificação” (contagem de pontos, “se estiver ondulado…”)
  - o que entra em “Objetivo final” (missão do dia)
  - o que entra em “Técnicas e recursos” (MR, pb, aum, dim) e imagens sugeridas

### 2) Implementar a UI das Tabs como botões (mini botões)
- Ajustar estilos do `TabsTrigger` para ficar com cara de botão pequeno
- Garantir acessibilidade:
  - foco visível
  - navegação por teclado
  - contraste

### 3) Implementar a aba “Guiado” com checklist por blocos
- Construir o componente visual de bloco + lista de checkbox
- Garantir que cada item suporte “dica” e placeholder de imagem

### 4) Implementar as abas de consulta (Receita completa / Materiais / Técnicas e recursos)
- Conteúdo simples, direto e “consultável”
- Mantendo tom acolhedor e iniciante-friendly

### 5) Persistência e desbloqueio (localStorage)
- Persistir:
  - checkboxes por dia e por item
  - dias concluídos
  - último dia visitado (para “retomar”)
- Regra de desbloqueio:
  - Dia 1 livre
  - Dia N+1 só desbloqueia quando Dia N for concluído

---

## Critérios de aceite (como você vai bater o olho e dizer “está igual ao esboço”)
1) Na página do dia, as tabs aparecem como **mini botões**:  
   “Guiado”, “Receita completa”, “Materiais”, “Técnicas e recursos”.

2) Na aba “Guiado”, o conteúdo aparece em **4 blocos** nessa ordem:
   - Preparação
   - Voltas
   - Verificação
   - Objetivo final

3) Cada bloco tem checklist funcional (marca/desmarca), com:
   - texto do passo
   - dica opcional
   - placeholder de imagem quando necessário

4) Ao marcar tudo e concluir o dia:
   - salva ao recarregar a página
   - libera o próximo dia

---

## Observação importante (para não travar depois)
Como o acesso está livre por enquanto, tudo ficará em `localStorage`. Quando você escolher gateway + webhook, a gente troca apenas a “camada de acesso” e (se quiser) migra o progresso para o backend, sem refazer a interface — porque a UI já estará bem estruturada (tabs + blocos) e separada do armazenamento.

