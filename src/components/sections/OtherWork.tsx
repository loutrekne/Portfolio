import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Projets secondaires (featured: false) en cartes courtes, sans page dédiée. */
export function OtherWork() {
  const { others, site } = getContent();
  if (others.length === 0) return null;
  return (
    <section className="container-site pb-[var(--space-section)]">
      <Eyebrow>{site.ui.otherWork}</Eyebrow>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {others.map((p) => (
          <li key={p.slug} className="reveal lift rounded-md border border-border bg-surface p-7">
            <p className="text-label text-fg-muted">{p.sector}</p>
            <h3 className="mt-2 text-h3 font-semibold">{p.title}</h3>
            <p className="mt-2 text-small text-fg-muted">{p.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
