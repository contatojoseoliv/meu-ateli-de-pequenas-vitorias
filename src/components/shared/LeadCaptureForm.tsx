 import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import { Button } from "./Button";
 import { Loader2, Check } from "lucide-react";
 
 interface LeadCaptureFormProps {
   source: 'cta-hero' | 'cta-final' | 'cta-oferta' | 'exit-intent' | 'sticky-mobile';
   onSuccess?: () => void;
   variant?: 'inline' | 'modal';
 }
 
 /**
  * Formulário de captura de leads com validação e integração Supabase
  * Estados: idle, loading, success, error
  */
 export const LeadCaptureForm = ({ source, onSuccess, variant = 'inline' }: LeadCaptureFormProps) => {
   const [email, setEmail] = useState('');
   const [nome, setNome] = useState('');
   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
   const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setErrorMessage('');
 
     // Validação client-side
     if (!email || !emailRegex.test(email)) {
       setErrorMessage('Por favor, insira um email válido.');
       return;
     }
 
     if (nome && nome.trim().length < 2) {
       setErrorMessage('Nome deve ter pelo menos 2 caracteres.');
       return;
     }
 
     setStatus('loading');
 
     try {
       const { error } = await supabase
         .from('leads')
         .insert([{
           email: email.toLowerCase().trim(),
           nome: nome.trim() || null,
           source: source
         }]);
 
       if (error) {
         // Email duplicado (UNIQUE constraint)
         if (error.code === '23505') {
           setErrorMessage('Este email já está cadastrado!');
         } else {
           setErrorMessage('Erro ao cadastrar. Tente novamente.');
           console.error('Supabase error:', error);
         }
         setStatus('error');
         return;
       }
 
       // Sucesso
       setStatus('success');
       localStorage.setItem('lead_captured', 'true');
       localStorage.setItem('lead_email', email);
 
       // Trackear evento no analytics
       const sessionId = localStorage.getItem('session_id') || '';
       await supabase.from('page_analytics').insert({
         session_id: sessionId,
         event_type: 'lead_captured',
         section: source,
         metadata: { email }
       });
 
      // Redirecionar para checkout após 1.5 segundos
       setTimeout(() => {
        navigate('/checkout');
      }, 1500);
 
     } catch (err) {
       console.error('Unexpected error:', err);
       setErrorMessage('Erro inesperado. Tente novamente.');
       setStatus('error');
     }
   };
 
   const isModal = variant === 'modal';
 
   return (
     <form onSubmit={handleSubmit} className={`space-y-4 ${isModal ? 'max-w-md mx-auto' : 'max-w-lg mx-auto'}`}>
       {/* Campo Nome (opcional) */}
       <div>
         <label htmlFor={`nome-${source}`} className="block text-sm font-medium text-grafite-suave mb-2">
           Seu nome (opcional)
         </label>
         <input
           id={`nome-${source}`}
           type="text"
           value={nome}
           onChange={(e) => setNome(e.target.value)}
           disabled={status === 'loading' || status === 'success'}
           placeholder="Como você gostaria de ser chamada?"
           className="w-full px-4 py-3 rounded-lg border-2 border-verde-eucalipto/30 focus:border-verde-eucalipto focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-grafite-suave"
         />
       </div>
 
       {/* Campo Email (obrigatório) */}
       <div>
         <label htmlFor={`email-${source}`} className="block text-sm font-medium text-grafite-suave mb-2">
           Seu melhor email <span className="text-rosa-argila">*</span>
         </label>
         <input
           id={`email-${source}`}
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           disabled={status === 'loading' || status === 'success'}
           required
           placeholder="seu@email.com"
           className="w-full px-4 py-3 rounded-lg border-2 border-verde-eucalipto/30 focus:border-verde-eucalipto focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-grafite-suave"
         />
       </div>
 
       {/* Mensagem de erro */}
       {status === 'error' && errorMessage && (
         <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
           {errorMessage}
         </div>
       )}
 
       {/* Mensagem de sucesso */}
       {status === 'success' && (
         <div className="text-sm text-verde-eucalipto bg-verde-eucalipto-10 p-3 rounded-lg border border-verde-eucalipto/30 flex items-center gap-2">
           <Check className="w-5 h-5" />
           Email cadastrado! Preparando sua vaga...
         </div>
       )}
 
       {/* Botão Submit */}
       <Button
         type="submit"
         variant="primary"
         size="lg"
         disabled={status === 'loading' || status === 'success'}
         className="w-full"
       >
         {status === 'loading' ? (
           <>
             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
             Cadastrando...
           </>
         ) : status === 'success' ? (
           <>
             <Check className="w-5 h-5 mr-2" />
             Cadastrado!
           </>
         ) : (
           'Sim, Quero Minha Vaga'
         )}
       </Button>
     </form>
   );
 };