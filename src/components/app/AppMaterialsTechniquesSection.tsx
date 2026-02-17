import { useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, BookOpen } from "lucide-react";

type Props = {
  currentDay: number;
};

export function AppMaterialsTechniquesSection({ currentDay }: Props) {
  const navigate = useNavigate();

  return (
    <section id="materiais-tecnicas" className="space-y-3">
      <h2 className="text-xl font-bold text-foreground">Meus Materiais e Técnicas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="app-stitch">
          <CardContent className="p-5 space-y-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Scissors className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Explore Materiais</h3>
            <p className="text-sm text-muted-foreground">
              Acesse materiais e recursos essenciais para o seu Amigurumi.
            </p>
            <Button variant="secondary" size="sm" onClick={() => navigate('/app/materiais-tecnicas')}>
              Materiais
            </Button>
          </CardContent>
        </Card>

        <Card className="app-stitch">
          <CardContent className="p-5 space-y-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Aprenda Técnicas</h3>
            <p className="text-sm text-muted-foreground">
              Aprenda e consulte métodos e processos para executar suas atividades.
            </p>
            <Button variant="secondary" size="sm" onClick={() => navigate('/app/materiais-tecnicas')}>
              Técnicas
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
