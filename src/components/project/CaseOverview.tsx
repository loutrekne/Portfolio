import type { CaseStudy, SiteContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/interactions/CountUp";
import { fr } from "@/lib/typo";

/**
 * « En bref » : tout ce qu'un recruteur doit retenir en 20 secondes,
 * AVANT le récit détaillé.
 *  - Le défi (à gauche, mis en avant) / le projet (résumé, à droite).
 *  - Les chiffres clés en ligne, séparés par des filets (pas de cartes).
 *    N'afficher que des faits vérifiés.
 */
export function CaseOverview({ project, ui }: { project: CaseStudy; ui: SiteContent["ui"] }) {
  return (
    <section aria-labelledby="en-bref" className="reveal py-[var(--space-block)]">
      <h2 id="en-bref" className="sr-only">
        {ui.inBrief}
      </h2>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {project.challenge && (
          <div>
            <Eyebrow>{ui.challenge}</Eyebrow>
            <p className="mt-4 text-h3 font-medium text-balance">{fr(project.challenge)}</p>
          </div>
        )}
        <div className={project.challenge ? "" : "lg:col-span-2"}>
          <Eyebrow>{ui.theProject}</Eyebrow>
          <p className="mt-4 measure text-fg-muted">{fr(project.summary)}</p>
        </div>
      </div>

      {project.outcomes.length > 0 && (
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:grid-cols-4 lg:gap-x-0">
          {project.outcomes.map((o, i) => (
            <div key={o.label} className={i > 0 ? "lg:border-l lg:border-border lg:pl-8" : "lg:pr-8"}>
              <dt className="sr-only">{o.label}</dt>
              <dd>
                <CountUp value={o.value} className="block text-h1 font-semibold whitespace-nowrap text-accent" />
                <span className="mt-2 block max-w-[24ch] text-small text-fg-muted">{fr(o.label)}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
