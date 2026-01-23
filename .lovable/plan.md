
Objetivo
- Eliminar o “espaço sobrando na esquerda” na seção Garantia no desktop, mudando o layout (sem parecer que há uma “coluna vazia”).
- Manter a seção mais compacta (como você já pediu antes) e remover a última frase (já alinhado).

O que está causando o espaço hoje (diagnóstico)
- Em `src/components/sections/Garantia.tsx`, o layout é `md:flex-row` com:
  - “Selo” em uma coluna à esquerda (`flex-shrink-0`)
  - “Blockquote/card” na direita (`flex-1`)
- No desktop, esse padrão costuma gerar a sensação de “sobrou espaço” na esquerda porque:
  - a coluna do selo ocupa uma área fixa;
  - o card começa mais à direita, criando um “vazio” visual antes do conteúdo principal.

Mudança de design proposta (layout novo)
- Trocar o layout desktop de “duas colunas (selo fora do card)” para “card único centralizado com selo integrado”, para eliminar o vão à esquerda.
- Duas variações possíveis (vou implementar a que fica mais fiel ao seu estilo atual e mais limpa):

Variação A (recomendada): Selo embutido no topo do card
- Um único card centralizado (sem coluna lateral).
- Cabeçalho do card com:
  - selo à esquerda (menor)
  - título à direita (ou abaixo, dependendo do espaço)
- O conteúdo segue abaixo com menos texto/altura.
- Benefício: 0 espaço sobrando na esquerda; leitura mais direta; fica “tamanho de sessão” no desktop.

Variação B: Selo como “badge” flutuante dentro do card (absolute)
- Card `relative`, selo em `absolute` no canto superior (esq. ou dir.).
- Benefício: bem premium visualmente.
- Cuidado: precisa garantir que não sobreponha texto em breakpoints.

Implementação (passos técnicos)
1) Ajustar `src/components/sections/Garantia.tsx`
   - Remover o wrapper `md:flex-row` e a coluna separada do selo.
   - Criar um único container central:
     - manter `max-w-4xl mx-auto` (ou ajustar para `max-w-3xl` se ficar mais “sessão” e compacto).
   - Transformar o bloco principal em um único card:
     - `bg-white`, `rounded-xl`, `shadow-suave`, `border-l-4 border-verde-eucalipto` (manter sua identidade atual).
   - Inserir o selo dentro do card:
     - usar um header com `flex items-center gap-4` e, em telas grandes, manter alinhado e sem “vazio lateral”.
     - reduzir selo no desktop se necessário para não aumentar altura.

2) Ajustar espaçamentos para ficar mais compacto no desktop
   - Diminuir `p-6 md:p-8` para algo como `p-5 md:p-6`.
   - Reduzir `space-y-3` para `space-y-2` e remover elementos que “estiquem” (ex.: divisórias grandes), mantendo legibilidade.
   - Garantir que a seção não pareça “alta demais” em relação ao restante do funil.

3) Verificar consistência com o wrapper de seção
   - `Section` já usa `container-main` (max width + padding). Não vou mexer nele para não afetar o site inteiro.
   - A correção será localizada na Garantia, como você pediu.

4) QA visual (desktop)
   - Confirmar que:
     - não há “coluna vazia” à esquerda;
     - o card fica visualmente centralizado;
     - o selo parece parte do card (não um elemento “solto”);
     - a altura total fica próxima de “uma sessão na tela”.

Arquivos envolvidos
- `src/components/sections/Garantia.tsx` (principal)
- (Opcional, se necessário) pequenos ajustes de classes utilitárias já existentes, mas a intenção é não mexer em `Section.tsx` nem no layout global.

Resultado esperado
- No desktop, a seção Garantia terá um único bloco central (sem layout em 2 colunas), eliminando o espaço sobrando na esquerda e deixando o design mais “fechado”, elegante e direto.
