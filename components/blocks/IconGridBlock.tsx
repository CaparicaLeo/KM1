"use client";

import { Icon } from "@/components/ui/Icon";
import { staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";
import type { IconItem } from "@/data/types";

/**
 * Icon-grid do deck: ícone amarelo, rótulo branco e a grade desenhada pelo
 * gap de 1px sobre a chapa clara do container.
 *
 * São 3 colunas, e não as 4 do deck, por causa desse gap: com 9 itens do kit,
 * uma grade de 4 deixa três células vazias na última linha — e célula vazia
 * aqui não é espaço em branco, é a chapa clara do container aparecendo, um
 * bloco cinza pendurado no fim da lista. 1 e 3 colunas dividem 9 sem sobra em
 * todos os breakpoints. Se a lista de itens mudar de tamanho, confira a conta
 * de novo.
 *
 * É lista de verdade (<ul>): o bloco enumera o que o atleta recebe, e leitor
 * de tela anuncia a contagem.
 */
export function IconGridBlock({
  items,
  className,
}: {
  items: IconItem[];
  className?: string;
}) {
  const root = useGsapScroll<HTMLUListElement>(({ scope, prefersReducedMotion }) => {
    staggerIn(scope.querySelectorAll("[data-icon-item]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 85%",
      y: 24,
      each: 0.07,
    });
  });

  return (
    <ul
      ref={root}
      className={cn(
        "grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.id}
          data-icon-item
          className="group flex flex-col gap-5 bg-surface p-7 transition-colors duration-300 hover:bg-surface-alt"
        >
          <Icon name={item.icon} className="size-8 text-accent" />
          <span className="label-condensed text-[0.75rem] leading-snug text-ink">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
