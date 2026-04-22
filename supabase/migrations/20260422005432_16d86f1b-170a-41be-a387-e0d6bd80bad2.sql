-- Tabela de comentários por aula com suporte a respostas (1 nível)
CREATE TABLE public.lesson_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_key text NOT NULL,
  user_id uuid NOT NULL,
  parent_id uuid REFERENCES public.lesson_comments(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (length(trim(content)) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_lesson_comments_stage ON public.lesson_comments(stage_key, created_at DESC);
CREATE INDEX idx_lesson_comments_parent ON public.lesson_comments(parent_id);

ALTER TABLE public.lesson_comments ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa autenticada pode ver os comentários
CREATE POLICY "Lesson comments: authenticated can view"
ON public.lesson_comments FOR SELECT
TO authenticated
USING (true);

-- Usuário cria seus próprios comentários
CREATE POLICY "Lesson comments: users insert own"
ON public.lesson_comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Usuário edita os próprios; admin pode editar todos
CREATE POLICY "Lesson comments: users update own"
ON public.lesson_comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Usuário deleta os próprios; admin pode deletar todos
CREATE POLICY "Lesson comments: users delete own"
ON public.lesson_comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger updated_at
CREATE TRIGGER set_lesson_comments_updated_at
BEFORE UPDATE ON public.lesson_comments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Adicionar avatar_url em profiles para foto nos comentários
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

-- Permitir que todos autenticados vejam perfis (necessário para mostrar nome/foto nos comentários)
DROP POLICY IF EXISTS "Profiles: authenticated can view all" ON public.profiles;
CREATE POLICY "Profiles: authenticated can view all"
ON public.profiles FOR SELECT
TO authenticated
USING (true);