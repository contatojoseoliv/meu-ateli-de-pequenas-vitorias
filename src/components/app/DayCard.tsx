import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DayCardProps = {
  day: number;
  title: string;
  tag?: string;
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
  return (
    <motion.div
      whileHover={unlocked ? { y: -3 } : undefined}
      whileTap={unlocked ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.22 }}
      className={cn("h-full", !unlocked && "opacity-65")}
    >
      <Card
        className={cn(
          "app-daycard overflow-hidden h-full min-h-[140px]",
          completed && "app-daycard--done",
          !unlocked && "app-daycard--locked",
          isCurrent && "app-daycard--current",
          unlocked ? "hover-lift" : "cursor-not-allowed",
        )}
      >
        <CardContent className="p-4 flex flex-col h-full justify-between space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Dia {day}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{title}</p>
            </div>

            <div className="shrink-0">
              {completed ? (
                <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              ) : !unlocked && (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}