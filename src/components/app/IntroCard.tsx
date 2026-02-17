import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { INTRO_CARDS as INTRO_CARDS_DATA } from "@/content/introCards";
import { YarnBallIcon, CrochetHookIcon, StitchIcon } from "./CrochetIcons";

type IntroCardProps = {
  cardIndex: number;
  unlocked: boolean;
  completed: boolean;
  className?: string;
};

export function IntroCard({ cardIndex, unlocked, completed, className }: IntroCardProps) {
  const data = INTRO_CARDS_DATA[cardIndex];
  if (!data) return null;

  const routes = ["/app/comecar", "/app/materiais", "/app/fundamentos"];
  const href = routes[cardIndex] ?? "/app/comecar";

  const renderIcon = () => {
    const iconClass = "w-5 h-5 text-primary";
    switch (data.iconName) {
      case "yarn": return <YarnBallIcon className={iconClass} />;
      case "hook": return <CrochetHookIcon className={iconClass} />;
      case "stitch": return <StitchIcon className={iconClass} />;
      default: return <span className="text-lg">{data.emoji}</span>;
    }
  };

  // Locked
  if (!unlocked) {
    return (
      <div className={cn("h-full", className)}>
        <Card className="app-stitch app-daycard app-daycard--locked overflow-hidden h-full min-h-[140px] opacity-60">
          <CardContent className="p-4 flex flex-col h-full justify-between space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="opacity-40">{renderIcon()}</div>
                  <p className="text-sm font-medium text-muted-foreground">{data.title}</p>
                </div>
                <p className="text-sm text-muted-foreground/60 line-clamp-2">{data.description}</p>
              </div>
              <div className="shrink-0">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40">Bloqueado</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Completed or active
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22 }}
      className={cn("h-full", className)}
    >
      <Card className={cn(
        "app-stitch app-daycard overflow-hidden hover-lift h-full min-h-[140px]",
        completed ? "app-daycard--done" : `app-daycard--intro ${data.tintClass}`
      )}>
        <CardContent className="p-4 flex flex-col h-full justify-between space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                {renderIcon()}
                <p className="text-sm font-medium text-foreground">{data.title}</p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{data.description}</p>
            </div>
            <div className="shrink-0">
              {completed && (
                <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              aria-label={`Abrir: ${data.title}`}
            >
              {completed ? "Rever" : "Abrir"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}