import { Link } from "react-router-dom";
import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { journeyDays } from "@/content/journey";
import { Scissors, BookOpen, ArrowRight } from "lucide-react";

export default function AppMateriaisTecnicas() {
  return (
    <AppShell title="Materiais e Técnicas">
      <main className="container-main py-8 space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Materiais e Técnicas</h1>
          <p className="text-sm text-muted-foreground">
            Consulte os materiais e técnicas de cada dia da jornada.
          </p>
        </header>

        {/* Materiais */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Materiais</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {journeyDays.map((d) => (
              <Card key={`mat-${d.day}`} className="app-stitch hover-lift">
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm font-semibold text-foreground">Dia {d.day} — {d.title}</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    {d.tabs.materials.slice(0, 3).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                    {d.tabs.materials.length > 3 && (
                      <li className="text-primary">+{d.tabs.materials.length - 3} mais</li>
                    )}
                  </ul>
                  <Link
                    to={`/app/dia/${d.day}?tab=materiais`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Ver tudo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Técnicas */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Técnicas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {journeyDays.map((d) => (
              <Card key={`tech-${d.day}`} className="app-stitch hover-lift">
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm font-semibold text-foreground">Dia {d.day} — {d.title}</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    {d.tabs.techniquesAndResources.slice(0, 2).map((t, i) => (
                      <li key={i} className="line-clamp-1">{t}</li>
                    ))}
                    {d.tabs.techniquesAndResources.length > 2 && (
                      <li className="text-primary">+{d.tabs.techniquesAndResources.length - 2} mais</li>
                    )}
                  </ul>
                  <Link
                    to={`/app/dia/${d.day}?tab=tecnicas`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Ver tudo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
