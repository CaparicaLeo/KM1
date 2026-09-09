import { event, races, seoDescription, siteUrl } from "@/data/event";

/**
 * Dados estruturados do evento (schema.org/SportsEvent).
 *
 * `startDate` é condicional de propósito: a data ainda está em conferência
 * (`event.date` é null) e schema.org não aceita data vazia. Preencher com
 * palpite marcaria uma data errada para o buscador, que é pior do que não ter
 * o campo — e a página oficial de inscrição já declara a dela. Quando
 * `event.date` receber o ISO, o campo passa a sair sozinho e o resultado fica
 * elegível a rich result de evento.
 *
 * Sem bloco `offers`: ele exige preço, e o valor da inscrição não está
 * confirmado. O link para a página oficial já vive nos CTAs.
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
