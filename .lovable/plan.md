
Objetivo (Dobra 3 / “Problema”)
- Fixar a cor de fundo na opção recomendada: **Cinza Nuvem** da paleta (`background="cinza"` → `bg-cinza-nuvem`).
- Garantir que o fundo realmente “apareça” (sem ficar parecendo branco puro), mantendo os **cards brancos** com contraste bonito e consistente com o resto da landing.

O que já está correto (pelo seu diff atual)
- A Dobra 3 já está assim:
  - `return <Section id="problema" background="cinza" ...>`
- Isso usa o token oficial do design system:
  - `cinza` → `bg-cinza-nuvem`

Por que às vezes o Cinza Nuvem “parece branco”
- O `#F4F4F4` é bem suave. Com cards `bg-white` em cima, em alguns monitores a diferença fica mínima.
- Se houver qualquer `className` de fundo adicional, ele pode sobrescrever o `bg-cinza-nuvem` (você já removeu o `bg-verde-eucalipto-10`, ótimo).

Implementação (o que vou fazer quando você sair do modo read-only e eu puder aplicar)
1) “Travar” o fundo Cinza Nuvem sem risco de override
- Arquivo: `src/components/sections/Problema.tsx`
- Conferir que o `<Section>`:
  - mantém `background="cinza"`
  - não tem `className` com `bg-*` (nem `style` com background) que sobrescreva

2) Melhorar a percepção do Cinza Nuvem (sem trocar a cor)
Para o cinza não “sumir” atrás dos cards brancos:
- Ajustar levemente o contraste dos cards (continua branco, mas com borda/sombra mais definida):
  - `border-verde-eucalipto/15` → `border-verde-eucalipto/20` (ou `/25` se necessário)
  - opcional: aumentar um pouco a sombra (`shadow-suave` → algo entre `shadow-suave` e `shadow-elevada`, bem sutil)
- Motivo: isso cria “recorte” e você passa a perceber melhor o fundo cinza atrás.

3) Validação visual no Preview (checklist rápido)
- Lead (branco) → Problema (Cinza Nuvem):
  - a Dobra 3 precisa ficar claramente “uma nova dobra” sem parecer “igual branco”
- Problema (Cinza Nuvem) → Solução (Verde escuro):
  - transição limpa e com contraste forte (funciona muito bem para mudança de fase)
- Legibilidade:
  - títulos e parágrafos continuam em grafite; destaques em verde continuam funcionando

Arquivos envolvidos
- `src/components/sections/Problema.tsx` (principal)
- `src/components/shared/Section.tsx` (não deve precisar alterar; já suporta `cinza`)

Riscos / alternativas rápidas (se ainda parecer branco no seu monitor)
- Sem mudar a paleta, dá para criar “presença” com uma dessas opções (eu só faço se você pedir):
  1) colocar um **separador** sutil no topo/rodapé da seção (`border-t border-black/5` ou `border-verde-eucalipto/10`)
  2) aplicar um **gradient muito leve** dentro da própria seção (ex.: de `cinza-nuvem` para `white` em 15–20%), semelhante ao que vocês fazem no Fechamento, mas bem mais discreto

Resultado esperado
- Dobra 3 com **Cinza Nuvem real**, perceptível e elegante, sem “puxar” para verde claro e sem competir com a Solução (verde escuro).

<lov-actions>
  <lov-suggestion message="Ajuste fino de contraste: deixar os cards da Dobra 3 mais ‘recortados’ no Cinza Nuvem (borda um pouco mais forte e sombra sutil), sem mudar layout.">Refinar contraste dos cards</lov-suggestion>
  <lov-suggestion message="Adicionar um separador sutil (linha/gradiente leve) entre Lead (branco) e Problema (cinza-nuvem) para a mudança de dobra ficar mais perceptível em qualquer monitor.">Adicionar separador sutil</lov-suggestion>
  <lov-suggestion message="Criar uma variação oficial no componente Section: background='verde-claro' (bg-verde-eucalipto-10) e background='cinza' (bg-cinza-nuvem), para nunca depender de className manual.">Padronizar backgrounds no Section</lov-suggestion>
</lov-actions>
