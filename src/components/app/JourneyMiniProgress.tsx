import { cn } from "@/lib/utils";
import finalSeal from "@/assets/selo-primeira-vitoria-circular.png";

type JourneyMiniProgressProps = {
  currentDay: number;
  completedDays: number[];
  percent: number;
  className?: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function CrochetStitchV({ completed, isCurrent }: { completed: boolean; isCurrent: boolean }) {
  const strokeColor = completed || isCurrent
    ? "hsl(var(--accent))"
    : "hsl(var(--muted-foreground) / 0.35)";
  const strokeWidth = completed ? 3 : 2.5;

  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "drop-shadow-sm",
        isCurrent && "drop-shadow-md",
        !completed && !isCurrent && "opacity-50",
      )}
    >
      {/* Left leg */}
      <path
        d="M4 3 C6 8, 10 16, 14 21"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right leg */}
      <path
        d="M24 3 C22 8, 18 16, 14 21"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small loop at top-left */}
      <circle cx="4" cy="3" r="1.5" fill={strokeColor} />
      {/* Small loop at top-right */}
      <circle cx="24" cy="3" r="1.5" fill={strokeColor} />
    </svg>
  );
}

export function JourneyMiniProgress({ currentDay, completedDays, percent, className }: JourneyMiniProgressProps) {
  const p = clamp(Number.isFinite(percent) ? percent : 0);
  const totalNodes = 8;
  const isDayCompleted = (day: number) => completedDays.includes(day);
  const finalUnlocked = isDayCompleted(7);
  const lineProgress = `${p}%`;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative pt-2 pb-1">
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
              <div key={day} className="flex justify-center" aria-label={completed ? `Dia ${day} concluído` : `Dia ${day}`}>
                <CrochetStitchV completed={completed} isCurrent={isCurrent} />
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
