import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import seal from "@/assets/selo-primeira-vitoria-novo.png";

type Props = {
  message?: string;
  actions?: React.ReactNode;
};

const PHRASES = [
  "Mais um pontinho na sua jornada 🧶",
  "Você está construindo algo bonito, pontinho a pontinho ✨",
  "Cada aula concluída é um passo do seu ateliê 💛",
  "Olha você indo, com calma e carinho 🌿",
];

export function LessonCompletionCelebration({ message, actions }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    // Lazy-load canvas-confetti só ao concluir
    import("canvas-confetti")
      .then((mod) => {
        if (cancelled) return;
        const confetti = mod.default;
        const colors = ["#D4A574", "#E8A598", "#9CAF88", "#F5E6D3"];
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.35 },
          colors,
          scalar: 0.9,
          ticks: 180,
        });
        setTimeout(() => {
          if (!cancelled) {
            confetti({
              particleCount: 40,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.5 },
              colors,
              scalar: 0.8,
            });
            confetti({
              particleCount: 40,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.5 },
              colors,
              scalar: 0.8,
            });
          }
        }, 220);
      })
      .catch(() => {
        /* silencioso */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const phrase = message ?? PHRASES[Math.floor(Math.random() * PHRASES.length)];

  return (
    <Card className="app-stitch animate-scale-in">
      <CardContent className="p-6 md:p-8 text-center space-y-4">
        <div className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-2 ring-accent/40 bg-card animate-fade-in">
          <img
            src={seal}
            alt="Selo de conquista"
            className="h-full w-full object-contain"
          />
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-foreground">{phrase}</h3>
        <p className="text-sm text-muted-foreground">Etapa concluída — siga no seu ritmo, sem pressa.</p>
        {actions && (
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
