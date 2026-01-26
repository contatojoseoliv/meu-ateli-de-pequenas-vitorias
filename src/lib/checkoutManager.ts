 import { supabase } from "@/integrations/supabase/client";
 
 /**
  * Gerenciador de checkout (preparação para integração futura)
  */
 export async function initiateCheckout(email: string, source: string) {
   // 1. Salvar estado de lead capturado
   localStorage.setItem('lead_captured', 'true');
   localStorage.setItem('lead_email', email);
 
   // 2. Trackear evento de checkout iniciado
   const sessionId = localStorage.getItem('session_id') || '';
   try {
     await supabase.from('page_analytics').insert({
       session_id: sessionId,
       event_type: 'checkout_initiated',
       section: source,
       metadata: { email },
     });
   } catch (error) {
     console.error('Error tracking checkout:', error);
   }
 
   // 3. Por enquanto: scroll suave até oferta
   // Quando decidir gateway, substituir por:
   // - Hotmart: window.location.href = `https://pay.hotmart.com/XXXX?email=${encodeURIComponent(email)}`
   // - Kiwify: window.location.href = `https://pay.kiwify.com.br/XXXX?email=${encodeURIComponent(email)}`
   // - Stripe: chamar Edge Function para criar sessão
   
   document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
 }
 
 /**
  * Helper para checar se lead já foi capturado
  */
 export function isLeadCaptured(): boolean {
   return localStorage.getItem('lead_captured') === 'true';
 }
 
 /**
  * Helper para obter email do lead
  */
 export function getLeadEmail(): string | null {
   return localStorage.getItem('lead_email');
 }