
Objetivo
- Melhorar as “caixinhas” da Sessão 3 (Problema) para ficarem com o mesmo nível de acabamento das caixas da Sessão 4 (Solução): mais respiro, hierarquia mais clara e aparência mais premium.
- Atender sua observação de “talvez tirar o ícone” sem perder clareza.

O que está acontecendo hoje (diagnóstico)
- As caixas da Sessão 3 usam `p-4` e um cabeçalho simples (ícone pequeno + título). Isso deixa o conteúdo mais “apertado” e com hierarquia fraca.
- As caixas da Sessão 4 (Solução) funcionam melhor porque:
  - têm padding maior (`p-7`)
  - têm um “elemento de hierarquia” forte (número grande em serif)
  - têm layout em `flex` com boa separação entre número e título

Decisão de design (o que vamos fazer)
- Remover os ícones da Sessão 3 e substituir a hierarquia por um padrão semelhante ao da Sessão 4:
  1) Número grande (serif) como âncora visual
  2) Título em destaque
  3) Texto com `leading-relaxed` e mais respiro
- Manter o fundo da seção em Cinza Nuvem (já aprovado) e manter cards brancos, mas com acabamento consistente.

Implementação (passo a passo)
1) Ajustar o “card container” (Sessão 3)
- Arquivo: `src/components/sections/Problema.tsx`
- No `map` dos `viloes`, alterar classes do card para:
  - aumentar padding: `p-4 md:p-4` → `p-6 md:p-7`
  - alinhar raio com o estilo premium: manter `rounded-2xl` (ou mudar para `rounded-xl` se quisermos ficar idêntico à Sessão 4; eu recomendo manter `rounded-2xl` porque já é um padrão forte do site)
  - manter sombra suave e hover (mas garantir que não “pese” visualmente): manter `shadow-suave` e `hover-lift`

2) Refazer o cabeçalho do card para ganhar hierarquia (sem ícone)
- Trocar o bloco que hoje é:
  - ícone + título
- Por um layout igual ao da Sessão 4:
  - `div` com `flex items-start gap-4 mb-5`
  - número grande à esquerda (`font-serif text-6xl leading-none`) com cor discreta para não competir com CTA:
    - sugestão de cor: `text-verde-eucalipto/30` (ou `text-rosa-argila/35` se quiser mais emocional)
  - título à direita (`font-serif text-xl text-grafite-suave leading-snug pt-1`)
- O objetivo é: “bater o olho e entender 1, 2, 3” como na Sessão 4.

3) Ajustar tipografia e respiro do texto dentro do card
- Alterar o texto do card para ficar mais “editorial”:
  - manter `text-body` e `leading-relaxed`
  - evitar `leading-snug` no mobile (deixa denso)
- Se necessário, reduzir a “quebra forçada” após o destaque verde (o `<br />` que você usa no `formatText`) apenas se estiver deixando o texto com espaços estranhos — mas só mexo nisso se realmente for o causador visual.

4) Verificação visual (no Preview)
- Conferir em 3 larguras:
  - mobile: cards com boa altura, sem texto colado, número não estoura linha
  - tablet: grid com 2 ou 3 colunas (dependendo do breakpoint), alinhamento consistente
  - desktop: hierarquia clara, “mesma família” da Sessão 4
- Conferir contraste no Cinza Nuvem:
  - cards brancos continuam bem “recortados” (borda atual `border-verde-eucalipto/20` pode ficar; se ainda parecer “lavado”, subir para `/25`)

Escopo / arquivos envolvidos
- `src/components/sections/Problema.tsx` (único arquivo necessário para o ajuste)

Riscos e cuidados
- Não usar Ocre Dourado (ele é exclusivo para CTAs). Então o número grande não será ocre; será Verde Eucalipto ou Rosa Argila em baixa opacidade.
- Manter acessibilidade: sem depender só de cor; o número + título continuam texto real.

Resultado esperado
- Caixas da Sessão 3 com o mesmo “acabamento premium” das da Sessão 4: mais respiro, hierarquia imediata e aparência consistente (sem a sensação de “estranhas”), e sem ícones como você sugeriu.
