import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MistakeAlertBox({
  mistakes,
}: {
  mistakes: { situation: string; cause: string; fix: string }[];
}) {
  return (
    <Alert>
      <AlertTitle>Erros comuns (e como se salvar)</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-2">
          {mistakes.map((m, i) => (
            <li key={i} className="text-sm">
              <span className="font-medium">{m.situation}:</span> {m.cause}.{" "}
              <span className="text-muted-foreground">{m.fix}.</span>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
