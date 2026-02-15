import { cn } from "@/lib/utils";

import finalSeal from "@/assets/selo-primeira-vitoria-circular.png";
import seloIcon from "@/assets/selo-vitoria-icon.png";

type JourneyMiniProgressProps = {
  currentDay: number;
  completedDays: number[];
  percent: number; // 0-100
  className?: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function JourneyMiniProgress({ currentDay, completedDays, percent, className }: JourneyMiniProgressProps) {
  const p = clamp(Number.isFinite(percent) ? percent : 0);

  const totalNodes = 8;
  const isDayCompleted = (day: number) => completedDays.includes(day);
  const finalUnlocked = isDayCompleted(7);
  const lineProgress = `${(p / 100) * 100}%`;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative pt-2">
        {/* trilha */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-secondary" />
        {/* preenchimento */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-accent transition-[width]"
          style={{ width: lineProgress }}
          aria-hidden="true"
        />

        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${totalNodes}, minmax(0, 1fr))` }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const day = i + 1;
            const completed = isDayCompleted(day);
            const isCurrent = day === currentDay && !completed;

            return (
              <div key={day} className="flex justify-center">
                <div
                  className={cn(
                    "h-7 w-7 rounded-full border shadow-sm overflow-hidden",
                    completed && "border-accent/50 ring-2 ring-accent/20",
                    isCurrent && "border-accent/60 ring-2 ring-accent/30",
                    !completed && !isCurrent && "border-border",
                  )}
                  aria-label={completed ? `Dia ${day} concluído` : `Dia ${day}`}
                >
                  <img
                    src={seloIcon}
                    alt=""
                    className={cn(
                      "h-full w-full object-cover",
                      !completed && !isCurrent && "grayscale opacity-40",
                    )}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}

          {/* nó final: selo */}
          <div className="flex justify-center">
            <div
              className={cn(
                "h-8 w-8 rounded-full border bg-card shadow-sm overflow-hidden",
                finalUnlocked ? "border-accent/60 ring-2 ring-accent/30" : "border-border opacity-60",
              )}
              aria-label={finalUnlocked ? "Conquista final desbloqueada" : "Conquista final"}
            >
              <img
                src={finalSeal}
                alt="Selo da conquista final"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        {finalUnlocked ? "Conquista final desbloqueada." : "Conclua todos os dias para liberar o selo de Primeira Vitória."}
      </p>
    </div>
  );
}