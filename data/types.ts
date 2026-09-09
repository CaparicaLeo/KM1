/**
 * Tipos da camada de dados.
 *
 * Este projeto é do KM1 e só dele: os tipos existem para dar autocomplete e
 * travar estados vazios, não para ser compatível com nenhum outro site.
 */

/** Imagem com proporção declarada — o espaço é reservado, sem layout shift. */
export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Um pedaço de headline. `accent: true` pinta o trecho de amarelo — é o
 * destaque de palavra-chave do deck.
 */
export type HeadlineSegment = { text: string; accent?: boolean };

/**
 * Headline como dado, nunca escrita direto no JSX: cada linha é uma máscara
 * de reveal, e ajustar a copy (ou a quebra de linha) é editar este arquivo.
 */
export type HeadlineLine = HeadlineSegment[];

export type Cta = {
  label: string;
  href: string;
  /** Texto auxiliar exibido abaixo do botão. */
  note?: string;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Item do icon-grid (kit do atleta). */
export type IconItem = {
  id: string;
  /** Chave resolvida em components/ui/Icon.tsx */
  icon: string;
  label: string;
};

/** Card do card-list: eyebrow amarelo + ícone + título + linhas de apoio. */
export type CardItem = {
  id: string;
  eyebrow: string;
  icon: string;
  title: string;
  /** Linha de destaque à direita do título (ex.: "5 KM"). */
  badge?: string;
  description?: string;
  meta?: string[];
  featured?: boolean;
};

/** Mini-KPI da fileira abaixo do número grande. */
export type MiniKpi = {
  id: string;
  icon: string;
  label: string;
};

/**
 * Estatística de cartaz.
 *
 * `value: null` NÃO é um bug e nem vira "0" ou "—" na tela: é o estado vazio.
 * O bloco troca o número por uma frase de "a confirmar" e por um link para a
 * fonte oficial. Nenhum número que a Thomé & Santos ainda não confirmou pode
 * aparecer aqui com cara de definitivo.
 */
export type BigNumber = {
  value: number | null;
  prefix?: string;
  suffix?: string;
  caption: string;
  note?: string;
  /** Texto exibido quando `value` é null. */
  emptyState: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Peça oficial da etapa (camiseta, moletom, meia).
 *
 * `price` e `url` são null enquanto a organização não confirmar valor e ponto
 * de venda — o card não inventa preço nem botão de compra. `inKit` marca o que
 * já está incluso no kit do atleta, para a seção não sugerir que o corredor
 * precisa comprar o que já vai receber.
 */
export type Product = {
  id: string;
  name: string;
  detail?: string;
  media: Media;
  price: number | null;
  url: string | null;
  inKit?: boolean;
};

export type NavItem = { label: string; href: string };
