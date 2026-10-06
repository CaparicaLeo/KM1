"use client";

import { BigNumberBlock } from "@/components/blocks/BigNumberBlock";
import { IconGridBlock } from "@/components/blocks/IconGridBlock";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { kit, registrationCta } from "@/data/event";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function KitSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="kit" tone="darker">
      <div ref={root}>
        <SectionHeader intro={kit.intro} />

        <IconGridBlock items={kit.items} className="mt-14 lg:mt-20" />

        {/*
          O valor vem do regulamento oficial (5.1 e 8.8), publicado em
          data/event.ts com a data da conferência — mudou o documento, atualize
          `kit.price` lá. Este bloco é o que empurra da lista de itens direto
          para a inscrição.
        */}
        <BigNumberBlock
          number={kit.price}
          className="mt-14"
          action={
            <CTAButton
              href={registrationCta.href}
              size="md"
              animateIn={false}
              trackId="inscricao_kit"
            >
              {registrationCta.label}
            </CTAButton>
          }
        />
      </div>
    </Section>
  );
}
