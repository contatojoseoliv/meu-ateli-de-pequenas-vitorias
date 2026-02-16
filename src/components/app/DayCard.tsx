import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DayCardProps = {
  day: number;
  title: string;
  tag: string;
  estimatedTime: string;
  unlocked: boolean;
  completed: boolean;
  href: string;
  isCurrent?: boolean;
};

export function DayCard({
  day,
  title,
  tag,
  estimatedTime,
  unlocked,
  completed,
  href,
  isCurrent,
}: DayCardProps) {
  const rotationClass = day % 2 === 0 ? "md:rotate-[-0.35deg]" : "md:rotate-[0.35deg]";

  const stateClass = completed
    ? "bg-primary/10"
    : isCurrent
      ? "ring-1 ring-accent/45"
      : "";

  const dayVariants = ["mint", "clay", "gold"] as const;
  const dayVariant = dayVariants[(day - 1) % dayVariants.length];
  const dayVariantClass = unlocked ? `app-daycard--${dayVariant}` : "app-daycard--locked";

  return (
    <motion.div
      whileHover={unlocked ? { y: -3, rotate: day % 2 === 0 ? -0.2 : 0.2 } : undefined}
      whileTap={unlocked ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.22 }}
      className={cn(rotationClass, !unlocked && "opacity-65")}
    >
      <Card
        className={cn(
          "app-stitch app-daycard overflow-hidden",
          dayVariantClass,
          completed && "app-daycard--done",
          stateClass,
          unlocked ? "hover-lift" : "cursor-not-allowed",
        )}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Dia {day}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{title}</p>
            </div>

            <div className="shrink-0">
              {completed ? (
                <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              ) : !unlocked ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  {tag}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {unlocked ? (
              <Link
                to={href}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                aria-label={`Abrir o Dia ${day}`}
              >
                Abrir <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground">Bloqueado</p>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{tag}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}