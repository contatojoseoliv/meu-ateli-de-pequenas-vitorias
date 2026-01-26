 import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lead } from "@/components/sections/Lead";
import { Problema } from "@/components/sections/Problema";
 import { usePageAnalytics } from "@/hooks/usePageAnalytics";
 import { ExitIntentModal } from "@/components/conversion/ExitIntentModal";
 import { StickyMobileCTA } from "@/components/conversion/StickyMobileCTA";
 import { RecentPurchaseToast } from "@/components/conversion/RecentPurchaseToast";
 
 // Lazy load seções abaixo da dobra para performance
 const Solucao = lazy(() => import("@/components/sections/Solucao").then(m => ({ default: m.Solucao })));
 const Prova = lazy(() => import("@/components/sections/Prova").then(m => ({ default: m.Prova })));
 const Bullets = lazy(() => import("@/components/sections/Bullets").then(m => ({ default: m.Bullets })));
 const Oferta = lazy(() => import("@/components/sections/Oferta").then(m => ({ default: m.Oferta })));
 const Garantia = lazy(() => import("@/components/sections/Garantia").then(m => ({ default: m.Garantia })));
 const FAQ = lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
 const Fechamento = lazy(() => import("@/components/sections/Fechamento").then(m => ({ default: m.Fechamento })));
 
 // Loading skeleton para Suspense
 const SectionSkeleton = () => (
   <div className="w-full py-20 flex items-center justify-center">
     <div className="animate-pulse flex flex-col items-center gap-4">
       <div className="w-12 h-12 rounded-full bg-verde-eucalipto/20" />
       <div className="h-4 w-32 bg-cinza-nuvem rounded" />
     </div>
   </div>
 );

/**
 * Landing Page - Primeira Vitória em Amigurumi
 * 
 * Estrutura de 10 seções seguindo o Manual da Marca:
 * 1. Hero - Headline principal + CTA
 * 2. Lead - Conexão emocional com avatar
 * 3. Problema - Tríade da Dor
 * 4. Solução - Apresentação do método
 * 5. Prova - Depoimentos e resultados
 * 6. Bullets - Benefícios e aprendizados
 * 7. Oferta - Stack de valor e preço
 * 8. Garantia - Garantia incondicional
 * 9. FAQ - Perguntas frequentes
 * 10. Fechamento - Última chamada para ação
 */
const Index = () => {
   // Inicializar analytics comportamental
   usePageAnalytics();
 
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
         {/* Seções above the fold - eager loading */}
        <Hero />
        <Lead />
        <Problema />
         
         {/* Seções below the fold - lazy loading */}
         <Suspense fallback={<SectionSkeleton />}>
           <Solucao />
           <Prova />
           <Bullets />
           <Oferta />
           <Garantia />
           <FAQ />
           <Fechamento />
         </Suspense>
      </main>
      
      <Footer />
       
       {/* Conversion Widgets */}
       <ExitIntentModal />
       <StickyMobileCTA />
       <RecentPurchaseToast />
    </div>
  );
};

export default Index;
