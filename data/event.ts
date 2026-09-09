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
 * 1. DATA — não vai para o ar até a Thomé & Santos confirmar.
 *    · página oficial de inscrição (TicketSports) e o JSON-LD dela: 01/11/2026,
 *      largada 07:00;
 *    · data/events.js do site institucional da própria Thomé & Santos:
 *      "01 de novembro, 2026" (dateISO 2026-11-01), status "upcoming";
 *    · Corrida360 e um snapshot indexado da página oficial: 30/08/2026.
 *    As duas fontes de primeira mão batem em 01/11/2026, o que sugere
 *    remarcação de agosto para novembro — mas "sugere" não publica data.
 *    Confirmado: preencher `date` com o ISO e a LP passa a exibir sozinha.
 *
 * 2. DISTÂNCIAS — 3 km e 7 km, conforme levantamento (Corrida360) e conforme a
 *    etapa Guaratuba do mesmo circuito. Atenção: o data/events.js do site
 *    institucional descreve esta etapa como "3km e 5km", em um bloco de texto
 *    que se repete igual em várias etapas (parece boilerplate). Confirmar com a
 *    organização antes de virar peça de mídia.
 *
 * 3. IDADE MÍNIMA — 16 anos para o 7 km e 13 ou 14 anos para o 3 km, dependendo
 *    da fonte. Como diverge, nenhuma idade é publicada: a LP manda para o
 *    regulamento oficial. Confirmado, preencher `minAge` de cada prova.
 *
 * 4. VALOR DA INSCRIÇÃO — não confirmado. O deck comercial usa R$ 49,90 como
 *    preço-alvo de posicionamento e o regulamento da etapa de Pinhais (outra
 *    cidade) cita R$ 69,90 + taxas. São coisas diferentes e não se misturam:
 *    `price.value` fica null e o bloco manda para a página oficial.
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
   * ISO 8601 quando confirmada (ex.: "2026-11-01T07:00:00-03:00").
   * Enquanto for null, nenhuma data aparece na LP: nem no hero, nem no rodapé,
   * nem no JSON-LD. Ver pendência 1 no topo do arquivo.
   */
  date: null as string | null,
  /** O que a LP diz enquanto não há data confirmada. */
  dateLabel: "Edição 2026",
  /** Idem para o horário de largada (a página oficial indica 07:00). */
  startTime: null as string | null,

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
   */
  registrationUrl:
    "https://www.ticketsports.com.br/e/corrida-km-1-etapa-sao-jose-dos-pinhais-86470",

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
 * Domínio de produção. Alimenta metadataBase, Open Graph, canonical, sitemap e
 * robots — um valor errado aqui propaga para todos de uma vez. Em preview,
 * defina NEXT_PUBLIC_SITE_URL (ver .env.example).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://km1.thomeesantos.com.br";

/**
 * Descrição canônica: alimenta metadata, Open Graph e JSON-LD. Sem data, pelo
 * motivo do topo do arquivo. Abaixo de 155 caracteres para não ser truncada.
 */
export const seoDescription =
  "KM1 · Etapa São José dos Pinhais: corrida de rua de 3 km e 7 km na Praça do Verbo Divino, organizada pela Thomé & Santos. Inscrição oficial online.";

/**
 * CTA de inscrição.
 *
 * O rótulo não promete o que não se pode garantir daqui: manda para a página
 * oficial, onde o próprio TicketSports mostra se o lote está aberto, em espera
 * ou esgotado. Quando a Thomé & Santos confirmar que as inscrições estão
 * abertas, este rótulo pode virar "Inscreva-se" — é a única linha a mudar.
 */
export const registrationCta = {
  label: "Ir para a inscrição oficial",
  href: event.registrationUrl,
  note: "Você será levado ao TicketSports, onde a Thomé & Santos vende as inscrições.",
} satisfies Cta;

/* ---------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: `${event.location.city} · ${event.location.state} · ${event.dateLabel}`,
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
    "Uma corrida de rua para quem está começando e para quem corre há anos: 3 km e 7 km saindo da Praça do Verbo Divino, no Centro.",
  scrollHint: "Role para ver as provas",
  marquee: [
    "3 KM",
    "7 KM",
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
      id: "7km",
      eyebrow: "Prova 02",
      icon: "pin",
      title: "Corrida",
      badge: "7 KM",
      description:
        "A prova principal da etapa, para quem já treina e quer fechar o percurso no ritmo.",
      meta: ["Cronometragem oficial", "Percurso no Centro"],
      featured: true,
    },
  ] satisfies CardItem[],
  /** Repetido embaixo dos cards: é a informação que o atleta mais procura. */
  venueNote: fullAddress,
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
    { id: "camiseta", icon: "shirt", label: "Camiseta oficial" },
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
   * Valor da inscrição: estado vazio deliberado (pendência 4). Quando a
   * Thomé & Santos fechar o valor do lote, preencha `value` (em reais) e o
   * bloco passa a exibir o número — sem mudar componente.
   */
  price: {
    value: null,
    prefix: "R$ ",
    caption: "Valor da inscrição",
    emptyState:
      "O valor por lote é o que estiver na página oficial de inscrição — é de lá que sai o preço válido no dia da compra.",
  } satisfies BigNumber,
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
    { id: "provas", icon: "run", label: "3 km e 7 km" },
    { id: "local", icon: "pin", label: "Praça do Verbo Divino" },
    { id: "cronometragem", icon: "timer", label: "Cronometragem oficial" },
    { id: "organizacao", icon: "shield", label: "Organização Thomé & Santos" },
  ] satisfies MiniKpi[],
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
      id: "idade",
      question: "Qual é a idade mínima de cada prova?",
      answer:
        "A idade mínima varia entre as duas distâncias e é definida no regulamento oficial da etapa, publicado na página de inscrição. Confira lá antes de inscrever um atleta menor de idade — é o documento que vale no dia da prova.",
    },
    {
      id: "kit",
      question: "O que vem no kit do atleta?",
      answer:
        "Camiseta oficial, número de peito, medalha temática e cronometragem oficial, além da estrutura de prova: hidratação em percurso, bananinha pós-prova, seguro do atleta e atendimento médico. A composição exata do kit de cada lote está descrita na página de inscrição.",
    },
    {
      id: "vagas",
      question: "Como funciona a reposição de vagas?",
      answer:
        "Transferência de titularidade, troca de distância e reposição de vagas seguem os prazos e as condições do regulamento oficial da etapa. Como a inscrição é vendida pelo TicketSports, cancelamentos e devoluções seguem a política informada no ato da compra.",
    },
    {
      id: "data",
      question: "Qual é a data da prova?",
      answer:
        "A data oficial da edição 2026 é a que estiver na página de inscrição — é ela que vale. Assim que a organização confirmar, ela também passa a aparecer aqui.",
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
    "As inscrições da Etapa São José dos Pinhais são vendidas na página oficial do evento. Lotes, valores e regulamento estão lá.",
};

/* ---------------------------------------------------------------------------
 * Navegação
 * ------------------------------------------------------------------------- */

export const mainNav: NavItem[] = [
  { label: "As provas", href: "#provas" },
  { label: "O kit", href: "#kit" },
  { label: "A praça", href: "#numeros" },
  { label: "Dúvidas", href: "#faq" },
];
