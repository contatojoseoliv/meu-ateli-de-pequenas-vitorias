

## Pagina "Comece Por Aqui" — Progressao guiada em dois niveis

### Conceito

A pagina tera **dois niveis de progressao**:

1. **Nivel 1 — Cards**: 3 cards sequenciais que desbloqueiam um por um
2. **Nivel 2 — Topicos dentro de cada card**: cada subtopico aparece um de cada vez, conforme a aluna marca "Entendi" ou "Proximo"

Isso evita mostrar blocoes de texto e segue o padrao guiado ja usado no `AppDay.tsx`.

### Como vai funcionar na pratica

```text
+------------------------------------------+
|  AppShell (title="Comece por aqui")       |
+------------------------------------------+
|  Progresso: [===-----] 1 de 3             |
|                                           |
|  CARD 1 - "Seu primeiro amigurumi..."     |
|  +--------------------------------------+ |
|  | Topico ativo (ex: "O que e esse      | |
|  | projeto?") — conteudo visivel         | |
|  |                                       | |
|  | [Entendi, proximo >]                  | |
|  +--------------------------------------+ |
|  | Topico seguinte (bloqueado/oculto)    | |
|  | Topico seguinte (bloqueado/oculto)    | |
|  +--------------------------------------+ |
|                                           |
|  CARD 2 (bloqueado)                       |
|  CARD 3 (bloqueado)                       |
+------------------------------------------+
```

### Comportamento detalhado

**Dentro de cada card:**
- Os topicos sao listados como itens verticais (similar ao checklist do AppDay)
- Apenas o topico ativo mostra o conteudo expandido
- Topicos ja lidos ficam colapsados com um check verde, mas clicaveis para reler
- Topicos ainda nao alcancados mostram apenas o titulo em cinza
- Ao clicar "Entendi, proximo", o topico atual recebe check, o proximo expande automaticamente e a tela faz scroll suave ate ele
- Quando todos os topicos de um card estao marcados, aparece o botao "Concluir etapa"

**Entre cards:**
- Card bloqueado: titulo visivel + icone de cadeado + visual cinza (`app-daycard--locked`)
- Card ativo: expandido com os topicos
- Card concluido: colapsado com check, clicavel para reler

**Apos concluir os 3 cards:**
- Aparece o bloco final com "Ir para o Dia 1" e "Voltar"

### Mapeamento de topicos por card

**Card 1 — "Seu primeiro amigurumi, um dia de cada vez"** (6 topicos)
1. Abertura emocional (texto inicial + lista de sentimentos)
2. "O que e esse projeto?" 
3. "O que vamos criar" (coelho + simbolo + por que o coelho)
4. "Mais do que croche"
5. "Nao existe jeito certo"
6. "Como funciona a jornada" + fechamento emocional

**Card 2 — "Materiais (so o essencial)"** (9 topicos)
1. Introducao dos materiais
2. Fio
3. Agulha de croche
4. Enchimento
5. Olhos
6. Marcador de ponto
7. Agulha de tapecaria
8. Argola de chaveiro
9. Resumo simples + "O mais importante"

**Card 3 — "Fundamentos sem complicacao"** (8 topicos)
1. Introducao dos fundamentos
2. Como segurar a agulha
3. Como segurar o fio
4. O que e um ponto
5. Contar pontos + voltas/carreiras
6. Tabela de tecnicas (MR, pb, aum, dim)
7. Detalhamento: MR e pb
8. Detalhamento: aum e dim + "O que voce precisa lembrar"

### Detalhes tecnicos

**Novo hook:** `src/hooks/useIntroProgress.ts`
- Chave localStorage: `pv_intro_progress_v1`
- Estado: `{ completedCards: number[], cardStepState: Record<string, Record<string, boolean>> }`
- Funcoes: `isCardUnlocked(n)`, `isCardCompleted(n)`, `completeCard(n)`, `getStepRead(card, stepId)`, `markStepRead(card, stepId)`, `getActiveStep(card)`, `reset()`
- Card 1 sempre desbloqueado; Card N desbloqueado se Card N-1 concluido

**Arquivo reescrito:** `src/pages/app/AppIntro.tsx`
- Dados dos topicos definidos como array de objetos `{ id, title, emoji, content: JSX }` por card
- Cada topico renderizado dentro de um `Collapsible` (do radix, ja instalado)
- Topico ativo: `Collapsible` aberto, com botao "Entendi, proximo" no final
- Topico lido: `CollapsibleTrigger` com check verde, clicavel para reabrir
- Topico futuro: titulo em cinza, `CollapsibleTrigger` desabilitado
- Cards usam `Card` com `app-stitch` e logica de bloqueio/desbloqueio
- Scroll suave automatico ao expandir proximo topico (`scrollIntoView({ behavior: 'smooth' })`)
- Todo o conteudo textual mantido exatamente como fornecido, sem alteracao
- Helpers reutilizados: `ImagePlaceholder`, `StoreTip`
- Componente `Table` do shadcn/ui para a tabela de tecnicas

**Nenhum outro arquivo sera criado ou editado alem dos dois mencionados.**

