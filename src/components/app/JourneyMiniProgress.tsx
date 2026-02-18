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
      <div className={cn("space-y-1", className)}>
        <div className="relative flex items-center h-12 md:h-16">
          {/* trilha */}
          <div className="absolute left-0 right-0 h-0.5 rounded-full bg-secondary" />
          {/* preenchimento */}
          <div
            className="absolute left-0 h-0.5 rounded-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: lineProgress }}
            aria-hidden="true"
          />

          <div className="relative grid w-full items-center" style={{ gridTemplateColumns: `repeat(${totalNodes}, minmax(0, 1fr))` }}>
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
                          "h-14 w-14 md:h-20 md:w-20 object-contain drop-shadow-sm transition-all duration-300",
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

            {/* nó final: selo reduzido */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center relative z-10">
                  <div
                    className={cn(
                      "h-10 w-10 md:h-14 md:w-14 rounded-full border-2 bg-card shadow-md overflow-hidden transition-all duration-300",
                      finalUnlocked
                        ? "border-accent/60 ring-2 ring-accent/30"
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

        <p className="text-[11px] md:text-xs text-muted-foreground">
          {finalUnlocked ? "Conquista final desbloqueada! 🎉" : "Conclua todos os dias para liberar o selo de Primeira Vitória."}
        </p>
      </div>
    </TooltipProvider>
  );
}