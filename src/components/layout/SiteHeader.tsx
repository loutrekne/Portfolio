import Link from "next/link";
import { getContent } from "@/content";
import { HeaderShell } from "@/components/interactions/HeaderShell";
import { ThemeToggle } from "@/components/interactions/ThemeToggle";
import { DrawnUnderline } from "@/components/trait/DrawnUnderline";

/** En-tête : nom, navigation (liens surlignés au survol), CV, bascule de thème. */
export function SiteHeader() {
  const { site } = getContent();
  return (
    <HeaderShell>
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-tight whitespace-nowrap">
          {site.name}
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-1 sm:gap-3">
          <ul className="flex items-center gap-4 text-small sm:gap-7">
            {site.nav.map((item) => (
              // Sur mobile, « Contact » est masqué : le hero a déjà un bouton « Me contacter »
              <li
                key={item.href}
                className={
                  item.href === "/#contact" ? "hidden whitespace-nowrap sm:block" : "whitespace-nowrap"
                }
              >
                <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                  <DrawnUnderline>{item.label}</DrawnUnderline>
                </Link>
              </li>
            ))}
            <li className="hidden sm:block">
              <a
                href={site.contact.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted transition-colors hover:text-fg"
              >
                <DrawnUnderline>CV</DrawnUnderline>
              </a>
            </li>
          </ul>
          <ThemeToggle labelLight={site.ui.themeLight} labelDark={site.ui.themeDark} />
        </nav>
      </div>
    </HeaderShell>
  );
}
