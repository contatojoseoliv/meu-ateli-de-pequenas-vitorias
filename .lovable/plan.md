

# Melhorar o Card de Progresso (Card 1)

## Resumo das mudancas

O card 1 ("Mini-bloco de entrada") sera mais compacto e visualmente refinado, com o novo selo de Primeira Vitoria, texto atualizado e melhorias de interatividade.

---

## 1. Salvar o novo asset do selo

Copiar a imagem enviada para `src/assets/selo-primeira-vitoria-novo.png` e usá-la como selo final na barra de progresso.

## 2. Reduzir altura do Card 1

- Diminuir padding do `CardHeader` e `CardContent` (de `p-4` para `p-3`)
- Reduzir o tamanho dos marcadores V de `h-14 w-14` para `h-8 w-8`
- Reduzir o selo final de `h-14 w-14` para `h-10 w-10`
- Remover `space-y-2` extra, deixando o card mais "flat"

## 3. Atualizar o selo final

- Trocar o import de `selo-primeira-vitoria-circular.png` pelo novo asset enviado
- Manter a logica de desbloqueio (grayscale quando bloqueado, colorido quando concluido)

## 4. Atualizar os textos

Titulo do progresso:
```
Meu Progresso para o Primeiro Amigurumi - {percent}% concluido
```

Texto inferior:
```
Conclua todos os dias para liberar o selo de Primeira Vitoria.
```

O titulo substituira a linha separada de "Meu progresso" + porcentagem, consolidando tudo em uma unica linha mais descritiva.

## 5. Melhorias visuais e interativas

- **Tooltip nos marcadores V**: ao passar o mouse (hover) em cada V, exibir um tooltip com "Dia X" (usando o componente Tooltip ja existente no projeto)
- **Transicao suave de progresso**: adicionar `duration-500 ease-out` na animacao da barra de preenchimento
- **Micro-animacao no selo**: quando `finalUnlocked`, aplicar uma leve animacao de pulso (CSS `animate-pulse` sutil) para chamar atencao
- **Linha de progresso mais fina**: reduzir de `h-1` para `h-0.5` para visual mais delicado/minimalista
- **Saudacao simplificada**: mover o titulo do CardHeader para uma unica linha dentro do CardContent, eliminando o CardHeader separado para reduzir altura

## Detalhes tecnicos

**Arquivos modificados:**
- `src/assets/selo-primeira-vitoria-novo.png` (novo asset)
- `src/components/app/JourneyMiniProgress.tsx` (marcadores menores, novo selo, tooltips, animacoes)
- `src/pages/app/AppHome.tsx` (card 1 mais compacto, texto consolidado)

**Estrutura do Card 1 apos mudancas:**

```text
+-----------------------------------------------+
| Bem-vinda ao Meu Atelie, {nome}!              |
| Meu Progresso para o Primeiro Amigurumi - 57% |
|                                                |
| V---V---V---V---V---V---V---[SELO]             |
|                                                |
| Conclua todos os dias para liberar o selo...   |
+-----------------------------------------------+
```

Cada V tera tooltip no hover. O selo tera borda dourada e pulso quando desbloqueado. A linha sera fina e elegante.
