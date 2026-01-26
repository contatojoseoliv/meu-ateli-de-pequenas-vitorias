 import { useState, useEffect } from "react";
 
 interface CountdownTimerProps {
   durationHours?: number;
   variant?: 'compact' | 'large';
 }
 
 /**
  * Timer de contagem regressiva para urgência
  * Salva timestamp inicial no localStorage
  */
 export const CountdownTimer = ({ durationHours = 24, variant = 'large' }: CountdownTimerProps) => {
   const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
 
   useEffect(() => {
     // Obter ou criar timestamp inicial
     const storageKey = 'countdown_start';
     let startTime = localStorage.getItem(storageKey);
     
     if (!startTime) {
       startTime = Date.now().toString();
       localStorage.setItem(storageKey, startTime);
     }
 
     const updateTimer = () => {
       const start = parseInt(startTime!, 10);
       const target = start + durationHours * 60 * 60 * 1000;
       const now = Date.now();
       const diff = target - now;
 
       if (diff <= 0) {
         // Timer expirou, resetar
         const newStart = Date.now().toString();
         localStorage.setItem(storageKey, newStart);
         setTimeLeft({ hours: durationHours, minutes: 0, seconds: 0 });
         return;
       }
 
       const hours = Math.floor(diff / (1000 * 60 * 60));
       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
 
       setTimeLeft({ hours, minutes, seconds });
     };
 
     updateTimer();
     const interval = setInterval(updateTimer, 1000);
 
     return () => clearInterval(interval);
   }, [durationHours]);
 
   const numberSize = variant === 'large' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl';
   const labelSize = variant === 'large' ? 'text-xs' : 'text-[10px]';
 
   return (
     <div className="bg-rosa-argila/10 border border-rosa-argila/30 rounded-xl p-6 text-center">
       <p className="text-sm text-grafite-suave/80 mb-4 flex items-center justify-center gap-2">
         <span>⏰</span>
         OFERTA EXPIRA EM:
       </p>
       
       <div className="flex items-center justify-center gap-4">
         {/* Horas */}
         <div>
           <div className={`font-serif font-bold text-ocre-dourado ${numberSize}`}>
             {String(timeLeft.hours).padStart(2, '0')}
           </div>
           <div className={`text-grafite-suave/70 uppercase tracking-wider ${labelSize}`}>
             Horas
           </div>
         </div>
 
         <div className={`font-serif text-grafite-suave/50 ${numberSize}`}>:</div>
 
         {/* Minutos */}
         <div>
           <div className={`font-serif font-bold text-ocre-dourado ${numberSize}`}>
             {String(timeLeft.minutes).padStart(2, '0')}
           </div>
           <div className={`text-grafite-suave/70 uppercase tracking-wider ${labelSize}`}>
             Minutos
           </div>
         </div>
 
         <div className={`font-serif text-grafite-suave/50 ${numberSize}`}>:</div>
 
         {/* Segundos */}
         <div>
           <div className={`font-serif font-bold text-ocre-dourado ${numberSize}`}>
             {String(timeLeft.seconds).padStart(2, '0')}
           </div>
           <div className={`text-grafite-suave/70 uppercase tracking-wider ${labelSize}`}>
             Segundos
           </div>
         </div>
       </div>
     </div>
   );
 };