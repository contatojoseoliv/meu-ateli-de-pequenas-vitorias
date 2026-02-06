import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/shared/Button";
import { getJourneyDay, type DayBlockKey } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";
import { toast } from "@/components/ui/sonner";
import { AppShell } from "@/components/app/AppShell";
import { YarnProgress } from "@/components/app/YarnProgress";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const BLOCK_LABEL: Record<DayBlockKey, string> = {
  preparacao: "Preparação",
  voltas: "Voltas",
  verificacao: "Verificação",
  objetivoFinal: "Objetivo final",
};

const BLOCK_ORDER: DayBlockKey[] = ["preparacao", "voltas", "verificacao", "objetivoFinal"];

export default function AppDay() {
  const params = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const dayNumber = Number(params.day);

  const day = getJourneyDay(dayNumber);
  const { isDayUnlocked, getStepChecked, setStepChecked, completeDay } = useJourneyProgress();

  const unlocked = Number.isFinite(dayNumber) && isDayUnlocked(dayNumber);

  const allSteps = useMemo(() => {
    if (!day) return [];
    return BLOCK_ORDER.flatMap((k) => day.guided[k]);
  }, [day]);

  const total = allSteps.length;
  const checkedCount = useMemo(() => {
    if (!day) return 0;
    return allSteps.reduce((acc, s) => acc + (getStepChecked(day.day, s.id) ? 1 : 0), 0);
  }, [allSteps, day, getStepChecked]);

  const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);
  const canComplete = total > 0 && checkedCount === total;

  if (!day) {
    return (
      <AppShell title="Dia" backTo="/app" backLabel="Jornada">
        <main className="container-main py-10">
          <Card className="app-stitch">
            <CardHeader>
              <CardTitle>Dia não encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/app" className="text-primary hover:underline">Voltar para a Jornada</Link>
            </CardContent>
          </Card>
        </main>
      </AppShell>
    );
  }

  if (!unlocked) {
    return (
      <AppShell title={`Dia ${day.day}`} backTo="/app" backLabel="Jornada">
        <main className="container-main py-10">
          <Card className="app-stitch">
            <CardHeader>
              <CardTitle>Dia {day.day} bloqueado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">Conclua o dia anterior para desbloquear este conteúdo.</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  className="text-sm font-medium text-primary hover:underline"
                  onClick={() => navigate("/app")}
                >
                  Voltar
                </button>
              </div>
            </CardContent>
          </Card>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell title={`Dia ${day.day}`} backTo="/app" backLabel="Jornada">
      <main className="container-main py-8 space-y-5">
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground">Dia {day.day}</p>
              <h1 className="text-3xl font-bold text-foreground">{day.title}</h1>
            </div>
            <div className="min-w-[220px] space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Seu progresso hoje</span>
                <span className="font-medium text-foreground">{percent}%</span>
              </div>
              <YarnProgress value={percent} label="Seu progresso hoje" size="sm" className="pt-1" />
            </div>
          </div>
          <p className="text-muted-foreground">Tempo estimado: {day.estimatedTime}</p>
        </header>

        <Tabs defaultValue="guiado" className="w-full">
          {/* Tabs como mini-botões (pill) */}
          <TabsList className="flex w-full flex-wrap gap-2 bg-transparent p-0 h-auto justify-start">
            <TabsTrigger
              value="guiado"
              className="app-tab-pill h-9 rounded-full px-4 text-sm text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-primary-foreground"
            >
              Guiado
            </TabsTrigger>
            <TabsTrigger
              value="receita"
              className="app-tab-pill h-9 rounded-full px-4 text-sm text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-primary-foreground"
            >
              Receita completa
            </TabsTrigger>
            <TabsTrigger
              value="materiais"
              className="app-tab-pill h-9 rounded-full px-4 text-sm text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-primary-foreground"
            >
              Materiais
            </TabsTrigger>
            <TabsTrigger
              value="tecnicas"
              className="app-tab-pill h-9 rounded-full px-4 text-sm text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-primary-foreground"
            >
              Técnicas e recursos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guiado" className="mt-4">
            <div className="space-y-4">
              {BLOCK_ORDER.map((blockKey) => {
                const steps = day.guided[blockKey];
                if (!steps || steps.length === 0) return null;

                return (
                  <Card key={blockKey} className="app-stitch app-block">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="app-block-label">
                          <span className="font-handwritten text-base text-foreground">{BLOCK_LABEL[blockKey]}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{steps.length} passo{steps.length > 1 ? "s" : ""}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {steps.map((step) => {
                        const checked = getStepChecked(day.day, step.id);
                        return (
                          <div key={step.id} className="flex items-start gap-3">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(v) => setStepChecked(day.day, step.id, Boolean(v))}
                              aria-label={step.text}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-2">
                              <p className={"text-sm leading-relaxed " + (checked ? "text-muted-foreground line-through" : "text-foreground")}>{step.text}</p>

                              {step.tip ? (
                                <div className="app-tip rounded-md border border-border p-3">
                                  <p className="text-sm text-foreground"><span className="font-medium">Dica:</span> {step.tip}</p>
                                </div>
                              ) : null}

                              {step.imagePlaceholderLabel ? (
                                <div className="app-photo-frame rounded-lg border border-border p-4">
                                  <p className="text-xs text-muted-foreground">{step.imagePlaceholderLabel}</p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}

              <div className="pt-2 space-y-2">
                {canComplete ? (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/10 px-3 py-1 text-sm text-foreground"
                    aria-live="polite"
                  >
                    <Sparkles className="h-4 w-4" />
                    Tudo pronto para concluir.
                  </motion.div>
                ) : null}

                <Button
                  variant="primary"
                  size="default"
                  disabled={!canComplete}
                  onClick={() => {
                    completeDay(day.day);
                    toast("Vitória do dia!", {
                      description: "Dia concluído — você merece esse momento.",
                      icon: <Sparkles className="h-4 w-4" />,
                    });
                    const next = Math.min(day.day + 1, 7);
                    navigate(`/app/dia/${next}`);
                  }}
                >
                  Concluir dia
                </Button>
                {!canComplete ? (
                  <p className="text-xs text-muted-foreground">Marque todos os passos para concluir.</p>
                ) : null}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="receita" className="mt-4">
            <Card className="app-stitch">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Receita completa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.tabs.fullRecipe.map((line, idx) => (
                  <p key={idx} className="text-sm text-foreground leading-relaxed">{line}</p>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materiais" className="mt-4">
            <Card className="app-stitch">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Materiais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {day.tabs.materials.map((m, idx) => (
                    <li key={idx} className="text-sm text-foreground">{m}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">Não precisa ser perfeito — dá para fazer com o que você tem.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tecnicas" className="mt-4">
            <Card className="app-stitch">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Técnicas e recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.tabs.techniquesAndResources.map((t, idx) => (
                  <p key={idx} className="text-sm text-foreground leading-relaxed">• {t}</p>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </AppShell>
  );
}