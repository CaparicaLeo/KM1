import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Media as MediaType } from "@/data/types";

/**
 * Wrapper de next/image.
 *
 * A proporção sempre vem do dado (`media.width`/`media.height`), nunca do
 * componente: trocar a arte por outra de proporção diferente é editar
 * data/event.ts, sem layout shift e sem mexer aqui.
 */
export function Media({
  media,
  className,
  imageClassName,
  sizes = "100vw",
  preload = false,
  stretch = false,
}: {
  media: MediaType;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  /** Só para o elemento LCP — hoje, a foto de fundo do hero. */
  preload?: boolean;
  /**
   * `true` quando a altura vem do container, não do dado — coluna de grade,
   * por exemplo. Com a proporção declarada, uma foto em retrato (900×1600)
   * numa coluna de 525px pedia 933px de altura e esticava a linha inteira da
   * grade, deixando meia tela vazia ao lado do texto.
   */
  stretch?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-surface-alt", className)}
      style={
        stretch ? undefined : { aspectRatio: `${media.width} / ${media.height}` }
      }
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
