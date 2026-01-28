import { Card, CardContent } from "@/components/ui/card";

export function CalmNote({ text }: { text: string }) {
  return (
    <Card className="border-secondary/40">
      <CardContent className="p-4">
        <p className="text-sm text-foreground">
          <span className="font-handwritten text-lg">Respira.</span> {text}
        </p>
      </CardContent>
    </Card>
  );
}
