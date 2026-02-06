import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppProfile } from "@/hooks/useAppProfile";

export default function AppProfile() {
  const { profile, setDisplayName, initials } = useAppProfile();

  return (
    <AppShell title="Perfil" backTo="/app" backLabel="Jornada">
      <main className="container-main py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Seu Perfil</h1>
          <p className="text-sm text-muted-foreground">Ajuste como você prefere ser chamada no app.</p>
        </header>

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
              <p className="text-xs text-muted-foreground">Seu avatar vai usar as iniciais: <span className="font-medium text-foreground">{initials}</span></p>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
