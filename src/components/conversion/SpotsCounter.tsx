 import { useState, useEffect } from "react";
 import { Flame, AlertTriangle } from "lucide-react";
 
 /**
  * Contador de vagas restantes (decrescente)
  * Salvo no localStorage por sessão
  */
 export const SpotsCounter = () => {
   const [spots, setSpots] = useState(97);
   const isUrgent = spots <= 12;
 
   useEffect(() => {
     // Obter contador atual
     const stored = localStorage.getItem('spots_remaining');
     
     if (stored) {
       const currentSpots = parseInt(stored, 10);
       setSpots(Math.max(5, currentSpots)); // Mínimo 5
     } else {
       // Primeira visita, iniciar em 97
       localStorage.setItem('spots_remaining', '97');
     }
 
     // Decrementar 1 vaga por nova sessão (se ainda não decrementou hoje)
     const lastDecrement = localStorage.getItem('last_decrement_date');
     const today = new Date().toDateString();
     
     if (lastDecrement !== today && stored) {
       const newSpots = Math.max(5, parseInt(stored, 10) - 1);
       localStorage.setItem('spots_remaining', newSpots.toString());
       localStorage.setItem('last_decrement_date', today);
       setSpots(newSpots);
     }
   }, []);
 
   return (
     <div
       className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base transition-all ${
         isUrgent
           ? 'bg-gradient-to-r from-red-50 to-ocre-dourado/20 border-2 border-red-500 text-red-700 animate-pulse'
           : 'bg-gradient-to-r from-ocre-dourado/20 to-rosa-argila/20 border-2 border-ocre-dourado text-grafite-suave'
       }`}
     >
       {isUrgent ? (
         <>
           <AlertTriangle className="w-5 h-5" />
           ÚLTIMAS {spots} VAGAS para o bônus!
         </>
       ) : (
         <>
           <Flame className="w-5 h-5 text-ocre-dourado" />
           Apenas {spots} vagas restantes para o bônus
         </>
       )}
     </div>
   );
 };