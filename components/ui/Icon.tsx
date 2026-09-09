import type { ReactElement, SVGProps } from "react";

/**
 * Set de ícones inline (traço, 1.5px, grade 24×24).
 *
 * Inline em vez de sprite ou biblioteca: são poucos, entram no HTML sem
 * request extra e o `currentColor` deixa o amarelo vir da classe. As chaves
 * batem com o campo `icon` de data/event.ts.
 */
const paths: Record<string, ReactElement> = {
  /** Alfinete de mapa — cards de prova e KPIs de local. */
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  run: (
    <>
      <circle cx="16" cy="5" r="2" />
      <path d="M5 20.5 8.5 15l3-2.2L10 8.5 6 10.8" />
      <path d="m11.5 12.8 3.2 2.2 1.3 5.5" />
      <path d="m10 8.5 4.2-1.1L17.6 11H21" />
    </>
  ),
  shirt: (
    <>
      <path d="M8.5 3.5 4 6l1.6 4 2.2-.8V20.5h8.4V9.2l2.2.8L20 6l-4.5-2.5" />
      <path d="M8.5 3.5a3.5 3.5 0 0 0 7 0" />
    </>
  ),
  bib: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1" />
      <path d="M8 9.5h8M8 13h5" />
      <path d="M4 8 2.5 6.5M20 8l1.5-1.5M4 16l-1.5 1.5M20 16l1.5 1.5" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="15" r="5" />
      <path d="m8.5 10.5-3-7h4l2.2 5M15.5 10.5l3-7h-4l-1.1 2.5" />
      <path d="m12 13 .8 1.7 1.8.2-1.4 1.3.4 1.8-1.6-.9-1.6.9.4-1.8-1.4-1.3 1.8-.2Z" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s5.5 6 5.5 9.7A5.5 5.5 0 0 1 12 18.2a5.5 5.5 0 0 1-5.5-5.5C6.5 9 12 3 12 3Z" />
      <path d="M9.3 13.2a2.7 2.7 0 0 0 2.7 2.7" />
    </>
  ),
  banana: (
    <>
      <path d="M4 12.5c0 4.5 3.8 7.5 8.5 7.5 4.2 0 7.5-3.4 7.5-7.6 0-1.6-.5-2.9-1.2-3.9" />
      <path d="M4 12.5c1.8 1.2 3.2 1.6 5.2 1.6 4.6 0 8.3-3.4 9.6-5.6" />
      <path d="M18.8 8.5c.4-.8.7-1.6.7-2.5M4 12.5c-.6-.5-1-1.1-1-1.8" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.5 2" />
      <path d="M9.5 2.5h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.5v6c0 4.3-3 7.6-7 9.5-4-1.9-7-5.2-7-9.5v-6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="6.5" width="18" height="13" rx="1.5" />
      <path d="M9 6.5V4.5h6v2" />
      <path d="M12 10v6M9 13h6" />
    </>
  ),
  structure: (
    <>
      <path d="M3 20.5h18" />
      <path d="M5 20.5V9l7-4.5L19 9v11.5" />
      <path d="M9.5 20.5v-5h5v5" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {path}
    </svg>
  );
}
