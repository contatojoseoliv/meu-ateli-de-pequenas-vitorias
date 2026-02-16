import { cn } from "@/lib/utils";
import finalSeal from "@/assets/selo-primeira-vitoria-novo.png";
import crochetV from "@/assets/crochet-v-stitch.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type JourneyMiniProgressProps = {
  currentDay: number;
  completedDays: number[];
  percent: number;
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
  const lineProgress = `${p}%`;

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("space-y-1.5", className)}>
        <div className="relative pt-1 pb-0.5">
          {/* trilha */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-secondary" />
          {/* preenchimento */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: lineProgress }}
            aria-hidden="true"
          />

          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${totalNodes}, minmax(0, 1fr))` }}>
            {Array.from({ length: 7 }).map((_, i) => {
              const day = i + 1;
              const completed = isDayCompleted(day);
              const isCurrent = day === currentDay && !completed;

              return (
                <Tooltip key={day}>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center cursor-default" aria-label={completed ? `Dia ${day} concluído` : `Dia ${day}`}>
                      <img
                        src={crochetV}
                        alt=""
                        className={cn(
                          "h-10 w-10 object-contain drop-shadow-sm transition-all duration-300",
                          isCurrent && "drop-shadow-md scale-110",
                          !completed && !isCurrent && "grayscale opacity-40",
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    {completed ? `Dia ${day} ✓` : `Dia ${day}`}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* nó final: selo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center relative z-10">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full border-2 bg-card shadow-md overflow-hidden transition-all duration-300",
                      finalUnlocked
                        ? "border-accent/60 ring-2 ring-accent/30 animate-[pulse_3s_ease-in-out_infinite]"
                        : "border-border opacity-60 grayscale",
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
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {finalUnlocked ? "Primeira Vitória desbloqueada! 🎉" : "Selo de Primeira Vitória"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">
          {finalUnlocked ? "Conquista final desbloqueada! 🎉" : "Conclua todos os dias para liberar o selo de Primeira Vitória."}
        </p>
      </div>
    </TooltipProvider>
  );
}
