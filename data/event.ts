import { formatEventDate, formatEventDateShort } from "@/lib/format";

import type {
  BigNumber,
  CardItem,
  Cta,
  FaqItem,
  HeadlineLine,
  IconItem,
  Media,
  MiniKpi,
  NavItem,
  Product,
  SectionIntro,
} from "./types";

/**
 * ============================================================================
 * KM1 · Etapa São José dos Pinhais — configuração única do site.
 * ============================================================================
 *
 * Tudo que é conteúdo mora neste arquivo. Componente não guarda copy, número
 * nem link.
 *
 * REGRA DE HONESTIDADE (vale para quem editar depois):
 * dado não confirmado pela Thomé & Santos fica `null` e o componente cai no
 * estado vazio. Não preencha com estimativa, com valor de outra etapa nem com
 * placeholder que pareça real — a LP é a promessa que o atleta lê antes de
 * pagar.
 *
 * PENDÊNCIAS ABERTAS (setembro/2026):
 *
 * 1. DATA — RESOLVIDO: 01/11/2026, largada 07:00, liberado pela Thomé & Santos
 *    em 09/09/2026. Três fontes batiam: a página oficial de inscrição e o
 *    JSON-LD dela, o data/events.js do site institucional e a arte de capa do
 *    Instagram da etapa ("01 / 11" em chapa amarela). O 30/08/2026 que aparecia
 *    no Corrida360 e num snapshot indexado é remarcação antiga — se reaparecer
 *    em algum material, está errado.
 *
 * 2. DISTÂNCIAS — RESOLVIDO: 3 km e 5 km, confirmado pela Thomé & Santos em
 *    09/09/2026. O levantamento de terceiros (Corrida360) trazia 3 km e 7 km,
 *    que é o par da etapa Guaratuba — a confirmação bate com o data/events.js
 *    do site institucional, que já descrevia esta etapa como 3 km e 5 km.
 *    Fica registrado porque material antigo com "7 km" circula por aí.
 *
 * 3. IDADE MÍNIMA — 5 km RESOLVIDO em 06/10/2026: 16 anos. Os itens 1.1, 8.2
 *    e a tabela de categorias 10.1 do regulamento batem, e o FAQ publica o
 *    consenso. O 3 km continua em aberto: o documento ainda se contradiz
 *    (1.1 e 10.2 dizem 14 anos, 8.2 diz 13) e o site não escolhe um dos dois
 *    lados — o FAQ explica e manda para /regulamento, que mostra o texto ao
 *    vivo (ver `regulamentoSource`). No dia em que o documento sair
 *    contradizendo-se, `minAge` do 3 km volta a ser publicado em uma linha.
 *
 * 4. PRODUTOS OFICIAIS — as peças (camiseta, meias) vieram dos mockups
 *    aprovados no Drive da Thomé & Santos. O moletom saiu da página a pedido
 *    (a arte segue em public/images/produtos/moletom.png). Falta o comercial:
 *    se as meias são vendidas, onde e por quanto. Enquanto `price` e `url`
 *    forem null, os cards mostram a peça e mandam a pessoa para a organização —
 *    nenhum preço e nenhum botão de compra são inventados. A camiseta ganhou
 *    o badge "No kit plus" (o kit básico do regulamento 5.1 não a inclui).
 *
 * 5. VALOR DA INSCRIÇÃO — publicado em 06/10/2026, a partir do regulamento
 *    oficial (itens 5.1 e 8.8), a mesma fonte viva que /regulamento exibe:
 *    kit básico R$ 69,90 e kit plus R$ 89,90, ambos + taxas, lote de 06/04 a
 *    23/10/2026, com as 3.000 vagas do item 8.1. O número sai sempre com a
 *    ressalva de que o valor válido no dia da compra é o da página oficial —
 *    e se o documento mudar, `kit.price` e o FAQ mudam junto.
 */

