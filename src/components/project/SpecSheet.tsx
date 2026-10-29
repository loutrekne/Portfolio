import type { CaseStudy, SiteContent } from "@/content";

/** Fiche projet : label / valeur, en lignes aérées. */
export function SpecSheet({ project, ui }: { project: CaseStudy; ui: SiteContent["ui"] }) {
  const rows: [string, React.ReactNode][] = [
    [ui.client, project.client],
    [ui.period, `${project.period} · ${project.context}`],
    [ui.role, project.role],
    ...(project.team ? [[ui.team, project.team.join(" · ")] as [string, string]] : []),
    [ui.tools, project.tools.join(" · ")],
  ];
  return (
    <dl className="text-small">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-1 border-b border-border py-4 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
        >
          <dt className="text-fg-muted">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
