<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KM1 · Etapa São José dos Pinhais — regras do projeto

Site de evento único da Thomé & Santos. **Não depende do repositório do MMIC**
(`CaparicaLeo/MMIC`) e não compartilha código com ele: partes do motor foram
copiadas como ponto de partida e a partir daqui os dois evoluem separados. Não
importe nada de lá, e não "sincronize" mudanças.

## Idioma e estilo

- Copy, comentários e mensagens de commit em **português do Brasil**;
  identificadores em inglês.
- Comentário explica **o porquê**, não o quê. Vários registram medições reais
  (métricas de fonte, conta de padding) — preserve-os ao mover código: são a
  memória das decisões.
- Commits em Conventional Commits (`feat(hero): …`).

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Qualquer texto, número, link ou foto | `data/event.ts` |
| Cor, tipografia, métrica de cartaz | `app/theme.ts` |
| Família tipográfica | `app/fonts.ts` (e **recalibre** `theme.metrics`) |
| Ordem das seções | `app/(site)/page.tsx` |

## Regras que não se quebram

1. **Honestidade de dado.** Número ou data que a Thomé & Santos não confirmou
   fica `null` e o componente cai no estado vazio. Nada de estimativa,
   placeholder que pareça real ou valor emprestado de outra etapa. As pendências
   abertas estão listadas no topo de `data/event.ts`.
2. **Nenhum hex de marca fora de `app/theme.ts`.** O tema é emitido como
   custom properties `--km1-*` e o `@theme` do Tailwind aponta para elas.
   Exceção documentada: `app/icon.svg`, que é arquivo estático e não lê
   custom property.
3. **Copy não mora no JSX.** Headline é `HeadlineLine[]` em `data/event.ts`;
   a quebra de linha é decisão de cartaz, não do navegador.
4. **Métrica de cartaz é medida, não gosto.** Entrelinha e padding de máscara
   saem das métricas da fonte de display. Trocou a família, remeça: caixa alta,
   altura de acento (Á/É/Í/Ã/Ô) e profundidade de cedilha (Ç). A conta está
   comentada em `app/theme.ts`.
5. **Todo CTA de inscrição aponta para a página oficial** (`event.registrationUrl`).
   Não existe checkout nem formulário próprio aqui.
6. **Um `data-*` de reveal por dono.** Bloco que anima os próprios elementos usa
   marcador próprio (ex.: `data-number-reveal`); `data-reveal` é da seção. Dois
   `gsap.from` sobre o mesmo alvo deixam o conteúdo invisível.

## Antes de entregar

```bash
npx tsc --noEmit && npm run lint && npm run build
```
