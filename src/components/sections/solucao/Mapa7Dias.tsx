import seloPrimeiraVitoria from "../../../assets/selo-primeira-vitoria-mapa.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import {
  Check,
  Package,
  Sparkles,
  Hand,
  Puzzle,
  Heart,
  Scissors,
  PartyPopper,
  Medal,
  type LucideProps,
} from "lucide-react";

import type { ComponentType } from "react";

type Step = {
  day: number;
  label: string;
  icon: ComponentType<LucideProps>;
  tooltipTitle: string;
  tooltipBody: string;
};

const steps: Step[] = [
  {
    day: 1,
    label: "Preparação",
    icon: Package,
    tooltipTitle: "Dia 1 — Preparação",
    tooltipBody: "Materiais (menos de R$ 35) + primeiros pontos + mentalidade.",
  },
  {
    day: 2,
    label: "Pontos",
    icon: Hand,
    tooltipTitle: "Dia 2 — Criação guiada",
    tooltipBody: "10–15min. Uma etapa por dia, sem sobrecarga.",
  },
  {
    day: 3,
    label: "Forma",
    icon: Puzzle,
    tooltipTitle: "Dia 3 — Criação guiada",
    tooltipBody: "Você sempre sabe o próximo passo.",
  },
  {
    day: 4,
    label: "Detalhes",
    icon: Sparkles,
    tooltipTitle: "Dia 4 — Criação guiada",
    tooltipBody: "Construção em partes: pequenas vitórias." ,
  },
  {
    day: 5,
    label: "Expressão",
    icon: Heart,
    tooltipTitle: "Dia 5 — Criação guiada",
    tooltipBody: "Sem autocrítica brutal: erro é normal.",
  },
  {
    day: 6,
    label: "Montagem",
    icon: Scissors,
    tooltipTitle: "Dia 6 — Criação guiada",
    tooltipBody: "Última etapa antes da finalização.",
  },
  {
    day: 7,
    label: "Finalização",
    icon: PartyPopper,
    tooltipTitle: "Dia 7 — Finalização",
    tooltipBody: "Costura invisível + acabamentos + celebração.",
  },
];

const StepNode = ({ step }: { step: Step }) => {
  const Icon = step.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="group relative flex flex-col items-center gap-3 min-w-[140px] md:min-w-[0] snap-center focus:outline-none"
          aria-label={step.tooltipTitle}
        >
          {/* Nó */}
          <div className="relative grid place-items-center w-14 h-14 rounded-full bg-muted border border-border shadow-sm transition-transform duration-200 group-hover:scale-[1.03]">
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary/30 border border-border grid place-items-center text-foreground text-xs font-bold">
              {step.day}
            </span>
            <Icon className="w-6 h-6 text-primary" />
          </div>

          {/* Legenda curta */}
          <div className="text-center">
            <p className="text-foreground font-semibold text-sm leading-tight">{step.label}</p>
          </div>
        </button>
      </TooltipTrigger>

      <TooltipContent className="max-w-[260px]">
        <div className="space-y-1">
          <p className="font-semibold">{step.tooltipTitle}</p>
          <p className="text-sm opacity-90">{step.tooltipBody}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const Mapa7Dias = () => {
  return (
    <TooltipProvider>
      <div className="mb-20">
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            Como funciona na prática — <span className="text-rosa-argila">Mapa de 7 dias</span>
          </h3>
          <p className="text-muted-foreground mt-2">10–15 min por dia. Sem sobrecarga.</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Moldura */}
          <div className="relative rounded-2xl border border-border bg-muted/40 p-6 md:p-10 overflow-hidden">
            {/* Linha conectora (desktop) */}
            <div className="hidden md:block absolute left-10 right-28 top-[62px] h-px bg-border" />

            {/* Trilho */}
            <div className="flex md:grid md:grid-cols-[repeat(7,1fr)_auto] items-start gap-6 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0">
              {/* Etiqueta DIAS 2-6 (desktop) */}
              <div className="hidden md:block absolute left-[calc(10%+1rem)] right-[calc(20%+1rem)] top-3 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-border px-4 py-1 text-foreground text-xs font-semibold">
                  <Check className="w-4 h-4" /> DIAS 2–6 • Criação guiada
                </span>
              </div>

              {steps.map((step) => (
                <StepNode key={step.day} step={step} />
              ))}

              {/* Chegada / selo */}
              <div className="relative flex flex-col items-center gap-3 min-w-[160px] md:min-w-[0] snap-center">
                <div className="hidden md:block absolute -left-6 top-[32px] w-12 h-px bg-border" />

                <div className="w-[76px] h-[76px] rounded-full bg-background border border-border grid place-items-center overflow-hidden">
                  <img
                    src={seloPrimeiraVitoria}
                    alt="Selo Primeira Vitória em Amigurumi"
                    className="w-[64px] h-[64px] object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="text-center">
                  <p className="text-foreground font-semibold text-sm leading-tight">Sua primeira vitória</p>
                  <p className="text-muted-foreground text-xs">Amigurumi completo</p>
                </div>

                <div className="inline-flex items-center gap-2 text-muted-foreground text-xs">
                  <Medal className="w-4 h-4" /> Chegada
                </div>
              </div>
            </div>

            {/* Etiqueta DIAS 2-6 (mobile) */}
            <div className="md:hidden mt-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-border px-4 py-1 text-foreground text-xs font-semibold">
                <Check className="w-4 h-4" /> DIAS 2–6 • Criação guiada
              </span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export { Mapa7Dias };
