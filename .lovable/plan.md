

## Pagina "Comece Por Aqui" — Formato de leitura livre com ancoras

### Formato escolhido: Leitura livre (scroll continuo)

A pagina nao tera checklist, tabs nem accordion. O conteudo sera apresentado como uma leitura continua e acolhedora, dividida em 3 secoes visuais com separadores claros.

**Por que esse formato:**
- O conteudo e informativo e emocional, nao tem "tarefas" para marcar
- A leitura sequencial (Introducao, Materiais, Fundamentos) constroi confianca progressivamente
- Esconder conteudo atras de tabs/accordions contradiz o tom "sem pressao"

### Estrutura da pagina

```text
+------------------------------------------+
|  AppShell (title="Comece por aqui")       |
+------------------------------------------+
|                                           |
|  [Ancora nav] Introducao · Materiais ·    |
|               Fundamentos                 |
|                                           |
|  ---- SECAO 1: INTRODUCAO ----            |
|  Card app-stitch                          |
|  "Seu primeiro amigurumi..."              |
|  (todo o texto emocional + explicacao     |
|   da jornada + o coelho + desacelerar     |
|   + errar faz parte + como funciona)      |
|  [IMAGEM SUGERIDA] como placeholders      |
|                                           |
|  ---- SECAO 2: MATERIAIS ----             |
|  Card app-stitch                          |
|  Guia de compras completo                 |
|  (7 itens com descricao, o que pedir,     |
|   onde comprar, alternativas)             |
|  Resumo simples (checklist visual)        |
|  [IMAGEM SUGERIDA] por item              |
|                                           |
|  ---- SECAO 3: FUNDAMENTOS ----           |
|  Card app-stitch                          |
|  Como segurar agulha/fio                  |
|  O que e ponto/volta                      |
|  Tabela de tecnicas (MR, pb, aum, dim)    |
|  Detalhamento de cada tecnica             |
|  [IMAGEM SUGERIDA] por topico            |
|                                           |
|  ---- FECHAMENTO ----                     |
|  Texto emocional final                    |
|  [Ir para o Dia 1] [Voltar]              |
|                                           |
+------------------------------------------+
```

### O que sera implementado

**Arquivo editado:** `src/pages/app/AppIntro.tsx` (reescrita completa)

1. **Navegacao por ancoras** no topo da pagina: 3 links internos ("Introducao", "Materiais", "Fundamentos") com scroll suave, estilizados como pills discretas (reutilizando estilo semelhante ao `app-tab-pill`)

2. **Secao 1 — Introducao** (`id="introducao"`)
   - Titulo "Seu primeiro amigurumi, um dia de cada vez"
   - Todo o conteudo emocional mantido exatamente como fornecido
   - Subsecoes separadas por `Separator` ou `<hr>`
   - Emojis nos titulos mantidos
   - Negritos mantidos
   - Placeholder de imagem do coelho com classe `app-photo-frame`

3. **Secao 2 — Materiais** (`id="materiais"`)
   - Titulo "Materiais (so o essencial)"
   - Cada item (fio, agulha, enchimento, etc.) como um bloco visual dentro do Card
   - Falas para a loja em destaque (bloco com fundo sutil, como `app-tip`)
   - Placeholders de imagem por item
   - Resumo final como lista com checkmarks visuais

4. **Secao 3 — Fundamentos** (`id="fundamentos"`)
   - Titulo "Fundamentos sem complicacao"
   - Subsecoes (segurar agulha, segurar fio, ponto, contar, voltas)
   - Tabela de tecnicas usando componente `Table` do shadcn/ui (MR, pb, aum, dim)
   - Detalhamento de cada tecnica
   - Placeholders de imagem por topico

5. **Fechamento** com texto emocional + botoes "Ir para o Dia 1" (primary) e "Voltar" (ghost)

### Detalhes tecnicos

- **Texto mantido literalmente** — sem reescrita, resumo ou alteracao de tom
- Componentes reutilizados: `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Table`, `Separator`, `Button`, `AppShell`
- Placeholders de imagem: `div` com classe `app-photo-frame`, icone `ImageIcon` do lucide e texto descritivo
- Falas para a loja ("Peca na loja: ...") renderizadas em blocos estilizados semelhantes a `app-tip` (borda + fundo sutil)
- Ancoras com `scroll-margin-top` para compensar o header fixo
- Nenhum outro arquivo sera criado ou editado

