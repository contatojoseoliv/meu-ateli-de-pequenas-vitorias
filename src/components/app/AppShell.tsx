import { Link } from "react-router-dom";

import menuLogo from "@/assets/logo-meu-atelie-menu.png";
import { AppUserMenu } from "@/components/app/AppUserMenu";

type AppShellProps = {
  title?: string;
  children: React.ReactNode;
};

export function AppShell({ title, children }: AppShellProps) {
  const hasTitle = Boolean(title && title.trim().length);

  return (
    <div className="min-h-screen app-paper">
      <header className="app-topbar sticky top-0 z-20">
        <div className="container-main h-16 md:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/app" className="inline-flex items-center min-w-0" aria-label="Ir para a Home do app">
              <img src={menuLogo} alt="Meu Ateliê de Pequenas Vitórias" className="app-header-logo" />
            </Link>
          </div>

          <div className="flex-1 text-center min-w-0 px-2">
            {hasTitle ? <p className="text-sm font-medium text-foreground truncate">{title}</p> : null}
          </div>

          <div className="flex items-center justify-end w-[72px]">
            <AppUserMenu />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
