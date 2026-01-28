
Objetivo desta mudança (temporária)
- Remover a exigência de login apenas para o “app do produto” (`/app` e `/app/dia/:day`).
- Deixar o conteúdo do app aberto (sem compra) por enquanto.
- Manter a progressão (dias bloqueados/futuros) funcionando, salvando o progresso “no aparelho” (localStorage).
- Não mexer no admin (`/admin/*`) — continua com login como está.

Impacto (o que muda para a usuária)
- Ao abrir `/app`, ela entra direto no Mapa.
- Ao abrir `/app/dia/3`, ela só entra se o “dia atual” no aparelho permitir; caso contrário, continua bloqueado igual hoje.
- Ao clicar “Concluir o Dia”, desbloqueia o próximo e isso fica guardado naquele navegador/aparelho.
- Se a pessoa limpar dados do navegador ou trocar de aparelho, o progresso recomeça.

O que existe hoje (onde o login é exigido)
- `src/pages/app/AppMap.tsx`:
  - `if (!user) return <Navigate to="/app/login" replace />;`
  - usa `useEntitlement(user?.id)` e `useJourneyProgress(user?.id)`
- `src/pages/app/AppDay.tsx`:
  - mesmas verificações + bloqueio por `current_day`
- `src/components/app/AppLayout.tsx`:
  - usa `useAppAuth()` + `useProfile()` para saudação e botão “Sair”
- `src/pages/app/AppAccess.tsx`:
  - redireciona para `/app/login` se não houver usuário e gerencia solicitação manual (vai ficar “em espera”, mas não será usada no fluxo aberto)

Estratégia de implementação (sem login)
1) Criar um “modo visitante” para o app (frontend only)
- Implementar um hook novo (ex: `useLocalJourneyProgress`) ou adaptar o atual (`useJourneyProgress`) para:
  - quando não houver `userId`, ler e escrever progresso no `localStorage`
  - manter o mesmo formato:
    - `current_day` (1..7)
    - `completed_days` (array de números)
  - expor uma função `completeDay(day)` que:
    - adiciona day em `completed_days` (sem duplicar)
    - se day >= current_day, atualiza `current_day = min(7, day + 1)` (comportamento atual)
- Definir uma chave única de storage, por exemplo:
  - `pv_journey_progress_v1`
- Validar no carregamento:
  - se dados forem inválidos/corrompidos, resetar para padrão `{ current_day: 1, completed_days: [] }`

2) Remover a trava de login e entitlement do app do produto
- Em `AppMap.tsx`:
  - remover o `Navigate` para `/app/login`
  - parar de chamar `useAppAuth()` e `useEntitlement()`
  - usar somente o progresso local (hook novo/fallback)
- Em `AppDay.tsx`:
  - remover o `Navigate` para `/app/login`
  - remover `useEntitlement()`
  - usar somente o progresso local
  - manter a regra de bloqueio `safeDay > currentDay` com toast e redirect para `/app` (igual hoje)

3) Ajustar o layout do app para não depender de perfil/autenticação
- Em `AppLayout.tsx`:
  - remover dependência de `useAppAuth()` e `useProfile()`, porque não haverá usuário
  - trocar a saudação “Oi, {nome}” por algo neutro e acolhedor, por exemplo:
    - “Primeira Vitória em Amigurumi”
    - ou “Bem-vinda ao seu Ateliê”
  - remover o botão “Sair” (não faz sentido sem login)
  - manter “Voltar ao site”

4) Decidir o que fazer com as rotas /app/login, /app/cadastro, /app/acesso (mantidas, mas fora do fluxo)
Como você pediu “por enquanto”, a abordagem mais segura é:
- Manter essas páginas existindo (para não quebrar links antigos e para reativar login depois sem retrabalho).
- Opcional (recomendado) adicionar um aviso simples nessas páginas:
  - “Neste momento, o app está aberto e não precisa de login.”
  - com botão “Ir para o app”
- Opcional: fazer `/app/login` redirecionar automaticamente para `/app` (para reduzir fricção), mas isso pode confundir se você quiser reativar login logo; então:
  - sugestão: redirecionar apenas se um `VITE_APP_OPEN_ACCESS=true` (feature flag simples) ou se criarmos uma constante no código.

5) Garantir que o admin continue protegido
- Não alterar nada em `/admin/*`.
- Não mexer em `useAdminAuth` nem no layout admin.

6) Testes necessários (critério de pronto)
- Acessar `/app` em aba anônima:
  - deve abrir o mapa sem pedir login
- Clicar Dia 1 → concluir → voltar ao mapa:
  - Dia 1 marcado como concluído
  - Dia 2 disponível
- Tentar acessar `/app/dia/7` sem ter concluído os anteriores:
  - deve bloquear e voltar para `/app` com toast
- Recarregar a página:
  - progresso deve permanecer (localStorage)
- Testar no mobile (largura pequena):
  - mapa e tela do dia continuam legíveis e botões clicáveis

Riscos/limitações desta decisão (para você estar ciente)
- Qualquer pessoa terá acesso ao conteúdo (inclusive compartilhando o link).
- Progresso fica preso ao navegador/aparelho; se limpar cache, perde.
- A estrutura de entitlement/liberação manual fica “ociosa” até você reativar login (mas não será removida, só não usada).

Plano de execução (passos práticos de código)
1. Ler os arquivos atuais de progresso/auth para reaproveitar o máximo possível:
   - `src/hooks/useJourneyProgress.ts`
   - `src/hooks/useAppAuth.ts`
2. Implementar o fallback/local hook de progresso:
   - opção A: novo arquivo `src/hooks/useLocalJourneyProgress.ts`
   - opção B (preferida): ajustar `useJourneyProgress` para:
     - se `userId` existir, usar backend (como hoje)
     - se não existir, usar localStorage
3. Atualizar:
   - `src/pages/app/AppMap.tsx` para usar progresso local e remover login/entitlement guard
   - `src/pages/app/AppDay.tsx` para usar progresso local e remover login/entitlement guard
4. Atualizar `src/components/app/AppLayout.tsx` para ficar “guest-friendly” (sem perfil/sem sair)
5. (Opcional) Ajustar `AppLogin/AppSignup/AppAccess` para ter CTA “Ir para o app” e evitar confusão
6. Rodar um teste manual end-to-end do fluxo do app + confirmar admin intacto

Como vamos reativar login depois (sem retrabalho)
- Ao reativar, basta:
  - recolocar guards de `user` + `entitlement` em AppMap/AppDay (ou criar um AppGuard wrapper)
  - trocar o hook para usar backend novamente
  - (opcional) oferecer “migrar progresso local para conta” no primeiro login (podemos planejar depois)

