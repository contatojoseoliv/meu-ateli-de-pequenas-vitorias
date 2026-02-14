import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

type YarnProgressProps = {
  value: number; // 0-100
  className?: string;
  label?: string;
  size?: "sm" | "md";
};

function BunnyMarker({ className }: { className?: string }) {
  // SVG line-art minimalista (leve e fácil de trocar depois)
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-6 w-6", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.5 14.5c-2.2-6.4 1.2-10.5 3.9-11.5 2.2-.8 4.3.6 4.8 3.1.8 4-2.4 8.4-8.7 8.4Z"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 14.5c2.2-6.4-1.2-10.5-3.9-11.5-2.2-.8-4.3.6-4.8 3.1-.8 4 2.4 8.4 8.7 8.4Z"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 28c0-7.2 5.2-13 11.5-13s11.5 5.8 11.5 13c0 8.3-6.1 15-13.7 15-6.8 0-9.3-3.3-9.3-7.2"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4 28.6c.7 1 1.6 1.5 2.6 1.5 1 0 1.9-.5 2.6-1.5"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20 34.3c1.3 1 2.6 1.5 4 1.5 1.4 0 2.7-.5 4-1.5"
        stroke="hsl(var(--foreground) / 0.55)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function YarnProgress({ value, className, label, size = "md" }: YarnProgressProps) {
  const v = clamp(Number.isFinite(value) ? value : 0);
  const h = size === "sm" ? "h-3" : "h-4";
  const marker = size === "sm" ? "h-5 w-5" : "h-6 w-6";

  return (
    <div className={cn("w-full", className)} aria-label={label} role="img">
      <div className={cn("relative w-full rounded-full overflow-hidden", h)}>
        {/* trilha: fio (base) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(45deg, hsl(var(--secondary) / 0.55) 0 8px, hsl(var(--secondary) / 0.25) 8px 16px)",
            filter: "saturate(0.9)",
          }}
        />

        {/* preenchimento: ocre “tecido” */}
        <div
          className="absolute inset-0"
          style={{
            width: `${v}%`,
            background:
              "repeating-linear-gradient(45deg, hsl(var(--accent) / 0.95) 0 8px, hsl(var(--accent) / 0.65) 8px 16px)",
            boxShadow: "0 0 0 1px hsl(var(--accent) / 0.25) inset",
          }}
        />

        {/* brilho suave */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsl(var(--background) / 0.35), transparent)",
          }}
        />
      </div>

      {/* marcador: coelhinho */}
      <motion.div
        className="relative"
        initial={false}
        animate={{ x: `calc(${v}% - 12px)` }}
        transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.6 }}
      >
        <div className={cn("-mt-3", marker)}>
          <BunnyMarker className="drop-shadow-sm" />
        </div>
      </motion.div>
    </div>
  );
}
