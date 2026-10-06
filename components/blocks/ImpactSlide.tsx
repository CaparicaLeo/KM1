"use client";

import type { ReactNode } from "react";

import { Headline } from "@/components/ui/Headline";
import { Section } from "@/components/ui/Section";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { cn } from "@/lib/cn";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import type { HeadlineLine } from "@/data/types";

/**
 * Slide de impacto do deck: chapa amarela com texto preto e uma frase curta de
 * transição de seção.
 *
 * Divide o amarelo da página com a seção de produtos, e são essas duas — se
 * entrar uma terceira, o preto deixa de ser o fundo dominante e a identidade
 * vira outra. Aqui a chapa é o fundo do texto; lá ela emoldura cards pretos.
 *
 * `aside` ocupa uma coluna à direita no desktop (abaixo da frase no celular) e
 * entra com o mesmo fade da seção — reservado à medalha 3D, que hoje está fora
 * da tela (código mantido em components/medal/; sem `aside`, a seção volta à
 * coluna única e o clamp da headline volta a 9vw).
 */
export function ImpactSlide({
  id,
  lines,
  support,
  aside,
}: {
  id?: string;
  lines: HeadlineLine[];
  support?: string;
  aside?: ReactNode;
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
      <div
        ref={root}
        className={cn(
          aside &&
            "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16",
        )}
      >
        <div
          className={cn(
            /* Sem o aside (medalha fora da tela), a frase ocupa o deck inteiro e
               a seção vira pôster centrado no desktop; com o aside de volta, o
               alinhamento à esquerda é o que faz sentido ao lado da coluna. */
            !aside && "lg:mx-auto lg:max-w-4xl lg:text-center",
          )}
        >
          <Headline
            lines={lines}
            tone="dark"
            className={cn(
              "max-w-4xl text-[clamp(2.5rem,9vw,6.5rem)]",
              /* Dividindo a linha com a medalha, o 9vw estouraria a coluna
                 entre 1024 e ~1300px: "TODO CORREDOR" não cabe em ~520px. */
              aside && "lg:text-[clamp(3rem,6.2vw,6.5rem)]",
            )}
          />

          {support ? (
            <p
              data-reveal
              className={cn(
                "mt-8 max-w-xl text-base leading-relaxed text-surface/80 sm:text-lg",
                !aside && "lg:mx-auto",
              )}
            >
              {support}
            </p>
          ) : null}
        </div>

        {aside ? <div data-reveal>{aside}</div> : null}
      </div>
    </Section>
  );
}
