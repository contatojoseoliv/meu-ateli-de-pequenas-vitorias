import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2, Upload, Check, AlertCircle } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const STAGES: { key: string; label: string }[] = [
  { key: "intro-0", label: "Introdução — Comece por aqui" },
  { key: "intro-1", label: "Introdução — Materiais" },
  { key: "intro-2", label: "Introdução — Fundamentos" },
  { key: "day-1", label: "Dia 1 — Primeiros pontos" },
  { key: "day-2", label: "Dia 2" },
  { key: "day-3", label: "Dia 3" },
  { key: "day-4", label: "Dia 4" },
  { key: "day-5", label: "Dia 5" },
  { key: "day-6", label: "Dia 6" },
  { key: "day-7", label: "Dia 7" },
];

const SIZE_WARN_MB = 50;

type Row = {
  stage_key: string;
  video_path: string | null;
  poster_path: string | null;
  summary: string | null;
};

export default function AdminVideos() {
  const { user, isAdmin, isLoading } = useAdminAuth();
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const { data } = await supabase.from("lesson_videos").select("stage_key, video_path, poster_path, summary");
      const map: Record<string, Row> = {};
      (data ?? []).forEach((r) => { map[r.stage_key] = r as Row; });
      setRows(map);
      setLoading(false);
    })();
  }, [isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold">Vídeos das aulas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Envie um vídeo, opcionalmente um poster e o resumo de cada uma das 10 etapas.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {STAGES.map((s) => (
              <StageRow
                key={s.key}
                stageKey={s.key}
                label={s.label}
                row={rows[s.key]}
                onSaved={(updated) => setRows((prev) => ({ ...prev, [s.key]: updated }))}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StageRow({
  stageKey,
  label,
  row,
  onSaved,
}: {
  stageKey: string;
  label: string;
  row: Row | undefined;
  onSaved: (r: Row) => void;
}) {
  const [video, setVideo] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);
  const [summary, setSummary] = useState(row?.summary ?? "");
  const [saving, setSaving] = useState(false);

  const currentVideoUrl = row?.video_path
    ? supabase.storage.from("lesson-videos").getPublicUrl(row.video_path).data.publicUrl
    : null;

  const handleSave = async () => {
    setSaving(true);
    try {
      let video_path = row?.video_path ?? null;
      let poster_path = row?.poster_path ?? null;

      if (video) {
        const ext = video.name.split(".").pop() || "mp4";
        const path = `${stageKey}/video-${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from("lesson-videos")
          .upload(path, video, { upsert: true, contentType: video.type });
        if (error) throw error;
        video_path = path;
      }

      if (poster) {
        const ext = poster.name.split(".").pop() || "jpg";
        const path = `${stageKey}/poster-${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from("lesson-videos")
          .upload(path, poster, { upsert: true, contentType: poster.type });
        if (error) throw error;
        poster_path = path;
      }

      const payload = {
        stage_key: stageKey,
        video_path,
        poster_path,
        summary: summary || null,
      };

      const { data, error } = await supabase
        .from("lesson_videos")
        .upsert(payload, { onConflict: "stage_key" })
        .select("stage_key, video_path, poster_path, summary")
        .single();

      if (error) throw error;

      onSaved(data as Row);
      setVideo(null);
      setPoster(null);
      toast("Salvo", { description: `${label} atualizada.`, icon: <Check className="h-4 w-4" /> });
    } catch (e: any) {
      toast("Erro ao salvar", { description: e.message, icon: <AlertCircle className="h-4 w-4" /> });
    } finally {
      setSaving(false);
    }
  };

  const sizeWarn = video && video.size > SIZE_WARN_MB * 1024 * 1024;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">{stageKey}</span>
          {label}
          {row?.video_path && (
            <span className="text-xs text-primary inline-flex items-center gap-1">
              <Check className="h-3 w-3" /> publicado
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentVideoUrl && (
          <video src={currentVideoUrl} controls className="w-full max-w-md rounded-md bg-black" preload="metadata" />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor={`v-${stageKey}`}>Vídeo (.mp4)</Label>
            <Input
              id={`v-${stageKey}`}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
            />
            {sizeWarn && (
              <p className="text-xs text-amber-600">
                Arquivo &gt; {SIZE_WARN_MB}MB — considere comprimir (ex.: handbrake) para melhor reprodução.
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`p-${stageKey}`}>Poster (opcional)</Label>
            <Input
              id={`p-${stageKey}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setPoster(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`s-${stageKey}`}>Resumo / descrição</Label>
          <Textarea
            id={`s-${stageKey}`}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            placeholder="Texto curto exibido abaixo do vídeo."
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
