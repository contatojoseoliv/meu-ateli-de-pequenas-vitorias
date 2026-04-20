-- Atualiza senha e confirma email do usuário admin
UPDATE auth.users
SET encrypted_password = crypt('2aHH54er', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE id = '293ca175-cb64-4cd8-8c6a-64a0b54b793f';

-- Garante papel de admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('293ca175-cb64-4cd8-8c6a-64a0b54b793f', 'admin')
ON CONFLICT DO NOTHING;