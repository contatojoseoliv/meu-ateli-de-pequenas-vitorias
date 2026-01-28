import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container-main py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Link to="/app" className="block">
              <p className="font-serif text-lg leading-tight text-foreground">
                Meu Ateliê de Pequenas Vitórias
              </p>
              <p className="text-sm text-muted-foreground truncate">
                Primeira Vitória em Amigurumi
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container-main py-8">{children}</main>
    </div>
  );
}
