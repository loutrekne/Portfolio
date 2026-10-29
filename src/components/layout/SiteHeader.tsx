import Link from "next/link";
import { getContent } from "@/content";
import { HeaderShell } from "@/components/interactions/HeaderShell";
import { ThemeToggle } from "@/components/interactions/ThemeToggle";

/** En-tête : nom, navigation (liens surlignés au survol), CV, bascule de thème. */
export function SiteHeader() {
  const { site } = getContent();
  return (
    <HeaderShell>
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="mark">{site.name}</span>
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-1 sm:gap-3">
          <ul className="flex items-center gap-4 text-small sm:gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                  <span className="mark">{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="hidden sm:block">
              <a href={site.contact.cvHref} className="text-fg-muted transition-colors hover:text-fg">
                <span className="mark">CV</span>
              </a>
            </li>
          </ul>
          <ThemeToggle labelLight={site.ui.themeLight} labelDark={site.ui.themeDark} />
        </nav>
      </div>
    </HeaderShell>
  );
}
