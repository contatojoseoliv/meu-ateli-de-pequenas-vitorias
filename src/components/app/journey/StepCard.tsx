import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StepCard({
  title,
  instruction,
  microMessage,
  imageAlt,
}: {
  title: string;
  instruction: string;
  microMessage?: string;
  imageAlt: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-foreground">{instruction}</p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground">Imagem: {imageAlt}</p>
        </div>
        {microMessage ? (
          <p className="text-sm text-muted-foreground">
            <span className="font-handwritten text-base text-foreground">{microMessage}</span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
