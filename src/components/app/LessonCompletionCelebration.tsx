import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import seal from "@/assets/selo-primeira-vitoria-novo.png";

type Props = {
  message?: string;
  actions?: React.ReactNode;
  variant?: "inline" | "card";
};

const PHRASES = [
  "Mais um pontinho na sua jornada 🧶",
  "Você está construindo algo bonito, pontinho a pontinho ✨",
  "Cada aula concluída é um passo do seu ateliê 💛",
  "Olha você indo, com calma e carinho 🌿",
];

export function LessonCompletionCelebration({ message, actions, variant = "card" }: Props) {
  const phrase = message ?? PHRASES[Math.floor(Math.random() * PHRASES.length)];

  if (variant === "inline") {
    return (
      <div className="space-y-3 animate-fade-in">
        <p className="text-sm md:text-base text-foreground text-center">
          {phrase}
        </p>
        {actions && (
          <div className="flex flex-wrap gap-2 justify-between items-center">
            {actions}
          </div>
        )}
      </div>
    );
  }

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
        <h3 className="font-serif text-xl md:text-2xl text-foreground flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          {phrase}
        </h3>
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
