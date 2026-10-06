import { faq } from "@/data/event";

/**
 * Dados estruturados do FAQ (schema.org/FAQPage), gerados do mesmo
 * `faq.items` que renderiza o acordeão — pergunta e resposta não podem
 * divergir entre a tela e o markup.
 *
 * Por que vale a pena mesmo com o FAQ rich result do Google restrito a
 * grandes sites: os motores de resposta (AI Overviews, Perplexity, ChatGPT)
 * leem o JSON-LD como resposta pronta e citam a página quando a pergunta bate.
 * É a peça de GEO (generative engine optimization) mais barata que existe —
 * é só manter o FAQ em `data/event.ts` honesto.
 *
 * Só sai se o FAQ ficar vazio: `mainEntity` sem perguntas é markup inválido.
 */
export function FaqJsonLd() {
  if (faq.items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
