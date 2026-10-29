import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { getContent, defaultLocale } from "@/content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeScript } from "@/components/interactions/ThemeScript";
import { RevealObserver } from "@/components/interactions/RevealObserver";
import { MotionProvider } from "@/components/interactions/MotionProvider";
import "./globals.css";

/**
 * Typographie : une seule famille, Figtree (variable, avec italiques).
 * Humaniste et ouverte : chaleureuse sans être enfantine, très lisible en petit.
 * Auto-hébergée par next/font : aucun appel à Google au runtime.
 */
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], style: ["normal", "italic"] });


const { site } = getContent();

export const metadata: Metadata = {
  // TODO(louise) : remplacer par le domaine final (utile pour les images OG).
  metadataBase: new URL("https://louiseknoery.fr"),
  title: { default: site.meta.title, template: `%s — ${site.name}` },
  description: site.meta.description,
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={defaultLocale}
      className={`${figtree.variable} antialiased`}
      // le script de thème modifie data-theme avant l'hydratation
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-pill focus:bg-btn focus:px-4 focus:py-2 focus:text-btn-fg"
        >
          {site.ui.skipLink}
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
