import type { Metadata, Viewport } from "next";

import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { event, seoDescription, siteUrl } from "@/data/event";

import { fontVariables } from "./fonts";
import { theme, themeCss } from "./theme";
import "./globals.css";

const title = event.name;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${event.shortName}`,
  },
  description: seoDescription,
  /** Canonical explícito da home — a LP tem uma rota só. */
  alternates: { canonical: siteUrl },
  applicationName: event.shortName,
  keywords: [
    "KM1",
    "corrida de rua",
    "São José dos Pinhais",
    "3 km",
    "5 km",
    "Thomé & Santos",
    "corrida Paraná",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: event.shortName,
    title,
    description: seoDescription,
    images: [
      {
        url: event.ogImage.src,
        width: event.ogImage.width,
        height: event.ogImage.height,
        alt: event.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: seoDescription,
    images: [event.ogImage.src],
  },
};

export const viewport: Viewport = {
  /* Vem do tema, como todo hex de marca do projeto. */
  themeColor: theme.colors.background,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <head>
        {/*
          O tema é injetado como custom properties `--km1-*` e os tokens do
          Tailwind apontam para elas (ver app/globals.css). É isso que mantém
          todo hex de marca dentro de app/theme.ts.

          No <head> e antes da folha do Tailwind: as duas camadas usam nomes
          diferentes, então não há disputa de cascata — a ordem aqui é só para
          a primeira pintura já ter as cores.
        */}
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-dvh antialiased">
        {/* Provider global de animação: centraliza a manutenção do ScrollTrigger. */}
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
