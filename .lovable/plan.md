

## Melhorar icones e barra de progresso do primeiro card

### O que muda

O primeiro card ("Bem-vinda ao Meu Atelie") tem dois problemas:
- Os icones dos 7 nos sao genericos (Sparkles, Heart, Scissors...) e nao refletem as etapas reais
- A barra de progresso e uma linha simples (`h-1 bg-accent`), mas ja existe o componente `YarnProgress` com textura de croche e marcador de coelhinho

### Mudanca 1 — Icones dinamicos por etapa

Trocar os icones genericos por icones que representem cada etapa real da jornada:

| No | Etapa | Icone |
|---|---|---|
| 1 | Comece por aqui (intro) | Sprout (broto/semente) |
| 2 | Materiais (intro) | Package (caixa/materiais) |
| 3 | Fundamentos (intro) | BookOpen (livro) |
| 4 | Dia 1 — Anel magico | Circle (circulo/anel) |
| 5 | Dia 2 — Corpinho crescer | ArrowUp (crescer) |
| 6 | Dia 3 — Subir paredes | Layers (camadas) |
| 7 | Dia 4 — Fechando corpo | ChevronDown (fechar) |
| 8 | Dia 5 — Fechamento total | Lock (travado) |
| 9 | Dia 6 — Orelhas/bracos | Rabbit (coelho) |
| 10 | Dia 7 — Montagem | Sparkles (finalizar) |
| Selo | Conquista final | Imagem do selo (ja existente) |

Total: 10 nos + 1 selo = 11 nos (vs 8 atuais). Os nos serao menores para caber sem aumentar o card.

A logica de "completado" vai considerar os 3 intro cards (via `useIntroProgress`) alem dos 7 dias.

### Mudanca 2 — Barra de croche (YarnProgress)

Substituir a linha `h-1 bg-accent` pela `YarnProgress` no tamanho `sm`. O componente ja existe e tem:
- Textura de fio diagonal (repeating-linear-gradient 45deg)
- Preenchimento ocre
- Marcador de coelhinho animado com spring

### Detalhes tecnicos

**Arquivo editado:** `src/components/app/JourneyMiniProgress.tsx`

Alteracoes:
1. Importar `YarnProgress` e os icones corretos do lucide-react
2. Expandir `dayIcons` para 10 icones (3 intro + 7 dias)
3. Adicionar props `introCompleted: number[]` (indices dos cards intro concluidos) para saber quais nos de intro estao "done"
4. Reduzir tamanho dos nos de `h-7 w-7` para `h-6 w-6` e icones de `h-4 w-4` para `h-3.5 w-3.5` para acomodar 11 nos sem aumentar o card
5. Substituir as divs da trilha/preenchimento pelo componente `<YarnProgress size="sm" value={percent} />`
6. Recalcular `percent` no `AppHome` para incluir intro cards (3 intro + 7 dias = 10 etapas totais)

**Arquivo editado:** `src/pages/app/AppHome.tsx`

Alteracoes:
1. Recalcular `percent` considerando intro cards concluidos + dias concluidos (total de 10 etapas)
2. Passar `introCompleted` para `JourneyMiniProgress`

Nenhum outro arquivo sera criado ou editado.
