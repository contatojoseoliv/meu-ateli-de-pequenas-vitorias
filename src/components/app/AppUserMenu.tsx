import { Award, BookOpen, Headset, Home, Menu, User } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppProfile } from "@/hooks/useAppProfile";

type MenuItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

function isActivePath(pathname: string, hash: string, to: string) {
  if (!to.includes("#")) return pathname === to;

  const [toPath, toHash] = to.split("#");
  return pathname === toPath && hash === `#${toHash ?? ""}`;
}

export function AppUserMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAppProfile();

  const items = useMemo<MenuItem[]>(
    () => [
      { label: "Página inicial", to: "/app", icon: Home },
      { label: "Perfil", to: "/app/perfil", icon: User },
      { label: "Materiais e Técnicas", to: "/app#materiais-tecnicas", icon: BookOpen },
      { label: "Suporte / Fale Conosco", to: "/app/suporte", icon: Headset },
      { label: "Selos & Conquistas", to: "/app/selos", icon: Award },
    ],
    [],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="app-avatar-trigger h-10 w-10" aria-label="Abrir menu" title="Menu">
          <Menu className="h-5 w-5 text-foreground" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="min-w-[14rem]">
        <div className="px-2 py-2">
          <p className="text-xs text-muted-foreground">Olá,</p>
          <p className="text-sm font-medium text-foreground truncate" title={profile.displayName}>
            {profile.displayName}
          </p>
        </div>
        <DropdownMenuSeparator />
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(location.pathname, location.hash, item.to);
          return (
            <DropdownMenuItem
              key={item.to}
              onSelect={() => navigate(item.to)}
              className={active ? "bg-accent text-accent-foreground" : undefined}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

