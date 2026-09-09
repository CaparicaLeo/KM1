"use client";

import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import type { HeadlineLine } from "@/data/types";

/**
 * Slide de impacto do deck: chapa amarela com texto preto e uma frase curta de
 * transição de seção.
 *
 * Divide o amarelo da página com a seção de produtos, e são essas duas — se
 * entrar uma terceira, o preto deixa de ser o fundo dominante e a identidade
 * vira outra. Aqui a chapa é o fundo do texto; lá ela emoldura cards pretos.
 */
export function ImpactSlide({
  id,
  lines,
  support,
}: {
  id?: string;
  lines: HeadlineLine[];
  support?: string;
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-headline-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 78%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
      delay: 0.2,
    });
  });

  return (
    <Section id={id} tone="accent">
      <div ref={root}>
        <Headline
          lines={lines}
          tone="dark"
          className="max-w-4xl text-[clamp(2.5rem,9vw,6.5rem)]"
        />

        {support ? (
          <p
            data-reveal
            className="mt-8 max-w-xl text-base leading-relaxed text-surface/80 sm:text-lg"
          >
            {support}
          </p>
        ) : null}
      </div>
    </Section>
  );
}
