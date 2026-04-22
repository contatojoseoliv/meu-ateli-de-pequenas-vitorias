import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LessonComment = {
  id: string;
  stage_key: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar: string | null;
  replies?: LessonComment[];
};

type ProfileLite = { user_id: string; display_name: string | null; avatar_url: string | null };

export function useLessonComments(stageKey: string) {
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: rows, error } = await supabase
      .from("lesson_comments")
      .select("*")
      .eq("stage_key", stageKey)
      .order("created_at", { ascending: true });

    if (error || !rows) {
      setComments([]);
      setLoading(false);
      return;
    }

    const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
    let profilesMap = new Map<string, ProfileLite>();
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);
      (profiles ?? []).forEach((p) => profilesMap.set(p.user_id, p as ProfileLite));
    }

    const enriched: LessonComment[] = rows.map((r) => {
      const p = profilesMap.get(r.user_id);
      return {
        ...r,
        author_name: p?.display_name?.trim() || "Aluna",
        author_avatar: p?.avatar_url || null,
      };
    });

    // Estrutura em árvore (1 nível)
    const byParent = new Map<string, LessonComment[]>();
    const top: LessonComment[] = [];
    for (const c of enriched) {
      if (c.parent_id) {
        const arr = byParent.get(c.parent_id) ?? [];
        arr.push(c);
        byParent.set(c.parent_id, arr);
      } else {
        top.push(c);
      }
    }
    top.forEach((t) => {
      t.replies = byParent.get(t.id) ?? [];
    });

    setComments(top);
    setLoading(false);
  }, [stageKey]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id ?? null));
    load();
  }, [load]);

  const addComment = useCallback(
    async (content: string, parentId: string | null = null) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length > 2000) return { error: "Comentário inválido" };
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return { error: "Você precisa estar logada" };

      const { error } = await supabase.from("lesson_comments").insert({
        stage_key: stageKey,
        user_id: uid,
        parent_id: parentId,
        content: trimmed,
      });
      if (error) return { error: error.message };
      await load();
      return { error: null };
    },
    [stageKey, load]
  );

  const deleteComment = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("lesson_comments").delete().eq("id", id);
      if (!error) await load();
      return { error: error?.message ?? null };
    },
    [load]
  );

  return { comments, loading, currentUserId, addComment, deleteComment, reload: load };
}
