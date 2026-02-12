import { cn } from "@/lib/utils";
import {
  Sprout,
  Package,
  BookOpen,
  Circle,
  ArrowUp,
  Layers,
  ChevronDown,
  Lock,
  Rabbit,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { YarnProgress } from "@/components/app/YarnProgress";
import finalSeal from "@/assets/selo-primeira-vitoria-circular.png";

type JourneyMiniProgressProps = {
  currentDay: number;
  completedDays: number[];
  introCompleted: number[];
  percent: number; // 0-100
  className?: string;
};

const stageIcons: LucideIcon[] = [
  Sprout,     // intro 0
  Package,    // intro 1
  BookOpen,   // intro 2
  Circle,     // dia 1
  ArrowUp,    // dia 2
  Layers,     // dia 3
  ChevronDown,// dia 4
  Lock,       // dia 5
  Rabbit,     // dia 6
  Sparkles,   // dia 7
];

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function JourneyMiniProgress({ currentDay, completedDays, introCompleted, percent, className }: JourneyMiniProgressProps) {
  const p = clamp(Number.isFinite(percent) ? percent : 0);

  const totalNodes = 11; // 10 stages + 1 seal

  const isNodeCompleted = (idx: number) => {
    if (idx < 3) return introCompleted.includes(idx);
    return completedDays.includes(idx - 2); // idx 3 → day 1, idx 4 → day 2, etc.
  };

  const finalUnlocked = completedDays.includes(7);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Yarn progress bar */}
      <YarnProgress size="sm" value={p} />

      {/* Nodes */}
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${totalNodes}, minmax(0, 1fr))` }}>
        {stageIcons.map((Icon, idx) => {
          const completed = isNodeCompleted(idx);
          const isCurrent = !completed && (
            idx < 3
              ? idx === introCompleted.length
              : (idx - 2) === currentDay
          );

          return (
            <div key={idx} className="flex justify-center">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border bg-card flex items-center justify-center shadow-sm",
                  completed && "border-accent/50 ring-2 ring-accent/20",
                  isCurrent && "border-accent/60 ring-2 ring-accent/30",
                  !completed && !isCurrent && "border-border",
                )}
                aria-label={completed ? `Etapa ${idx + 1} concluída` : `Etapa ${idx + 1}`}
              >
                <Icon
                  size={14}
                  className={cn(
                    completed || isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}

        {/* Final seal node */}
        <div className="flex justify-center">
          <div
            className={cn(
              "h-7 w-7 rounded-full border bg-card shadow-sm overflow-hidden",
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

      <p className="text-[11px] text-muted-foreground">
        {finalUnlocked ? "Conquista final desbloqueada." : "Conclua os dias para liberar o selo final."}
      </p>
    </div>
  );
}
