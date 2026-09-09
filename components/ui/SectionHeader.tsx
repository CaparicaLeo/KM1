import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import type { SectionIntro } from "@/data/types";

/**
 * Cabeçalho padrão de seção (eyebrow amarelo + título + descrição).
 *
 * Marca os próprios elementos com `data-reveal` para a seção pai animá-los em
 * stagger sem precisar conhecer a estrutura interna.
 */
export function SectionHeader({
  intro,
  align = "left",
  className,
  titleClassName,
  inverted = false,
  children,
}: {
  intro: SectionIntro;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  /** `true` sobre a chapa amarela: texto no preto do fundo. */
  inverted?: boolean;
  children?: ReactNode;
}) {
  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {intro.eyebrow ? (
        <Eyebrow
          className="w-fit"
          tone={inverted ? "inverse" : "accent"}
          data-reveal
        >
          {intro.eyebrow}
        </Eyebrow>
      ) : null}

      <h2
        data-reveal
        className={cn(
          "headline text-4xl sm:text-5xl lg:text-6xl",
          inverted && "text-surface",
          titleClassName,
        )}
      >
        {intro.title}
      </h2>

      {intro.description ? (
        <p
          data-reveal
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            inverted ? "text-surface/75" : "text-ink-muted",
          )}
        >
          {intro.description}
        </p>
      ) : null}

      {children}
    </header>
  );
}