export const event = {
  /** Como o evento se chama na página oficial de inscrição. */
  name: "KM1 · Etapa São José dos Pinhais",
  shortName: "KM1 São José dos Pinhais",
  /** Circuito e temporada — usados no rodapé e no header. */
  circuit: { slug: "km1", name: "Circuito KM1", season: "2026" },
  organizer: {
    name: "Thomé & Santos — Eventos Esportivos",
    url: "https://www.thomeesantos.com.br",
  },

  /**
   * ISO 8601 com o fuso de Brasília. Zerar para null devolve a LP ao estado
   * sem data (hero, rodapé, FAQ e JSON-LD deixam de exibi-la) — o caminho de
   * volta continua sendo uma linha.
   */
  date: "2026-11-01T07:00:00-03:00" as string | null,
  /** Usado quando não há data: mantido para o caso de a etapa ser remarcada. */
  dateLabel: "Edição 2026",
  /** Horário de largada declarado na página oficial de inscrição. */
  startTime: "07:00" as string | null,

  location: {
    venue: "Praça do Verbo Divino",
    street: "R. Veríssimo Marques, 55",
    district: "Centro",
    city: "São José dos Pinhais",
    state: "PR",
    postalCode: "83005-410",
    region: "Região Metropolitana de Curitiba",
  },

  /**
   * Link oficial de inscrição (TicketSports). É o destino de TODO CTA da
   * página — não existe formulário próprio nem lista de espera aqui.
   *
   * Aponta direto para a escolha de modalidade (categoria.aspx), e não para a
   * página de divulgação do evento (/e/corrida-km-1-...-86470): tira um clique
   * do caminho até o carrinho.
   *
   * ATENÇÃO (rechecado em 06/10/2026): esta URL ainda devolvia a tarja
   * "Preview para aprovação — as inscrições realizadas nesta página são
   * exclusivamente para testes, sem validade, e serão canceladas
   * automaticamente". A organização informou que a inscrição está aprovada
   * para venda — mas, no mesmo dia, a tarja continuava no ar. Reconfirme a
   * URL (e a ausência do aviso) com a TicketSports antes do deploy: enquanto
   * a tarja estiver lá, o link serve para homologação, não para venda.
   */
  registrationUrl:
    "https://site.ticketsports.com.br/Inscricao/categoria.aspx?__idEvento=86470&origem=novo-site&lang=pt-BR",

  /**
   * Marca do KM1: PNG transparente com lettering amarelo — o valor medido no
   * arquivo está anotado em app/theme.ts, que é onde mora cor de marca. Só
   * funciona sobre fundo escuro. Arte em baixa resolução
   * (202×82) — pedir o vetor para a Thomé & Santos antes de usar em tamanho
   * maior que ~100px de largura.
   */
  logo: {
    src: "/images/km1-logo.png",
    alt: "KM1",
    width: 202,
    height: 82,
  } satisfies Media,

  /** Foto de uma edição anterior do KM1 em São José dos Pinhais. */
  hero: {
    src: "/images/km1-sao-jose-dos-pinhais-noturna.jpg",
    alt: "Largada do KM1 em São José dos Pinhais, à noite, com o pelotão sob a estrutura iluminada",
    width: 1600,
    height: 1600,
  } satisfies Media,

  /** Segunda foto da mesma edição — pelotão em corrida, formato retrato. */
  photo: {
    src: "/images/km1-sao-jose-dos-pinhais-pelotao.jpg",
    alt: "Pelotão do KM1 em São José dos Pinhais durante a prova",
    width: 900,
    height: 1600,
  } satisfies Media,

  ogImage: {
    src: "/images/km1-sao-jose-dos-pinhais.jpg",
    alt: "KM1 · Etapa São José dos Pinhais",
    width: 1600,
    height: 1067,
  } satisfies Media,
} as const;

/** Endereço em uma linha — usado no hero, no rodapé e no JSON-LD. */
export const fullAddress = `${event.location.venue} — ${event.location.street}, ${event.location.district}, ${event.location.city} - ${event.location.state}, ${event.location.postalCode}`;

/**
 * Rótulos de data, derivados de `event.date` num lugar só.
 *
 * Com `event.date` null, `long` e `short` são null e `label` cai no
 * "Edição 2026" — é isso que mantém a LP inteira coerente quando a data sai do
 * ar, sem condicional espalhada por componente.
 */
export const eventDate = {
  long: event.date ? formatEventDate(event.date) : null,
  short: event.date ? formatEventDateShort(event.date) : null,
  label: event.date
    ? `${formatEventDate(event.date)}${event.startTime ? ` · largada ${event.startTime}` : ""}`
    : event.dateLabel,
};

