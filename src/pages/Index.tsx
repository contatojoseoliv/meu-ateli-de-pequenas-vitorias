import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lead } from "@/components/sections/Lead";
import { Problema } from "@/components/sections/Problema";
import { Solucao } from "@/components/sections/Solucao";
import { Prova } from "@/components/sections/Prova";
import { Bullets } from "@/components/sections/Bullets";
import { Oferta } from "@/components/sections/Oferta";
import { Garantia } from "@/components/sections/Garantia";
import { FAQ } from "@/components/sections/FAQ";
import { Fechamento } from "@/components/sections/Fechamento";

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        <Lead />
        <Problema />
        <Solucao />
        <Prova />
        <Bullets />
        <Oferta />
        <Garantia />
        <FAQ />
        <Fechamento />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
