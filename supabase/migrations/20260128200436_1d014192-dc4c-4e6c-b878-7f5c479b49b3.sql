-- Fix linter: replace overly-permissive INSERT policies (WITH CHECK true)

-- LEADS
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (
  email IS NOT NULL
  AND length(trim(email)) BETWEEN 5 AND 255
  AND position('@' in email) > 1
  AND source IS NOT NULL
  AND length(trim(source)) BETWEEN 1 AND 80
  AND (nome IS NULL OR length(trim(nome)) <= 120)
);

-- PAGE ANALYTICS
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.page_analytics;
CREATE POLICY "Anyone can insert analytics"
ON public.page_analytics
FOR INSERT
WITH CHECK (
  event_type IS NOT NULL
  AND length(trim(event_type)) BETWEEN 3 AND 80
  AND session_id IS NOT NULL
  AND length(trim(session_id)) BETWEEN 8 AND 120
  AND (section IS NULL OR length(trim(section)) <= 80)
);
