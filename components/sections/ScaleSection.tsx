"use client";

import { BigNumberBlock } from "@/components/blocks/BigNumberBlock";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { event, scale } from "@/data/event";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function ScaleSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="numeros">
      <div ref={root}>
        <SectionHeader intro={scale.intro} />

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-[1.35fr_1fr]">
          {/* A borda da grade é o próprio gap de 1px: por isso o bloco entra
              sem borda própria, senão a linha fica com 2px em um lado só. */}
          <BigNumberBlock
            number={scale.number}
            kpis={scale.kpis}
            className="border-0"
          />

          {/* A foto é retrato (900×1600): em `stretch` ela acompanha a altura
              da coluna de texto em vez de impor a própria proporção à linha da
              grade. O recorte fica um pouco acima do centro, onde está o
              pelotão. */}
          <Media
            media={event.photo}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="min-h-[20rem] lg:h-full"
            imageClassName="object-[center_35%]"
            stretch
          />
        </div>
      </div>
    </Section>
  );
}
