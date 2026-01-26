 import { useState, useEffect } from "react";
 import { Button } from "@/components/shared/Button";
 import { LeadCaptureForm } from "@/components/shared/LeadCaptureForm";
 import { X } from "lucide-react";
 
 /**
  * CTA fixo no rodapé (apenas mobile)
  * Aparece após scroll passar do Hero
  */
 export const StickyMobileCTA = () => {
   const [isVisible, setIsVisible] = useState(false);
   const [showModal, setShowModal] = useState(false);
 
   useEffect(() => {
     const handleScroll = () => {
       // Mostrar quando passar 100vh
       const scrolled = window.scrollY > window.innerHeight;
       setIsVisible(scrolled);
     };
 
     window.addEventListener('scroll', handleScroll);
     handleScroll(); // Check inicial
 
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
   const handleSuccess = () => {
     setShowModal(false);
     setTimeout(() => {
       document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
     }, 300);
   };
 
   // Apenas mobile
   if (typeof window !== 'undefined' && window.innerWidth >= 768) {
     return null;
   }
 
   return (
     <>
       {/* Sticky CTA */}
       <div
         className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-verde-eucalipto/20 shadow-2xl px-4 py-3 transition-transform duration-400 ease-out md:hidden ${
           isVisible ? 'translate-y-0' : 'translate-y-full'
         }`}
         style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
       >
         <div className="text-center mb-2">
           <p className="text-sm font-semibold text-grafite-suave">
             R$ 47 - 7 dias para sua primeira vitória
           </p>
         </div>
         <Button
           variant="primary"
           size="default"
           className="w-full"
           onClick={() => setShowModal(true)}
         >
           Garantir Minha Vaga
         </Button>
       </div>
 
       {/* Modal com Form */}
       {showModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:hidden">
           <div
             className="absolute inset-0 bg-black/75 backdrop-blur-sm"
             onClick={() => setShowModal(false)}
           />
           <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
             <button
               onClick={() => setShowModal(false)}
               className="absolute top-3 right-3 text-grafite-suave/50 hover:text-grafite-suave"
               aria-label="Fechar"
             >
               <X className="w-5 h-5" />
             </button>
             
             <h3 className="font-serif text-2xl text-grafite-suave mb-4 text-center">
               Garanta Sua Vaga
             </h3>
             
             <LeadCaptureForm
               source="sticky-mobile"
               onSuccess={handleSuccess}
               variant="modal"
             />
           </div>
         </div>
       )}
     </>
   );
 };