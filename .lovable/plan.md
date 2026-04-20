
## Exemplo visual da nova experiência de aula

### Desktop (≥1024px)

```text
┌────────────────────────────────────────────────────────────────────────┐
│  ☰  Ateliê das Pontinhos                              [👤 Maria  ▾]   │  ← AppShell
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Jornada › Dia 1 · Primeiros pontos              ⏱ 12:48   Etapa 4/10 │  ← topbar contextual
│  ●─●─●─◉─○─○─○─○─○─○                                                  │  ← JourneyMiniProgress (etapa atual destacada)
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│  │░░░░░░░░░░░░░░░░░  ▶  Assistir aula  ░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │  ← player com poster +
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │     CTA central antes do play
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│  │ ▶ ━━━━━━━━●─────────────  04:32 / 12:48      1x  ⊡ PiP  ⛶      │ │  ← controles custom
│  └──────────────────────────────────────────────────────────────────┘ │     (skin app-stitch)
│   ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░  35% assistido                        │
│   "Faltam ~5 minutinhos pra você liberar a conclusão 🧶"              │  ← feedback humano
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  📖 Sobre esta aula                                              │ │
│  │  ─────────────────                                               │ │  ← card resumo
│  │  Hoje você dá os primeiros pontos do amigurumi. Vamos juntas    │ │     (Playfair + prose)
│  │  no ritmo certo, sem pressa, sentindo a lã nas mãos.            │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│        [ ✓ Concluir etapa ]   [ Próxima aula › ]                      │  ← CTA duplo
│                                                                        │
│  ← Aula anterior: Fundamentos                  Próxima: Dia 2 →       │  ← navegação prev/next
└────────────────────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```text
┌──────────────────────────────┐
│ ☰  Dia 1            👤      │
├──────────────────────────────┤
│ ●─●─●─◉─○─○─○─○─○─○  4/10   │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │░░░░  ▶ ░░░░░░░░░░░░░░░░░│ │  ← player sticky
│ │░░░░░░░░░░░░░░░░░░░░░░░░░│ │     ao rolar encolhe →
│ └──────────────────────────┘ │
│ ▓▓▓▓▓░░░░░  35% assistido   │
│                              │
│ Sobre esta aula              │
│ Hoje você dá os primeiros... │
│                              │
│           (rolagem)          │
│                              │
├──────────────────────────────┤
│ [ ✓ Concluir ]  [ Próxima › ]│  ← CTA fixo no rodapé
└──────────────────────────────┘
```

### Estado: concluído (celebração)

```text
   ┌──────────────────────────────────┐
   │      🎉   ✨   🧶   ✨   🎉      │  ← confete sutil (canvas-confetti)
   │                                  │
   │         ⭐ selo miniatura         │
   │                                  │
   │   Mais um pontinho na sua jornada│  ← Playfair, acolhedor
   │                                  │
   │  [ Próxima aula › ]  [ Início ]  │
   └──────────────────────────────────┘
```

### Estado: em breve

```text
   ┌──────────────────────────────────┐
   │       🧶 (ilustração linha)       │
   │                                  │
   │   Esta aula está sendo preparada │
   │   com carinho. Volte em breve 💛 │
   │                                  │
   │      [ Avisar quando publicar ]  │
   └──────────────────────────────────┘
```

### Estado: bloqueado

```text
   ┌──────────────────────────────────┐
   │              🔒                  │
   │                                  │
   │   Conclua "Fundamentos" para     │
   │   abrir esta aula                │
   │                                  │
   │      [ Ir para Fundamentos → ]   │
   └──────────────────────────────────┘
```

## Plano de implementação (resumido)

**Componentes a criar**
- `VideoPlayer.tsx` (refatorar) — skin custom, atalhos, PiP, velocidade, retomar visível, double-tap mobile
- `LessonStickyMobileCTA.tsx` — barra fixa de ação no rodapé mobile
- `LessonCompletionCelebration.tsx` — card de recompensa + confete
- `LessonEmptyState.tsx` — variantes "em breve" e "bloqueado"
- `LessonContextHeader.tsx` — breadcrumb + chip "Etapa X/10" + duração + `JourneyMiniProgress`

**Componentes a editar**
- `VideoLessonLayout.tsx` — orquestra header contextual, player sticky, CTA mobile, estados ricos, celebração

**Hooks a criar**
- `useLessonNavigation.ts` — devolve `{ prev, next, currentIndex, total }` para qualquer `stageKey`
- `useKeyboardShortcuts.ts` — atalhos do player (Space, ←/→, ↑/↓, F, M)

**Estilos**
- adicionar utilitários em `app-product.css` para sticky-on-scroll do player no mobile

**Dependência nova**
- `canvas-confetti` (~6kb) — celebração ao concluir

**Acessibilidade**
- ARIA labels nos controles
- `prefers-reduced-motion` desativa confete e animações grandes
- Foco visível em todos interativos

**Fora de escopo**
- Sincronizar progresso com Supabase (segue em localStorage)
- Anotações e materiais por aula (decisão anterior: só resumo)
- Capítulos navegáveis (decisão anterior: vídeo único)
