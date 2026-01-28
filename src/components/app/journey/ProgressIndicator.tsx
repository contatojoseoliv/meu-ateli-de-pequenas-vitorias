import { Progress } from "@/components/ui/progress";

export function ProgressIndicator({ day }: { day: number }) {
  const value = Math.round((Math.min(Math.max(day, 1), 7) / 7) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">Dia {day} de 7</p>
        <p className="text-muted-foreground">{value}%</p>
      </div>
      <Progress value={value} />
    </div>
  );
}
