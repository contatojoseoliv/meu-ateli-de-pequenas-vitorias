import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";
import { AppShell } from "@/components/app/AppShell";

export default function AppIntro() {
  return (
    <AppShell title="Comece por aqui">
      <main className="container-main py-8 space-y-4">
        <Card className="app-stitch">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Comece por aqui</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              (Placeholder) Aqui vamos explicar como usar sua jornada, como marcar os passos, e o que esperar de cada dia.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando você me mandar o texto final, eu organizo em seções e deixo bem leve e acolhedor.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/app/dia/1">
                <Button variant="primary" size="default">Ir para o Dia 1</Button>
              </Link>
              <Link to="/app">
                <Button variant="ghost" size="default">Voltar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
