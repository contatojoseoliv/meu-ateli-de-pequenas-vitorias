import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  canComplete: boolean;
  completed: boolean;
  watched: number;
  threshold: number;
  onComplete: () => void;
  nextHref?: string | null;
  nextLabel?: string;
};

export function LessonStickyMobileCTA({
  canComplete,
  completed,
  watched,
  threshold,
  onComplete,
  nextHref,
  nextLabel,
}: Props) {
  // Se completou e não tem próximo, esconde
  if (completed && !nextHref) return null;

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-40",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]",
        "animate-fade-in"
      )}
      role="region"
      aria-label="Ações da aula"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {!completed && (
          <button
            onClick={onComplete}
            disabled={!canComplete}
            aria-disabled={!canComplete}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full px-4 text-sm font-bold transition-all",
              canComplete
                ? "bg-gradient-to-br from-ocre-dourado to-rosa-argila text-white shadow-cta active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            aria-label={
              canComplete
                ? "Concluir etapa"
                : `Faltam ${Math.max(0, threshold - watched)}% para concluir`
            }
          >
            <Check className="h-4 w-4" />
            {canComplete ? "Concluir" : `${watched}% / ${threshold}%`}
          </button>
        )}
        {nextHref && (
          <Link
            to={nextHref}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-12 rounded-full px-4 text-sm font-bold transition-all",
              completed
                ? "flex-1 bg-gradient-to-br from-ocre-dourado to-rosa-argila text-white shadow-cta active:scale-[0.98]"
                : "border-2 border-verde-eucalipto text-verde-eucalipto bg-background"
            )}
          >
            {nextLabel ?? "Próxima"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
