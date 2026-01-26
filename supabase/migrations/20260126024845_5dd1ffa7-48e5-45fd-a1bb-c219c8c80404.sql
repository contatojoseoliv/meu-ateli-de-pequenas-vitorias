-- Enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabela de roles (separada por segurança)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: usuários podem ver suas próprias roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Função security definer para checar role (evita recursão RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Permitir SELECT em leads apenas para admins
CREATE POLICY "Admins can view leads"
  ON public.leads
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Permitir SELECT em page_analytics apenas para admins
CREATE POLICY "Admins can view analytics"
  ON public.page_analytics
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Permitir SELECT em conversions para admins também
CREATE POLICY "Admins can view all conversions"
  ON public.conversions
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Indexes para performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_page_analytics_timestamp ON public.page_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_analytics_session_event ON public.page_analytics(session_id, event_type);