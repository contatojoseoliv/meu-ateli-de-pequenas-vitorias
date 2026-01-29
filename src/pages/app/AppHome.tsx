import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AppLayout } from "@/components/app/AppLayout";
import { DatePicker } from "@/components/app/DatePicker";
import { JourneyMap } from "@/components/app/JourneyMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJourneyCalendarProgress } from "@/hooks/useJourneyCalendarProgress";

export default function AppHome() {
  const navigate = useNavigate();
  const {
    progress,
    isOnboarded,
    setName,
    setStartDate,
    getSuggestedDay,
    getDayStatus,
  } = useJourneyCalendarProgress();

  const [name, setNameInput] = React.useState(progress?.name ?? "");
  const [startDate, setStartDateInput] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    if (progress?.name) setNameInput(progress.name);
  }, [progress?.name]);

  const suggestedDay = isOnboarded ? getSuggestedDay() : 1;

  function handleStart() {
    const trimmed = name.trim();
    if (!trimmed) {
      toast("Me diz seu nome para eu te guiar por aqui 🙂");
      return;
    }
    if (!startDate) {
      toast("Escolha a data de início para liberar os dias pelo calendário.");
      return;
    }

    console.debug("[AppHome] onboarding:start", {
      name: trimmed,
      startDate: startDate.toISOString(),
    });

    setName(trimmed);
    setStartDate(startDate);

    // Importante: garante que o próximo screen (AppDay) leia o localStorage já preenchido.
    // Isso evita “ping-pong” /app -> /app/dia/1 -> /app por timing.
    queueMicrotask(() => {
      console.debug("[AppHome] onboarding:navigate", { to: "/app/dia/1" });
      navigate("/app/dia/1");
    });
  }

  return (
    <AppLayout
      title={isOnboarded ? `Olá, ${progress?.name}` : "Bem-vinda"}
      subtitle={isOnboarded ? "Seu passo a passo em 7 dias" : "Vamos preparar sua jornada"}
    >
      {!isOnboarded ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Começar sua jornada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Como você quer que eu te chame?</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Seu nome"
                autoComplete="given-name"
              />
            </div>

            <div className="space-y-2">
              <Label>Data de início</Label>
              <DatePicker
                date={startDate}
                onChange={setStartDateInput}
                placeholder="Escolher no calendário"
              />
              <p className="text-xs text-muted-foreground">
                A partir dessa data, o Dia 1 libera no próprio dia, o Dia 2 no dia seguinte, e assim por diante.
              </p>
            </div>

            <Button className="w-full" onClick={handleStart}>
              Entrar no passo a passo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <JourneyMap getDayStatus={getDayStatus} suggestedDay={suggestedDay} />

          <Card>
            <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Continuar agora</p>
                <p className="text-xs text-muted-foreground">
                  Seu dia recomendado no momento: Dia {suggestedDay}
                </p>
              </div>
              <Button
                onClick={() => {
                  const status = getDayStatus(suggestedDay);
                  if (status.status === "locked") {
                    toast("Esse dia ainda está bloqueado pelo calendário. Você pode rever os dias anteriores.");
                    return;
                  }
                  navigate(`/app/dia/${suggestedDay}`);
                }}
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
