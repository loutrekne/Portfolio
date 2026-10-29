import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidature, getCandidatures, getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DrawnRule } from "@/components/trait/DrawnRule";
import { ProjectRows } from "@/components/trait/ProjectRows";
import { ContactCta } from "@/components/sections/ContactCta";
import { fr } from "@/lib/typo";

/**
 * PAGE DE CANDIDATURE SUR MESURE : /pour/<slug>
 *
 *   Bonjour l'équipe <entreprise> + mot de Louise
 *   ─ trait ─
 *   « Ce que vous cherchez → le projet qui le prouve » (3–4 lignes)
 *   Les projets à lire en premier (dans l'ordre choisi)
 *   Contact
 *
 * Contenu : src/content/fr/candidatures/<slug>.ts, préparé par l'agent
 * Cursor `/candidature`, relu par Louise. Jamais indexée par les moteurs
 * de recherche. Les brouillons n'existent pas en production (404).
 */
export function generateStaticParams() {
  const list = getCandidatures();
  // Cache Components exige au moins un paramètre : sans candidature prête,
  // on génère "exemple" (brouillon) qui renvoie une 404 en production.
  return list.length ? list.map((c) => ({ slug: c.slug })) : [{ slug: "exemple" }];
}

export async function generateMetadata({ params }: PageProps<"/pour/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCandidature(slug);
  return {
    title: c ? `${getContent().site.ui.candEyebrow} — ${c.company}` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function CandidaturePage({ params }: PageProps<"/pour/[slug]">) {
  const { slug } = await params;
  const c = getCandidature(slug);
  if (!c) notFound();
  const { site, featured } = getContent();
  const ui = site.ui;
  const bySlug = new Map(featured.map((p) => [p.slug, p]));

  // Projets choisis, dans l'ordre de la candidature (slugs inconnus ignorés)
  const rows = c.projects
    .map((s) => bySlug.get(s))
    .filter((p) => p !== undefined)
    .map((p) => ({
      slug: p.slug,
      index: p.index,
      client: p.client,
      sector: p.sector,
      title: fr(p.title),
      tagline: fr(p.tagline),
      period: p.period,
      categories: [],
      skillLabels: p.skills.map((s) => site.filters.skills[s]),
    }));

  return (
    <>
      <article className="container-site pt-12 sm:pt-16">
        {c.status === "brouillon" && (
          <p className="mb-10 rounded-md bg-highlight px-5 py-3 text-small text-on-highlight">
            {ui.candDraft}
          </p>
        )}

        <Eyebrow>
          {ui.candEyebrow} · {c.role} · {c.date}
        </Eyebrow>
        <h1 className="mt-5 max-w-[22ch] text-display font-semibold text-balance">
          {ui.candHello.replace("{company}", c.company)}
        </h1>
        <p className="mt-6 measure text-lead">{fr(c.greeting)}</p>
        <p className="mt-4 text-small text-fg-muted">— {ui.candSignature}</p>

        <div className="mt-[var(--space-block)]">
          <DrawnRule />
        </div>

        {/* L'offre, attente par attente, reliée à la preuve */}
        <section className="mt-[var(--space-block)]">
          <SectionHeader eyebrow={ui.candNeedsEyebrow} title={ui.candNeedsTitle} />
          <ol className="mt-10 border-t border-border">
            {c.matches.map((m, i) => {
              const p = bySlug.get(m.project);
              return (
                <li
                  key={m.need}
                  className="reveal grid gap-3 border-b border-border py-7 sm:grid-cols-[1fr_2.5rem_1.25fr] sm:gap-6"
                >
                  <div className="flex gap-4">
                    <span className="pt-1 text-label font-medium text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-h3 font-semibold text-balance">{fr(m.need)}</p>
                  </div>
                  <span aria-hidden className="hidden pt-0.5 text-h3 text-accent sm:block">
                    →
                  </span>
                  <div>
                    <p className="text-fg-muted">{fr(m.proof)}</p>
                    {p && (
                      <Link
                        href={`/projets/${p.slug}`}
                        className="group mt-3 inline-flex items-center gap-2 font-medium text-accent"
                      >
                        <span className="sr-only">{ui.candSeeProject} : </span>
                        {fr(p.title)}
                        <span
                          aria-hidden
                          className="transition-transform duration-500 ease-spring group-hover:translate-x-1 group-active:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {rows.length > 0 && (
          <section className="mt-[var(--space-section)]">
            <Eyebrow as="h2">{ui.candProjects}</Eyebrow>
            <ProjectRows
              rows={rows}
              cursorLabel={ui.seeProject}
              ctaLabel={ui.readCase}
              selection={{ labels: {}, intro: "", countOne: "", countMany: "", showAll: "" }}
            />
          </section>
        )}

        <p className="mt-10 mb-[var(--space-section)]">
          <Link href="/" className="font-medium text-accent underline underline-offset-4">
            {ui.candAllWork}
          </Link>
        </p>
      </article>
      <ContactCta />
    </>
  );
}
