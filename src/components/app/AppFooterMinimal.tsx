import { Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function AppFooterMinimal() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border pt-6 pb-10">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Meu Ateliê de Pequenas Vitórias</p>
            <p className="text-xs text-muted-foreground">Transformando ansiedade em calma, um pontinho de cada vez.</p>
          </div>

          <a
            href="mailto:contato@meuatelie.com"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            contato@meuatelie.com
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link to="/app/suporte" className="text-muted-foreground hover:text-foreground transition-colors">
            Suporte
          </Link>
          <Link to="/app/perfil" className="text-muted-foreground hover:text-foreground transition-colors">
            Perfil
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Página inicial
          </Link>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year} Meu Ateliê de Pequenas Vitórias. Todos os direitos reservados.</p>
          <p className="inline-flex items-center gap-1">
            Feito com <Heart className="h-3.5 w-3.5" aria-hidden="true" /> para você
          </p>
        </div>
      </div>
    </footer>
  );
}
