 import { useEffect, useState } from "react";
 import { CheckCircle } from "lucide-react";
 
 /**
  * Toast de última compra (social proof)
  * Aparece aleatoriamente com nomes brasileiros
  */
 export const RecentPurchaseToast = () => {
   const [isVisible, setIsVisible] = useState(false);
   const [currentPurchase, setCurrentPurchase] = useState({ name: '', minutesAgo: 0 });
 
   const names = [
     'Ana Carolina', 'Juliana', 'Beatriz', 'Camila', 'Fernanda',
     'Gabriela', 'Isabela', 'Larissa', 'Mariana', 'Patrícia',
     'Rafaela', 'Roberta', 'Tatiana', 'Vanessa', 'Daniela',
     'Carolina', 'Amanda', 'Bianca', 'Renata', 'Luciana'
   ];
 
   useEffect(() => {
     // Não mostrar em mobile (pode cobrir sticky CTA)
     if (window.innerWidth < 768) return;
 
     const showToast = () => {
       const randomName = names[Math.floor(Math.random() * names.length)];
       const randomMinutes = Math.floor(Math.random() * (18 - 2 + 1)) + 2;
       
       setCurrentPurchase({ name: randomName, minutesAgo: randomMinutes });
       setIsVisible(true);
 
       // Esconder após 6 segundos
       setTimeout(() => {
         setIsVisible(false);
       }, 6000);
     };
 
     // Primeira aparição após 10-20s
     const initialDelay = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
     const initialTimer = setTimeout(showToast, initialDelay);
 
     // Aparições subsequentes a cada 22-45s
     const getRandomInterval = () => Math.floor(Math.random() * (45000 - 22000 + 1)) + 22000;
     
     let interval: NodeJS.Timeout;
     const startInterval = () => {
       interval = setInterval(() => {
         showToast();
       }, getRandomInterval());
     };
 
     // Iniciar loop após primeira aparição
     setTimeout(startInterval, initialDelay + 6000);
 
     return () => {
       clearTimeout(initialTimer);
       clearInterval(interval);
     };
   }, []);
 
   if (!isVisible) return null;
 
   return (
     <div className="fixed bottom-6 left-6 z-40 animate-slide-in-left hidden md:block">
       <div className="bg-white border-l-4 border-verde-eucalipto shadow-lg rounded-lg p-4 max-w-sm flex items-start gap-3">
         <CheckCircle className="w-5 h-5 text-verde-eucalipto flex-shrink-0 mt-0.5" />
         <div>
           <p className="text-sm text-grafite-suave">
             <strong className="font-semibold">{currentPurchase.name}</strong> acabou de garantir sua vaga
           </p>
           <p className="text-xs text-grafite-suave/60 mt-1">
             há {currentPurchase.minutesAgo} minutos
           </p>
         </div>
       </div>
     </div>
   );
 };