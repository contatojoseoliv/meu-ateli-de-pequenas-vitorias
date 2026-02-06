
Objetivo (estrutura da Home como você propôs)
- Header: Logo + ícone de menu (já está ok)
- Bloco 1: “Bem-vinda ao seu Ateliê, [Nome da Aluna]!”
- Bloco 2 (junto do bloco 1, no mesmo “retângulo”): “Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?” + progresso (percentual + fio)
- Seção: “Meus Dias” (cards dos dias)
- Seção: “Meus Materiais e Técnicas” (nova, na Home)
- Seção: “Meu Suporte” (já existe, só ajustar título)
- Rodapé (já existe)

O que já segue isso hoje
- Logo + Menu: AppShell + AppUserMenu já entregam essa parte.
- Progresso: já existe (Card com percent + YarnProgress + botão “Começar/Continuar…”).
- Meus Dias: já existe (grid de DayCard).
- Suporte + Rodapé: já existem (AppSupportSection + AppFooterMinimal).

Mudanças que vamos fazer (front-end)
1) Ajustar a cópia e hierarquia do primeiro card (boas-vindas + progresso)
   - Em `src/pages/app/AppHome.tsx`:
     - Trocar o título para: “Bem-vinda ao seu Ateliê, {profile.displayName}!”
     - Adicionar logo abaixo o texto: “Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?”
     - Manter a frase do percentual (“Você está na sua Primeira Vitória – X% concluída.”) como texto de apoio (ou substituir por uma versão mais curta, se você preferir; mas pela sua instrução, vamos manter o essencial do X% porque é o que dá feedback claro de avanço).
   - Resultado: o “quadrado de progresso geral” já fica trabalhando junto do texto, como você quer.

2) Padronizar títulos/seções para bater com sua divisão
   - Em `src/pages/app/AppHome.tsx`:
     - Renomear “Dias” para “Meus Dias”.
     - O título “Sua jornada” pode permanecer como título geral da página (h1) com o mesmo tamanho dos outros (text-xl font-bold), ou podemos remover o header e deixar o primeiro card “abrir” a Home (mais limpo). Pela sua lista (“Logo + Menu” e depois a frase de boas-vindas), a tendência é remover o “Sua jornada” e tratar a Home como “Ateliê”. Vou implementar assim:
       - Remover o `<header>` “Sua jornada” e começar direto pelo card de boas-vindas/progresso (fica exatamente na ordem que você listou).
     - Ajustar o título da seção suporte de “Suporte” para “Meu Suporte”.
     - Garantir que todos os títulos (“Meus Dias”, “Meus Materiais e Técnicas”, “Meu Suporte”) usem o mesmo padrão `text-xl font-bold`.

3) Criar a seção “Meus Materiais e Técnicas” na Home (sem criar página nova)
   - Criar um novo componente (para manter o AppHome limpo), por exemplo:
     - `src/components/app/AppMaterialsTechniquesSection.tsx` (nome sugerido)
   - Conteúdo pro “primeiro momento” (MVP útil e consistente com o que já existe):
     - Um Card “app-stitch” com:
       - Um texto curto explicando: “Aqui você encontra os materiais e técnicas essenciais. Você pode abrir direto no dia que estiver fazendo.”
       - Dois botões:
         - “Ver Materiais”
         - “Ver Técnicas”
     - Ambos levam a usuária para o dia atual (`progress.currentDay`) e já abrem a aba correta.
       - Exemplo de navegação:
         - `/app/dia/1?tab=materiais`
         - `/app/dia/1?tab=tecnicas`

4) Permitir abrir o AppDay já na aba Materiais/Técnicas via URL (query param)
   - Em `src/pages/app/AppDay.tsx`:
     - Ler `tab` via `useSearchParams()` (ex.: `tab=materiais|tecnicas|guiado|receita`).
     - Usar esse valor como `defaultValue` das Tabs.
     - (Opcional, mas recomendado) Quando a usuária clicar nas Tabs, atualizar o query param para manter o link compartilhável e consistente (ex.: ao clicar “Técnicas”, vira `?tab=tecnicas`).
   - Benefício: a seção “Meus Materiais e Técnicas” da Home fica funcional imediatamente, reaproveitando o conteúdo existente dos dias (sem inventar conteúdo novo agora).

5) Reordenar o menu para refletir essa organização
   - Em `src/components/app/AppUserMenu.tsx`:
     - Reordenar itens para: “Página inicial”, “Perfil”, “Materiais e Técnicas”, “Suporte”, “Selos & Conquistas”.
     - Como “Materiais e Técnicas” será uma seção dentro da Home (e não uma rota):
       - Opção A (mais simples e robusta): item aponta para `/app` e, ao entrar na Home, a usuária rola até a seção automaticamente.
         - Para isso, definimos um `id="materiais-tecnicas"` na seção e usamos `navigate("/app#materiais-tecnicas")`.
         - Em `AppHome`, adicionamos um `useEffect` que detecta `location.hash` e faz `document.getElementById(...).scrollIntoView({ behavior: "smooth" })`.
       - Vou seguir a Opção A, porque mantém a navegação clara e não cria rota nova.

Arquivos que provavelmente serão alterados/criados
- Alterar:
  - `src/pages/app/AppHome.tsx` (cópia, títulos, inserção da nova seção, ordem)
  - `src/pages/app/AppDay.tsx` (suporte a `?tab=` e opcionalmente sincronizar clique das tabs com query param)
  - `src/components/app/AppUserMenu.tsx` (reordenação + item “Materiais e Técnicas” navegando para âncora)
- Criar:
  - `src/components/app/AppMaterialsTechniquesSection.tsx` (nova seção, reaproveitando `app-stitch` e Botões existentes)

Critérios de aceite (para você validar visualmente)
- Home (/app):
  - Não aparece mais “Sua jornada” grandão no topo; a Home começa com o card de boas-vindas.
  - Texto exato: “Bem-vinda ao seu Ateliê, Ana!”
  - A linha: “Meu Progresso — Pronta para a sua Primeira Vitória em Amigurumi?” aparece junto do card de progresso.
  - Seções com títulos iguais (mesmo tamanho/peso): “Meus Dias”, “Meus Materiais e Técnicas”, “Meu Suporte”.
  - Botão do card principal:
    - Se nunca completou nada: “Começar”
    - Depois: “Continuar do Dia X”
- Navegação:
  - Menu reordenado como combinado.
  - Clicar “Materiais e Técnicas” no menu leva para a Home e rola até a seção.
  - Na seção “Meus Materiais e Técnicas”, os botões abrem o dia atual já na aba certa (Materiais ou Técnicas).

Riscos/atenções
- “defaultValue” das Tabs só vale na primeira renderização. Se a pessoa mudar o `?tab=` na mesma tela sem remount, pode não refletir.
  - Solução (já prevista no plano): controlar o valor das Tabs via estado derivado do `searchParams` (Tabs “controlled”), ou usar uma `key` no componente Tabs baseada no `tab` para forçar remount.
  - Vou implementar do jeito mais estável (controlled), para não dar comportamento “estranho”.

Próximo passo
- Com sua aprovação, eu implemento essa estrutura em 1 rodada e você valida no /app (desktop e mobile), clicando também nos botões de Materiais/Técnicas para confirmar que abre na aba certa.
