
## Plano: migrar as 10 etapas para interface de vídeo

### Decisões confirmadas
- **Hospedagem**: upload direto no Lovable Cloud Storage (Supabase Storage)
- **Conclusão**: manual, botão "Concluir etapa" só habilita após 90% assistido
- **Vídeo único** por etapa (sem capítulos)
- **Auxiliar**: apenas resumo/descrição abaixo do player

### 1. Backend (Lovable Cloud Storage)
- Criar bucket público `lesson-videos` via migração SQL.
- Políticas RLS:
  - `select` público (vídeos visíveis para alunas autenticadas ou não — mantém simples).
  - `insert/update/delete` apenas para usuários com role `admin` (usar `has_role` já existente no projeto).
- Criar tabela `lesson_videos` (`stage_key text primary key, video_path text, poster_path text, summary text, updated_at`) para mapear cada uma das 10 etapas a um arquivo do bucket. RLS: select público, mutations só admin.
- `stage_key` segue convenção: `intro-0`, `intro-1`, `intro-2`, `day-1`...`day-7`.

### 2. Componentes novos
- `src/components/app/VideoPlayer.tsx` — wrapper sobre `<video>` HTML5:
  - aspect-ratio 16:9 (`AspectRatio` do shadcn)
  - controles nativos + poster
  - evento `onTimeUpdate` calcula `% assistido = currentTime / duration`
  - persiste posição em `localStorage` (`pv_video_pos_{stageKey}`) e retoma ao montar
  - expõe callback `onProgress(percent)` e `onReady`
- `src/components/app/VideoLessonLayout.tsx` — substitui `IntroPageLayout` para etapas com vídeo:
  - AppShell + header com título da etapa
  - Player no topo (sticky no mobile)
  - Barra "X% assistido" abaixo do player (cor de fundo + cor primária preenchida)
  - Resumo/descrição em card abaixo
  - Botão **"Concluir etapa ✓"** desabilitado até `watchedPercent >= 90`; tooltip informa quanto falta
  - Após concluir: render `completionActions` (mesmo padrão atual)
  - Suporte a "etapa bloqueada" idêntico ao layout atual

### 3. Hook novo
- `src/hooks/useLessonVideo.ts` — busca `lesson_videos` por `stage_key` no Supabase, devolve `{ videoUrl, posterUrl, summary, loading }` usando `supabase.storage.from('lesson-videos').getPublicUrl(path)`.

### 4. Atualizar páginas das 10 etapas
- `AppIntro.tsx`, `AppMateriais.tsx`, `AppFundamentos.tsx`, `AppDay.tsx`: trocar `IntroPageLayout` por `VideoLessonLayout`, passando `stageKey` correspondente.
- Manter `useIntroProgress` / `useDayContentProgress` / `useJourneyProgress` — mas agora `completeCard`/`completeDay` é disparado pelo botão manual após 90%.
- Remover dependência de `topics`/`stepIds` para o cálculo de progresso da etapa nessas páginas.

### 5. Ajustar Home (`AppHome.tsx`)
- `stagePercent` da etapa atual passa a refletir `watchedPercent` salvo no `localStorage` (`pv_video_pct_{stageKey}`) em vez de tópicos lidos. Fallback 0 se sem dado.
- Lógica de desbloqueio sequencial e contagem de 10 etapas permanece intacta.

### 6. Admin (mínimo viável para subir vídeos)
- Nova página `src/pages/admin/AdminVideos.tsx` listando as 10 etapas com:
  - input file (vídeo .mp4) + input file (poster .jpg/png opcional) + textarea resumo
  - upload via `supabase.storage.from('lesson-videos').upload(...)` e upsert em `lesson_videos`
  - prévia do vídeo atual
- Adicionar item "Vídeos das aulas" no `AdminLayout` sidebar e rota em `App.tsx` protegida por `useAdminAuth`.

### 7. Limpeza
- Manter `IntroPageLayout` e hooks antigos (não remover) — ainda usados internamente para `getStepRead`/`markStepRead` caso queira reverter; mas as 4 páginas de etapa não chamam mais.
- Adicionar `pv_video_pos_*` e `pv_video_pct_*` ao reset do perfil se houver função de "resetar progresso".

### 8. Estados de borda
- Etapa sem vídeo cadastrado: mostrar placeholder "Em breve — aguarde a publicação desta aula" e desabilitar conclusão.
- Vídeo grande: usar streaming nativo do Storage (HTTP range requests já suportado).
- Limite Storage: avisar admin no painel se arquivo > 50MB (sugerir compressão), mas não bloquear.

### Arquivos a criar
- `supabase/migrations/<ts>_lesson_videos.sql`
- `src/components/app/VideoPlayer.tsx`
- `src/components/app/VideoLessonLayout.tsx`
- `src/hooks/useLessonVideo.ts`
- `src/pages/admin/AdminVideos.tsx`

### Arquivos a editar
- `src/pages/app/AppIntro.tsx`, `AppMateriais.tsx`, `AppFundamentos.tsx`, `AppDay.tsx`
- `src/pages/app/AppHome.tsx` (cálculo de `stagePercent`)
- `src/components/admin/AdminLayout.tsx` (item de menu)
- `src/App.tsx` (rota admin)
