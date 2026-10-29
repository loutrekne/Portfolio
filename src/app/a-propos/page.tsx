import type { Metadata } from "next";
import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { TimelineItem } from "@/content/types";

export const metadata: Metadata = { title: "À propos" };

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol>
      {items.map((it) => (
        <li
          key={`${it.org}-${it.period}`}
          className="reveal grid gap-2 border-b border-border py-6 sm:grid-cols-[12rem_1fr] sm:gap-8"
        >
          <span className="text-label text-fg-muted tabular-nums">{it.period}</span>
          <div>
            <p className="font-medium">
              {it.title}{" "}
              <span className="text-fg-muted">
                · {it.org}
                {it.place ? `, ${it.place}` : ""}
              </span>
            </p>
            {it.text && <p className="mt-2 measure text-sm text-fg-muted">{it.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** À propos : bio longue → compétences → parcours → formation, certifs, langues. */
export default function AboutPage() {
  const { about, site } = getContent();
  return (
    <div className="container-site pt-20 pb-[var(--space-section)]">
      <Eyebrow>{about.hero.eyebrow}</Eyebrow>
      <h1 className="mt-6 text-display font-semibold">{site.name}</h1>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6 text-lead">
          {about.long.map((p, i) => (
            <p key={i} className={i === 0 ? "" : "text-fg-muted"}>
              {p}
            </p>
          ))}
        </div>
        <aside className="lg:pt-2">
          {/* TODO(louise) : ajouter un portrait dans /public/images/portrait.jpg */}
          <ButtonLink href={site.contact.cvHref} arrow>
            {site.ui.downloadCv}
          </ButtonLink>
        </aside>
      </div>

      <section className="mt-[var(--space-section)]">
        <Eyebrow>{site.ui.skills}</Eyebrow>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {about.skills.map((g) => (
            <div key={g.label}>
              <h2 className="font-semibold">{g.label}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[var(--space-section)]">
        <Eyebrow>{site.ui.experience}</Eyebrow>
        <div className="mt-8">
          <Timeline items={about.experience} />
        </div>
      </section>

      <section className="mt-[var(--space-section)] grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Eyebrow>{site.ui.education}</Eyebrow>
          <div className="mt-8">
            <Timeline items={about.education} />
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <Eyebrow>{site.ui.certifications}</Eyebrow>
            <ul className="mt-6 space-y-2">
              {about.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>{site.ui.languages}</Eyebrow>
            <ul className="mt-6 space-y-2">
              {about.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
