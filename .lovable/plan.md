
Objetivo
- Construir a “plataforma do passo a passo” (o app do produto) dentro do mesmo projeto, separada da Landing Page.
- Requisitos confirmados por você:
  - Acesso aberto (sem login)
  - Experiência principal: “Modo guiado” (o app conduz a pessoa, passo a passo)
  - Progressão: liberar por calendário
  - Coletar nome (para personalizar a experiência)

O que já existe hoje no projeto (estado atual)
- Páginas públicas:
  - `/` = Landing Page (vendas)
  - `/checkout` = página intermediária (atual: confirma email e volta para `/#oferta`)
  - `*` = NotFound
- Admin (já existe e pode continuar separado):
  - `/admin/login`, `/admin`, `/admin/leads`, `/admin/analytics`
- Banco/back-end (Lovable Cloud) já tem tabelas úteis para futuro (profiles, entitlements, journey_progress etc.), mas como o app será “aberto (sem login)”, o progresso e o nome serão salvos localmente no navegador (localStorage) para ficar simples e rápido.

Conteúdo base do produto (extraído do PDF)
- Jornada de 7 dias para criar um mini coelho amigurumi (chaveiro).
- Estrutura por dia (resumo do que vamos transformar em telas):
  - Dia 1 — anel mágico + ponto baixo (Volta 1 MR 6 pb; Volta 2 6 aum)
  - Dia 2 — aumentos para crescer a base (Volta 3 e 4)
  - Dia 3 — subir as paredes (Voltas 5 a 9: 24 pb)
  - Dia 4 — diminuição e fechar (Voltas 10–12 + enchimento)
  - Dia 5 — fechamento total + acabamento (Voltas 13–18 + arremate e fechar)
  - Dia 6 — orelhas, bracinhos e perninhas
  - Dia 7 — montagem, rosto e argola do chaveiro + “missão final”

Decisões de UX (como o app vai funcionar)
1) Fluxo principal (modo guiado)
- Primeira vez que a pessoa entra no app:
  1. Tela de boas-vindas + “Qual seu nome?”
  2. Definir “data de início” da jornada (por padrão: hoje) para habilitar “liberar por calendário”
  3. Entrar no “Dia de hoje”
- A partir daí:
  - O app sempre abre no “Dia disponível de hoje” (ou no próximo passo pendente).
  - Cada dia tem:
    - Objetivo simples (bem curto)
    - Tempo sugerido (10–15 min)
    - Passos em cards (bem guiados, uma coisa de cada vez)
    - Ajuda com “erros comuns” (quando existir)
    - Botão “Concluir o dia” (só habilitado quando o dia estiver disponível)
  - Ao concluir:
    - Marca o dia como concluído
    - Mostra “amanhã você faz o próximo” (se calendário travar) ou “ir para o próximo” (se já estiver liberado)

2) Regra “liberar por calendário”
- O dia N fica disponível se:
  - hoje >= dataInicio + (N-1) dias
- Mesmo se a pessoa concluir rápido, ela não “pula” dias futuros antes da data (isso é o que você pediu).
- Ainda assim, ela pode rever dias passados (reassistir/reler).

3) Dados locais (sem login)
- Vamos persistir no localStorage:
  - nome
  - data de início
  - dia atual (para navegação)
  - dias concluídos
  - (opcional) “anotações do aluno” por dia (pode ficar para fase 2)

Arquitetura de Rotas (o que vamos criar no front)
- Adicionar novas rotas no `App.tsx`:
  - `/app` → Home do app (decide: onboarding ou redireciona para dia atual)
  - `/app/dia/:day` → Tela do dia (1 a 7)
  - `/app/sobre` (opcional) → “como funciona / materiais / abreviações”
  - `/app/config` (opcional) → redefinir nome, reiniciar jornada, trocar data de início

Observação: não vamos mexer na Landing Page. O app fica em `/app/*` separado.

Componentes e estrutura (o que vamos implementar)
1) Conteúdo em arquivo próprio (para manter organizado)
- Criar um arquivo de conteúdo com a jornada (ex.: `src/content/journey.ts`), contendo:
  - title do dia
  - objetivo
  - duração
  - lista de passos (texto curto em sequência)
  - “problemas comuns” (quando existir)
  - “missão do dia” (checklist)
  - “amanhã” (mensagem motivacional)
