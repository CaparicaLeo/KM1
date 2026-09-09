const LOCALE = "pt-BR";

/** Formata números no padrão brasileiro (10.000, 43,5). */
export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Data por extenso.
 *
 * Só entra em cena quando `event.date` deixar de ser null — hoje a data
 * oficial ainda está em conferência com a Thomé & Santos e a LP não exibe
 * nenhuma (ver data/event.ts).
 */
export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
