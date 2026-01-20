import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { LogIn } from "lucide-react";
import logo from "@/assets/logo-meu-atelie.png";

/**
 * Header fixo seguindo o Manual da Marca
 * 
 * - Logo à esquerda (imagem)
 * - Ações à direita: "Já sou aluna" (ghost + ícone) e "Quero Fazer Parte" (CTA)
 * - Transparência + sombra ao scroll
 * - Separação sutil do Hero via linha inferior
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQueroFazerParte = () => {
    const el = document.getElementById("oferta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.hash = "#oferta";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-20 flex items-center",
        "transition-all duration-300",
        "relative",
        // linha separadora (menu x hero)
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-rosa-argila/40",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-header" : "bg-transparent",
      )}
    >
      <div className="container-main flex items-center justify-between w-full gap-4">
        {/* Logo */}
        <a href="/" aria-label="Página inicial - Meu Ateliê de Pequenas Vitórias" className="flex items-center">
          <img
            src={logo}
            alt="Meu Ateliê de Pequenas Vitórias"
            className="h-9 md:h-10 w-auto"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Ações */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/login")}
            aria-label="Acessar área de alunas"
            className="gap-2"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Já sou aluna
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleQueroFazerParte}
            aria-label="Quero fazer parte"
          >
            Quero Fazer Parte
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Header };
