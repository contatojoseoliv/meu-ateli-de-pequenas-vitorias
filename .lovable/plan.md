
## Ajustes finais no bloco de aula

### 1. Largura: descrição e comentários alinham com o vídeo

Hoje o `Card` da descrição "Sobre esta aula" e o `LessonComments` ocupam toda a largura do `container-main`, ficando bem mais largos que o player. Vou aplicar a mesma restrição que já existe no bloco título/progresso.

**Em `src/components/app/VideoLessonLayout.tsx`:**
- Envolver o `Card` da descrição **e** o `<LessonComments />` num wrapper com:
  ```tsx
  <div className="mx-auto w-full" style={{ maxWidth: "calc((100svh - 220px) * 16 / 9)" }}>
  ```
- Resultado: vídeo, título/progresso, descrição e comentários ficam todos com a mesma largura máxima, centralizados.

### 2. Celebração compacta com botões nas extremidades

Hoje, no estado concluído, o ícone aparece grande (`h-7 w-7 md:h-8 md:w-8`), a frase está em `text-sm md:text-base` centralizada, e os `completionActions` usam `Button size="default"` (que no `shared/Button` é `px-8 py-4 text-base` — grande demais para esta hierarquia).

**Em `src/components/app/LessonCompletionCelebration.tsx` (variant `inline`):**
- Trocar a área de actions de `flex flex-wrap gap-2 justify-between` para um grid `flex items-center justify-between gap-3 w-full` — sem wrap, garantindo que **um botão fique à esquerda e outro à direita** mesmo em telas estreitas (como já fazemos no estado "assistindo").
- Manter a frase centralizada acima dos botões, em `text-xs md:text-sm` (mais discreta que hoje).

**Em `src/components/app/VideoLessonLayout.tsx`:**
- Trocar o ícone usado no estado concluído de `selo-primeira-vitoria-novo.png` para **`selo-primeira-vitoria-circular.png`** (a florzinha dourada circular usada na página de badges — é a imagem que o usuário pediu).
- Diminuir o tamanho do ícone para `h-5 w-5 md:h-6 md:w-6` (bem pequeno, acima da frase).

**Em `src/pages/app/AppIntro.tsx`, `src/pages/app/AppMateriais.tsx`, `src/pages/app/AppFundamentos.tsx`, `src/pages/app/AppDay.tsx`:**
- Trocar `<Button … size="default">` por `<Button … size="sm">` nos `completionActions`, para que os botões da celebração tenham a **mesma hierarquia visual** dos botões "Concluir etapa / Próxima aula" do estado assistindo (`size="sm"`).

### Como vai ficar

```text
[       vídeo enquadrado       ]

› Comece por aqui                              ← título com chevron à esquerda
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100% · etapa concluída

              🌼                              ← florzinha pequena, centralizada
   Mais um pontinho na sua jornada 🧶         ← frase pequena, centralizada
[ ← Voltar ao início ]      [ Próxima: Materiais → ]   ← sm, extremidades

┌─────── Sobre esta aula  ▾ ───────┐         ← agora respeita largura do vídeo
└──────────────────────────────────┘

┌─────────── Comentários ──────────┐         ← idem
└──────────────────────────────────┘
```

### Fora de escopo
- Texto das frases de celebração e dos botões.
- Layout do vídeo, do header contextual, ou do CTA fixo mobile (já ajustados).
- Cards e ícones em outras páginas (home, badges) — sem alteração.
