import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useTotalSessions(days: number = 30) {
  return useQuery({
    queryKey: ['admin-sessions', days],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('page_analytics')
        .select('session_id', { count: 'exact', head: false })
        .eq('event_type', 'page_view')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      // Count distinct sessions
      const uniqueSessions = new Set(data?.map(d => d.session_id) || []);
      return uniqueSessions.size;
    },
  });
}

export function useTotalLeads() {
  return useQuery({
    queryKey: ['admin-leads-total'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    },
  });
}

export function useLeadsBySource() {
  return useQuery({
    queryKey: ['admin-leads-by-source'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('source');

      if (error) throw error;

      // Group by source
      const grouped = (data || []).reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(grouped).map(([source, count]) => ({
        source,
        count,
        fill: getSourceColor(source),
      }));
    },
  });
}

export function useLeadsByDay(days: number = 30) {
  return useQuery({
    queryKey: ['admin-leads-by-day', days],
    queryFn: async () => {
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('leads')
        .select('created_at')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group by day
      const grouped = (data || []).reduce((acc, item) => {
        const date = new Date(item.created_at!).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Fill in missing days
      const result = [];
      for (let i = 0; i < days; i++) {
        const date = new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        result.push({
          date: dateStr,
          count: grouped[dateStr] || 0,
        });
      }

      return result;
    },
  });
}

export function useScrollDepth() {
  return useQuery({
    queryKey: ['admin-scroll-depth'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_analytics')
        .select('event_type, session_id')
        .like('event_type', 'scroll_%');

      if (error) throw error;

      // Count unique sessions per scroll depth
      const depths = ['scroll_25', 'scroll_50', 'scroll_75', 'scroll_100'];
      const result = depths.map(depth => {
        const sessions = new Set(
          (data || []).filter(d => d.event_type === depth).map(d => d.session_id)
        );
        return {
          depth: depth.replace('scroll_', '') + '%',
          sessions: sessions.size,
        };
      });

      return result;
    },
  });
}

export function useAvgTimeBySection() {
  return useQuery({
    queryKey: ['admin-time-by-section'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_analytics')
        .select('section, metadata')
        .eq('event_type', 'section_view')
        .not('section', 'is', null);

      if (error) throw error;

      // Group by section and calculate average
      const grouped = (data || []).reduce((acc, item) => {
        if (!item.section) return acc;
        const duration = (item.metadata as any)?.duration || 0;
        if (!acc[item.section]) {
          acc[item.section] = { total: 0, count: 0 };
        }
        acc[item.section].total += duration;
        acc[item.section].count += 1;
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      return Object.entries(grouped)
        .map(([section, { total, count }]) => ({
          section: formatSectionName(section),
          avgSeconds: Math.round((total / count) * 10) / 10,
        }))
        .sort((a, b) => b.avgSeconds - a.avgSeconds);
    },
  });
}

export function useRecentLeads(limit: number = 10) {
  return useQuery({
    queryKey: ['admin-recent-leads', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
  });
}

export function useConversionRate() {
  return useQuery({
    queryKey: ['admin-conversion-rate'],
    queryFn: async () => {
      // Get unique sessions
      const { data: sessionsData } = await supabase
        .from('page_analytics')
        .select('session_id')
        .eq('event_type', 'page_view');

      const uniqueSessions = new Set(sessionsData?.map(d => d.session_id) || []);
      const totalSessions = uniqueSessions.size;

      // Get total leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      if (totalSessions === 0) return 0;
      return Math.round(((totalLeads || 0) / totalSessions) * 100 * 100) / 100;
    },
  });
}

// Helper functions
function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    'cta-hero': 'hsl(var(--primary))',
    'cta-oferta': 'hsl(var(--accent))',
    'exit-intent': 'hsl(var(--secondary))',
    'cta-fechamento': 'hsl(var(--muted))',
  };
  return colors[source] || 'hsl(var(--foreground))';
}

function formatSectionName(section: string): string {
  const names: Record<string, string> = {
    hero: 'Hero',
    lead: 'Lead',
    problema: 'Problema',
    solucao: 'Solução',
    prova: 'Prova',
    bullets: 'Bullets',
    oferta: 'Oferta',
    garantia: 'Garantia',
    faq: 'FAQ',
    fechamento: 'Fechamento',
  };
  return names[section] || section;
}