- Esse conteúdo será baseado diretamente no PDF que você enviou (já extraímos os trechos principais acima).

2) Hook de progresso com calendário (core do app)
- Criar um hook (ex.: `useJourneyCalendarProgress`) responsável por:
  - Ler/escrever localStorage
  - Calcular “dia liberado hoje” conforme data de início
  - Informar estados por dia: locked | available | completed
  - Ações:
    - setName(name)
    - setStartDate(date)
    - markDayComplete(day)
    - resetJourney()

3) Layout do app (visual e navegação)
- Criar um layout diferente da Landing Page:
  - Topbar simples (nome do app + “Olá, {nome}”)
  - Botões: “Mapa dos 7 dias”, “Configurações”
  - Design calmo, premium, com Cinza Nuvem/papel como fundo (seguindo marca)

4) Tela “Mapa”
- Um componente “Mapa dos 7 dias” com:
  - 7 cards/etapas
  - estado visual:
    - Concluído (marcado)
    - Disponível (clicável)
    - Bloqueado (mostra “Disponível em dd/mm”)
  - Botão principal: “Continuar jornada” (leva pro dia correto)

5) Tela do Dia (modo guiado)
- Estrutura:
  - Cabeçalho: “Dia X — {título}”
  - Sub: objetivo + tempo estimado
  - Cards de passo-a-passo (comprogressivo: “Passo 1 de N”)
  - Bloco “Se travar, veja isso” (erros comuns)
  - Botão “Concluir o dia”
  - Ao concluir: modal/alert com mensagem do PDF (tom acolhedor)

Sequência de implementação (passo a passo)
1) Preparar base do app
- Criar novas páginas `/app` e `/app/dia/:day`
- Adicionar rotas no `App.tsx`
- Criar layout do app (header e container)

2) Criar o “motor” de progressão por calendário
- Implementar hook de progresso em localStorage (versãoada, ex.: `pv_journey_progress_v1`)
- Implementar cálculo de desbloqueio por data
- Implementar função “qual dia devo abrir agora”

3) Colocar conteúdo do PDF em estrutura de dados
- Criar `src/content/journey.ts` com 7 dias
- Manter texto com tom calmo e iniciante (sem jargão excessivo)
- Onde o PDF diz [IMAGEM SUGERIDA], vamos colocar “cards de placeholder” (e depois você troca por imagens reais)

4) Construir UI do “Mapa” + UI do “Dia”
- Mapa:
  - lista dos 7 dias com estados
  - CTA “Continuar”
- Dia:
  - passos em cards (next/back ou scroll guiado)
  - botão “Concluir o dia”
  - bloqueio se não liberado ainda

5) Polimento + salvaguardas
- Validar:
  - se day fora de 1..7 → NotFound
  - se não tem nome → mandar para onboarding
- Adicionar botão “reiniciar jornada” (config)
- Testes manuais em mobile/desktop

Critérios de aceite (para você aprovar)
- Ao acessar `/app` pela primeira vez: pede nome e define data de início.
- O app libera apenas o dia “permitido hoje” (calendário).
- Dia futuro aparece bloqueado com mensagem clara.
- “Concluir o dia” registra e marca como concluído.
- Visual simples, calmo e consistente com a marca.

Riscos / pontos de atenção
- Sem login: se a pessoa trocar de celular/navegador, perde o progresso (porque fica no localStorage). Isso é esperado nesta fase. Depois podemos adicionar login e sincronização no back-end.
- “Liberar por calendário” pode frustrar quem quer acelerar; por isso vamos manter “rever dias anteriores” sempre disponível.

O que eu preciso de você (para começar a implementar com precisão)
- Confirmação de UX final para o modo guiado (1 escolha):
  A) “Passo a passo com botão Próximo/Anterior” (mais guiado)
  B) “Passos em lista rolável + checkboxes” (mais simples)
- Confirmação da data de início:
  - Deve ser “automaticamente hoje” ou você quer que a pessoa escolha manualmente sempre?

Assim que você aprovar este plano, eu passo para a implementação criando as rotas `/app` e a primeira versão funcional do Dia 1 (e depois replico para os 7 dias).
