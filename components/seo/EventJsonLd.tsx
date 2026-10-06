import { event, kit, races, seoDescription, siteUrl } from "@/data/event";

/**
 * Dados estruturados do evento (schema.org/SportsEvent).
 *
 * `startDate` é condicional de propósito: schema.org não aceita data vazia, e
 * preencher com palpite marcaria uma data errada para o buscador. Hoje a data
 * está publicada, então o campo sai — e o resultado fica elegível a rich
 * result de evento.
 *
 * `offers` (regulamento 8.8, conferido em 06/10/2026) é o que torna o
 * resultado elegível a rich result com ingressos: um offer por kit, com o
 * preço de `kit.price` como fonte única — mudou o valor no data/event.ts,
 * muda aqui sozinho. O `url` é a página de inscrição: é lá que o preço se
 * concretiza. O restante do preço (taxas) é do TicketSports e fica de fora —
 * inventar taxa aqui seria pior que omitir.
 */
export function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.name,
    description: seoDescription,
    url: siteUrl,
    // Absoluta: o JSON-LD é lido fora do contexto da página, então caminho
    // relativo não resolve.
    image: [`${siteUrl}${event.ogImage.src}`],
    sport: "Corrida de rua",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.date ? { startDate: event.date } : {}),
    location: {
      "@type": "Place",
      name: event.location.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.street,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        postalCode: event.location.postalCode,
        addressCountry: "BR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer.name,
      url: event.organizer.url,
    },
    // Dois offers, um por kit: schema.org aceita lista, e cada opção de
    // compra vira um resultado de ingresso com preço próprio. Sem preço
    // confirmado (value/plusPrice null), o bloco inteiro sai — offer sem
    // preço é markup inválido para o buscador.
    ...(kit.price.value !== null || kit.plusPrice !== null
      ? {
          offers: [
            ...(kit.price.value !== null
              ? [
                  {
                    "@type": "Offer",
                    name: "Kit básico",
                    price: kit.price.value.toFixed(2),
                    priceCurrency: "BRL",
                    url: event.registrationUrl,
                    availability: "https://schema.org/InStock",
                  },
                ]
              : []),
            ...(kit.plusPrice !== null
              ? [
                  {
                    "@type": "Offer",
                    name: "Kit plus (com camiseta)",
                    price: kit.plusPrice.toFixed(2),
                    priceCurrency: "BRL",
                    url: event.registrationUrl,
                    availability: "https://schema.org/InStock",
                  },
                ]
              : []),
          ],
        }
      : {}),
    subEvent: races.items.map((race) => ({
      "@type": "SportsEvent",
      name: `${event.name} · ${race.badge}`,
      sport: "Corrida de rua",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // O conteúdo é nosso, não entrada de usuário, mas escapar "<" impede
        // que um texto futuro com "</script>" encerre a tag antes da hora.
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
