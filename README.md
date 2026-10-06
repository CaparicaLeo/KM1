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

Estão documentadas no topo de `data/event.ts` — em resumo: **data** (01/11/2026)
e **distâncias** (3 km e 5 km) estão resolvidas; **valor da inscrição** está
publicado a partir do regulamento oficial (kit básico R$ 69,90, kit plus
R$ 89,90, + taxas, lote até 23/10/2026); segue em aberto a **idade mínima do
3 km** (o regulamento se contradiz) e o **comercial das peças** (preço e ponto
de venda das meias). Enquanto um dado não for confirmado, ele fica `null` e a
LP cai no estado vazio — nenhum número vira definitivo por conta própria.

## Deploy

Defina `NEXT_PUBLIC_SITE_URL` no ambiente (ver `.env.example`) antes de publicar
em domínio próprio ou preview.
