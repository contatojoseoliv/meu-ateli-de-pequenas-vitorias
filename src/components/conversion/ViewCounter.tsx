 import { useState, useEffect } from "react";
 import { Eye } from "lucide-react";
 
 /**
  * Contador de visualizações em tempo real
  * Número aleatório que atualiza periodicamente
  */
 export const ViewCounter = () => {
   const [count, setCount] = useState(0);
 
   useEffect(() => {
     // Número inicial aleatório entre 847-1453
     const initialCount = Math.floor(Math.random() * (1453 - 847 + 1)) + 847;
     setCount(initialCount);
 
     const updateCount = () => {
       setCount((prev) => {
         // Variação aleatória de ±1 a ±8
         const change = Math.floor(Math.random() * 16) - 8;
         const newCount = prev + change;
         // Manter entre 847-1453
         return Math.max(847, Math.min(1453, newCount));
       });
     };
 
     // Atualizar a cada 25-40 segundos (aleatório)
     const getRandomInterval = () => Math.floor(Math.random() * (40000 - 25000 + 1)) + 25000;
 
     let interval = setInterval(updateCount, getRandomInterval());
 
     // Reset interval com novo timing aleatório após cada update
     const resetInterval = () => {
       clearInterval(interval);
       interval = setInterval(updateCount, getRandomInterval());
     };
 
     const resetTimer = setInterval(resetInterval, getRandomInterval());
 
     return () => {
       clearInterval(interval);
       clearInterval(resetTimer);
     };
   }, []);
 
   return (
     <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
       <Eye className="w-4 h-4 text-verde-eucalipto" />
       <span className="text-sm text-grafite-suave transition-all duration-300">
         <strong className="font-semibold">{count.toLocaleString('pt-BR')}</strong> pessoas visualizando agora
       </span>
     </div>
   );
 };