/** Domínio de produção, usado quando o ambiente não declara um. */
const fallbackSiteUrl = "https://km1.thomeesantos.com.br";

/**
 * Normaliza o que vier de NEXT_PUBLIC_SITE_URL.
 *
 * O `??` sozinho não dava conta: variável declarada na Vercel sem valor chega
 * como string VAZIA, e "" não é null nem undefined — o build de produção morria
 * em `new URL("")` (`ERR_INVALID_URL`) ao coletar /_not-found, enquanto local,
 * sem a variável, passava. Daí a checagem por conteúdo, e não por existência.
 *
 * Também aceita host sem protocolo (é a forma como `$VERCEL_URL` chega) e tira
 * a barra final, para canonical, sitemap e OG não divergirem por um "/".
 *
 * Valor irrecuperável cai no domínio de produção em vez de derrubar o build:
 * um canonical errado se conserta com rebuild, um deploy que não sobe, não.
 */
function resolveSiteUrl(value: string | undefined) {
  const raw = value?.trim();
  if (!raw) return fallbackSiteUrl;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    // `pathname` preservado (permite o site num subcaminho), sem a barra final;
    // query e hash não fazem sentido num domínio base e ficam de fora.
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return fallbackSiteUrl;
  }
}

/**
 * Domínio público do site. Alimenta metadataBase, Open Graph, canonical,
 * sitemap e robots — um valor errado aqui propaga para todos de uma vez. Em
 * preview, defina NEXT_PUBLIC_SITE_URL (ver .env.example).
 */
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * Descrição canônica: alimenta metadata, Open Graph e JSON-LD. O preço entra
 * aqui porque é o dado que decide o clique na SERP — e é o mesmo de
 * `kit.price` (regulamento 8.8). Contado: 154 chars com data, 139 sem — o
 * teto é 155 para não ser truncada.
 */
export const seoDescription = event.date
  ? `KM1 · Etapa São José dos Pinhais: corrida de rua de 3 km e 5 km em ${eventDate.short}, a partir de R$ 69,90, na Praça do Verbo Divino. Organização Thomé & Santos.`
  : "KM1 · Etapa São José dos Pinhais: corrida de rua de 3 km e 5 km na Praça do Verbo Divino, a partir de R$ 69,90. Organização Thomé & Santos.";

/**
 * CTA de inscrição.
 *
 * "Inscreva-se" porque a venda está liberada (informado pela Thomé & Santos
 * em 06/10/2026): o botão promete o que a página do TicketSports entrega. Se
 * o evento voltar para lista de espera ou esgotar, o rótulo volta a ser
 * genérico — é a única linha a mudar.
 */
export const registrationCta = {
  label: "Inscreva-se",
  href: event.registrationUrl,
  note: "Você vai para o TicketSports, o canal oficial de inscrição da Thomé & Santos.",
} satisfies Cta;

/* ---------------------------------------------------------------------------
 * Regulamento oficial (fonte viva, sem transcrição)
 * ------------------------------------------------------------------------- */

/**
 * Documento público do regulamento no Google Docs, enviado pela Thomé &
 * Santos. O site NÃO transcreve o texto: a página /regulamento busca o
 * documento a cada visita e renderiza o que ele disser naquele momento.
 * Quem edita é a organização, uma vez; o site acompanha. Mudou o documento,
 * mudou a página — trocar o `docId` é trocar a fonte inteira em uma linha.
 *
 * O documento tem erros de escrita e contradições internas que chegam vivos
 * à página (ex.: "três (2) modalidades" em 3.3; idade mínima do 3 km — 1.1
 * diz 14 anos, 8.2 diz 13). O site não corrige: a Thomé & Santos não pode
 * revisar uma versão divergente, e corrigir aqui criaria exatamente essa
 * versão. O texto exibido é o do documento, erros inclusos.
 */
export const regulamentoSource = {
  docId: "1a1NJO4qt9LKgqRmige8pmvX-4d4GF0xp",
  /** Export em texto plano — o documento é público, funciona sem login. */
  exportUrl: "https://docs.google.com/document/d/1a1NJO4qt9LKgqRmige8pmvX-4d4GF0xp/export?format=txt",
  /** Abre o documento para leitura no próprio Google Docs. */
  viewUrl: "https://docs.google.com/document/d/1a1NJO4qt9LKgqRmige8pmvX-4d4GF0xp/edit",
} as const;

