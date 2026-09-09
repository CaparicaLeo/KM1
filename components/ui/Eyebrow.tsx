import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Eyebrow do deck: caixa alta, tracking largo, amarelo.
 *
 * Junto com <Highlight>, é um dos dois lugares autorizados a usar o amarelo em
 * texto. Se você está prestes a escrever `text-accent` num parágrafo, use um
 * destes dois — a regra da identidade é que o amarelo marque, não escreva.
 */
export function Eyebrow<T extends ElementType = "p">({
  as,
  children,
  className,
  ...rest
}: EyebrowProps<T>) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      className={cn(
        "label-condensed inline-flex items-center gap-2 text-[0.7rem] leading-none text-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
