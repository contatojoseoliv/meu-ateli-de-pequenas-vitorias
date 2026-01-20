import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { LogIn } from "lucide-react";
import logo from "@/assets/logo-meu-atelie-menu.png";

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
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    window.location.hash = "#oferta";
  };
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-14 md:h-20 flex items-center",
        "transition-all duration-300",
        "relative",
        // linha separadora (menu x hero)
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-rosa-argila/40",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-header"
          : "bg-transparent"
      )}
    >
      <div className="container-main w-full gap-2 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          aria-label="Página inicial - Meu Ateliê de Pequenas Vitórias"
          className="flex items-center shrink-0"
        >
          {/*
            Observação: este PNG tem bastante “respiro” lateral.
            Por isso usamos largura controlada + object-left para o logotipo ficar visualmente maior.
           */}
          <img
            src={logo}
            alt="Meu Ateliê de Pequenas Vitórias"
            className="h-9 md:h-12 w-[150px] sm:w-[200px] md:w-[320px] object-left border-none object-cover border-0"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Ações */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/login")}
            aria-label="Acessar área de alunas"
            className="px-2 py-2 text-[10px] sm:text-xs md:text-sm gap-1.5 whitespace-nowrap"
          >
            <span>Já Sou Aluna</span>
            <LogIn className="h-4 w-4" aria-hidden="true" />
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleQueroFazerParte}
            aria-label="Quero fazer parte"
            className="px-2.5 py-2 text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
          >
            <span className="inline sm:hidden">Quero</span>
            <span className="hidden sm:inline">Quero Fazer Parte</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
export { Header };