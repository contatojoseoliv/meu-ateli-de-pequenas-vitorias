

# Refazer a Barra de Progresso com Marcadores em "V" de Croche

## O que muda

A barra de progresso atual usa circulos com imagens pequenas que nao ficam bem. Vamos substituir por **7 marcadores em formato "V"** que imitam o ponto de croche, alinhados sobre a linha de progresso, mais o selo final.

## Design Visual

- Cada marcador sera um **SVG em forma de "V"** estilizado como ponto de croche (duas linhas diagonais que se encontram embaixo, com pequena curva)
- Cores:
  - Dia concluido: cor accent (ocre dourado) com tracos firmes
  - Dia atual: cor accent com leve destaque/anel
  - Dia bloqueado: cinza claro, opacidade reduzida
- A linha de progresso horizontal continua igual (trilha cinza + preenchimento accent)
- O 8o nó (selo final "Primeira Vitoria") permanece como esta, com a imagem circular
- Texto abaixo mantido: "Conclua todos os dias para liberar o selo de Primeira Vitoria."

## Detalhes Tecnicos

**Arquivo**: `src/components/app/JourneyMiniProgress.tsx`

1. Criar um componente SVG `CrochetStitchV` inline que desenha um "V" estilizado (tipo ponto baixo de croche) -- duas linhas diagonais com pontas arredondadas
2. Substituir os `<div>` circulares + `<img>` dos 7 dias por esse SVG
3. Tamanho dos marcadores: ~28x24px, centralizados sobre a linha
4. Remover o import de `seloIcon` (nao sera mais usado)
5. Manter o nó final com `finalSeal` (selo circular da Primeira Vitoria)
6. Ajustar o grid para alinhar os V's corretamente sobre a linha de progresso

O resultado sera uma barra de progresso com 7 "Vzinhos" de croche espaçados uniformemente, seguidos do selo circular no final -- visual limpo, artesanal e tematico.
