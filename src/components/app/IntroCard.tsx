import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type IntroCardProps = {
  href: string;
  className?: string;
};

export function IntroCard({ href, className }: IntroCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, rotate: 0.2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22 }}
      className={cn("md:rotate-[-0.25deg]", className)}
    >
      <Card className={cn("app-stitch app-daycard app-daycard--intro app-daycard--seal overflow-hidden hover-lift")}> 
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Comece por aqui</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Uma introdução rápida para você se sentir segura antes do Dia 1.
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Introdução
              </span>
            </div>
          </div>

          <Link
            to={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            aria-label="Abrir introdução: Comece por aqui"
          >
            Abrir <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
