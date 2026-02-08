
Objetivo do ajuste (Home)
- Separar o “bloco de entrada” (bem pequeno) do “bloco principal” (card grande), como você descreveu e como a referência da imagem sugere:
  1) Mini-bloco: só “Bem-vinda…” + a linha de progresso logo abaixo, com percentual (sem CTA, sem fio grande).
  2) Bloco principal (logo abaixo): card no estilo da imagem (mini-foto à esquerda, infos no meio, botão de continuar à direita, e uma barrinha/progresso embaixo).
  3) Depois seguem: “Meus Dias de Criação”, “Meus Materiais e Técnicas”, “Meu Suporte”, rodapé.

O que vou mudar (front-end)

1) Ajustar o topo da Home em `src/pages/app/AppHome.tsx`
- Hoje existe um único Card grande com:
  - “Bem-vinda…”
  - “Meu Progresso — …”
  - texto do percentual
  - YarnProgress
  - botão “Começar/Continuar…”
- Vou dividir em dois blocos:

1.1) Mini-bloco de entrada (novo Card pequeno)
- Conteúdo (exato como você pediu):
  - Linha 1: “Bem-vinda ao seu Ateliê, {profile.displayName}!”
  - Linha 2: “Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?”
  - Percentual: como você escolheu “Com percentual”, vou manter um texto curto menor (ex.: “{percent}% concluída.”) logo abaixo (sem o YarnProgress grande e sem botão).
- Estilo para ficar “bem pequenininho”:
  - reduzir paddings (ex.: `p-4` no header em vez de `p-6`)
  - tipografia menor (ex.: title `text-base sm:text-lg`, e a linha de progresso `text-xs sm:text-sm`)
  - reduzir espaçamento vertical (`space-y-1`)

1.2) Bloco principal no estilo da imagem (novo Card grande logo abaixo)
- Layout (horizontal em desktop, empilhado no mobile):
  - Esquerda: um “thumbnail” circular (imagem placeholder) dentro de um anel sutil
    - Como ainda não existe uma imagem por dia no conteúdo, vou usar uma imagem do projeto como padrão (ex.: `src/assets/hero-amigurumi.png`) só como placeholder visual.
    - Futuro: dá para evoluir para imagem por dia quando você quiser.
  - Centro: texto com informações do “estado atual”
    - “Primeira Vitória em Amigurumi” (título)
    - “Etapa: Dia {progress.currentDay} — {journeyDays[currentDay-1].title}”
    - opcional pequeno: “Tempo estimado: {estimatedTime}”
  - Direita: botão CTA (mantendo seu critério “Texto atual”):
    - Se `completedCount === 0`: “Começar”
    - Senão: “Continuar do Dia {progress.currentDay}”
    - Ao clicar: vai para `/app/dia/{progress.currentDay}`
  - Embaixo: uma barrinha/progresso
    - Vou reaproveitar o `YarnProgress`, mas em modo mais discreto (ex.: `size="sm"`) e com um rótulo curto.
    - Ao lado da barrinha (direita), mostrar `percent%` (para ficar bem parecido com o “65% concluído…” da referência).

2) Garantir que o restante da Home continue igual
- Manter a seção “Meus Dias de Criação” e o grid de `DayCard` exatamente como está.
- Manter `AppMaterialsTechniquesSection` e `Meu Suporte` na mesma ordem atual.
- Manter o scroll por âncora (`#materiais-tecnicas`) já implementado.

Arquivos envolvidos
- Alterar:
  - `src/pages/app/AppHome.tsx`
- Sem necessidade de mexer em backend/autenticação.
- Sem necessidade de alterar menu para este ajuste específico (o menu já foi reordenado antes).

Detalhes técnicos de implementação (para ficar estável e fácil de ajustar)
- Em `AppHome.tsx`:
  - Calcular `currentDayData` com `journeyDays.find(d => d.day === progress.currentDay)`
  - Importar uma imagem existente como placeholder do thumbnail do card principal (ex.: `import heroAmigurumi from "@/assets/hero-amigurumi.png";`)
  - Usar Tailwind para replicar o “cartão costurado” e a proporção do layout da referência:
    - container principal do card: `flex flex-col md:flex-row md:items-center gap-4`
    - thumbnail: `h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden ring-2 ring-accent/30`
    - CTA à direita: manter `Button variant="primary"` (ou secondary, se você achar que primary está “forte demais” para o app; mas vou manter como está hoje para não quebrar consistência)

Critérios de aceite (o que você vai ver no /app)
1) O primeiro bloco virou um card pequeno com:
   - “Bem-vinda ao seu Ateliê, [Nome]!”
   - “Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?”
   - e um “X% concluída.” pequeno (sem fio e sem botão).
2) Logo abaixo aparece um card grande “estilo imagem”, com:
   - bolinha com imagem à esquerda
   - info de etapa/dia no centro
   - botão “Começar” ou “Continuar do Dia X” à direita
   - barrinha de progresso embaixo
3) O resto da Home continua na mesma ordem:
   - Meus Dias de Criação
   - Meus Materiais e Técnicas
   - Meu Suporte
   - Rodapé

Observação rápida sobre a imagem enviada (referência)
- Vou usá-la apenas como referência visual de layout (card horizontal com thumbnail + infos + CTA + barra). Não vou “embutir” essa imagem específica na interface, a menos que você peça explicitamente para usar ela como asset do app.

Próximo passo de validação (quando eu implementar)
- Você vai testar end-to-end no /app:
  - conferir o “mini-bloco” bem compacto
  - clicar no CTA do bloco principal
  - checar no mobile para garantir que o card quebra linha bonito e não fica apertado
