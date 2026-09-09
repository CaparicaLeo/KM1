"use client";

import { ProductGridBlock } from "@/components/blocks/ProductGridBlock";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/data/event";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function ProductsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="produtos">
      <div ref={root}>
        <SectionHeader intro={products.intro} />

        <ProductGridBlock items={products.items} className="mt-14 lg:mt-20" />

        <p
          data-reveal
          className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted"
        >
          {products.note}
        </p>
      </div>
    </Section>
  );
}
