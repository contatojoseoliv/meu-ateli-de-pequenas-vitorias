
Objetivo
- Construir o “app” do produto como uma jornada guiada de 7 dias (não biblioteca), mantendo a landing page atual em `/` para vendas.
- Acesso ao app deve ser protegido por login e liberado manualmente após compra (MVP), com progressão salva no backend.
- Conteúdo textual inicial deve vir do PDF “Esboço do Produto” (e imagens podem começar como placeholders).

O que existe hoje (estado do projeto)
- Rotas atuais:
  - `/` = Landing Page (vendas)
  - `/checkout` = placeholder de transição (tracking e email)
  - `/admin/*` = páginas administrativas (login + analytics/leads)
  - `*` = NotFound
- Backend já existe com tabelas: `leads`, `page_analytics`, `conversions`, `user_roles` (com função `has_role`).
- Já existe autenticação para admin (`useAdminAuth`), mas ainda não existe autenticação para alunas nem estrutura de progresso do app.

Decisões já confirmadas (suas respostas)
- Manter a landing page: Sim (fica em `/`)
- App com login + acesso liberado por compra: Sim
- Liberação por compra (MVP): Manual
- Ter perfil do usuário (nome): Sim
- Conteúdo dos dias: usar texto do PDF agora

Arquitetura proposta (alto nível)
- “Site de vendas” continua em `/`.
- “App do produto” entra em um novo namespace de rotas: `/app`.
- Autenticação do app (alunas) + progressão ficam isoladas do admin.
- Liberação manual via fluxo “Solicitação de acesso” (usuária logada solicita, admin aprova).

1) Lista de telas (screens) do app (novas rotas)
1. `/app` — Mapa da Jornada (home do app)
   - Mostra os 7 dias em trilha/ caminho conectado
   - Estados por dia: Bloqueado / Ativo / Concluído
   - CTA principal: “Continuar do Dia X”
2. `/app/dia/:day` — Tela do Dia (módulo guiado)
   - Título do dia + objetivo simples
   - Passo a passo em cards (com micro-mensagem)
   - Seção “Erros comuns” (safety)
   - Botão “Concluir o Dia” (dourado/ocre) para desbloquear próximo
3. `/app/login` — Login
4. `/app/cadastro` — Cadastro
5. `/app/acesso` — Aguardando liberação (gate)
   - Explica “Seu acesso ainda não foi liberado”
   - Form de “Solicitar liberação” (email de compra + nota opcional)
   - Estado: Pendente / Aprovado
6. (Opcional, mas recomendado) `/app/boas-vindas` — Boas-vindas pós-cadastro
   - Captura nome (perfil) se ainda não tiver
   - Tom acolhedor e instrução de como seguir

2) Componentes reutilizáveis (UI kit do app)
Reutilizaremos o design system existente (Tailwind + tokens) e criaremos componentes específicos do app:

A. Jornada / Mapa
- JourneyMap (container do mapa)
- PhaseNode (um “nó” do caminho)
  - props: day, title, state (locked|active|completed), onOpen
- LockedPhaseOverlay (cadeado + texto curto “Disponível amanhã / após concluir o Dia X”)
- CompletedPhaseBadge (“Primeira Vitória”, com destaque ocre apenas no momento de vitória)

B. Dentro do Dia
- ProgressIndicator (Dia X de 7 + barra)
- DayHeader (título + objetivo)
- StepCard
  - Step title
  - Instrução curta
  - ImageBlock (placeholder por enquanto)
  - Micro-mensagem de acolhimento (ex: “Vai devagar. Está tudo bem.”)
- CalmNote (“Respire” / “Pausa curta”)
- MistakeAlertBox (erros comuns)
- CompletionFooter (botão “Concluir o Dia”)

C. Infra / Layout
- AppShell / AppLayout (topbar simples + área de conteúdo)
- AppGuard (proteção de rota: exige login + exige acesso liberado)
- Toast feedback (já existe sonner/shadcn)

3) Lógica de navegação e estados (regras do produto)
Regras obrigatórias (seguindo seu prompt)
- Usuária não pode abrir dias futuros.
- Apenas o dia atual fica “ativo”.
- Dias completados mostram “vitória”.
- Concluir o dia desbloqueia o próximo automaticamente.

Estados por dia (derivados do progresso)
- completed: dia <= último_concluído
- active: dia = dia_atual
- locked: dia > dia_atual

