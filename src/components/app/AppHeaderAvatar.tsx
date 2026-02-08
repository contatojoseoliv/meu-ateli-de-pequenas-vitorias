import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppProfile } from "@/hooks/useAppProfile";

export function AppHeaderAvatar() {
  const navigate = useNavigate();
  const { profile, initials } = useAppProfile();

  return (
    <button
      type="button"
      onClick={() => navigate("/app/perfil")}
      className="app-avatar-trigger h-10 w-10"
      aria-label="Abrir perfil"
      title="Perfil"
    >
      <Avatar className="h-9 w-9">
        {profile.avatarUrl ? (
          <AvatarImage src={profile.avatarUrl} alt={`Foto de perfil de ${profile.displayName}`} />
        ) : null}
        <AvatarFallback className="text-xs font-medium text-foreground">{initials}</AvatarFallback>
      </Avatar>
    </button>
  );
}
