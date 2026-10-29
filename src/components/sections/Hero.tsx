import { getContent } from "@/content";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Hero d'accueil : une phrase, un mot surligné, deux actions, la disponibilité. */
export function Hero() {
  const { about, site } = getContent();
  const { title, titleHighlight } = about.hero;
  const i = titleHighlight ? title.indexOf(titleHighlight) : -1;

  return (
    <section className="container-site pt-20 pb-12 sm:pt-28">
      <p className="inline-flex items-center gap-2.5 text-label font-medium text-fg-muted">
        <span aria-hidden className="size-2 breathe rounded-full bg-success" />
        {about.hero.availability}
      </p>
      <h1 className="mt-8 max-w-[17ch] text-display font-semibold text-balance">
        {i < 0 || !titleHighlight ? (
          title
        ) : (
          <>
            {title.slice(0, i)}
            <span className="mark-static">{titleHighlight}</span>
            {title.slice(i + titleHighlight.length)}
          </>
        )}
      </h1>
      <p className="mt-8 measure text-lead text-fg-muted">{about.hero.lead}</p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <ButtonLink href="/#projets" arrow>
          {site.ui.seeProjects}
        </ButtonLink>
        <ButtonLink href="/#contact" variant="ghost">
          {site.ui.contactMe}
        </ButtonLink>
      </div>
    </section>
  );
}
