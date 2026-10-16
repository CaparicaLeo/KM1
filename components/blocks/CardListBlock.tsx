"use client";

import { track } from "@vercel/analytics";

import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
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

          {item.route ? (
            <div className="flex flex-col gap-4">
              {/* A arte também é link: no celular é nela que o dedo vai. Fica
                  fora do tab order porque o botão logo abaixo leva ao mesmo
                  lugar — dois focos seguidos para o mesmo destino só cansam. */}
              <a
                href={item.route.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                onClick={() =>
                  track("cta_click", { id: `mapa_percurso_${item.id}` })
                }
                className="block border border-white/10 transition-opacity hover:opacity-90"
              >
                <Media media={item.route.media} sizes="(min-width: 1024px) 40vw, 90vw" />
              </a>
              {/* Amarelo a pedido: o mapa é o que o atleta mais procura aqui.
                  Sem `pulse`, que segue reservado à inscrição; sem entrada
                  própria, que o card já anima (um reveal por dono). */}
              <CTAButton
                href={item.route.href}
                className="w-full"
                animateIn={false}
                ariaLabel={item.route.ariaLabel}
                trackId={`mapa_percurso_${item.id}`}
              >
                {item.route.label}
              </CTAButton>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