Regras de rota
- Se usuária tenta ir para `/app/dia/5` mas `dia_atual=3`:
  - Redireciona para `/app` e mostra toast: “Esse dia ainda está bloqueado. Conclua o Dia 3 primeiro.”
- Após clicar “Concluir o Dia”:
  - Marca dia como concluído no backend
  - Incrementa `dia_atual` (até 7)
  - Navega para `/app` (mapa) com feedback “Dia concluído. Próximo desbloqueado.”

4) Backend necessário (novas tabelas + RLS) — para login, perfil, acesso e progresso
Precisaremos adicionar estrutura para:
- Perfil (nome)
- “Entitlement”/acesso liberado (manual)
- Progresso da jornada (persistente)

Tabelas propostas

4.1 `profiles`
- id (uuid, PK) = user_id (referência ao usuário autenticado)
- display_name (text, nullable=false depois de onboarding; inicialmente pode ser nullable)
- created_at (timestamptz default now())

Trigger
- Ao criar conta, cria linha em `profiles` automaticamente (display_name null).

RLS
- SELECT/UPDATE: apenas a própria usuária (auth.uid() = id)
- INSERT: via trigger (ou permitir insert apenas quando auth.uid() = id)

4.2 `access_requests` (solicitação de liberação manual)
- id (uuid pk)
- user_id (uuid, not null)
- purchase_email (text, not null) — email usado na compra
- note (text, null) — opcional
- status (text: 'pending'|'approved'|'rejected', default 'pending')
- created_at (timestamptz default now())
- reviewed_at (timestamptz null)

RLS
- Usuária:
  - INSERT: pode criar a própria solicitação (user_id = auth.uid())
  - SELECT: pode ver apenas as próprias solicitações
- Admin:
  - SELECT/UPDATE: admins podem ver e aprovar/reprovar (usando `has_role(auth.uid(),'admin')`)

4.3 `entitlements` (acesso liberado)
- user_id (uuid pk)
- product_code (text, default 'primeira-vitoria-amigurumi')
- status (text: 'active'|'revoked', default 'active')
- granted_at (timestamptz default now())
- granted_by (uuid null) — quem aprovou (admin id)
- note (text null)

RLS
- Usuária:
  - SELECT: só a própria linha
- Admin:
  - SELECT/INSERT/UPDATE: admins podem gerenciar

4.4 `journey_progress`
- user_id (uuid pk)
- current_day (smallint, default 1)
- completed_days (smallint[] default '{}')
- updated_at (timestamptz default now())

RLS
- Usuária:
  - SELECT: apenas own
  - INSERT: apenas own (na primeira vez)
  - UPDATE: apenas own (para concluir o dia)
- Admin:
  - SELECT: admins (opcional, para suporte)

Observação importante (segurança / integridade)
- Vamos validar no backend (via RLS + constraints simples) que:
  - current_day fica entre 1 e 7
  - completed_days não contém valores fora de 1..7
  - A lógica “não pular dia” será reforçada no frontend e também numa função/trigger de validação se necessário.
  - Evitar CHECK dependente de now(); para validações mais complexas, usar trigger (mas aqui provavelmente não precisa).

5) Autenticação para alunas (frontend)
- Criar páginas:
  - `/app/login` (email + senha)
  - `/app/cadastro` (email + senha + nome opcional ou nome no onboarding)
- Após login:
  - Verificar se existe `entitlements.status='active'`
    - Se não: enviar para `/app/acesso`
    - Se sim: enviar para `/app`
- Configurar para cadastro ter confirmação automática (para não travar a experiência) conforme boas práticas do projeto.

6) Conteúdo pedagógico (usar texto do PDF agora)
Estratégia de conteúdo (MVP com base no PDF)
- Criar um arquivo de conteúdo em código (ex: `src/content/journey.ts`) contendo:
  - days[1..7]:
    - title
    - objective (1 frase)
    - steps[]:
      - stepTitle
      - instructionShort
      - microMessage
      - imagePlaceholderAlt
    - mistakes[] (lista curta)
    - calmNotes[] (opcional)
- Fonte: “Esboço_do_Produto.pdf”
  - Vamos extrair trechos relevantes e adaptar para “passos curtos” (sem linguagem técnica).
  - Onde o PDF não detalhar o passo-a-passo técnico de crochê, vamos manter placeholders claros para você completar depois:
    - “(Inserir instrução do ponto aqui)”
    - “Imagem: (foto do ponto)”
  - Importante: manter o tom acolhedor do PDF, mas estruturar em micro-unidades.

