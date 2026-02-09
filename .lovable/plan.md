

## Atualizar o conteudo do Dia 1 — "Seu primeiro ponto e o anel magico"

### O que muda

O Dia 1 atual tem conteudo placeholder generico. Vamos substituir pelo conteudo completo fornecido, mantendo a estrutura guiada existente do `AppDay.tsx` (4 blocos com checklist + abas de Receita, Materiais e Tecnicas).

### Mapeamento do conteudo para a estrutura existente

O `AppDay.tsx` ja usa 4 blocos (Preparacao, Voltas, Verificacao, Objetivo final) com checklist e 3 abas auxiliares. O conteudo do Dia 1 sera mapeado assim:

**Aba "Guiado" — Bloco Preparacao**
1. Titulo do dia atualizado para "Seu primeiro ponto e o anel magico"
2. Step: "Respire fundo e separe seus materiais" (com tip do texto "Antes de comecar")
3. Step: "Leia a receita do dia" (com tip mostrando a receita: MR com 6pb, 6 aum)

**Aba "Guiado" — Bloco Voltas** (os passos praticos)
1. Step: "Passo 1 — Enrolar o fio no dedo" (com sub-instrucoes e imagem placeholder)
2. Step: "Passo 2 — Entrar com a agulha" (com sub-instrucoes e imagem placeholder)
3. Step: "Passo 3 — Fazer uma correntinha para travar"
4. Step: "Passo 4 — Fazer 6 pontos baixos dentro do anel" (com sub-instrucoes e imagem placeholder)
5. Step: "Passo 5 — Fechar o anel" (com tip e imagem placeholder)
6. Step: "Confira: conte 6 Vzinhos na borda do circulo" (com tip sobre erros comuns)
7. Step: "Volta 2 — Faca 1 aumento em cada ponto (6 aum = 12 pontos)" (com sub-instrucoes e imagem placeholder)

**Aba "Guiado" — Bloco Verificacao**
1. Step: "Verifique se sua peca tem centro fechado e bordas arredondadas" (com tip sobre aparencia esperada)
2. Step: "Consulte a tabela de problemas comuns se algo estiver diferente" (com tip listando buraco no meio / peca dobrando / ondulada)

**Aba "Guiado" — Bloco Objetivo final**
1. Step: "Missao do Dia 1 completa: anel magico + 6pb + fechar + volta de aumentos (12 pontos)" (com tip motivacional "Amanha: vamos continuar crescendo a base do corpinho do coelhinho")

**Aba "Receita completa"**
- Receita formatada: Volta 1 (MR com 6pb → 6), Volta 2 (6 aum → 12)

**Aba "Materiais"**
- Linha amigurumi, Agulha 2.0-2.5mm, Marcador de ponto, Tesoura

**Aba "Tecnicas e recursos"**
- Anel magico (MR), Ponto baixo (pb), Aumento (aum), Como contar pontos

### Adaptacao do tipo GuidedStep

O tipo `GuidedStep` atual ja suporta `text`, `tip` e `imagePlaceholderLabel`. Para acomodar os sub-passos detalhados (listas numeradas dentro de um step), vamos adicionar um campo opcional `details` (array de strings) que sera renderizado como lista ordenada abaixo do texto principal.

### Detalhes tecnicos

**Arquivos editados:**

1. `src/content/journey.ts`
   - Adicionar campo opcional `details?: string[]` ao tipo `GuidedStep`
   - Substituir todo o conteudo do dia 1 (title, estimatedTime, guided, tabs)
   - Title: "Seu primeiro ponto e o anel magico"
   - EstimatedTime: "15-20 min"

2. `src/pages/app/AppDay.tsx`
   - Adicionar renderizacao do campo `details` (quando presente) como `<ol>` abaixo do texto do step
   - Manter toda a logica de checklist, progresso e conclusao inalterada

**Nenhum outro arquivo sera criado ou editado.**

### Conteudo textual

Todo o texto sera mantido **exatamente** como fornecido, incluindo emojis, negritos, repeticoes intencionais e tom emocional. Os marcadores [IMAGEM SUGERIDA] serao convertidos para `imagePlaceholderLabel` com a descricao correspondente.

A tabela de problemas comuns (buraco no meio / peca dobrando / ondulada) sera incluida como tip formatado no step de verificacao correspondente.
