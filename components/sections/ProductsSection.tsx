"use client";

import { ProductGridBlock } from "@/components/blocks/ProductGridBlock";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/data/event";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Peças da etapa sobre a chapa amarela.
 *
 * Os cards continuam pretos de propósito: numa grade inteiramente amarela a
 * meia amarela perde a silhueta e só as peças pretas continuam legíveis.
 * Com card preto sobre a chapa, o vão de 1px da grade vira linha amarela e a
 * seção ganha o contraste sem custar a leitura de nenhuma peça.
 */
export function ProductsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="produtos" tone="accent">
      <div ref={root}>
        <SectionHeader intro={products.intro} inverted />

        <ProductGridBlock
          items={products.items}
          className="mt-14 lg:mt-20"
          onAccent
        />

        <p
          data-reveal
          className="mt-8 max-w-2xl text-sm leading-relaxed text-surface/75"
        >
          {products.note}
        </p>
      </div>
    </Section>
  );
}
