import { useMemo, useState } from "react";

import defaultAvatar from "@/assets/profile-default.png";
import { AppShell } from "@/components/app/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppProfile } from "@/hooks/useAppProfile";

export default function AppProfile() {
  const { profile, setDisplayName, setAvatarUrl, initials } = useAppProfile();
  const [localError, setLocalError] = useState<string | null>(null);

  const previewAlt = useMemo(() => {
    const name = profile.displayName?.trim() ? profile.displayName.trim() : "Aluna";
    return `Foto de perfil de ${name}`;
  }, [profile.displayName]);

  return (
    <AppShell title="Perfil">
      <main className="container-main py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Seu Perfil</h1>
          <p className="text-sm text-muted-foreground">Ajuste como você prefere ser chamada no app.</p>
        </header>

        <Card className="app-stitch">
          <CardHeader>
            <CardTitle className="text-lg">Sua foto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatarUrl ?? defaultAvatar} alt={previewAlt} />
                <AvatarFallback className="text-base font-medium text-foreground">{initials}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <Label htmlFor="avatar">Alterar foto</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setLocalError(null);
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (!file.type.startsWith("image/")) {
                      setLocalError("Por favor, selecione um arquivo de imagem.");
                      return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = typeof reader.result === "string" ? reader.result : null;
                      if (!result) {
                        setLocalError("Não foi possível carregar a imagem.");
                        return;
                      }
                      setAvatarUrl(result);
                    };
                    reader.onerror = () => setLocalError("Não foi possível ler o arquivo.");
                    reader.readAsDataURL(file);
                  }}
                />
                <p className="text-xs text-muted-foreground">PNG/JPG, até alguns MB (salvo neste dispositivo).</p>
                {localError ? <p className="text-xs font-medium text-destructive">{localError}</p> : null}
              </div>
            </div>

            {profile.avatarUrl ? (
              <button
                type="button"
                className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                onClick={() => setAvatarUrl(null)}
              >
                Remover foto
              </button>
            ) : null}
          </CardContent>
        </Card>

        <Card className="app-stitch">
          <CardHeader>
            <CardTitle className="text-lg">Como posso te chamar?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Nome</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ex.: Ana"
                autoComplete="name"
              />
              <p className="text-xs text-muted-foreground">
                Seu avatar vai usar as iniciais: <span className="font-medium text-foreground">{initials}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
