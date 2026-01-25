
Contexto do pedido (confirmado)
- Inserir uma nova dobra logo abaixo da frase “É assim que a mente finalmente desacelera e o corpo relaxa.”, separando bem o conteúdo.
- Usar a imagem “Mapa ilustrado (quadrado)” como destaque visual nessa nova dobra.
- Criar dois CTAs (um permanece no bloco verde; outro abaixo da imagem).
- Fundo da nova dobra: “Cinza Nuvem (papel)”.
- Ajustar “as caixinhas”: especificamente as 3 caixinhas de benefícios dentro do bloco “Por isso criamos o Primeira Vitória…” (MetodoPrimeiraVitoria).

Exploração rápida (onde mexer)
- A frase e o CTA do bloco verde estão em: `src/components/sections/Solucao.tsx` (DOBRA 1, verde).
- O bloco “Por isso criamos…” e as 3 caixinhas de benefícios estão em: `src/components/sections/solucao/MetodoPrimeiraVitoria.tsx`.
- O componente `Section` já suporta `background="cinza"` para Cinza Nuvem: `src/components/shared/Section.tsx`.

Decisões de implementação (seguindo manual de marca)
1) Nova dobra “papel” em Cinza Nuvem
- Criar uma nova `<Section background="cinza">` inserida em `Solucao.tsx` logo após o CTA do bloco verde e antes da dobra branca `#metodo`.
- Objetivo visual: parecer uma “dobra” própria (respiro, separação clara, hierarquia editorial).

2) Inserção da imagem (Mapa ilustrado)
- Copiar o upload `user-uploads://Gemini_Generated_Image_a4f8f7a4f8f7a4f8.png` para `src/assets/` (ex.: `src/assets/mapa-ilustrado-amigurumi.png`).
- Importar a imagem via ES module no `Solucao.tsx` e renderizar dentro dessa nova dobra com:
  - um container central (max-width controlado)
  - moldura “papel premium”: `rounded-2xl`, `border`, `shadow-suave`, `bg-background`
  - `img` com `object-contain` e `loading="lazy"`
  - responsivo (não estourar no mobile; manter boa leitura no desktop)

3) Dois CTAs
- Manter o CTA existente no bloco verde (já está funcionando com scroll para `#metodo` via `handleVerMetodo`).
- Adicionar um segundo CTA no final da nova dobra “papel”, reutilizando o mesmo handler `handleVerMetodo` (mesma âncora, consistência de conversão).
- O botão deve seguir o manual:
  - CTA em Ocre Dourado apenas no componente de botão (já é o padrão do `Button variant="primary"`), sem usar ocre em textos ou fundos grandes.

4) Ajuste das 3 caixinhas de benefícios (MetodoPrimeiraVitoria)
- Ajustar as classes das 3 caixinhas em `MetodoPrimeiraVitoria.tsx` para ficarem mais “clean/premium” como referência do print:
  - aumentar respiro: `px/py` maiores (ex.: `p-6` ou `px-6 py-5`)
  - raio mais premium: `rounded-2xl` (em vez de `rounded-xl`)
  - fundo mais “papel”: `bg-background` (remover transparência /60 para ficar mais sólido no Cinza Nuvem/Rosa Argila)
  - borda mais sutil e consistente com o manual: `border border-border`
  - sombra leve: `shadow-suave` e `hover-lift` para refinamento
  - tipografia:
    - título: `font-semibold text-foreground`
    - complemento: `text-muted-foreground`
    - ajustar `leading` para ficar legível sem “apertar” (evitar `leading-snug` no bloco inteiro; usar no máximo no título)
  - ícone check:
    - manter o círculo, mas com acabamento mais suave: `bg-cinza-nuvem` ou `bg-secondary/20` e borda `border-border`
    - check em Verde Eucalipto/primary (`text-primary`) para consistência (sem ocre)

5) Ajuste leve de paleta/consistência na Solução (apenas o necessário)
- Conferir se algum elemento dentro dessa sequência (frase → nova dobra → CTAs) está usando Ocre fora de conversão.
- Se necessário, trocar o destaque do “número grande” (em mecanismos) para uma cor permitida pelo manual (ex.: `text-white/35` ou `text-verde-eucalipto-30`) mantendo o CTA como único ponto em Ocre. (Só aplico se estiver claramente competindo visualmente com CTA ou quebrando a regra do Ocre.)

Sequência de trabalho (para implementar em Default mode)
1) Assets
- Copiar a imagem do `user-uploads://...png` para `src/assets/`.
- Validar import funcionando.

2) Nova dobra em `src/components/sections/Solucao.tsx`
- Importar imagem.
- Inserir nova `<Section background="cinza">` entre a DOBRA 1 (verde) e a DOBRA 2 (branca `#metodo`).
- Construir layout:
  - título curto (H3 serif) + subtítulo (body) opcionais para guiar a leitura
  - card/moldura com a imagem centralizada
  - CTA 2 abaixo da imagem, centralizado, usando `Button variant="primary" size="lg"` e `onClick={handleVerMetodo}`

3) Ajustar 3 caixinhas de benefícios em `src/components/sections/solucao/MetodoPrimeiraVitoria.tsx`
- Atualizar estilos conforme “clean/premium” (padding, radius, bg sólido, borda, sombra, tipografia).
- Garantir consistência com a paleta do manual (sem ocre fora de CTA).

4) Revisão visual (preview)
- Verificar em 3 breakpoints (mobile/tablet/desktop):
  - separação clara entre as dobras
  - imagem bem dimensionada (sem cortar; sem ficar enorme demais)
  - o segundo CTA aparece naturalmente após a imagem
  - ritmo vertical: frase do verde → CTA verde → nova dobra → CTA 2 → método

Critérios de aceite (como saber que ficou certo)
- A frase final do bloco verde continua como “fechamento” emocional do mecanismo.
- A nova dobra “papel” em Cinza Nuvem cria uma pausa clara e elegante e traz a imagem como reforço visual.
- Existem dois CTAs: um no verde e um logo após a imagem.
- As 3 caixinhas de benefícios estão mais premium (mais respiro, bordas/sombras suaves, tipografia limpa e consistente).
- Ocre Dourado permanece restrito aos elementos de conversão (botões), sem virar cor dominante de layout.

Notas técnicas (para manter o projeto organizado)
- Preferir `src/assets/` para a imagem (importável e otimizada pelo bundler).
- Reutilizar `handleVerMetodo` para os dois botões (evita duplicação e mantém comportamento consistente).
- Manter headings com semântica coerente (H2/H3 conforme a hierarquia existente no projeto).