/** Export em texto plano consumido por lib/regulamento.ts. */
export const regulamentoExportUrl = regulamentoSource.exportUrl;

/** Conteúdo da página /regulamento (copy em data, nunca no JSX). */
export const regulamentoPage = {
  intro: {
    eyebrow: "Regulamento oficial",
    title: "O documento da etapa",
    description:
      "O texto abaixo é o regulamento oficial da Thomé & Santos, carregado direto do Google Docs. Qualquer ajuste feito pela organização no documento aparece aqui — sem cópia intermediária.",
  } satisfies SectionIntro,
  sourceNote:
    "Fonte: documento oficial no Google Docs, editável pela organização.",
  emptyState: {
    eyebrow: "Regulamento oficial",
    title: "Documento indisponível no momento",
    description:
      "Não foi possível carregar o texto agora. O regulamento vigente é o da página oficial de inscrição — é o documento que vale no dia da prova.",
  } satisfies SectionIntro,
};

/* ---------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: `${event.location.city} · ${event.location.state} · ${eventDate.short ?? event.dateLabel}`,
  /**
   * Headline como segmentos: o amarelo é aplicado por dado, e ajustar a
   * quebra de linha (que é decisão de cartaz, não do navegador) é mexer só
   * aqui. Os acentos de "SÃO JOSÉ" e "QUILÔMETRO" são o teste de máscara das
   * métricas em app/theme.ts — se um dia eles aparecerem decepados, o
   * problema é lá, não aqui.
   *
   * Cada linha precisa caber em uma linha de verdade na tela: se a copy
   * crescer e o navegador quebrar dentro da máscara, as duas linhas passam a
   * subir juntas no reveal e o efeito de cartaz se perde. Medido no teto do
   * clamp (6rem, em 1440px): ~20 caracteres por linha.
   */
  headlineLines: [
    [{ text: "São José dos Pinhais" }],
    [{ text: "corre o " }, { text: "primeiro", accent: true }],
    [{ text: "quilômetro", accent: true }, { text: "." }],
  ] satisfies HeadlineLine[],
  /** Versão em uma linha — vira o <h1> e alimenta o SEO. */
  headline: `${event.name}`,
  subheadline:
    "Uma corrida de rua para quem está começando e para quem corre há anos: 3 km e 5 km saindo da Praça do Verbo Divino, no Centro.",
  /**
   * Preço e prazo acima da dobra: é a informação que decide o clique, e ela
   * não pode esperar a seção do kit. Fonte: regulamento 8.8 (conferido em
   * 06/10/2026). Cabe numa linha em 390px; se um dia a primeira tela apertar
   * no notebook de 900px (restrição documentada no clamp do HeroSection),
   * esta linha é a primeira suspeita — ou cai para a subheadline.
   */
  priceNote: "Inscrição a partir de R$ 69,90 + taxas · lote até 23/10/2026",
  scrollHint: "Role para ver as provas",
  marquee: [
    eventDate.short ?? event.dateLabel,
    "3 KM",
    "5 KM",
    "CORRIDA E CAMINHADA",
    "SÃO JOSÉ DOS PINHAIS",
    "CIRCUITO KM1",
  ],
};

/* ---------------------------------------------------------------------------
 * Slide de impacto (fundo amarelo, texto preto)
 * ------------------------------------------------------------------------- */

export const impact = {
  lines: [
    [{ text: "Todo corredor" }],
    [{ text: "tem um km 1." }],
  ] satisfies HeadlineLine[],
  support:
    "O primeiro quilômetro é o mais difícil de começar e o único que ninguém esquece. O KM1 existe para ele.",
};

/* ---------------------------------------------------------------------------
 * Medalha 3D (ao lado do slide de impacto)
 * ------------------------------------------------------------------------- */

