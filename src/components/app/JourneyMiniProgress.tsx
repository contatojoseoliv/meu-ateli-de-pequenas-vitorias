import { cn } from "@/lib/utils";
import { YarnProgress } from "@/components/app/YarnProgress";

type JourneyMiniProgressProps = {
  percent: number; // 0-100
  className?: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function JourneyMiniProgress({ percent, className }: JourneyMiniProgressProps) {
  const p = clamp(Number.isFinite(percent) ? percent : 0);

  const allDone = p >= 100;

  return (
    <div className={cn("space-y-1", className)}>
      <YarnProgress size="sm" value={p} />
      <p className="text-[11px] text-muted-foreground">
        {allDone ? "Conquista final desbloqueada." : "Conclua os dias para liberar o selo final."}
      </p>
    </div>
  );
}
