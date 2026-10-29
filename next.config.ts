import type { NextConfig } from "next";

/**
 * Configuration Next.js 16.
 * - cacheComponents / partialPrefetching : valeurs par défaut de create-next-app 16.4.
 * - Tailwind v4 passe par le loader Turbopack (pas de postcss.config).
 * - /cv redirige vers le PDF (à déposer dans /public/cv/).
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [{ source: "/cv", destination: "/cv/louise-knoery-cv.pdf", permanent: false }];
  },
};

export default nextConfig;
