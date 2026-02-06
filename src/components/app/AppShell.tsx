import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import appLogo from "@/assets/app-logo.png";
import { AppUserMenu } from "@/components/app/AppUserMenu";

type AppShellProps = {
  title: string;
  backTo?: string;
  backLabel?: string;
  children: React.ReactNode;
};

export function AppShell({ title, backTo, backLabel = "Voltar", children }: AppShellProps) {
  return (
    <div className="min-h-screen app-paper">
      <header className="app-topbar sticky top-0 z-20">
        <div className="container-main h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {backTo ? (
              <Link
                to={backTo}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={backLabel}
                title={backLabel}
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : null}

            <Link to="/app" className="inline-flex items-center min-w-0" aria-label="Ir para a Home do app">
              <img src={appLogo} alt="Logo do app" className="app-header-logo" />
            </Link>
          </div>

          <div className="flex-1 text-center min-w-0 px-2">
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
          </div>

          <div className="flex items-center justify-end w-[84px]">
            <AppUserMenu />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
