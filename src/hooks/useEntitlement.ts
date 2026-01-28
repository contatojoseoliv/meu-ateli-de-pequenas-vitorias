import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEntitlement(userId?: string | null) {
  return useQuery({
    queryKey: ["entitlement", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return { hasAccess: false };

      const { data, error } = await supabase
        .from("entitlements")
        .select("status, product_code")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      return { hasAccess: !!data && data.status === "active", entitlement: data ?? null };
    },
    staleTime: 10_000,
  });
}
