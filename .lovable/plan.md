
## Mudanças: limpar títulos e compactar bloco abaixo do vídeo

### 1. Remover emojis dos títulos das aulas

Hoje o título renderiza como `🌱 Comece por aqui`, `🧺 Materiais`, `🧵 Fundamentos` e `📆 Dia 1 — …`. Vou remover esses emojis do título principal exibido em `VideoLessonLayout`.

**Como:**
- Em `src/components/app/VideoLessonLayout.tsx`, trocar `cleanTitle = ${emoji} ${title}` por apenas `title`. A prop `emoji` continua existindo (usada nos cards da home), mas deixa de aparecer no H1 da página de aula.
- Resultado nas 4 páginas:
  - `/app/comecar` → "Comece por aqui"
  - `/app/materiais` → "Materiais"
  - `/app/fundamentos` → "Fundamentos"
  - `/app/dia/1` → "Dia 1 — Primeiros pontos" (sem 📆)

### 2. Compactar o bloco abaixo do vídeo (título + progresso + ações + celebração)

Hoje a seção tem espaçamento generoso (`space-y-4`, título 2xl/3xl, barra de 2px, botões `size="default"`, e o card de celebração ocupa muito espaço quando concluído). Vou enxugar tudo num bloco discreto e elegante.

#### Como vai ficar

**Estado: assistindo (não concluído)**
```text
┌──────────────────────────────────────────────────────────┐
│            [        vídeo        ]                       │
└──────────────────────────────────────────────────────────┘
  Comece por aqui                                          ← título menor (xl/2xl)
  ▓▓▓▓▓▓▓░░░░░░░░░░░░░░  62%  · faltam 28% pra concluir   ← linha única, tipografia sutil
  [ Concluir etapa ]   [ Próxima aula → ]                  ← botões size="sm"
```

**Estado: concluído (celebração integrada e mínima)**
```text
┌──────────────────────────────────────────────────────────┐
│            [        vídeo        ]                       │
└──────────────────────────────────────────────────────────┘
  ✓ Comece por aqui                                        ← check inline pequeno
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%  · etapa concluída            ← linha única
  ✨ Mais um pontinho na sua jornada 🧶                     ← uma linha, sem card pesado
  [ ← Voltar ao início ]   [ Próxima: Materiais → ]        ← botões size="sm"
```

#### Mudanças técnicas

**`src/components/app/VideoLessonLayout.tsx`**
- Reduzir espaçamentos da `<section>`: `space-y-4` → `space-y-3`.
- Título: `text-2xl md:text-3xl` → `text-xl md:text-2xl`; remover o "balão" do check (`h-7 w-7 rounded-full bg-primary/15`) e usar apenas um ícone `Check` inline pequeno antes do texto quando concluído.
- Barra de progresso: condensar para **uma linha única** — `62% · faltam 28% pra concluir` (ou `100% · etapa concluída`) acima de uma barra mais fina (`h-1.5`).
- Botões desktop: `size="default"` → `size="sm"`, remover ícones decorativos extras (manter só seta na "Próxima").
- Quando `completed`, no lugar dos botões "Concluir/Próxima" renderizar o `LessonCompletionCelebration` em **variant `inline`** + os `completionActions` no mesmo size `sm`.

**`src/components/app/LessonCompletionCelebration.tsx`**
- Adicionar prop `variant?: "inline" | "card"` (default `card` mantém retrocompat para qualquer outro uso).
- `variant="inline"`: renderiza apenas uma linha discreta com ícone `Sparkles` pequeno + frase em texto base (sem Playfair gigante, sem selo, sem card/ring). Os `actions` aparecem logo abaixo, alinhados à esquerda.
- Confete continua disparando uma vez, sem mudança.

**`src/components/app/LessonStickyMobileCTA.tsx`**
- Quando `completed === true`, esconder a barra fixa (já que as ações de "voltar/próxima" estarão no bloco compacto integrado).

### Fora de escopo
- Emojis nos cards da home (`IntroCard`, `DayCard`) — permanecem como estão.
- Texto das frases de celebração e textos dos botões de cada página.
- Seção de descrição colapsável e comentários (sem alteração).