7) Design e direção visual (conforme Manual da Marca)
Regras que vamos seguir na implementação do app
- Layout com bastante respiro, cantos arredondados, sensação artesanal premium.
- Verde eucalipto como primário, rosa argila para calor/acolhimento.
- Ocre dourado exclusivamente para CTA de conclusão/vitória (ex: botão “Concluir o Dia”, badge de vitória).
- Evitar visual infantil; manter kawaii suave (fofo, mas adulto).
- Reaproveitar tokens já presentes em `src/index.css`.

8) Integração com o que já existe (sem quebrar a landing)
- Manter `/` intacto.
- Manter `/checkout` por enquanto (pode continuar capturando lead / transição).
- Manter `/admin/*` para você aprovar acesso (vamos acrescentar uma área simples de “Aprovar acesso” dentro do admin).
  - Alternativa: criar uma nova página `/admin/acessos` para aprovações (melhor organizado).

9) Fluxo de liberação manual (MVP) — como vai funcionar
Fluxo do usuário (aluna)
1. Compra fora do app (manual por enquanto).
2. Entra no `/app/cadastro`, cria conta.
3. Vai para `/app/acesso` automaticamente (sem entitlement).
4. Preenche “email de compra” e envia solicitação.
5. Ao ser aprovada, ao recarregar/voltar, o AppGuard libera `/app`.

Fluxo do admin (você)
1. Entra em `/admin/login`.
2. Abre a tela “Acessos”.
3. Vê lista de `access_requests` pendentes.
4. Clica “Aprovar”:
   - Atualiza request para `approved`
   - Cria/atualiza `entitlements` para o user_id

Importante: isso não exige procurar usuária por email no sistema; o vínculo é pelo user_id da solicitação.

10) Sequência de implementação (ordem de trabalho)
Fase 1 — Base do app (navegação + layout)
1. Adicionar rotas `/app/*` no router e criar AppLayout.
2. Criar guard de autenticação (login obrigatório) e guard de entitlement (acesso liberado).
3. Criar páginas login/cadastro/acesso.

Fase 2 — Banco de dados e segurança
4. Criar migração com tabelas: profiles, access_requests, entitlements, journey_progress + triggers + RLS.
5. Ajustar auth para auto-confirm signup (conforme padrão do projeto).

Fase 3 — Experiência principal (mapa + dia)
6. Implementar `/app` (Mapa da Jornada) com estados e CTA “Continuar”.
7. Implementar `/app/dia/:day` com:
   - ProgressIndicator
   - StepCards
   - Mistakes
   - Concluir o dia
8. Persistir progresso no backend e refletir UI.

Fase 4 — Admin para aprovar acesso (MVP)
9. Criar `/admin/acessos` (ou seção no AdminDashboard) para aprovar requests.
10. Testar o fluxo completo: cadastrar → solicitar → aprovar → acessar → concluir dia.

Fase 5 — Conteúdo do PDF
11. Estruturar o conteúdo inicial (texto do PDF) em `src/content`.
12. Revisar linguagem para ficar curta, guiada e acolhedora.

11) Critérios de aceite (como saber que está pronto)
- Usuária não logada não acessa `/app`.
- Usuária logada sem entitlement cai em `/app/acesso`.
- Admin aprova e imediatamente a usuária passa a acessar o app.
- Mapa mostra 7 dias com estados corretos.
- Usuária só abre o dia atual e anteriores.
- Concluir Dia 1 desbloqueia Dia 2 (e assim por diante).
- Ocre aparece apenas em botões/“vitórias”.
- Funciona bem no celular (principal prioridade).

12) Riscos e cuidados
- Garantir que não vamos misturar autenticação de admin com autenticação de alunas na UI (rotas separadas).
- Não expor dados sensíveis (RLS bem definido).
- Evitar depender de localStorage para progressão (progresso deve ficar no backend).
- Conteúdo técnico de crochê pode exigir que você forneça imagens reais depois; começaremos com placeholders bem marcados.

Entregáveis após sua aprovação deste plano (o que eu vou efetivamente construir na próxima etapa)
- Rotas novas `/app/*` + telas (login/cadastro/acesso/mapa/dia)
- Componentes reutilizáveis (mapa, step card, mistakes box, progress)
- Estrutura de banco e políticas para perfil, acesso e progresso
- Mini painel admin para aprovar solicitações
- Conteúdo inicial dos dias baseado no PDF (texto), com placeholders de imagens

