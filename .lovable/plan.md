
## Objetivo
Ajustar a **Sessão 4 (Solução)** para:
1) Reordenar **pré-headline → headline → subheadline** e corrigir **hierarquia de tamanhos** (principalmente no desktop, onde hoje está invertido).
2) Melhorar **contraste/visibilidade** com cores mais consistentes (evitando uso indevido do Ocre fora de CTA/conversão).
3) Melhorar o design da frase **“Isso quebra a Tríade…”**, deixar mais “de impacto”, e adicionar **um botão abaixo** que leva ao **Método** — e garantir que esse bloco (frase + botão) fique **na dobra**.
4) Relacionar a **Sessão 2 (Lead)** com a **Sessão 3 (Problema)** como “espelhamento”: a 2 descreve a sensação e a 3 explica os 3 vilões (e vice-versa), de forma sutil.

---

## O que existe hoje (diagnóstico rápido)
- Estrutura das seções está correta: `Hero → Lead → Problema → Solucao → ...` em `src/pages/Index.tsx`.
- A Sessão 4 (`src/components/sections/Solucao.tsx`) tem:
  - Intro com `h2` e dois `p`, porém com classes inconsistentes (ex.: `text-3xl` no mobile e `md:text-xl` no desktop, o que reduz o título em telas maiores).
  - Um bloco de transição com a frase **“Isso quebra a Tríade…”**, hoje depois dos 3 cards e sem CTA.
- Sessão 2 (`Lead.tsx`) e Sessão 3 (`Problema.tsx`) já conversam pelo fluxo (seta do Lead vai para `#problema`), mas falta um “gancho espelho” explícito (bem sutil) para deixar a relação clara.

---

## Decisões já alinhadas (a partir das suas respostas)
- A “última frase” a melhorar é: **“Isso quebra a Tríade da Mente Acelerada — de uma vez.”**
- O botão novo deve levar para: **Ir para o Método** (dentro da própria sessão 4).
- A relação entre Sessão 2 e 3 deve ser: **os dois (sutil)** — Lead aponta para Problema e Problema referencia Lead.

---

## Implementação (passo a passo)

### 1) Sessão 4: reordenar pré-headline / headline / subheadline + ajustar tamanhos
**Arquivo:** `src/components/sections/Solucao.tsx`

**Ajustes:**
- Trocar a ordem do topo da Solução para ficar assim:
  1. **Pré-headline** (pequena, com tracking, peso semibold): algo como “A DESCOBERTA QUE MUDA TUDO” (ou manter o texto atual como pré).
  2. **Headline** (grande, alto contraste, Playfair): a frase principal da sessão.
  3. **Subheadline** (tamanho intermediário, branco com leve opacidade): a frase que prepara para os mecanismos.

**Correção de responsividade:**
- Ajustar classes para que o **desktop** aumente (ex.: `text-2xl md:text-5xl`) ao invés de diminuir (hoje está `md:text-xl`).

**Cores (visibilidade + regra do Ocre):**
- Evitar o **Ocre** em parágrafos de conteúdo (manter Ocre mais reservado a CTA/conversão).
- Usar:
  - `text-white` para headline
  - `text-white/85` para subheadline
  - `text-rosa-argila` para destaques pequenos (sem virar “cor de CTA”)

---

### 2) Tornar o bloco “Isso quebra a Tríade…” mais forte + botão abaixo (na dobra)
**Arquivo:** `src/components/sections/Solucao.tsx`

**Mudanças:**
- Transformar o bloco da frase em um “micro-card” mais premium (glass):
  - fundo `bg-white/5`
  - borda `border-white/10` (ou `border-white/15`)
  - tipografia mais impactante
  - possível detalhe visual (ex.: um pequeno “selo”/linha/ícone discreto) sem poluir.

**Melhorar o texto da frase (proposta inicial):**
- Manter a ideia, mas deixar mais conclusivo e “irrefutável”, por exemplo:
  - “Isso quebra a Tríade da Mente Acelerada — de uma vez. Em 15 minutos.”
  - ou “Você não precisa lutar contra a mente. Você só precisa do método certo.”

(na implementação eu deixo o texto em uma versão final única, curta e forte, coerente com o tom do resto da página)

**Adicionar botão abaixo**
- Inserir um CTA logo abaixo da frase:
  - `Button variant="primary"` (mantém regra do Ocre para conversão)
  - Label sugerido: “Ver o Método Primeira Vitória” (ou “Quero ver o Método”)

**Scroll para o Método**
- Criar um alvo consistente para scroll suave:
  - Opção preferida (sem mexer no componente interno): envolver `<MetodoPrimeiraVitoria />` em um wrapper com `id="metodo"` dentro de `Solucao.tsx`.
  - Ao clicar no botão, fazer `document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" })` com fallback para `window.location.hash = "#metodo"`.

**“Tudo isso em uma dobra”**
- Para garantir que **frase + botão** fiquem na dobra:
  - posicionar esse bloco logo após a intro (antes dos 3 mecanismos) ou reduzir o espaçamento vertical (`mb/py`) para caber no primeiro viewport no mobile.
  - Ajustar margens do intro (`mb-12`, `mt-6`, etc.) para um layout mais compacto sem perder respiro.

---

### 3) Relacionar Sessão 2 e 3 (espelhamento) de forma sutil
#### 3.1) Lead (Sessão 2) aponta para a explicação (Sessão 3)
**Arquivo:** `src/components/sections/Lead.tsx`

- Inserir uma linha curta (quase como um “ponto de virada”) antes do “Antes de te mostrar como…” ou bem perto do final, algo como:
  - “E esse ‘sumir’ acontece por 3 motivos — a tríade.”
- Essa linha pode ter um link sutil para `#problema` (ex.: sublinhado leve / texto verde eucalipto), sem virar CTA grande (para não competir com conversão).
- Objetivo: explicitar “o que eu senti (Lead) = por que acontece (Problema)”.

#### 3.2) Problema (Sessão 3) referencia o gancho emocional do Lead
**Arquivo:** `src/components/sections/Problema.tsx`

- Adicionar um micro-prefácio no topo, acima do título, em texto pequeno:
  - “Lembra quando eu disse ‘Você desaparece’?” / “Aquele ‘sumir’ tem 3 vilões…”
- Incluir um link discreto para `#lead` (opcional) para reforçar a sensação de espelho.
- Manter bem curto para não aumentar muito a altura da seção.

---

## Critérios de aceite (o que você vai ver na tela)
1) No topo da Sessão 4, a ordem ficará claramente: **pré-headline (pequena) → headline (grande) → subheadline (média)**, com bom contraste.
2) A frase “Isso quebra a Tríade…” ficará visualmente mais “premium” e mais forte no texto.
3) Existirá um botão logo abaixo dessa frase que leva com scroll suave para o **Método Primeira Vitória**.
4) No mobile, o bloco **frase + botão** ficará visível “na dobra” (primeiro viewport), sem exigir rolar.
5) Sessão 2 e 3 terão referências cruzadas sutis (Lead → Problema e Problema → Lead) deixando explícito que uma explica a outra.

---

## Riscos / cuidados
- Evitar usar **Ocre Dourado** em trechos longos de texto para não “diluir” o sentido de CTA/conversão.
- Garantir que compactar para caber “na dobra” não deixe o texto apertado demais; vou ajustar espaçamentos com prioridade em legibilidade.

---

## Arquivos que serão alterados
- `src/components/sections/Solucao.tsx`
- `src/components/sections/Lead.tsx`
- `src/components/sections/Problema.tsx`
