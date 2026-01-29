import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AppLayoutProps = {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
};

export function AppLayout({ title, subtitle, rightSlot, children }: AppLayoutProps) {
  const location = useLocation();
  const isConfig = location.pathname.startsWith("/app/config");

  return (
    <div className="min-h-screen bg-cinza-nuvem text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-main flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="text-sm font-medium">Meu Ateliê de Pequenas Vitórias</p>
            {title ? (
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold">{title}</h1>
                {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {rightSlot}
            <Button asChild variant={isConfig ? "secondary" : "outline"} size="sm">
              <Link to="/app/config">Config</Link>
            </Button>
            <Button asChild variant={!isConfig ? "secondary" : "outline"} size="sm">
              <Link to="/app">Mapa</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className={cn("container-main py-6")}>{children}</main>
    </div>
  );
}
