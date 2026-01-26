-- =====================================================
-- TABELA: leads
-- Armazena emails capturados com origem do CTA
-- =====================================================
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  nome text,
  source text NOT NULL, -- 'cta-hero', 'cta-final', 'cta-oferta', 'exit-intent', 'sticky-mobile'
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert leads (public form submission)
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- TABELA: page_analytics
-- Rastreia comportamento do usuário na página
-- =====================================================
CREATE TABLE public.page_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL, -- 'page_view', 'scroll_25', 'scroll_50', 'scroll_75', 'scroll_100', 'cta_click', 'section_view', 'exit_intent', 'checkout_initiated'
  section text, -- 'hero', 'lead', 'problema', 'solucao', 'prova', 'bullets', 'oferta', 'garantia', 'faq', 'fechamento'
  timestamp timestamp with time zone DEFAULT now(),
  metadata jsonb -- dados extras (ex: tempo na seção, user_agent, referrer, button_text)
);

-- Enable Row Level Security
ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert analytics events (public tracking)
CREATE POLICY "Anyone can insert analytics"
  ON public.page_analytics
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- TABELA: conversions
-- Preparada para futura integração de pagamento
-- =====================================================
CREATE TABLE public.conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  amount numeric(10, 2), -- valor da compra em BRL
  payment_status text, -- 'pending', 'completed', 'failed'
  payment_method text, -- 'credit_card', 'pix', 'boleto'
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view conversions (admin access)
CREATE POLICY "Only authenticated can view conversions"
  ON public.conversions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- =====================================================
-- ÍNDICES para Performance
-- =====================================================
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_analytics_session ON public.page_analytics(session_id);
CREATE INDEX idx_analytics_event_type ON public.page_analytics(event_type);
CREATE INDEX idx_analytics_timestamp ON public.page_analytics(timestamp DESC);
CREATE INDEX idx_conversions_email ON public.conversions(email);
CREATE INDEX idx_conversions_created_at ON public.conversions(created_at DESC);