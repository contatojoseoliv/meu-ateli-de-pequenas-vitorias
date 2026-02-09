import { cn } from "@/lib/utils";
import {
  Sparkles,
  Scissors,
  BadgeCheck,
  Puzzle,
  Wand2,
  Heart,
} from "lucide-react";

import finalSeal from "@/assets/selo-primeira-vitoria-circular.png";

type JourneyMiniProgressProps = {
  currentDay: number;
  completedDays: number[];
  percent: number; // 0-100
  className?: string;
};

const dayIcons = [Sparkles, Heart, Scissors, Wand2, Puzzle, BadgeCheck];

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function JourneyMiniProgress({ currentDay, completedDays, percent, className }: JourneyMiniProgressProps) {
  const p = clamp(Number.isFinite(percent) ? percent : 0);

  // 7 dias + 1 conquista final (selo)
  const totalNodes = 8;

  // “Progresso de nós”: dia concluído = nó preenchido; conquista final só quando dia 7 concluído
  const isDayCompleted = (day: number) => completedDays.includes(day);
  const finalUnlocked = isDayCompleted(7);

  // Converte percent para uma linha que percorre até o último nó (sem passar do selo)
  const lineProgress = `${(p / 100) * 100}%`;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative pt-1">
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
            const Icon = dayIcons[i] ?? Sparkles;

            return (
              <div key={day} className="flex justify-center">
                <div
                  className={cn(
                    "h-6 w-6 rounded-full border bg-card flex items-center justify-center shadow-sm",
                    completed && "border-accent/50 ring-2 ring-accent/20",
                    isCurrent && "border-accent/60 ring-2 ring-accent/30",
                    !completed && !isCurrent && "border-border",
                  )}
                  aria-label={completed ? `Dia ${day} concluído` : `Dia ${day}`}
                >
                  <Icon
                    className={cn(
                      "h-3 w-3",
                      completed || isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}

          {/* nó final: selo (maior destaque) */}
          <div className="flex justify-center">
            <div
              className={cn(
                "h-11 w-11 rounded-full border bg-card shadow-sm overflow-hidden",
                "ring-2 ring-accent/15",
                finalUnlocked
                  ? "border-accent/70 ring-accent/35 shadow-md"
                  : "border-border opacity-70",
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

      <p className="text-[10px] text-muted-foreground">
        {finalUnlocked ? "Conquista final desbloqueada." : `Conclua os dias para liberar o selo final.`}
      </p>
    </div>
  );
}
