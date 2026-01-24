
Objetivo
- Conferir e ajustar o espaçamento vertical da Sessão 3 (Problema) para ficar “mais compacto”.
- Trocar a cor de fundo da Sessão 3 (Problema) para Verde Eucalipto, mantendo legibilidade/contraste.

Contexto (o que encontrei no código)
- A ordem das dobras está em `src/pages/Index.tsx`: Hero → Lead → Problema → Solução → …
- A Sessão 3 é `src/components/sections/Problema.tsx` e hoje está com:
  - `background="white"`
  - `containerClassName="pt-10 pb-10 md:pt-12 md:pb-12"`
- O componente `Section` (`src/components/shared/Section.tsx`) já suporta `background="verde"` e aplica:
  - `bg-verde-eucalipto text-white`

Decisões alinhadas com seu pedido
- Cor de fundo (Sessão 3): Verde Eucalipto
- Espaçamento (Sessão 3): Mais compacto (reduzir principalmente “respiro” inferior e alguns espaçamentos internos)

O que vou mudar (implementação)
1) Trocar o fundo da Sessão 3 (Problema) para verde
- Arquivo: `src/components/sections/Problema.tsx`
- Alteração: `background="white"` → `background="verde"`

2) Corrigir contraste de textos que hoje estão “forçando” grafite em fundo verde
- Ainda em `Problema.tsx`, ajustar classes:
  - Título/subtítulo/parágrafos que estão com `text-grafite-suave` para variantes em branco, por exemplo:
    - `text-white` / `text-white/85` / `text-white/70`
  - O destaque “(E Não É Culpa Sua)” hoje em `text-rosa-argila` pode permanecer (fica bom como acento no verde).
  - O texto de “Resultado” e a frase final também precisam ir para branco (ou branco com opacidade).

3) Ajustar os 3 cards para combinarem com fundo verde
Há duas abordagens possíveis; vou seguir a que mantém o padrão visual da dobra verde (Solução):
- Cards com estilo “glass”:
  - `bg-white/10 border border-white/20`
  - Texto interno `text-white/85` (e títulos `text-white`)
  - Ícones: `text-white/85` (ou `text-rosa-argila` se você preferir mais “calor”)
- Motivo: se mantivermos `bg-rosa-argila-10` nos cards, a paleta pode ficar “descolada” do fundo verde e o contraste de texto fica inconsistente.

4) Deixar a Sessão 3 mais compacta (espaçamento)
- Reduzir padding do container da seção, por exemplo:
  - de `pt-10 pb-10 md:pt-12 md:pb-12`
  - para algo como `pt-10 pb-8 md:pt-12 md:pb-10` (compacta embaixo sem “esmagar” o topo)
- Ajustar espaçamentos internos para acompanhar:
  - `mb-10 md:mb-12` do bloco de título pode cair um pouco (ex.: `mb-8 md:mb-10`)
  - `mb-12 md:mb-14` do grid de cards pode cair um pouco (ex.: `mb-10 md:mb-12`)
  - A área do botão (`mt-8 mb-4 md:mb-6`) pode ficar mais enxuta se estiver sobrando espaço visual.

Checklist de verificação (visual)
- Sessão 3 com fundo verde e leitura confortável:
  - Título e texto legíveis (sem grafite “apagado” no verde).
  - Cards com contraste (texto não “estoura” nem fica baixo contraste).
  - Botão “Quero Começar” permanece com estilo de CTA consistente (e sem usar ocre para texto/cor indevida).
- Transição Lead → Problema:
  - Ver se a seta/âncora do Lead ainda fica “bonita” com o novo fundo abaixo.
- Transição Problema → Solução:
  - Ver se não ficou “verde sobre verde” cansativo (duas dobras verdes seguidas). Se ficar pesado, proponho uma alternativa rápida:
    - Sessão 3 verde + Sessão 4 manter verde, mas diferenciar usando um separador (linha sutil) ou textura/gradiente muito leve (sem mudar o branding).

Arquivos que serão alterados
- `src/components/sections/Problema.tsx`
- (provavelmente não precisa mexer) `src/components/shared/Section.tsx` já tem `background="verde"`

Risco/atenção
- Como a Sessão 4 (Solução) já é verde, duas seções verdes consecutivas podem reduzir o contraste “entre dobras”. Se isso acontecer, eu já deixo preparado um ajuste mínimo (separador/gradiente leve) para você aprovar.

Próximos passos após você aprovar este plano
- Eu implemento as alterações acima, e você confere no preview se:
  1) o espaçamento ficou realmente mais compacto
  2) o fundo verde ficou agradável e legível
  3) a transição entre as dobras está harmoniosa
