
Contexto do bug (o que eu acho que está acontecendo)
- Você preenche nome + data e clica “Entrar no passo a passo”, mas continua em /app.
- Pelo código atual, isso pode acontecer em dois cenários:
  1) A navegação para /app/dia/1 até acontece, mas o AppDay redireciona imediatamente de volta para /app porque não “enxerga” o onboarding concluído (isOnboarded = false naquele instante).
  2) Existe um problema de runtime (especialmente “duplicação de React” no bundle) que impede o Router/estado de funcionar corretamente. Esse problema já apareceu antes como “Should have a queue…”, e mesmo quando não aparece explicitamente, pode causar comportamentos “fantasma” em hooks/navegação.

Hipóteses mais prováveis (em ordem)
1) Redirecionamento imediato: /app/dia/1 -> volta pra /app porque isOnboarded ainda está false quando AppDay monta.
   - Sintoma percebido: “não sai do /app”.
   - Isso combina com o seu relato: “fica no /app” e “sem erro no console”.

2) Instâncias duplicadas de React no bundle (causando instabilidade dos hooks / router).
   - Sintoma anterior: “Should have a queue…”.
   - Solução comprovada (padrão de produção): configurar Vite para deduplicar react/react-dom/react/jsx-runtime.

3) A data não está sendo realmente setada (DatePicker não dispara onChange) e o handleStart dá “return” (mas você não percebe o toast).
   - Eu considero menos provável porque você disse que preencheu tudo, mas vou deixar um “plano B” de logs para confirmar.

Mudanças que vou implementar (para corrigir com robustez)
A) “Hardening” do build para impedir React duplicado (alto impacto, baixa mudança)
- Editar vite.config.ts para adicionar:
  - resolve.dedupe: ["react", "react-dom", "react/jsx-runtime"]
- Isso força o Vite a usar uma única instância de React no bundle, o que elimina uma causa conhecida do “Should have a queue” e bugs estranhos de hooks.

B) Tornar a transição /app -> /app/dia/1 impossível de “voltar” por timing
- Ajustar o fluxo do AppHome para garantir que, ao clicar no botão:
  1) Name e StartDate sejam persistidos (localStorage) de forma confiável
  2) Só depois disso a navegação ocorra
- Implementação prática:
  - Depois de setName + setStartDate, navegar com um pequeno “defer” (ex.: queueMicrotask / setTimeout 0) para garantir que o próximo screen (AppDay) leia o storage já preenchido.
  - Alternativa (mais direta): em vez de confiar em estado derivado anterior, recalcular o “dia alvo” a partir do storage atualizado antes de navegar.

C) Fazer o AppDay menos “agressivo” no redirect (evitar “ping-pong”)
- Hoje AppDay faz: if (!isOnboarded) return <Navigate to="/app" />
- Vou ajustar para:
  - Mostrar uma mensagem amigável (“Seu nome e data não foram salvos ainda”) + botão “Voltar para configurar”,
  - E também logar um console.warn em dev para diagnosticar.
- Isso evita a sensação de “não aconteceu nada” e ajuda a diagnosticar qualquer falha de persistência.

D) Instrumentação mínima (só para diagnosticar rapidamente se persistência falhar)
- Adicionar logs temporários (console.debug) no clique do botão e na inicialização do hook:
  - No AppHome: log do name/startDate antes de salvar + log após salvar.
  - No hook: log do que readStorage está retornando.
- Se depois de corrigir o fluxo você ainda relatar problema, esses logs vão dizer exatamente se o storage está vazio ou se o redirect está acontecendo por outro motivo.

Como vou testar end-to-end (na implementação)
1) Abrir /app
2) Preencher nome e selecionar uma data
3) Clicar “Entrar no passo a passo”
4) Confirmar que a URL muda para /app/dia/1 e a tela do Dia 1 aparece
5) Voltar para o mapa e abrir um dia futuro para confirmar que aparece “bloqueado”
6) Ir em Config e clicar “Reiniciar jornada” para confirmar que volta ao onboarding

Critérios de aceite (para considerar resolvido)
- Ao clicar “Entrar no passo a passo”, você vai para /app/dia/1 sem “voltar” automaticamente.
- Se por algum motivo o onboarding não estiver salvo, você vê uma mensagem clara no Dia 1 (não fica “preso”/silencioso).
- Não aparece mais o erro “Should have a queue…” (ou, se aparecer, a dedupe do Vite elimina na próxima atualização).

Arquivos que pretendo alterar
- vite.config.ts (adicionar resolve.dedupe)
- src/pages/app/AppHome.tsx (garantir persistência antes de navegar + logs)
- src/pages/app/AppDay.tsx (melhorar fallback/diagnóstico quando isOnboarded = false)
- (se necessário) src/hooks/useJourneyCalendarProgress.ts (expor uma leitura “fresh” ou reforçar try/catch do storage)

Riscos/Trade-offs
- resolve.dedupe é uma mudança segura e comum; risco baixo.
- Logs temporários serão mantidos em nível debug/warn e podem ser removidos depois que estabilizar.

Depois que eu implementar
- Vou te pedir para testar novamente exatamente o fluxo: /app -> preencher -> entrar -> dia 1 -> concluir -> checar bloqueio -> config -> reiniciar.
