"use client";

import { CardListBlock } from "@/components/blocks/CardListBlock";
import { CTAButton } from "@/components/ui/CTAButton";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { races } from "@/data/event";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function RacesSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="provas">
      <div ref={root}>
        <SectionHeader intro={races.intro} />

        <CardListBlock items={races.items} className="mt-14 lg:mt-20" />

        <p
          data-reveal
          className="mt-8 flex max-w-2xl items-start gap-3 text-sm leading-relaxed text-ink-muted"
        >
          <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-accent" />
          {races.venueNote}
        </p>

        {/* Amarelo e grande a pedido: o mapa é o que o atleta mais procura
            aqui. Sem `pulse`, que segue reservado à inscrição. */}
        <div data-reveal className="mt-14 flex justify-center">
          <CTAButton
            href={races.route.href}
            size="xl"
            className="w-full sm:w-auto"
            animateIn={false}
            ariaLabel={races.route.ariaLabel}
            trackId="mapa_percurso"
          >
            {races.route.label}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