export const medal = {
  /**
   * Modelo final da medalha — ainda NÃO entregue. O arquivo tem de seguir
   * docs/medalha-3d.md (escala, orientação, peso) para encaixar na cena.
   */
  modelUrl: "/models/medalha.glb",
  /**
   * `true` enquanto o .glb não existe: a seção mostra a medalha procedural e
   * nem tenta baixar o arquivo (nada de 404 no console). Com o .glb em
   * public/models/, troque para `false`. Se o arquivo faltar ou falhar, a cena
   * volta sozinha para a procedural — a página não quebra.
   */
  usePlaceholder: true,
  /**
   * Descreve o que está na tela sem prometer a arte oficial: enquanto
   * `usePlaceholder` for true, a medalha é ilustração da marca, não a medalha
   * temática da etapa (que a organização ainda não divulgou).
   */
  alt: "Ilustração em 3D de uma medalha com a marca KM1. Arraste para os lados ou use as setas para girar.",
  hint: "Arraste para girar",
};

/* ---------------------------------------------------------------------------
 * Provas (card-list)
 * ------------------------------------------------------------------------- */

export const races = {
  intro: {
    eyebrow: "As provas",
    title: "Duas distâncias, uma largada",
    description:
      "Largada e chegada na Praça do Verbo Divino, no Centro de São José dos Pinhais.",
  } satisfies SectionIntro,
  /**
   * `minAge` fica de fora dos cards de propósito (pendência 3): a idade mínima
   * diverge entre as fontes e quem decide é o regulamento oficial. O FAQ
   * explica e manda para lá.
   */
  items: [
    {
      id: "3km",
      eyebrow: "Prova 01",
      icon: "pin",
      title: "Corrida e caminhada",
      badge: "3 KM",
      description:
        "A distância de quem está estreando, de quem vem em família e de quem prefere caminhar o percurso inteiro.",
      meta: ["Aberta a caminhada", "Percurso no Centro"],
    },
    {
      id: "5km",
      eyebrow: "Prova 02",
      icon: "pin",
      title: "Corrida",
      badge: "5 KM",
      description:
        "A prova principal da etapa, para quem já treina e quer fechar o percurso no ritmo.",
      meta: ["Cronometragem oficial", "Percurso no Centro"],
      featured: true,
    },
  ] satisfies CardItem[],
  /** Repetido embaixo dos cards: é a informação que o atleta mais procura. */
  venueNote: fullAddress,
  /**
   * Mapa do percurso no MapMyRun, enviado pela organização em 10/09/2026.
   * É um link só: o rótulo não diz de qual distância é, porque isso não veio
   * junto. Chegando um mapa por prova, vire um link em cada card.
   */
  route: {
    label: "Ver o percurso no mapa",
    href: "https://www.mapmyrun.com/routes/view/6761268721/",
    ariaLabel: "Ver o percurso no mapa (abre o MapMyRun em nova aba)",
  },
};

/* ---------------------------------------------------------------------------
 * Kit do atleta (icon-grid) + valor da inscrição (big number vazio)
 * ------------------------------------------------------------------------- */

export const kit = {
  intro: {
    eyebrow: "O atleta recebe mais",
    title: "O que está incluso",
    description:
      "Itens do kit e da estrutura de prova, conforme o material da Thomé & Santos para a temporada.",
  } satisfies SectionIntro,
  items: [
    { id: "camiseta", icon: "shirt", label: "Camiseta oficial · só no kit plus" },
    { id: "numero", icon: "bib", label: "Número de peito" },
    { id: "medalha", icon: "medal", label: "Medalha temática" },
    { id: "hidratacao", icon: "water", label: "Hidratação em percurso" },
    { id: "bananinha", icon: "banana", label: "Bananinha pós-prova" },
    { id: "cronometragem", icon: "timer", label: "Cronometragem oficial" },
    { id: "seguro", icon: "shield", label: "Seguro do atleta" },
    { id: "medico", icon: "medical", label: "Atendimento médico" },
    { id: "estrutura", icon: "structure", label: "Estrutura profissional" },
  ] satisfies IconItem[],

  /**
   * Valor da inscrição: publicado em 06/10/2026 a partir do regulamento
   * oficial (5.1 para a composição, 8.8 para os valores), a mesma fonte que a
   * página /regulamento exibe ao vivo. `decimals: 2` porque o countUp conta
   * em inteiros por padrão. Se o documento mudar, atualize `value`, `note` e
   * o FAQ junto — a ressalva da `note` é o que segura a promessa enquanto o
   * preço se decide no Checkout do TicketSports.
   */
  price: {
    value: 69.9,
    decimals: 2,
    prefix: "R$ ",
    caption: "Valor da inscrição · kit básico",
    note: "Número de peito, chip de cronometragem, hidratação e medalha. O kit plus (R$ 89,90) acrescenta a camiseta oficial. Valor mais as taxas, no lote de 06/04 a 23/10/2026 — pode encerrar antes se atingir as 3.000 vagas. O que vale no dia da compra é o da página de inscrição, e a composição completa está no regulamento oficial.",
    emptyState:
      "O valor por lote é o do regulamento oficial da etapa, publicado na íntegra aqui no site — é de lá que sai o preço válido no dia da compra.",
  } satisfies BigNumber,

  /**
   * Valor do kit plus (regulamento 8.8, mesma conferência do básico). Vai para
   * o JSON-LD como dado; a copy (FAQ, CTA final) usa o literal ao lado.
   * `null` tira o kit plus do `offers` junto — ver EventJsonLd.
   */
  plusPrice: 89.9 as number | null,
};

