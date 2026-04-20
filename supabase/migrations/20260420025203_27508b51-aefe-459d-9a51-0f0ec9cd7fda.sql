-- Storage bucket for lesson videos (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-videos', 'lesson-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Lesson videos: public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'lesson-videos');

CREATE POLICY "Lesson videos: admins can insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'lesson-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Lesson videos: admins can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'lesson-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Lesson videos: admins can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'lesson-videos' AND public.has_role(auth.uid(), 'admin'));

-- Table mapping stage keys to videos
CREATE TABLE public.lesson_videos (
  stage_key text PRIMARY KEY,
  video_path text,
  poster_path text,
  summary text,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.lesson_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lesson videos meta: public read"
ON public.lesson_videos FOR SELECT
USING (true);

CREATE POLICY "Lesson videos meta: admins insert"
ON public.lesson_videos FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Lesson videos meta: admins update"
ON public.lesson_videos FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Lesson videos meta: admins delete"
ON public.lesson_videos FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER lesson_videos_set_updated_at
BEFORE UPDATE ON public.lesson_videos
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();