import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent, getProject } from "@/content";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { CaseHero } from "@/components/project/CaseHero";
import { CaseOverview } from "@/components/project/CaseOverview";
import { CaseToc } from "@/components/project/CaseToc";
import { CaseSectionBlock } from "@/components/project/CaseSectionBlock";
import { PullQuote } from "@/components/project/PullQuote";
import { NextProject } from "@/components/project/NextProject";
import { DrawnRule } from "@/components/trait/DrawnRule";

/**
 * Gabarit d'étude de cas (commun à tous les projets « featured ») :
 *
 *   En-tête (retour, titre, fiche projet en bandeau)
 *   Visuel de couverture
 *   En bref : le défi, le projet, les chiffres clés      ← lisible en 20 s
 *   ─ trait ─
 *   Sommaire collant | Récit en sections                  ← pour qui veut le détail
 *   Phrase-signature
 *   Projet suivant
 *
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

  // Entrées du sommaire, tirées des labels « 02 · Le point de rupture »
  const toc = project.sections.map((s) => {
    const [num, ...rest] = s.label.split(" · ");
    return { id: s.id, num: rest.length ? num : "", name: rest.length ? rest.join(" · ") : s.label };
  });

  return (
    <article className="container-site pt-12 pb-[var(--space-section)] sm:pt-16">
      {/* Barre de lecture liée au scroll (CSS pur, voir globals.css) */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] reading-progress bg-accent" />

      <CaseHero project={project} ui={site.ui} />

      {project.cover?.width && project.cover.height ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          priority
          className="mt-12 rounded-lg"
        />
      ) : (
        <MediaPlaceholder label={site.ui.visualsPending} className="mt-12" />
      )}

      <CaseOverview project={project} ui={site.ui} />

      <DrawnRule />

      <div className="mt-[var(--space-block)] grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <CaseToc items={toc} label={site.ui.onThisPage} />
        </aside>
        <div>
          {project.sections.map((s) => (
            <CaseSectionBlock key={s.id} section={s} pendingLabel={site.ui.visualsPending} />
          ))}
          {project.pullQuote && <PullQuote {...project.pullQuote} />}
        </div>
      </div>

      <div className="mt-[var(--space-block)]">
        <NextProject
          href={`/projets/${next.slug}`}
          index={next.index}
          title={next.title}
          label={site.ui.nextProject}
        />
      </div>
    </article>
  );
}
