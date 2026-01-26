 import { useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { Button } from "@/components/shared/Button";
 import { supabase } from "@/integrations/supabase/client";
 
 const Checkout = () => {
   const navigate = useNavigate();
   const leadEmail = localStorage.getItem('lead_email');
   
   // Proteção: redirecionar se não houver lead capturado
   useEffect(() => {
     if (!leadEmail) {
       navigate('/', { replace: true });
     }
   }, [leadEmail, navigate]);
 
   // Trackear acesso à página de checkout
   useEffect(() => {
     const sessionId = localStorage.getItem('session_id') || '';
     supabase.from('page_analytics').insert({
       session_id: sessionId,
       event_type: 'checkout_viewed',
       section: 'checkout',
       metadata: { email: leadEmail }
     });
   }, [leadEmail]);
 
   const handleContinue = async () => {
     // Trackear clique no botão
     const sessionId = localStorage.getItem('session_id') || '';
     await supabase.from('page_analytics').insert({
       session_id: sessionId,
       event_type: 'checkout_continue_clicked',
       section: 'checkout',
       metadata: { email: leadEmail }
     });
     
     navigate('/obrigado');
   };
 
   if (!leadEmail) {
     return null;
   }
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-verde-eucalipto/5 via-background to-cinza-nuvem/30 flex items-center justify-center p-4">
       <div className="container-main max-w-2xl">
         <div className="bg-white rounded-2xl shadow-elevada p-8 md:p-12 text-center">
           <h1 className="font-serif text-3xl md:text-4xl text-grafite-suave mb-4">
             Preparando Seu Checkout
           </h1>
           
           <p className="text-grafite-suave/80 mb-8">
             Em breve você terá acesso ao sistema de pagamento seguro para garantir sua vaga no método Primeira Vitória em Amigurumi.
           </p>
 
           <div className="bg-cinza-nuvem/30 border border-verde-eucalipto/20 rounded-lg p-6 mb-8">
             <p className="text-sm text-grafite-suave/70 mb-2">
               📧 Email confirmado:
             </p>
             <p className="font-semibold text-verde-eucalipto">
               {leadEmail}
             </p>
           </div>
 
           <div className="space-y-4">
             <p className="text-sm text-grafite-suave/60">
               Por enquanto, continue para confirmar sua reserva
             </p>
             
             <Button
               variant="primary"
               size="lg"
               onClick={handleContinue}
               className="w-full md:w-auto"
             >
               Continuar para Confirmação
             </Button>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default Checkout;