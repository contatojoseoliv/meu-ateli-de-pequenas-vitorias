import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  position: number; // 1-indexed
  total: number;
  className?: string;
};

export function LessonContextHeader({ position, total, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-xs md:text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        to="/app"
        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group font-medium"
        aria-label="Voltar para a Jornada"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Jornada
      </Link>

      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] md:text-xs font-bold tracking-wide">
        Etapa {position}/{total}
      </span>
    </div>
  );
}
