import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/shared/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppSupport() {
  return (
    <AppShell title="Suporte">
      <main className="container-main py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Suporte / Fale Conosco</h1>
          <p className="text-sm text-muted-foreground">Se precisar de ajuda, fala com a gente por aqui.</p>
        </header>

        <Card className="app-stitch">
          <CardHeader>
            <CardTitle className="text-lg">Canais de contato</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row flex-wrap gap-3">
            <a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="default">Falar no WhatsApp</Button>
            </a>
            <a href="mailto:suporte@seusite.com">
              <Button variant="ghost" size="default">Enviar e-mail</Button>
            </a>
            
          </CardContent>
        </Card>
      </main>
    </AppShell>);

}