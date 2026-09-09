import Link from "next/link";

import { event, eventDate, fullAddress, mainNav } from "@/data/event";

/**
 * Rodapé no padrão do deck: nome do evento à esquerda, circuito e temporada ao
 * centro, índice das seções à direita.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-surface-alt">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-3 lg:py-16">
        <div>
          <p className="headline text-2xl text-ink">{event.name}</p>
          <p className="label-condensed mt-4 text-[0.7rem] text-accent">
            {eventDate.label}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            {fullAddress}
          </p>
          <p className="label-condensed mt-4 text-[0.65rem] text-ink-muted">
            {event.organizer.name}
          </p>
        </div>

        <p className="label-condensed self-center text-[0.7rem] text-accent lg:text-center">
          {event.circuit.slug} · {event.circuit.season}
        </p>

        <nav aria-label="Índice" className="lg:justify-self-end">
          <ul className="flex flex-col gap-3 lg:text-right">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink/85 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          {/* Ano corrente, não o do evento: o aviso de copyright vale para a
              data de publicação. Congela no build — rebuild anual resolve. */}
          <p>
            © {new Date().getFullYear()} {event.organizer.name}. Todos os
            direitos reservados.
          </p>
          <p className="label-condensed text-[0.65rem]">
            {eventDate.short ?? event.dateLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