/* ---------------------------------------------------------------------------
 * Escala do evento (big-number)
 * ------------------------------------------------------------------------- */

export const scale = {
  intro: {
    eyebrow: "A praça cheia",
    title: "O tamanho da última edição",
    description:
      "O número abaixo é histórico da edição anterior do KM1 em São José dos Pinhais — não é meta nem projeção para 2026.",
  } satisfies SectionIntro,
  /**
   * 3.000 praticantes é o número da edição anterior (kit básico + plus).
   * Se for usado como meta de 2026 em algum momento, mude a `caption`: número
   * de meta lido como número realizado é o erro clássico deste bloco.
   */
  number: {
    value: 3000,
    caption: "praticantes na edição anterior",
    note: "Somando os kits básico e plus da edição anterior desta etapa.",
    emptyState: "",
  } satisfies BigNumber,
  kpis: [
    { id: "provas", icon: "run", label: "3 km e 5 km" },
    { id: "local", icon: "pin", label: "Praça do Verbo Divino" },
    { id: "cronometragem", icon: "timer", label: "Cronometragem oficial" },
    { id: "organizacao", icon: "shield", label: "Organização Thomé & Santos" },
  ] satisfies MiniKpi[],
};

/* ---------------------------------------------------------------------------
 * Produtos oficiais
 * ------------------------------------------------------------------------- */

export const products = {
  intro: {
    eyebrow: "Produtos oficiais",
    title: "As peças da etapa",
    description:
      "Camiseta e meias com a identidade do KM1. As artes são as aprovadas para produção desta etapa.",
  } satisfies SectionIntro,
  items: [
    {
      id: "camiseta",
      name: "Camiseta oficial",
      detail: "Frente e costas",
      media: {
        src: "/images/produtos/camiseta-oficial.png",
        alt: "Camiseta preta do KM1, frente com a marca em amarelo e costas com a marca Thomé & Santos",
        width: 1000,
        height: 624,
      },
      price: null,
      url: null,
      badge: "No kit plus",
    },
    {
      id: "meia-amarela",
      name: "Meia KM1 amarela",
      detail: "Cano alto",
      media: {
        src: "/images/produtos/meia-amarela.png",
        alt: "Par de meias amarelas de cano alto com a marca KM1 em preto",
        width: 760,
        height: 849,
      },
      price: null,
      url: null,
    },
    {
      id: "meia-preta",
      name: "Meia KM1 preta",
      detail: "Cano alto",
      media: {
        src: "/images/produtos/meia-preta.png",
        alt: "Par de meias pretas de cano alto com a marca KM1 em amarelo",
        width: 760,
        height: 849,
      },
      price: null,
      url: null,
    },
  ] satisfies Product[],
  /**
   * Nota de disponibilidade. Enquanto não houver preço e ponto de venda
   * confirmados, é ela que segura a promessa da seção — sem ela, mockup na
   * página vira anúncio de produto à venda. A camiseta segue a composição do
   * kit do regulamento (5.1): inclusa no kit plus, fora do básico — por isso
   * o card dela não exibe o badge "No kit".
   */
  note: "Valores e ponto de venda das peças adicionais são anunciados pela Thomé & Santos. A camiseta oficial faz parte do kit plus da etapa (o kit básico vem sem ela) — a composição completa de cada kit está no regulamento oficial.",
};

/* ---------------------------------------------------------------------------
 * FAQ
 * ------------------------------------------------------------------------- */

