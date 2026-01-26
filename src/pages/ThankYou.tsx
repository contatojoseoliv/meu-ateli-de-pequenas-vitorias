 import { useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { Button } from "@/components/shared/Button";
 import { Check, Mail, ArrowRight, Gift, Calendar, Users } from "lucide-react";
 import { motion } from "framer-motion";
 import seloImage from "@/assets/selo-primeira-vitoria.png";
 
 /**
  * Página de Thank You - Confirmação de captura de lead
  * Exibida após cadastro bem-sucedido
  */
 const ThankYou = () => {
   const navigate = useNavigate();
   const leadEmail = localStorage.getItem('lead_email');
 
   // Redirecionar se não houver lead capturado
   useEffect(() => {
     if (!leadEmail) {
       navigate('/', { replace: true });
     }
   }, [leadEmail, navigate]);
 
   const proximosPassos = [
     {
       icon: Mail,
       titulo: "Verifique seu Email",
       descricao: "Em alguns minutos você receberá um email de confirmação com detalhes importantes.",
       tempo: "Próximos 5 minutos"
     },
     {
       icon: Gift,
       titulo: "Garanta Sua Vaga",
       descricao: "Complete sua inscrição agora com desconto especial de lançamento.",
       tempo: "Disponível hoje"
     },
     {
       icon: Calendar,
       titulo: "Comece em 7 Dias",
       descricao: "Receba acesso imediato ao Mapa Ilustrado e comece sua jornada.",
       tempo: "Acesso instantâneo"
     },
     {
       icon: Users,
       titulo: "Suporte Direto",
       descricao: "Tire dúvidas e compartilhe seu progresso na comunidade exclusiva.",
       tempo: "24/7 disponível"
     }
   ];
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-verde-eucalipto/5 via-background to-cinza-nuvem/30 flex items-center justify-center p-4">
       <div className="container-main max-w-4xl">
         {/* Card Principal */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="bg-white rounded-2xl shadow-elevada p-8 md:p-12 text-center"
         >
           {/* Ícone de Sucesso */}
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
             className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-verde-eucalipto/10 mb-6"
           >
             <Check className="w-10 h-10 text-verde-eucalipto" strokeWidth={3} />
           </motion.div>
 
           {/* Selo + Nome do Produto */}
           <div className="flex items-center justify-center gap-3 mb-4">
             <img 
               src={seloImage} 
               alt="Selo Primeira Vitória" 
               className="h-8 w-8 object-contain" 
             />
             <span className="font-sans font-semibold text-grafite-suave text-lg">
               Primeira Vitória em Amigurumi
             </span>
           </div>
 
           {/* Headline */}
           <h1 className="font-serif text-3xl md:text-4xl text-grafite-suave mb-4">
             Sua Vaga Foi <span className="text-verde-eucalipto">Reservada!</span>
           </h1>
 
           {/* Email Confirmado */}
           <p className="text-grafite-suave/80 mb-2">
             Enviamos uma confirmação para:
           </p>
           <p className="font-semibold text-verde-eucalipto text-lg mb-8">
             {leadEmail}
           </p>
 
           {/* Divisor */}
           <div className="w-16 h-1 bg-verde-eucalipto/20 mx-auto mb-8 rounded-full" />
 
           {/* Próximos Passos */}
           <div className="mb-10">
             <h2 className="font-serif text-2xl text-grafite-suave mb-6">
               Próximos Passos
             </h2>
 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
               {proximosPassos.map((passo, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3 + index * 0.1 }}
                   className="flex gap-4 p-4 rounded-lg bg-cinza-nuvem/30 border border-verde-eucalipto/10"
                 >
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 rounded-full bg-verde-eucalipto/10 flex items-center justify-center">
                       <passo.icon className="w-6 h-6 text-verde-eucalipto" />
                     </div>
                   </div>
                   <div>
                     <h3 className="font-semibold text-grafite-suave mb-1">
                       {passo.titulo}
                     </h3>
                     <p className="text-sm text-grafite-suave/70 mb-2">
                       {passo.descricao}
                     </p>
                     <p className="text-xs text-verde-eucalipto font-medium">
                       {passo.tempo}
                     </p>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
 
           {/* CTA Principal */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             className="space-y-4"
           >
             <Button
               variant="primary"
               size="lg"
               onClick={() => navigate('/#oferta')}
               className="w-full md:w-auto text-lg px-12"
             >
               Garantir Minha Vaga Agora
               <ArrowRight className="w-5 h-5 ml-2" />
             </Button>
 
             <p className="text-sm text-grafite-suave/60">
               Oferta especial válida apenas hoje
             </p>
           </motion.div>
         </motion.div>
 
         {/* Nota de Privacidade */}
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="text-center text-sm text-grafite-suave/50 mt-6"
         >
           Seus dados estão seguros. Não compartilhamos seu email com terceiros.
         </motion.p>
       </div>
     </div>
   );
 };
 
 export default ThankYou;