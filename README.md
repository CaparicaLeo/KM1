# KM1 · Etapa São José dos Pinhais

Landing page da etapa de São José dos Pinhais do circuito KM1, organizado pela
**Thomé & Santos — Eventos Esportivos**.

Projeto próprio e independente: Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS v4 e GSAP. Não compartilha código nem deploy com o site da Meia
Maratona Internacional de Curitiba.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
```

## Verificar antes de entregar

```bash
npx tsc --noEmit && npm run lint && npm run build
```

## Estrutura

```
app/
  theme.ts          # ÚNICA fonte dos hexes de marca + métricas de cartaz
  fonts.ts          # Saira Condensed (display), Archivo, Archivo Narrow
  globals.css       # tokens do Tailwind apontando para o tema; utilities
  (site)/page.tsx   # a home é a composição das seções
data/event.ts       # TODO o conteúdo: copy, números, links, fotos, FAQ
components/
  blocks/           # os padrões do deck: big-number, icon-grid, card-list, impact
  sections/         # as seções da home, só compondo blocos
  ui/               # primitivas (Section, Headline, CTAButton, Accordion…)
lib/                # gsap, presets de animação, formatação
public/images/      # logo e fotos do evento
```

## Pendências de conteúdo

Estão documentadas no topo de `data/event.ts` — em resumo: **data**,
**distâncias**, **idade mínima por prova** e **valor da inscrição** aguardam
confirmação da Thomé & Santos. Enquanto isso, a LP não publica nenhum desses
números como definitivo: os CTAs mandam para a página oficial de inscrição, que
é a fonte que vale.

## Deploy

Defina `NEXT_PUBLIC_SITE_URL` no ambiente (ver `.env.example`) antes de publicar
em domínio próprio ou preview.
