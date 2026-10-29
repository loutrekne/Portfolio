import Link from "next/link";
import type { CaseStudy, SiteContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fr } from "@/lib/typo";

/**
 * En-tête d'étude de cas :
 *  - lien retour vers la liste des projets ;
 *  - numéro + client · secteur, titre (l'angle), phrase d'enjeu ;
 *  - fiche projet en bandeau (période, rôle, équipe, outils), lisible d'un coup d'œil.
 */
export function CaseHero({ project, ui }: { project: CaseStudy; ui: SiteContent["ui"] }) {
  const facts: [string, string][] = [
    [ui.period, `${project.period} · ${project.context}`],
    [ui.role, project.role],
    ...(project.team ? [[ui.team, project.team.join(" · ")] as [string, string]] : []),
    [ui.tools, project.tools.join(" · ")],
  ];

  return (
    <header>
      <Link
        href="/#projets"
        className="group inline-flex items-center gap-2 text-label font-medium text-fg-muted transition-colors hover:text-fg"
      >
        <span aria-hidden className="transition-transform duration-500 ease-spring group-hover:-translate-x-1 group-active:-translate-x-1">
          ←
        </span>
        {ui.allProjects}
      </Link>

      <Eyebrow index={project.index} className="mt-10">
        {project.client} · {project.sector}
      </Eyebrow>
      <h1 className="mt-5 max-w-[22ch] text-display font-semibold text-balance">{fr(project.title)}</h1>
      <p className="mt-6 measure text-lead text-fg-muted">{fr(project.tagline)}</p>

      <dl className="mt-12 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label} className="border-b border-border py-5 lg:border-b-0">
            <dt className="text-label text-fg-subtle">{label}</dt>
            <dd className="mt-1.5 text-small">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
