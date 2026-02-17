"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "@/assets/profile-default.png";
import { AppShell } from "@/components/app/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/shared/Button";
import { useAppProfile } from "@/hooks/useAppProfile";
import { Camera, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

export default function AppProfile() {
  const navigate = useNavigate();
  const { profile, setDisplayName, setAvatarUrl, initials } = useAppProfile();
  const [localError, setLocalError] = useState<string | null>(null);

  const previewAlt = useMemo(() => {
    const name = profile.displayName?.trim() ? profile.displayName.trim() : "Aluna";
    return `Foto de perfil de ${name}`;
  }, [profile.displayName]);

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!");
    navigate("/app");
  };

  return (
    <AppShell title="Perfil">
      <main className="container-main py-8 max-w-xl mx-auto">
        <Card className="app-stitch overflow-hidden">
          <CardContent className="p-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <Avatar className="h-24 w-24 ring-4 ring-secondary/20">
                  <AvatarImage src={profile.avatarUrl ?? defaultAvatar} alt={previewAlt} />
                  <AvatarFallback className="text-xl font-medium text-foreground">{initials}</AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera size={16} />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      setLocalError(null);
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (!file.type.startsWith("image/")) {
                        setLocalError("Selecione uma imagem válida.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () => {
                        const result = typeof reader.result === "string" ? reader.result : null;
                        if (result) setAvatarUrl(result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
              
              {profile.avatarUrl && (
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  onClick={() => setAvatarUrl(null)}
                >
                  <Trash2 size={12} /> Remover foto
                </button>
              )}
              
              {localError && <p className="text-xs text-destructive">{localError}</p>}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-semibold">Como quer ser chamada?</Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-muted/30 border-none focus-visible:ring-1"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleSave}
                className="min-w-[140px]"
              >
                <Check size={16} className="mr-2" /> Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}