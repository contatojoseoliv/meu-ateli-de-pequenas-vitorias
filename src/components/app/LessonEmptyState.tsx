import { Link } from "react-router-dom";
import { Lock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/shared/Button";

type Props =
  | {
      kind: "locked";
      previousLabel?: string;
      previousHref?: string;
    }
  | {
      kind: "coming-soon";
    };

export function LessonEmptyState(props: Props) {
  if (props.kind === "locked") {
    return (
      <Card className="app-stitch app-daycard app-daycard--locked">
        <CardContent className="p-8 md:p-10 text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-xl text-foreground">Esta aula ainda está fechada</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {props.previousLabel
              ? `Conclua "${props.previousLabel}" para abrir esta aula com calma.`
              : "Conclua a etapa anterior para liberar esta aula."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {props.previousHref ? (
              <Link to={props.previousHref}>
                <Button variant="primary" size="default">
                  Ir para {props.previousLabel ?? "etapa anterior"} →
                </Button>
              </Link>
            ) : (
              <Link to="/app">
                <Button variant="ghost" size="default">Voltar</Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="app-stitch">
      <CardContent className="p-8 md:p-10 text-center space-y-4">
        <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary" aria-hidden />
        </div>
        <h3 className="font-serif text-xl text-foreground">Esta aula está sendo preparada</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Estamos finalizando este vídeo com carinho. Volte em breve 💛
        </p>
      </CardContent>
    </Card>
  );
}
