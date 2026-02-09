import { useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type Props = {
  currentDay: number;
};
export function AppMaterialsTechniquesSection({
  currentDay
}: Props) {
  const navigate = useNavigate();
  return <section id="materiais-tecnicas" className="space-y-3">
      <h2 className="text-xl font-bold text-foreground">Meus Materiais e Técnicas</h2>

      <Card className="app-stitch">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Atalhos rápidos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Acesse rapidamente os materiais e técnicas que você usa no dia a dia, organizados para facilitar sua rotina.</p>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="default" onClick={() => navigate(`/app/dia/${currentDay}?tab=materiais`)}>
              Ver Materiais
            </Button>
            <Button variant="secondary" size="default" onClick={() => navigate(`/app/dia/${currentDay}?tab=tecnicas`)}>
              Ver Técnicas
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>;
}