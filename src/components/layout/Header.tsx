import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

/**
 * Header fixo seguindo o Manual da Marca
 * 
 * - Logo à esquerda: "Meu Ateliê de Pequenas Vitórias" em Playfair Display
 * - Botão "Já sou aluna" à direita (ghost)
 * - Transparência + sombra ao scroll
 * - Altura: 80px, z-index alto
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'h-20 flex items-center',
        'transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-header'
          : 'bg-transparent'
      )}
    >
      <div className="container-main flex items-center justify-between w-full">
        {/* Logo */}
        <a
          href="/"
          className="font-serif text-xl text-grafite-suave hover:text-verde-eucalipto transition-colors"
          aria-label="Página inicial - Meu Ateliê de Pequenas Vitórias"
        >
          Meu Ateliê de <span className="font-handwritten text-2xl text-verde-eucalipto">Pequenas Vitórias</span>
        </a>

        {/* CTA */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/login'}
          aria-label="Acessar área de alunas"
        >
          Já sou aluna
        </Button>
      </div>
    </header>
  );
};

export { Header };
