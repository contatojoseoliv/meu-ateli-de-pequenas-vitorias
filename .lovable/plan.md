

## Ajustes no primeiro card (barra de progresso)

### O que muda

1. **Remover o coelhinho (BunnyMarker)** do componente `YarnProgress` quando usado no tamanho `sm` (que e o usado no primeiro card). O marcador animado sera suprimido, deixando apenas a barra limpa.

2. **Corrigir a hierarquia de cores** na barra de progresso:
   - **Trilha (fundo):** manter `--secondary` (Rosa Argila) com opacidade reduzida -- ja esta correto
   - **Preenchimento:** trocar de `--accent` (Ocre Dourado) para `--primary` (Verde Eucalipto), respeitando a regra de que o ocre e exclusivo para CTAs

### Detalhes tecnicos

**Arquivo: `src/components/app/YarnProgress.tsx`**

- Condicionar a renderizacao do bloco `motion.div` (marcador coelhinho, linhas 100-110) ao tamanho `md`. Quando `size === "sm"`, o marcador nao sera renderizado.
- Trocar as referencias a `--accent` no preenchimento (linhas 85-86) por `--primary`, mantendo a textura de fio diagonal:
  - `hsl(var(--primary) / 0.95)` e `hsl(var(--primary) / 0.65)` no `repeating-linear-gradient`
  - `hsl(var(--primary) / 0.25)` no `box-shadow` inset

Nenhum outro arquivo precisa ser alterado.
