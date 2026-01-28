import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAppAuth } from "@/hooks/useAppAuth";
import { useEntitlement } from "@/hooks/useEntitlement";
import { AppLayout } from "@/components/app/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  purchase_email: z.string().trim().email("Email de compra inválido"),
  note: z.string().trim().max(400, "Mensagem muito longa").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function AppAccess() {
  const navigate = useNavigate();
  const { user, isLoading } = useAppAuth();
  const { data: entitlement, isLoading: entitlementLoading, refetch } = useEntitlement(user?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastStatus, setLastStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!isLoading && !user) navigate("/app/login", { replace: true });
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (entitlement?.hasAccess) navigate("/app", { replace: true });
  }, [entitlement?.hasAccess, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("access_requests")
      .select("status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setLastStatus(data?.status ?? null));
  }, [user]);

  const statusMessage = useMemo(() => {
    if (lastStatus === "approved") return "Aprovado — você já deve conseguir entrar.";
    if (lastStatus === "rejected") return "Sua solicitação foi recusada. Se quiser, envie novamente.";
    if (lastStatus === "pending") return "Solicitação pendente — assim que aprovarmos, você entra automaticamente.";
    return null;
  }, [lastStatus]);

  const onSubmit = async (values: FormData) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        purchase_email: values.purchase_email.trim().toLowerCase(),
        note: values.note?.trim() ? values.note.trim() : null,
      };

      const { error } = await supabase.from("access_requests").insert(payload);
      if (error) {
        toast.error("Não foi possível enviar sua solicitação");
        return;
      }

      toast.success("Pedido enviado. Respire — já já liberamos pra você.");
      setLastStatus("pending");
      await refetch();
    } catch {
      toast.error("Não foi possível enviar sua solicitação");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || entitlementLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Aguardando liberação</h1>
          <p className="text-muted-foreground mt-2">
            Seu acesso é liberado manualmente após a compra (MVP). É rapidinho.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Solicitar liberação</CardTitle>
            <CardDescription>
              Use o email que você informou na compra. Se tiver dúvida, escreva uma notinha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchase_email">Email de compra</Label>
                <Input id="purchase_email" type="email" placeholder="voce@exemplo.com" {...register("purchase_email")} />
                {errors.purchase_email && (
                  <p className="text-sm text-destructive">{errors.purchase_email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Mensagem (opcional)</Label>
                <Textarea id="note" placeholder="Ex: paguei no pix hoje de manhã" {...register("note")} />
                {errors.note && <p className="text-sm text-destructive">{errors.note.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar pedido"
                )}
              </Button>
            </form>

            {statusMessage && <p className="mt-4 text-sm text-muted-foreground">Status: {statusMessage}</p>}

            <div className="mt-6">
              <Button variant="outline" className="w-full" onClick={() => refetch()}>
                Recarregar status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
