

## Imagens por etapa no segundo card da Home

### Resumo

Salvar a imagem enviada (grade 3x3) no projeto e usar CSS `object-position` para exibir a celula correta no thumbnail circular do segundo card, de acordo com a etapa atual. Para o Dia 7, usar a imagem do coelhinho ja existente (`hero-amigurumi.png`).

### Mapeamento das celulas (esquerda para direita, cima para baixo)

```text
+-------------------+-------------------+-------------------+
| 1. Comece por aqui| 2. Materiais      | 3. Fundamentos    |
| (0%, 0%)          | (50%, 0%)         | (100%, 0%)        |
+-------------------+-------------------+-------------------+
| 4. Dia 1          | 5. Dia 2          | 6. Dia 3          |
| (0%, 50%)         | (50%, 50%)        | (100%, 50%)       |
+-------------------+-------------------+-------------------+
| 7. Dia 4          | 8. Dia 5          | 9. Dia 6          |
| (0%, 100%)        | (50%, 100%)       | (100%, 100%)      |
+-------------------+-------------------+-------------------+
```

Dia 7 usa `hero-amigurumi.png` (imagem separada).

### Detalhes tecnicos

**Arquivo:** `src/pages/app/AppHome.tsx`

1. Salvar a imagem enviada como `src/assets/stage-grid.png`
2. Importar `stageGrid` de `@/assets/stage-grid.png`
3. Substituir o mapeamento `dayStageImages` por uma logica que considera tambem as 3 etapas introdutorias
4. Criar um array de 10 etapas com `{ src, objectPosition }`:
   - Indices 0-8: usam `stageGrid` com `object-position` especifico (conforme tabela acima)
   - Indice 9 (Dia 7): usa `heroAmigurumi` com `object-position: center`
5. Calcular o indice da etapa atual com base em `introProgress.progress.completedCards` e `progress.currentDay`
6. No `<img>`, adicionar `style={{ objectPosition }}` dinamico em vez de usar sempre `object-cover center`
7. Adicionar `scale-[3]` ou usar `background-image` + `background-size: 300%` para que a celula 1/9 da grade ocupe todo o circulo

**Abordagem de renderizacao:** Usar `background-image` com `background-size: 300% 300%` e `background-position` calculado, pois isso permite mostrar exatamente 1/9 da grade sem distorcao. A div do thumbnail muda de `<img>` para uma `<div>` com background inline.

**Remocao de imports nao usados:** Os imports de `bulletsCraftingScene`, `leadVisual`, `mapa7Dias`, `metodoTitulo`, `provaCiencia`, `seloPrimeiraVitoria` serao removidos, pois nao serao mais usados.

Nenhum outro arquivo sera criado alem do asset `stage-grid.png`.

