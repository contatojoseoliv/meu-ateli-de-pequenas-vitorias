import { Users, Eye, TrendingUp, ArrowDown } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import {
  useTotalSessions,
  useTotalLeads,
  useLeadsBySource,
  useLeadsByDay,
  useScrollDepth,
  useAvgTimeBySection,
  useConversionRate,
  useRecentLeads,
} from '@/hooks/useAnalyticsData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];

export default function AdminDashboard() {
  const { data: totalSessions, isLoading: sessionsLoading } = useTotalSessions();
  const { data: totalLeads, isLoading: leadsLoading } = useTotalLeads();
  const { data: conversionRate, isLoading: conversionLoading } = useConversionRate();
  const { data: scrollDepth, isLoading: scrollLoading } = useScrollDepth();
  const { data: leadsBySource, isLoading: sourceLoading } = useLeadsBySource();
  const { data: leadsByDay, isLoading: dayLoading } = useLeadsByDay();
  const { data: timeBySection, isLoading: timeLoading } = useAvgTimeBySection();
  const { data: recentLeads, isLoading: recentLoading } = useRecentLeads(5);

  const avgScroll = scrollDepth && scrollDepth.length > 0
    ? Math.round((scrollDepth.reduce((acc, d) => acc + (parseInt(d.depth) * d.sessions), 0) / 
        scrollDepth.reduce((acc, d) => acc + d.sessions, 0)) || 0)
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral dos últimos 30 dias</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Sessões"
            value={totalSessions ?? 0}
            icon={Eye}
            description="Últimos 30 dias"
            isLoading={sessionsLoading}
          />
          <StatsCard
            title="Leads Capturados"
            value={totalLeads ?? 0}
            icon={Users}
            description="Total geral"
            isLoading={leadsLoading}
          />
          <StatsCard
            title="Taxa de Conversão"
            value={`${conversionRate ?? 0}%`}
            icon={TrendingUp}
            description="Leads / Sessões"
            isLoading={conversionLoading}
          />
          <StatsCard
            title="Scroll Médio"
            value={`${avgScroll}%`}
            icon={ArrowDown}
            description="Profundidade média"
            isLoading={scrollLoading}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Leads por Dia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leads por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              {dayLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    count: { label: 'Leads', color: 'hsl(var(--primary))' },
                  }}
                  className="h-[250px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={leadsByDay || []}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorCount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Leads por Fonte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leads por Fonte</CardTitle>
            </CardHeader>
            <CardContent>
              {sourceLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    count: { label: 'Leads' },
                  }}
                  className="h-[250px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadsBySource || []}
                        dataKey="count"
                        nameKey="source"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ source, percent }) => `${source} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {(leadsBySource || []).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Scroll Depth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribuição de Scroll</CardTitle>
            </CardHeader>
            <CardContent>
              {scrollLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    sessions: { label: 'Sessões', color: 'hsl(var(--primary))' },
                  }}
                  className="h-[200px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scrollDepth || []} layout="vertical">
                      <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="depth" type="category" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Tempo por Seção */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tempo Médio por Seção (segundos)</CardTitle>
            </CardHeader>
            <CardContent>
              {timeLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    avgSeconds: { label: 'Segundos', color: 'hsl(var(--accent))' },
                  }}
                  className="h-[200px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeBySection || []}>
                      <XAxis dataKey="section" fontSize={10} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgSeconds" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
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
                  {(recentLeads || []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhum lead capturado ainda
                      </TableCell>
                    </TableRow>
                  ) : (
                    (recentLeads || []).map((lead) => (
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
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
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
