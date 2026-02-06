import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type AppShellProps = {
  title: string;
  backTo?: string;
  backLabel?: string;
  children: React.ReactNode;
};

export function AppShell({ title, backTo = "/app", backLabel = "Voltar", children }: AppShellProps) {
  return (
    <div className="min-h-screen app-paper">
      <header className="app-topbar sticky top-0 z-20">
        <div className="container-main h-14 flex items-center justify-between gap-3">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-foreground hover:bg-accent/10"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="flex-1 text-center">
            <p className="text-sm font-medium text-foreground">{title}</p>
          </div>

          <div className="w-[84px]" aria-hidden="true" />
        </div>
      </header>

      {children}
    </div>
  );
}
