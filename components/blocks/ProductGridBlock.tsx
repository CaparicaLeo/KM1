"use client";

import { Media } from "@/components/ui/Media";
import { staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Product } from "@/data/types";

/**
 * Grade de peças oficiais.
 *
 * Os renders vêm em PNG com fundo transparente, então o card não desenha
 * moldura em volta da foto: a peça flutua sobre a chapa preta, que é como ela
 * aparece no material da marca. `object-contain` porque cortar um produto pela
 * borda descaracteriza a peça — aqui a imagem não é ambiente, é catálogo.
 *
 * A caixa da foto é quadrada para todos, e não a proporção de cada arquivo: as
 * peças vieram em formatos bem diferentes (camiseta 1000×624 deitada, meias
 * 760×849 em pé) e, com a altura saindo do dado, cada rótulo parava numa
 * altura — a fileira lia como cards desalinhados. Caixa igual e
 * `object-contain` deixam a peça inteira à vista com a linha de rótulos
 * alinhada.
 *
 * Sem preço confirmado, o card NÃO mostra número nem botão de compra: mostra a
 * peça e a etiqueta do que ela é. Mockup com preço inventado ao lado vira
 * anúncio de algo que talvez não esteja à venda.
 */
export function ProductGridBlock({
  items,
  className,
  onAccent = false,
}: {
  items: Product[];
  className?: string;
  /**
   * `true` quando o bloco está sobre a chapa amarela: os cards seguem pretos
   * (é o que mantém a meia amarela visível) e quem desenha a grade passa a ser
   * o próprio fundo da seção, aparecendo nos vãos de 1px.
   */
  onAccent?: boolean;
}) {
  const root = useGsapScroll<HTMLUListElement>(({ scope, prefersReducedMotion }) => {
    staggerIn(scope.querySelectorAll("[data-product]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 85%",
      y: 28,
      each: 0.1,
    });
  });

  return (
    <ul
      ref={root}
      className={cn(
        /* Três peças: 3 colunas desde o sm. Com 2 colunas sobrava um card órfão, e
           sobre a chapa amarela a célula vazia vira um buraco amarelo na grade. */
        "grid gap-px sm:grid-cols-3",
        onAccent ? "bg-transparent" : "border border-white/10 bg-white/10",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.id}
          data-product
          className="flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-surface-alt"
        >
          <Media
            media={item.media}
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 30vw, 90vw"
            className="aspect-square bg-transparent"
            imageClassName="object-contain"
            stretch
          />

          {/* `mt-auto` mantém a linha de rótulos colada na base mesmo quando um
              nome quebra em duas linhas. */}
          <div className="mt-auto flex items-start justify-between gap-3 pt-6">
            <div>
              <h3 className="label-condensed text-[0.8rem] text-ink">{item.name}</h3>
              {item.detail ? (
                <p className="mt-2 text-sm text-ink-muted">{item.detail}</p>
              ) : null}
            </div>

            {item.inKit ? (
              <span className="label-condensed shrink-0 bg-accent px-2 py-1 text-[0.55rem] text-surface">
                No kit
              </span>
            ) : null}
          </div>

          {/* O preço só existe quando confirmado; até lá, a nota da seção
              explica onde perguntar. */}
          {item.price !== null ? (
            <p className="poster-number mt-4 text-2xl text-accent">
              R$ {formatNumber(item.price, 2)}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
