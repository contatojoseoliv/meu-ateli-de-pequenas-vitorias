
<context>
Objetivo: Ajustar a Seção 2 (Lead) para remover “marcações em preto” (usar o padrão do restante do texto), destacar em Rosa a frase “Mas não precisa ser assim.”, criar um destaque simples/minimalista em “Você desaparece.” e na última frase, e diminuir o espaço entre as Seções 2 e 3 (Lead e Problema).
</context>

<what-i-found>
- A Seção 2 é `src/components/sections/Lead.tsx`.
  - Existem trechos com “preto” explícito via `text-foreground` (ex.: “Mas não precisa ser assim.”) e a seta usa `text-foreground/70`.
  - O texto “Você desaparece.” já está como `font-bold text-rosa-argila` (Rosa).
  - Há bastante “respiro” controlado por:
    - `containerClassName="pt-10 pb-10 md:pt-14 md:pb-12"` no `<Section />`
    - `pb-14 md:pb-16` dentro do bloco de texto (para não colidir com a seta absoluta)
- A Seção 3 é `src/components/sections/Problema.tsx` com `containerClassName="pt-6 ..."` (já relativamente compacto no topo).
- A ordem Lead → Problema está em `src/pages/Index.tsx`.
</what-i-found>

<decisions>
1) “Tirar textos em preto” = remover classes que forçam `text-foreground` dentro do Lead e alinhar para o padrão do bloco (que já está com `text-grafite-suave` no container do texto).
2) Destaques pedidos:
   - “Mas não precisa ser assim.” ficará Rosa (text-rosa-argila), com peso consistente e sem “preto”.
   - “Você desaparece.” deixará de ser Rosa (porque o Rosa será reservado para a frase “Mas não precisa ser assim.”) e receberá um destaque minimalista (ex.: grafite com ênfase e um detalhe pequeno).
   - “Última frase” (no Lead hoje é: “Antes de te mostrar como, deixa eu te explicar uma coisa importante:”) receberá um destaque bem leve (ex.: texto menor + opacidade + uma barrinha/linha sutil).
3) Diminuir espaço entre Seção 2 e 3: reduzir `pb` no Lead e reduzir levemente `pt` no Problema, mantendo legibilidade e garantindo espaço suficiente para a seta.
</decisions>

<step-by-step-changes>
<step number="1" title="Lead: remover ‘preto’ explícito e padronizar cor">
- Arquivo: `src/components/sections/Lead.tsx`
- Ações:
  - Remover `text-foreground` do parágrafo “Mas não precisa ser assim.” (hoje está `className="font-semibold text-foreground"`).
  - Revisar se existe mais algum `text-foreground` aplicado a textos do conteúdo (fora seta) e remover/trocar para herdar do container (`text-grafite-suave`).
  - Manter Verde e Rosa apenas para destaques intencionais.
</step>

<step number="2" title="Lead: destacar em Rosa ‘Mas não precisa ser assim.’">
- Arquivo: `src/components/sections/Lead.tsx`
- Ações:
  - Trocar a classe do parágrafo “Mas não precisa ser assim.” para algo como:
    - `className="font-bold text-rosa-argila"` (ou `font-semibold` se quiser mais discreto)
  - Garantir que não exista nenhuma cor escura forçada junto dela.
</step>

<step number="3" title="Lead: criar destaque minimalista para ‘Você desaparece.’">
- Arquivo: `src/components/sections/Lead.tsx`
- Ações (proposta minimalista, sem “efeito chamativo”):
  - Alterar “Você desaparece.” de `text-rosa-argila` para a cor padrão (grafite) e aplicar um destaque sutil, por exemplo:
    - `className="font-semibold text-grafite-suave"`
    - adicionar um pequeno detalhe visual simples como:
      - um “bullet”/ponto em Rosa antes do texto (via `before:` do Tailwind), ou
      - uma barrinha vertical bem fina em Rosa/Verde com baixa opacidade à esquerda (`border-l` + `pl-3`), mantendo o texto em grafite.
  - Assim, o Rosa fica “reservado” para a frase principal que você pediu.
</step>

<step number="4" title="Lead: destaque simples na última frase">
- Arquivo: `src/components/sections/Lead.tsx`
- Ações:
  - Na última frase (“Antes de te mostrar como…”), aplicar um tratamento minimalista:
    - reduzir um pouco o peso (evitar preto “marcado”),
    - usar `text-sm` no mobile e `text-body`/`text-[...]` no desktop, e/ou
    - `text-grafite-suave/80` para dar sensação de “nota importante”.
  - Opcional: colocar uma linha sutil acima (ex.: `border-t border-border/60 pt-3`) para separar do parágrafo anterior sem aumentar espaço.
</step>

<step number="5" title="Diminuir o espaço entre Seção 2 e 3 (Lead → Problema)">
- Arquivos:
  - `src/components/sections/Lead.tsx`
  - `src/components/sections/Problema.tsx`
- Ações:
  - Reduzir o `pb` do container do Lead (ex.: de `pb-10` para `pb-6` no mobile e de `md:pb-12` para `md:pb-8`).
  - Reduzir o `pb-14 md:pb-16` do bloco de texto do Lead (mantendo espaço suficiente para a seta absoluta; ex.: `pb-10 md:pb-12`).
  - No Problema, reduzir levemente o `pt-6` para `pt-4` (ou `pt-5`), testando para não “colar” demais no título.
  - Validar no preview em mobile e desktop para garantir:
    - seta não sobrepõe conteúdo,
    - transição visual entre seções continua respirando, só mais compacta.
</step>

<step number="6" title="Revisão visual e consistência">
- Conferir no preview:
  - Seção 2 com texto todo na cor padrão (grafite), exceto destaques Verde/Rosa.
  - “Mas não precisa ser assim.” claramente em Rosa.
  - “Você desaparece.” com destaque sutil (não Rosa).
  - Última frase com destaque minimalista e sem “preto marcado”.
  - Gap entre Seção 2 e 3 visivelmente menor, sem parecer apertado.
</step>
</step-by-step-changes>

<edge-cases-and-notes>
- A seta (ChevronDown) usa `text-foreground/70`. Isso não é “texto do conteúdo”, mas posso também suavizar para `text-grafite-suave/60` se você considerar isso uma “marcação preta” visual.
- Como já reduzimos o padding padrão do `Section` para `py-6`, é importante não “espremer” demais o Problema; por isso a redução proposta é incremental e revisada no preview.
</edge-cases-and-notes>

<files-to-change>
- `src/components/sections/Lead.tsx` (principal)
- `src/components/sections/Problema.tsx` (ajuste de espaçamento superior)
</files-to-change>
