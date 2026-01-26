import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Download } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

export default function AdminLeads() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-all-leads', page, search],
    queryFn: async () => {
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (search) {
        query = query.or(`email.ilike.%${search}%,nome.ilike.%${search}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { leads: data || [], total: count || 0 };
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  const exportCSV = () => {
    if (!data?.leads.length) return;

    const headers = ['Email', 'Nome', 'Fonte', 'Data'];
    const rows = data.leads.map(lead => [
      lead.email,
      lead.nome || '',
      lead.source,
      new Date(lead.created_at!).toISOString(),
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground mt-1">
              {data?.total || 0} leads capturados
            </p>
          </div>
          <Button onClick={exportCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <CardTitle className="text-lg flex-1">Lista de Leads</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por email ou nome..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Fonte</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.leads || []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          {search ? 'Nenhum lead encontrado' : 'Nenhum lead capturado ainda'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      (data?.leads || []).map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.email}</TableCell>
                          <TableCell>{lead.nome || '-'}</TableCell>
                          <TableCell>
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                              {lead.source}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(lead.created_at!).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Página {page + 1} de {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                      >
                        Próxima
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
