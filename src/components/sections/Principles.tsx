import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** "Comment je travaille" : texte court + 4 principes en cartes qui se soulèvent. */
export function Principles() {
  const { about, site } = getContent();
  return (
    <section className="container-site section-y">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Eyebrow>{site.ui.howIWork}</Eyebrow>
          <p className="mt-6 text-lead">{about.short}</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {about.principles.map((pr, i) => (
            <li key={pr.title} className="reveal lift rounded-md border border-border bg-surface p-7">
              <span className="text-label font-medium text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-h3 font-semibold">{pr.title}</h3>
              <p className="mt-2 text-small text-fg-muted">{pr.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
