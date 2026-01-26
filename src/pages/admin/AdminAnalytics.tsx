import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useScrollDepth,
  useAvgTimeBySection,
  useLeadsByDay,
} from '@/hooks/useAnalyticsData';

type Period = 7 | 30 | 90;

export default function AdminAnalytics() {
  const [period, setPeriod] = useState<Period>(30);

  const { data: leadsByDay, isLoading: leadsLoading } = useLeadsByDay(period);
  const { data: scrollDepth, isLoading: scrollLoading } = useScrollDepth();
  const { data: timeBySection, isLoading: timeLoading } = useAvgTimeBySection();

  // Sessions by day
  const { data: sessionsByDay, isLoading: sessionsLoading } = useQuery({
    queryKey: ['admin-sessions-by-day', period],
    queryFn: async () => {
      const startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('page_analytics')
        .select('session_id, timestamp')
        .eq('event_type', 'page_view')
        .gte('timestamp', startDate.toISOString());

      if (error) throw error;

      // Group by day
      const grouped = (data || []).reduce((acc, item) => {
        const date = new Date(item.timestamp!).toISOString().split('T')[0];
        if (!acc[date]) acc[date] = new Set();
        acc[date].add(item.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      // Fill in missing days
      const result = [];
      for (let i = 0; i < period; i++) {
        const date = new Date(Date.now() - (period - 1 - i) * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        result.push({
          date: dateStr,
          sessions: grouped[dateStr]?.size || 0,
        });
      }

      return result;
    },
  });

  // CTA clicks by type
  const { data: ctaClicks, isLoading: ctaLoading } = useQuery({
    queryKey: ['admin-cta-clicks', period],
    queryFn: async () => {
      const startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('page_analytics')
        .select('metadata')
        .eq('event_type', 'cta_click')
        .gte('timestamp', startDate.toISOString());

      if (error) throw error;

      // Group by CTA type
      const grouped = (data || []).reduce((acc, item) => {
        const ctaId = (item.metadata as any)?.ctaId || 'unknown';
        acc[ctaId] = (acc[ctaId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(grouped)
        .map(([cta, clicks]) => ({ cta: formatCtaName(cta), clicks }))
        .sort((a, b) => b.clicks - a.clicks);
    },
  });

  // Conversion funnel
  const { data: funnel, isLoading: funnelLoading } = useQuery({
    queryKey: ['admin-funnel', period],
    queryFn: async () => {
      const startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('page_analytics')
        .select('event_type, session_id')
        .gte('timestamp', startDate.toISOString());

      if (error) throw error;

      const sessionsByEvent = (type: string) => {
        return new Set(
          (data || []).filter(d => d.event_type === type || d.event_type.startsWith(type)).map(d => d.session_id)
        ).size;
      };

      const pageViews = sessionsByEvent('page_view');
      const scroll50 = sessionsByEvent('scroll_50');
      const scroll75 = sessionsByEvent('scroll_75');
      const ctaClick = sessionsByEvent('cta_click');

      return [
        { stage: 'Visitantes', count: pageViews, percent: 100 },
        { stage: 'Scroll 50%', count: scroll50, percent: pageViews ? Math.round((scroll50 / pageViews) * 100) : 0 },
        { stage: 'Scroll 75%', count: scroll75, percent: pageViews ? Math.round((scroll75 / pageViews) * 100) : 0 },
        { stage: 'Clique CTA', count: ctaClick, percent: pageViews ? Math.round((ctaClick / pageViews) * 100) : 0 },
      ];
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">Análise detalhada de comportamento</p>
          </div>
          <div className="flex gap-2">
            {([7, 30, 90] as Period[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {p} dias
              </Button>
            ))}
          </div>
        </div>

        {/* Sessions vs Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sessões vs Leads por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionsLoading || leadsLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ChartContainer
                config={{
                  sessions: { label: 'Sessões', color: 'hsl(var(--muted-foreground))' },
                  count: { label: 'Leads', color: 'hsl(var(--primary))' },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionsByDay || []}>
                    <XAxis 
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Funil de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              {funnelLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : (
                <div className="space-y-3">
                  {(funnel || []).map((stage, index) => (
                    <div key={stage.stage} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-muted-foreground">{stage.count} ({stage.percent}%)</span>
                      </div>
                      <div className="h-8 bg-muted rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${stage.percent}%`, opacity: 1 - (index * 0.2) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* CTA Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance dos CTAs</CardTitle>
            </CardHeader>
            <CardContent>
              {ctaLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    clicks: { label: 'Cliques', color: 'hsl(var(--accent))' },
                  }}
                  className="h-[250px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ctaClicks || []} layout="vertical">
                      <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="cta" type="category" fontSize={12} tickLine={false} axisLine={false} width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="clicks" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Scroll Depth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engajamento por Scroll</CardTitle>
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
                    <AreaChart data={scrollDepth || []}>
                      <defs>
                        <linearGradient id="colorScroll" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="depth" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorScroll)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Time by Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tempo por Seção</CardTitle>
            </CardHeader>
            <CardContent>
              {timeLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <ChartContainer
                  config={{
                    avgSeconds: { label: 'Segundos', color: 'hsl(var(--secondary))' },
                  }}
                  className="h-[200px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeBySection || []}>
                      <XAxis dataKey="section" fontSize={10} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgSeconds" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

function formatCtaName(cta: string): string {
  const names: Record<string, string> = {
    'hero-cta': 'Hero',
    'oferta-cta': 'Oferta',
    'fechamento-cta': 'Fechamento',
    'exit-intent': 'Exit Intent',
    'sticky-mobile': 'Sticky Mobile',
  };
  return names[cta] || cta;
}
