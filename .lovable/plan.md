

# Ajustes no Front-End: Cards, Materiais, Suporte e Selos

## 1. Corrigir erro de build (TypeScript)

O `DayCard` exige a prop `tag` mas o `AppHome` nao a passa. Vamos tornar `tag` opcional no `DayCardProps` (ja que nao e usada visualmente no componente) ou passar `d.tag` no render. Solucao: passar `tag={d.tag}` na chamada do `DayCard` em `AppHome.tsx`.

---

## 2. Padronizar cards em "Meus Dias de Criacao"

**Problema**: Os 3 IntroCards e os 7 DayCards podem ter alturas diferentes dependendo do conteudo.

**Solucao**:
- Adicionar `min-h-[140px]` nos dois componentes (`IntroCard` e `DayCard`) para forcar uma altura minima consistente
- Ambos ja usam `h-full` nos wrappers e `flex flex-col justify-between` no conteudo, entao so precisamos do `min-h` para garantir uniformidade
- O grid atual (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3`) ja e responsivo e sera mantido

**Arquivos**: `src/components/app/DayCard.tsx`, `src/components/app/IntroCard.tsx`

---

## 3. Criar pagina "Materiais e Tecnicas"

**Nova rota**: `/app/materiais-tecnicas`

Criar uma pagina dedicada com cards que direcionam para os conteudos dos dias, organizada em duas secoes:

- **Materiais**: card para cada dia mostrando os materiais daquele dia, com link para `/app/dia/{day}?tab=materiais`
- **Tecnicas**: card para cada dia mostrando as tecnicas daquele dia, com link para `/app/dia/{day}?tab=tecnicas`

Os dados virao de `journeyDays[].tabs.materials` e `journeyDays[].tabs.techniquesAndResources`.

Alem disso, atualizar os botoes da secao `AppMaterialsTechniquesSection` na Home para navegar para esta nova pagina em vez de um dia especifico.

**Arquivos**:
- `src/pages/app/AppMateriaisTecnicas.tsx` (novo)
- `src/App.tsx` (nova rota)
- `src/components/app/AppMaterialsTechniquesSection.tsx` (atualizar links)

---

## 4. Botoes de Suporte lado a lado

**Problema**: Os botoes de WhatsApp e Email ja estao configurados com `flex-col sm:flex-row` no `AppSupportSection`, mas na pagina `AppSupport` estao empilhados verticalmente.

**Solucao**: Atualizar `AppSupport.tsx` para usar layout `flex-row` com `flex-wrap` para responsividade, igual ao `AppSupportSection`.

**Arquivo**: `src/pages/app/AppSupport.tsx`

---

## 5. Substituir selo na pagina de Selos

**Acao**: Salvar a imagem enviada (frente do selo "Primeira Vitoria em Amigurumi") como novo asset e usa-la na pagina de selos.

- Copiar imagem para `src/assets/selo-primeira-vitoria-circular.png` (substituir o existente)
- O componente `AppBadges` ja importa esse asset, entao a substituicao sera automatica
- Manter tamanho `h-24 w-24` com `object-contain` para boa resolucao e proporcao
- Aumentar para `h-32 w-32` para dar mais destaque ao selo

**Arquivo**: `src/pages/app/AppBadges.tsx`, asset `src/assets/selo-primeira-vitoria-circular.png`

---

## Resumo de arquivos

| Arquivo | Acao |
|---|---|
| `src/components/app/DayCard.tsx` | Adicionar `min-h-[140px]` no Card |
| `src/components/app/IntroCard.tsx` | Adicionar `min-h-[140px]` no Card |
| `src/pages/app/AppHome.tsx` | Passar `tag={d.tag}` no DayCard |
| `src/pages/app/AppMateriaisTecnicas.tsx` | Nova pagina de Materiais e Tecnicas |
| `src/App.tsx` | Adicionar rota `/app/materiais-tecnicas` |
| `src/components/app/AppMaterialsTechniquesSection.tsx` | Atualizar navegacao para nova pagina |
| `src/pages/app/AppSupport.tsx` | Botoes lado a lado com responsividade |
| `src/pages/app/AppBadges.tsx` | Aumentar selo para `h-32 w-32` |
| `src/assets/selo-primeira-vitoria-circular.png` | Substituir pela nova imagem |

