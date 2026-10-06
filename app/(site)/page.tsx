import { ImpactSlide } from "@/components/blocks/ImpactSlide";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { KitSection } from "@/components/sections/KitSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { RacesSection } from "@/components/sections/RacesSection";
import { ScaleSection } from "@/components/sections/ScaleSection";
import { EventJsonLd } from "@/components/seo/EventJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { impact } from "@/data/event";

/**
 * Landing page da etapa.
 *
 * A ordem das seções é a do deck comercial: abertura, frase de impacto, o que
 * se corre, o que se recebe, as peças da etapa, o tamanho do evento, dúvidas e
 * a inscrição. Cada
 * seção lê o próprio conteúdo de data/event.ts — reordenar é mover uma linha.
 *
 * A medalha 3D está fora da tela por enquanto; o código continua inteiro em
 * components/medal/ (mais docs/medalha-3d.md). Recolocar é devolver
 * `aside={<MedalStage />}` e o import — o ImpactSlide trata a ausência do
 * aside sozinho, sem resto de layout para limpar.
 */
export default function HomePage() {
  return (
    <>
      {/* Dados estruturados desta rota: o evento (SportsEvent) e o FAQ. */}
      <EventJsonLd />
      <FaqJsonLd />

      <HeroSection />
      <ImpactSlide
        id="conceito"
        lines={impact.lines}
        support={impact.support}
      />
      <RacesSection />
      <KitSection />
      <ProductsSection />
      <ScaleSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
