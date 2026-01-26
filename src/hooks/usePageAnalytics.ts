 import { useEffect, useRef } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 
 /**
  * Hook de analytics comportamental
  * Trackeia: page view, scroll depth, tempo por seção, CTA clicks, exit intent
  */
 export const usePageAnalytics = () => {
   const sessionId = useRef<string>('');
   const scrollMilestones = useRef<Set<number>>(new Set());
   const sectionTimers = useRef<Map<string, number>>(new Map());
   const exitIntentShown = useRef<boolean>(false);
 
   // Gerar ou recuperar session_id
   useEffect(() => {
     let id = localStorage.getItem('session_id');
     if (!id) {
       id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
       localStorage.setItem('session_id', id);
     }
     sessionId.current = id;
 
     // Track page view
     sendEvent('page_view', undefined, {
       user_agent: navigator.userAgent,
       referrer: document.referrer || 'direct',
       viewport_width: window.innerWidth,
       viewport_height: window.innerHeight,
     });
   }, []);
 
   // Helper: enviar evento para Supabase
   const sendEvent = async (
     eventType: string,
     section?: string,
     metadata?: Record<string, any>
   ) => {
     try {
       await supabase.from('page_analytics').insert({
         session_id: sessionId.current,
         event_type: eventType,
         section: section || null,
         timestamp: new Date().toISOString(),
         metadata: metadata || null,
       });
     } catch (error) {
       // Silent fail - não quebrar UX se analytics falhar
       if (process.env.NODE_ENV === 'development') {
         console.error('Analytics error:', error);
       }
     }
   };
 
   // Scroll Depth Tracking
   useEffect(() => {
     const handleScroll = () => {
       const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
       const scrollPercent = Math.floor((window.scrollY / scrollHeight) * 100);
 
       const milestones = [25, 50, 75, 100];
       milestones.forEach((milestone) => {
         if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
           scrollMilestones.current.add(milestone);
           sendEvent(`scroll_${milestone}`);
         }
       });
     };
 
     // Debounce scroll events
     let scrollTimeout: NodeJS.Timeout;
     const debouncedScroll = () => {
       clearTimeout(scrollTimeout);
       scrollTimeout = setTimeout(handleScroll, 500);
     };
 
     window.addEventListener('scroll', debouncedScroll);
     return () => {
       window.removeEventListener('scroll', debouncedScroll);
       clearTimeout(scrollTimeout);
     };
   }, []);
 
   // Section Time Tracking (IntersectionObserver)
   useEffect(() => {
     const sections = document.querySelectorAll('section[id]');
 
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           const sectionId = entry.target.id;
           if (entry.isIntersecting) {
             // Seção entrou na viewport
             sectionTimers.current.set(sectionId, Date.now());
           } else {
             // Seção saiu da viewport
             const startTime = sectionTimers.current.get(sectionId);
             if (startTime) {
               const duration = Math.floor((Date.now() - startTime) / 1000); // segundos
               sendEvent('section_view', sectionId, { duration });
               sectionTimers.current.delete(sectionId);
             }
           }
         });
       },
       { threshold: 0.5 } // Considera visível quando 50% está na viewport
     );
 
     sections.forEach((section) => observer.observe(section));
 
     return () => observer.disconnect();
   }, []);
 
   // Exit Intent (apenas desktop)
   useEffect(() => {
     // Checar se já mostrou exit intent nesta sessão
     const hasShown = localStorage.getItem('exit_intent_shown') === 'true';
     const leadCaptured = localStorage.getItem('lead_captured') === 'true';
     
     if (hasShown || leadCaptured || window.innerWidth < 768) {
       return; // Não mostrar
     }
 
     // Delay mínimo de 5 segundos na página
     const minTimeOnPage = 5000;
     const startTime = Date.now();
 
     const handleMouseLeave = (e: MouseEvent) => {
       if (
         e.clientY < 10 &&
         !exitIntentShown.current &&
         Date.now() - startTime >= minTimeOnPage
       ) {
         exitIntentShown.current = true;
         localStorage.setItem('exit_intent_shown', 'true');
         sendEvent('exit_intent');
         
         // Disparar evento customizado para modal escutar
         window.dispatchEvent(new CustomEvent('exitIntent'));
       }
     };
 
     document.addEventListener('mouseleave', handleMouseLeave);
     return () => document.removeEventListener('mouseleave', handleMouseLeave);
   }, []);
 
   // Cleanup ao sair da página
   useEffect(() => {
     const handleBeforeUnload = () => {
       // Enviar tempos finais das seções visíveis
       sectionTimers.current.forEach((startTime, sectionId) => {
         const duration = Math.floor((Date.now() - startTime) / 1000);
         sendEvent('section_view', sectionId, { duration });
       });
     };
 
     window.addEventListener('beforeunload', handleBeforeUnload);
     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
   }, []);
 
   // Retornar helper para trackear CTA clicks
   return {
     trackCTAClick: (section: string, buttonText: string) => {
       sendEvent('cta_click', section, { button_text: buttonText });
     },
   };
 };