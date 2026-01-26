 import { useState, useEffect } from "react";
 import { X } from "lucide-react";
 import { LeadCaptureForm } from "@/components/shared/LeadCaptureForm";
 
 /**
  * Modal de Exit Intent
  * Aparece quando usuário tenta sair da página (apenas desktop)
  */
 export const ExitIntentModal = () => {
   const [isOpen, setIsOpen] = useState(false);
 
   useEffect(() => {
     const handleExitIntent = () => {
       setIsOpen(true);
     };
 
     window.addEventListener('exitIntent', handleExitIntent);
     return () => window.removeEventListener('exitIntent', handleExitIntent);
   }, []);
 
   const handleSuccess = () => {
     // Fechar modal e scroll para oferta
     setIsOpen(false);
     setTimeout(() => {
       document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
     }, 300);
   };
 
   const handleDismiss = () => {
     setIsOpen(false);
     localStorage.setItem('exit_intent_dismissed', 'true');
   };
 
   if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
       {/* Overlay */}
       <div
         className="absolute inset-0 bg-black/75 backdrop-blur-sm"
         onClick={handleDismiss}
       />
 
       {/* Modal */}
       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-10 animate-scale-in">
         {/* Botão Fechar */}
         <button
           onClick={handleDismiss}
           className="absolute top-4 right-4 text-grafite-suave/50 hover:text-grafite-suave transition-colors"
           aria-label="Fechar"
         >
           <X className="w-6 h-6" />
         </button>
 
         {/* Conteúdo */}
         <div className="text-center mb-6">
           <h3 className="font-serif text-3xl text-grafite-suave mb-4">
             Espera! Antes de ir...
           </h3>
           <p className="text-grafite-suave/80 mb-6">
             Você realmente vai deixar passar a chance de finalmente ter algo só seu?
           </p>
           <div className="mb-6">
             <p className="font-serif text-4xl text-ocre-dourado font-bold">
               R$ 47
             </p>
             <p className="text-sm text-grafite-suave/70 mt-2">
               Menos que uma sessão de terapia.
             </p>
           </div>
         </div>
 
         {/* Formulário */}
         <LeadCaptureForm
           source="exit-intent"
           onSuccess={handleSuccess}
           variant="modal"
         />
 
         {/* Link discreto */}
         <button
           onClick={handleDismiss}
           className="block w-full text-center text-sm text-grafite-suave/50 hover:text-grafite-suave transition-colors mt-4"
         >
           Não, obrigada
         </button>
       </div>
     </div>
   );
 };