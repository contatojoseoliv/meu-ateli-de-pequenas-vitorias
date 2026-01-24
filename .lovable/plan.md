
Objetivo
- Deixar “em branco” a sessão que começa com “Por Isso Criamos o Primeira Vitória em Amigurumi©” e separar claramente a dobra (transição) entre:
  1) A parte verde (pré-headline + headline + 3 caixinhas + botão)
  2) O conteúdo do método (iniciando em “Por Isso Criamos...”)

O que identifiquei no código
- A landing page está organizada em `src/pages/Index.tsx`.
- O texto “Por Isso Criamos o Primeira Vitória em Amigurumi©” está em `src/components/sections/solucao/MetodoPrimeiraVitoria.tsx`.
- Esse bloco hoje fica DENTRO da seção `Solucao` (`src/components/sections/Solucao.tsx`), que tem `background="verde"`.
- Portanto, para ficar “em branco” de verdade e criar uma dobra clara, o ideal é quebrar `Solucao` em duas seções distintas (verde em cima, branco embaixo).

Decisão de implementação (alinhada ao manual e ao pedido de “dobras”)
- Separar “Solução” em 2 seções reais:
  - Seção 4A (verde): pré-headline + headline + sub + 3 cards + botão CTA.
  - Seção 4B (branca): conteúdo do método (começa em “Por Isso Criamos...”).
- Manter o scroll do botão “Quero ver o método” levando para a Seção 4B (id `metodo`), mas agora ele vai apontar para uma seção separada, com fundo branco.

Mudanças planejadas (passo a passo)
1) `src/components/sections/Solucao.tsx`
   - Encerrar a `<Section background="verde">` logo após o botão CTA.
   - Criar uma nova `<Section id="metodo" background="white">` imediatamente abaixo.
   - Mover para dentro da seção branca:
     - `<MetodoPrimeiraVitoria />`
     - `<Mapa7Dias />`
     - O “fechamento emocional” (texto “E quando você segura…” etc.)
   - Remover/ajustar o separador atual (`border-t border-white/10 pt-...`) porque ele foi pensado para separar dentro do fundo verde. A separação agora será feita por:
     - Espaçamento consistente (ex.: `pt-16 md:pt-20`)
     - Opcional: um separador mais editorial (linha cinza bem suave) já dentro do branco, se necessário.

2) `src/components/sections/solucao/MetodoPrimeiraVitoria.tsx`
   - Hoje o componente assume “fundo escuro” (usa `text-white` e overlays tipo `bg-white/10`).
   - Ajustar para funcionar em fundo branco:
     - Trocar textos principais para `text-grafite-suave` e variações com opacidade (ex.: `/80`).
     - Trocar cartões internos de `bg-white/10 border-white/15` para algo coerente no branco, por exemplo:
       - cards: `bg-cinza-nuvem` ou `bg-rosa-argila-10` (claro) com `border` suave.
     - Ajustar o wrapper full-bleed atual:
       - Hoje ele força `w-screen` com `bg-rosa-argila-10` e `border-y border-white/10`.
       - No branco, isso pode virar:
         - ou um bloco centralizado normal (sem full-bleed), para ficar editorial,
         - ou continuar full-bleed mas com bordas cinza suaves (`border-border` / `border-grafite-suave/10`).
   - Garantir que a hierarquia visual do título (“Por Isso Criamos o” + “Primeira Vitória…”) siga o manual: tipografia serifada para headline e sans para o pre.

3) `src/components/sections/solucao/Mapa7Dias.tsx`
   - Também está desenhado para fundo verde (muito `text-white`, `border-white/10`, `bg-white/5`).
   - Adequar para o fundo branco:
     - Textos: `text-grafite-suave` (e secundários `text-grafite-suave/70`).
     - Bordas/fundos: trocar `border-white/...` por `border-grafite-suave/10` ou `border-border`.
     - Nós (circulinhos) e chips: usar `bg-cinza-nuvem`/`bg-rosa-argila-10` com ícones em `text-verde-eucalipto` para manter identidade.
     - Preservar o “Ocre Dourado” apenas onde for elemento de conversão (não usar como texto corrido).

4) Ajuste fino de “dobra” (separação visual)
   - Validar no preview (desktop e mobile) se a transição verde → branco ficou com a “respiração” correta:
     - Espaço abaixo do botão (no verde) suficiente para “encerrar” o bloco.
     - Espaço acima do título “Por Isso Criamos…” (no branco) para iniciar uma nova leitura.
   - Se necessário, adicionar um divisor editorial mínimo entre as seções (ex.: uma faixa branca já existe por ser uma nova Section; geralmente isso é suficiente).

Critérios de aceite (o que vai ficar visivelmente diferente)
- O bloco que começa em “Por Isso Criamos o Primeira Vitória em Amigurumi©” ficará em FUNDO BRANCO (não mais no verde).
- A seção verde terminará exatamente no botão “Quero ver o método”.
- Ao clicar no botão, a página rola suavemente para o início do bloco branco (método).
- Textos e cards dentro do método/mapa continuarão legíveis e consistentes com a paleta (grafite no branco; verde e rosa como acentos; ocre só para CTA).

Arquivos que serão alterados
- `src/components/sections/Solucao.tsx`
- `src/components/sections/solucao/MetodoPrimeiraVitoria.tsx`
- `src/components/sections/solucao/Mapa7Dias.tsx`

Riscos / pontos de atenção
- Como `MetodoPrimeiraVitoria` usa layout “full-bleed” (`w-screen`), ao passar para fundo branco precisamos garantir que não pareça uma faixa “solta” ou com contraste errado.
- O `Mapa7Dias` tem muitos elementos com `text-white` e `border-white/...`; a troca para o tema claro precisa ser completa para não sobrar nada “lavado”/invisível.
