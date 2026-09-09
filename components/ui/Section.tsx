import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTone = "dark" | "darker" | "accent";

const toneClasses: Record<SectionTone, string> = {
  dark: "bg-surface text-ink",
  /** Um degrau abaixo do fundo, para separar blocos sem desenhar borda. */
  darker: "bg-surface-alt text-ink",
  /** Slide de impacto do deck: chapa amarela, texto preto. */
  accent: "bg-accent text-surface",
};

/**
 * Wrapper de seção: âncora, tom de fundo, ritmo vertical e container.
 * Toda seção passa por aqui, para o espaçamento do site ficar num lugar só.
 */
export function Section({
  id,
  tone = "dark",
  children,
  className,
  containerClassName,
  as: Component = "section",
  bleed = false,
}: {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer";
  /** `true` remove o container (faixas de largura total). */
  bleed?: boolean;
}) {
  return (
    <Component
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28 lg:py-36",
        toneClasses[tone],
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn("container-page", containerClassName)}>{children}</div>
      )}
    </Component>
  );
}
