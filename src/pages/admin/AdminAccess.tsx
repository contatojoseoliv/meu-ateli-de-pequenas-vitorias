import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X as XIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

type AccessRequestRow = {
  id: string;
  user_id: string;
  purchase_email: string;
  note: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string | null;
};

export default function AdminAccess() {
  const qc = useQueryClient();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-access-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("access_requests")
        .select("id, user_id, purchase_email, note, status, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as AccessRequestRow[];
    },
  });

  const pending = useMemo(() => (data ?? []).filter((r) => r.status === "pending"), [data]);
  const decided = useMemo(() => (data ?? []).filter((r) => r.status !== "pending"), [data]);

  const approveMutation = useMutation({
    mutationFn: async (req: AccessRequestRow) => {
      const { error: updateError } = await supabase
        .from("access_requests")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", req.id);
      if (updateError) throw updateError;

      const { error: entError } = await supabase
        .from("entitlements")
        .upsert({ user_id: req.user_id, status: "active", product_code: "primeira-vitoria-amigurumi" });
      if (entError) throw entError;
    },
    onSuccess: async () => {
      toast.success("Acesso liberado.");
      await qc.invalidateQueries({ queryKey: ["admin-access-requests"] });
    },
    onError: () => toast.error("Não foi possível aprovar"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (req: AccessRequestRow) => {
      const { error } = await supabase
        .from("access_requests")
        .update({ status: "rejected", reviewed_at: new Date().toISOString() })
        .eq("id", req.id);
      if (error) throw error;
    },
    onSuccess: async () => {
      toast.message("Solicitação recusada.");
      await qc.invalidateQueries({ queryKey: ["admin-access-requests"] });
    },
    onError: () => toast.error("Não foi possível recusar"),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Acessos</h1>
            <p className="text-muted-foreground mt-1">
              {pending.length} pendentes • {decided.length} finalizadas
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={"h-4 w-4 " + (isFetching ? "animate-spin" : "")} />
            Recarregar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Solicitações pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email de compra</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Nenhuma solicitação pendente
                      </TableCell>
                    </TableRow>
                  ) : (
                    pending.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.purchase_email}</TableCell>
                        <TableCell className="text-muted-foreground">{r.note || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {r.created_at
                            ? new Date(r.created_at).toLocaleString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex gap-2">
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={() => approveMutation.mutate(r)}
                              disabled={approveMutation.isPending || rejectMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => rejectMutation.mutate(r)}
                              disabled={approveMutation.isPending || rejectMutation.isPending}
                            >
                              <XIcon className="h-4 w-4" />
                              Recusar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico (aprovadas/recusadas)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email de compra</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {decided.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                        Ainda não há histórico
                      </TableCell>
                    </TableRow>
                  ) : (
                    decided.slice(0, 50).map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.purchase_email}</TableCell>
                        <TableCell>
                          <span
                            className={
                              "inline-flex px-2 py-1 text-xs rounded-full " +
                              (r.status === "approved"
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive")
                            }
                          >
                            {r.status === "approved" ? "Aprovado" : "Recusado"}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {r.created_at
                            ? new Date(r.created_at).toLocaleString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
