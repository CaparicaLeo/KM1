"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";
import type { CardItem } from "@/data/types";

/**
 * Card-list do deck: borda fina, eyebrow amarelo, ícone de pin e o nome em
 * caixa alta.
 *
 * Nasceu para listar etapas do circuito e serve igual para as provas de uma
 * etapa — a diferença é só o dado. Enquanto o calendário das outras cidades
 * não estiver confirmado pela Thomé & Santos, esta LP usa o bloco para as duas
 * distâncias (ver data/event.ts).
 */
export function CardListBlock({
  items,
  className,
}: {
  items: CardItem[];
  className?: string;
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    staggerIn(scope.querySelectorAll("[data-card]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 82%",
      y: 32,
      each: 0.12,
    });
  });

  return (
    <div
      ref={root}
      className={cn("grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2", className)}
    >
      {items.map((item) => (
        <article
          key={item.id}
          data-card
          className={cn(
            "flex flex-col gap-6 p-8 lg:p-10",
            /* O card em destaque troca a chapa, não a borda: borda amarela em
               grade de 1px vira moldura e desalinha visualmente a grade. */
            item.featured ? "bg-surface-alt" : "bg-surface",
          )}
        >
          <div className="flex items-start justify-between gap-6">
            <Eyebrow>{item.eyebrow}</Eyebrow>
            {item.badge ? (
              <p className="poster-number text-4xl text-accent sm:text-5xl">
                {item.badge}
              </p>
            ) : null}
          </div>

          <div className="flex items-start gap-3">
            <Icon name={item.icon} className="mt-1 size-5 shrink-0 text-accent" />
            <h3 className="headline text-2xl text-ink sm:text-3xl">{item.title}</h3>
          </div>

          {item.description ? (
            <p className="text-base leading-relaxed text-ink-muted">
              {item.description}
            </p>
          ) : null}

          {item.meta && item.meta.length > 0 ? (
            <ul className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
              {item.meta.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-ink/85">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
