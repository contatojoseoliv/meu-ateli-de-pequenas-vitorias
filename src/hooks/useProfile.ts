import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProfile(userId?: string | null) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    staleTime: 10_000,
  });
}
