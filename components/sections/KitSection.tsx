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
          O valor da inscrição ainda não foi confirmado, então o bloco entra no
          estado vazio: sem número, com a frase que manda para a página oficial.
          Preencher `kit.price.value` em data/event.ts é o que faz o número
          aparecer — nada aqui muda.
        */}
        <BigNumberBlock
          number={kit.price}
          className="mt-14"
          action={
            <CTAButton href={registrationCta.href} size="md" animateIn={false}>
              {registrationCta.label}
            </CTAButton>
          }
        />
      </div>
    </Section>
  );
}
