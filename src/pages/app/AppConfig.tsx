import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AppLayout } from "@/components/app/AppLayout";
import { DatePicker } from "@/components/app/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJourneyCalendarProgress } from "@/hooks/useJourneyCalendarProgress";

export default function AppConfig() {
  const navigate = useNavigate();
  const {
    isOnboarded,
    progress,
    startDate,
    setName,
    setStartDate,
    resetJourney,
  } = useJourneyCalendarProgress();

  const [name, setNameInput] = React.useState(progress?.name ?? "");
  const [date, setDate] = React.useState<Date | undefined>(startDate ?? undefined);

  React.useEffect(() => {
    if (progress?.name) setNameInput(progress.name);
  }, [progress?.name]);

  React.useEffect(() => {
    if (startDate) setDate(startDate);
  }, [startDate]);

  if (!isOnboarded) return <Navigate to="/app" replace />;

  return (
    <AppLayout title="Configurações" subtitle="Ajuste seu nome e sua data de início">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seus dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={name} onChange={(e) => setNameInput(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Data de início</Label>
              <DatePicker date={date} onChange={setDate} />
              <p className="text-xs text-muted-foreground">
                Alterar a data muda quais dias ficam disponíveis hoje.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => {
                  const trimmed = name.trim();
                  if (!trimmed) {
                    toast("Seu nome não pode ficar vazio.");
                    return;
                  }
                  if (!date) {
                    toast("Escolha uma data válida.");
                    return;
                  }
                  setName(trimmed);
                  setStartDate(date);
                  toast("Configurações salvas.");
                }}
              >
                Salvar
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  resetJourney();
                  toast("Jornada reiniciada.");
                  navigate("/app", { replace: true });
                }}
              >
                Reiniciar jornada
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
