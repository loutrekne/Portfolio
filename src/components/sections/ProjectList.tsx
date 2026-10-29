import Link from "next/link";
import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Liste des études de cas. Au survol d'une rangée : fond doux qui apparaît,
 * titre surligné de gauche à droite, flèche qui glisse. Tout est porté par
 * des classes CSS (voir globals.css > MICRO-INTERACTIONS).
 * TODO(cursor) : vignette `cover` qui suit le curseur (desktop) quand les visuels existent.
 */
export function ProjectList() {
  const { featured, site } = getContent();
  return (
    <section id="projets" className="container-site section-y">
      <Eyebrow>{site.ui.selectedWork}</Eyebrow>
      <ol className="-mx-4 mt-8 sm:-mx-6">
        {featured.map((p) => (
          <li key={p.slug} className="reveal">
            <Link
              href={`/projets/${p.slug}`}
              className="group grid gap-3 rounded-md px-4 py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:px-6"
            >
              <span className="text-label font-medium text-accent tabular-nums transition-transform duration-500 ease-spring group-hover:translate-x-1">
                {p.index}
              </span>
              <div>
                <p className="text-label text-fg-muted">
                  {p.client} · {p.sector}
                </p>
                <h2 className="mt-2 text-h2 font-semibold">
                  <span className="mark">{p.title}</span>
                </h2>
                <p className="mt-3 measure text-fg-muted">{p.tagline}</p>
              </div>
              <span className="flex items-center gap-3 self-start text-label text-fg-subtle sm:pt-1">
                {p.period}
                <span
                  aria-hidden
                  className="inline-block -translate-x-2 opacity-0 transition-all duration-500 ease-spring group-hover:translate-x-0 group-hover:text-fg group-hover:opacity-100"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
