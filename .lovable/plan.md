
Objetivo
- No cabeçalho do app (/app e /app/dia/:day), colocar:
  - Logo à esquerda (usar a “logo enviada” do upload).
  - À direita, um menu acionado por um avatar (rosto/ícone) com as opções:
    - Home
    - Perfil
    - Suporte / Fale Conosco
    - Selos & Conquistas

O que eu encontrei no projeto (contexto rápido)
- O “app do produto” usa o componente `src/components/app/AppShell.tsx` para o topo (topbar).
- Hoje o `AppShell` tem: botão Voltar à esquerda + título central + espaço vazio à direita.
- Rotas existentes em `src/App.tsx`: `/app` e `/app/dia/:day` (não há Perfil/Suporte/Selos ainda).
- Já existem componentes prontos para:
  - Dropdown: `src/components/ui/dropdown-menu.tsx` (Radix) com fundo `bg-popover` e z-index alto.
  - Avatar: `src/components/ui/avatar.tsx`.

Decisões já alinhadas (com suas respostas)
- Logo do App: usar a imagem enviada (upload).
- Avatar: padrão (sem puxar de conta por enquanto).
- Suporte: botões WhatsApp/E-mail (com placeholders).

Plano de implementação (passo a passo)
1) Adicionar a logo enviada ao projeto
- Copiar a imagem do upload para `src/assets/` (por exemplo: `src/assets/app-logo.png`).
- A logo será importada no cabeçalho do app como módulo (melhor para bundling).

2) Criar um “perfil local” simples (sem backend) para o Avatar
- Criar um pequeno util/hook para ler/gravar no `localStorage`:
  - chave sugerida: `pv_app_profile_v1`
  - campos: `displayName` (ex.: “Ana”), opcional `avatarColorSeed` (para gerar cor de fundo consistente), e derivados (iniciais).
- Comportamento:
  - Se não houver nome salvo: fallback “Aluna” e iniciais “A”.
  - O avatar do topo usa iniciais em vez de foto.

3) Criar o componente do menu do usuário (Avatar + Dropdown)
- Criar `src/components/app/AppUserMenu.tsx` (novo):
  - Trigger: botão circular com `Avatar` (iniciais) e um chevron discreto (opcional).
  - Menu (`DropdownMenuContent`) alinhado à direita (`align="end"`) com itens:
    - Home → `/app`
    - Perfil → `/app/perfil`
    - Suporte/Fale Conosco → `/app/suporte`
    - Selos & Conquistas → `/app/selos`
  - Itens com ícones (lucide): `Home`, `User`, `Headset` (ou `MessageCircle`), `Award`.
  - Acessibilidade:
    - `aria-label` no botão do avatar.
    - foco visível, navegação por teclado funcionando (Radix já ajuda bastante).

4) Refatorar o `AppShell` para o novo cabeçalho
- Atualizar `src/components/app/AppShell.tsx` para:
  - Esquerda: Logo (link para `/app`).
  - Centro: manter o `title` opcional (ex.: em `/app/dia/:day` mostrar “Dia X” ou o título atual).
  - Direita: `AppUserMenu`.
- Preservar o “voltar” sem quebrar o pedido “logo na esquerda”:
  - Em telas que precisam de “voltar” (ex.: AppDay), transformar o back em um ícone pequeno (ArrowLeft) antes da logo (não como bloco principal).
  - Em `/app` (Home), normalmente esconder o back (ou deixar opcional via prop).
- Ajustar o layout para caber bem no mobile:
  - Logo com altura controlada (ex.: `h-8 md:h-10`) e `object-contain`.
  - Centro com `truncate` para não estourar.

5) Criar as novas páginas do menu (rotas)
- Criar novos arquivos:
  - `src/pages/app/AppProfile.tsx`
  - `src/pages/app/AppSupport.tsx`
  - `src/pages/app/AppBadges.tsx`
- Implementação inicial (simples e coerente com o estilo “Ateliê”):
  - Todas usando `<AppShell ...>` e cards com `app-stitch`.
  - Perfil:
    - Campo para “Nome / como prefere ser chamada” (salva no localStorage).
    - Mostra prévia do avatar com iniciais.
  - Suporte:
    - Botões:
      - WhatsApp (placeholder): link `https://wa.me/55SEUNUMERO` ou `https://wa.me/` com instrução.
      - E-mail (placeholder): `mailto:suporte@seusite.com`
    - Textinho explicando horários/retorno (opcional).
  - Selos & Conquistas:
    - Primeira versão pode ser “em construção” + um card mostrando conquistas atuais derivadas do progresso local:
      - Ex.: “Dias concluídos: X/7”
      - Ex.: “Primeira vitória” quando conclui ao menos 1 dia
    - (Sem banco de dados por enquanto; só usando `useJourneyProgress`.)

6) Registrar as rotas no roteador principal
- Atualizar `src/App.tsx` para incluir:
  - `/app/perfil` → `AppProfile`
  - `/app/suporte` → `AppSupport`
  - `/app/selos` → `AppBadges`
- Manter a rota `*` no final.

7) Estilos (CSS) para ficar com aparência “artesanal” e não transparente
- Atualizar `src/styles/app-product.css` com classes específicas para o cabeçalho do app:
  - `.app-header-logo` (tamanho/encaixe)
  - `.app-avatar-trigger` (borda, hover suave, foco)
- Garantir que o dropdown fique sólido:
  - O `DropdownMenuContent` já usa `bg-popover` + `border` + `shadow`; vamos apenas validar contraste no dark mode.

8) Checklist de testes (manual)
- Navegação:
  - Em `/app`, clicar no avatar → abrir menu → ir para Perfil/Suporte/Selos → voltar para Home.
- Responsivo:
  - Mobile: logo não “empurra” o avatar para fora; título central não quebra layout.
- Acessibilidade:
  - Tab/Shift+Tab chega no avatar; Enter/Espaço abre menu; setas navegam itens; Esc fecha.
- Persistência local:
  - Alterar nome no Perfil → recarregar → avatar mantém iniciais atualizadas.

Arquivos que serão alterados/criados
- Criar:
  - `src/assets/app-logo.(png)` (cópia do upload)
  - `src/components/app/AppUserMenu.tsx`
  - `src/pages/app/AppProfile.tsx`
  - `src/pages/app/AppSupport.tsx`
  - `src/pages/app/AppBadges.tsx`
  - (opcional) `src/hooks/useAppProfile.ts` ou `src/lib/appProfile.ts` para localStorage
- Editar:
  - `src/components/app/AppShell.tsx` (novo layout do header)
  - `src/App.tsx` (novas rotas)
  - `src/styles/app-product.css` (classes do header/avatar)

Observações / próximos incrementos (não entram agora, mas já ficam prontos para evoluir)
- Mais tarde, se você quiser “rosto de verdade” (foto):
  - A gente pode permitir upload no Perfil e salvar no backend (armazenamento + tabela de perfil).
- “Selos & Conquistas” pode virar uma área rica com badges, animações e histórico de vitórias (hoje vamos começar simples com base no progresso local).
