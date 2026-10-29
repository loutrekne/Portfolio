import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getProject } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SpecSheet } from "@/components/project/SpecSheet";
import { CaseSectionBlock } from "@/components/project/CaseSectionBlock";
import { Outcomes } from "@/components/project/Outcomes";
import { PullQuote } from "@/components/project/PullQuote";

/**
 * Gabarit d'étude de cas : Hero → visuel → fiche technique + défi →
 * sections narratives → chiffres → phrase-signature → projet suivant.
 * Toutes les pages sont pré-rendues au build (generateStaticParams).
 */
export function generateStaticParams() {
  return getContent().featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) return {};
  return { title: `${found.project.client} — ${found.project.title}`, description: found.project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const { project, next } = found;
  const { site } = getContent();

  return (
    <article className="container-site pt-16 pb-[var(--space-section)]">
      {/* Barre de lecture liée au scroll (CSS pur, voir globals.css) */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] reading-progress bg-accent" />
      <header>
        <Eyebrow index={project.index}>
          {project.client} · {project.sector}
        </Eyebrow>
        <h1 className="mt-6 max-w-[20ch] text-h1 font-semibold text-balance">{project.title}</h1>
        <p className="mt-6 measure text-lead text-fg-muted">{project.tagline}</p>
      </header>

      {/* TODO(cursor) : remplacer par <Image> quand /public/images/projects/<slug>/cover.png existe */}
      <MediaPlaceholder label={site.ui.visualsPending} className="mt-14" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <SpecSheet project={project} ui={site.ui} />
        <div>
          <p className="text-lead">{project.summary}</p>
          {project.challenge && (
            <div className="mt-8 rounded-md bg-surface p-6">
              <Eyebrow>{site.ui.challenge}</Eyebrow>
              <p className="mt-3">{project.challenge}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[var(--space-block)]">
        {project.sections.map((s) => (
          <CaseSectionBlock key={s.id} section={s} pendingLabel={site.ui.visualsPending} />
        ))}
      </div>

      <Outcomes items={project.outcomes} label={site.ui.outcomes} />
      {project.pullQuote && <PullQuote {...project.pullQuote} />}

      <nav className="mt-[var(--space-block)]" aria-label={site.ui.nextProject}>
        <Link
          href={`/projets/${next.slug}`}
          className="group block rounded-lg bg-surface p-8 transition-colors sm:p-12"
        >
          <Eyebrow index={next.index}>{site.ui.nextProject}</Eyebrow>
          <span className="mt-4 flex items-baseline justify-between gap-6 text-h2 font-semibold">
            <span className="mark">{next.title}</span>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-spring group-hover:translate-x-2"
            >
              →
            </span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
