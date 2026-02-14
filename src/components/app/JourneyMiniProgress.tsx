import { cn } from "@/lib/utils";
import seloPrimeiraVitoria from "@/assets/selo-primeira-vitoria-circular.png";

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
    <div className={cn("flex items-center gap-3", className)}>
      {/* Barra de progresso + texto */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-foreground">{p}% concluído</p>
          <p className="text-[11px] text-muted-foreground">
            {allDone ? "Conquista desbloqueada! ✨" : "Sua meta"}
          </p>
        </div>

        {/* Trilha */}
        <div className="relative h-2.5 w-full rounded-full overflow-hidden bg-secondary/40">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${p}%`,
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))",
            }}
          />
        </div>

        <p className="text-[11px] text-muted-foreground leading-tight">
          {allDone
            ? "Parabéns! Você conquistou o selo Primeira Vitória."
            : "Conclua todas as etapas para conquistar o selo."}
        </p>
      </div>

      {/* Selo final (meta visual) */}
      <div className="shrink-0 relative">
        <div
          className={cn(
            "rounded-full overflow-hidden ring-2 transition-all duration-500",
            allDone
              ? "ring-primary/50 shadow-[0_0_16px_hsl(var(--primary)/0.25)]"
              : "ring-secondary/40"
          )}
        >
          <img
            src={seloPrimeiraVitoria}
            alt="Selo Primeira Vitória"
            className={cn(
              "h-16 w-16 sm:h-[72px] sm:w-[72px] object-cover transition-all duration-500",
              allDone ? "grayscale-0 opacity-100" : "grayscale opacity-35"
            )}
          />
        </div>

        {/* Brilho sutil quando completo */}
        {allDone && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
