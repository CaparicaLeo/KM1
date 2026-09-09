import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/event";

/** A LP tem uma rota só; o sitemap existe para o buscador achar o canonical. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