export const faq = {
  intro: {
    eyebrow: "Dúvidas",
    title: "Antes de se inscrever",
  } satisfies SectionIntro,
  items: [
    {
      id: "valor",
      question: "Quanto custa a inscrição?",
      answer:
        "São dois kits: o básico por R$ 69,90 e o plus por R$ 89,90, ambos mais as taxas da plataforma. O básico traz número de peito, chip de cronometragem, hidratação e medalha; o plus acrescenta a camiseta oficial. O lote vale de 06/04 a 23/10/2026 e pode encerrar antes se as 3.000 vagas esgotarem. O valor que vale no dia da compra é o da página oficial de inscrição.",
    },
    {
      id: "kit",
      question: "O que vem no kit do atleta?",
      answer:
        "O kit varia conforme a opção escolhida na inscrição: o básico traz número de peito, chip de cronometragem, hidratação e medalha; o plus acrescenta a camiseta oficial. A composição exata está no regulamento oficial da etapa, publicado na íntegra aqui no site — e o que for vendido é o que a página de inscrição descreve.",
    },
    {
      id: "retirada",
      question: "Onde retiro o kit?",
      answer:
        "Curitiba: 30/10/2026, das 10h às 17h, na Loja ProCorrer (Av. Vicente Machado, 318, Centro). São José dos Pinhais: 31/10/2026, das 10h às 16h, com o local a definir pela organização. Não há retirada de kit no dia da prova — datas e locais são os do regulamento oficial.",
    },
    {
      id: "data",
      question: "Qual é a data da prova?",
      answer: event.date
        ? `A edição 2026 é no dia ${eventDate.long}, com largada às ${event.startTime}, na ${event.location.venue}. Horários de retirada de kit e de largada por prova saem no regulamento oficial, publicado na íntegra aqui no site.`
        : "A data oficial da edição 2026 é a que estiver na página de inscrição — é ela que vale. Assim que a organização confirmar, ela também passa a aparecer aqui.",
    },
    {
      id: "local",
      question: "Onde é a largada?",
      answer: `A largada e a chegada são na ${fullAddress}. As duas provas saem do mesmo ponto.`,
    },
    {
      id: "caminhada",
      question: "Dá para participar caminhando?",
      answer:
        "Dá: os 3 km são abertos à caminhada. É a distância pensada para quem está começando ou vem com a família, no mesmo percurso e com a mesma estrutura de quem corre.",
    },
    {
      id: "idade",
      question: "Qual é a idade mínima de cada prova?",
      answer:
        "O 5 km é a partir de 16 anos — os itens 1.1, 8.2 e a tabela de categorias do regulamento batem. Para o 3 km o próprio documento se contradiz (o item 1.1 diz 14 anos, o 8.2 diz 13), então quem escolhe é o texto ao vivo: confira /regulamento antes de inscrever um atleta menor de idade.",
    },
    {
      id: "vagas",
      question: "Como funciona a reposição de vagas?",
      answer:
        "Transferência de titularidade, troca de distância e reposição de vagas seguem os prazos e as condições do regulamento oficial da etapa, publicado na íntegra aqui no site. Como a inscrição é vendida pelo TicketSports, cancelamentos e devoluções seguem a política informada no ato da compra.",
    },
  ] satisfies FaqItem[],
};

/* ---------------------------------------------------------------------------
 * CTA final
 * ------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: `${event.circuit.name} · ${event.circuit.season}`,
  lines: [
    [{ text: "Comece pelo" }],
    [{ text: "km 1.", accent: true }],
  ] satisfies HeadlineLine[],
  description:
    "Na página oficial você escolhe o kit e finaliza: R$ 69,90 no kit básico e R$ 89,90 no kit plus, mais as taxas, no lote que vai até 23/10/2026. O regulamento completo, publicado na íntegra aqui no site, é o que vale no dia da prova.",
};

/* ---------------------------------------------------------------------------
 * Navegação
 * ------------------------------------------------------------------------- */

export const mainNav: NavItem[] = [
  { label: "As provas", href: "#provas" },
  { label: "O kit", href: "#kit" },
  { label: "Produtos", href: "#produtos" },
  { label: "A praça", href: "#numeros" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Regulamento", href: "/regulamento" },
];
