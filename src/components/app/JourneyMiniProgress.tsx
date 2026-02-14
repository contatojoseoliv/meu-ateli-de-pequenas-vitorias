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

  // SVG circular progress ring
  const size = 64;
  const stroke = 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (p / 100) * circumference;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Selo com anel de progresso */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="absolute inset-0"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Trilha */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--secondary) / 0.4)"
            strokeWidth={stroke}
          />
          {/* Progresso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>

        <img
          src={seloPrimeiraVitoria}
          alt="Selo Primeira Vitória"
          className={cn(
            "absolute inset-0 m-auto rounded-full object-cover transition-all duration-500",
            allDone ? "grayscale-0 opacity-100" : "grayscale opacity-40"
          )}
          style={{ width: size - stroke * 4, height: size - stroke * 4 }}
        />
      </div>

      <div className="min-w-0 space-y-0.5">
        <p className="text-xs font-medium text-foreground">{p}% concluído</p>
        <p className="text-[11px] text-muted-foreground">
          {allDone ? "Conquista final desbloqueada!" : "Conclua os dias para liberar o selo final."}
        </p>
      </div>
    </div>
  );
}
