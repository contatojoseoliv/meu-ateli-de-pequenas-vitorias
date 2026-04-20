import { Link } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  crumb: string; // ex: "Dia 1 · Primeiros pontos"
  position: number; // 1-indexed
  total: number;
  durationLabel?: string | null; // ex: "12:48"
  className?: string;
};

export function LessonContextHeader({ crumb, position, total, durationLabel, className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 text-xs md:text-sm text-muted-foreground", className)}>
      <Link to="/app" className="hover:text-foreground transition-colors story-link">
        Jornada
      </Link>
      <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
      <span className="text-foreground font-medium truncate max-w-[60vw] md:max-w-none">{crumb}</span>

      <span className="ml-auto flex items-center gap-3">
        {durationLabel && (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            <span className="tabular-nums">{durationLabel}</span>
          </span>
        )}
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] md:text-xs font-bold tracking-wide">
          Etapa {position}/{total}
        </span>
      </span>
    </div>
  );
}
