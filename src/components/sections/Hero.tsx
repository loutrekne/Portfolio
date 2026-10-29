import { getContent } from "@/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Scribble } from "@/components/trait/Scribble";
import { PortraitSticker } from "@/components/trait/PortraitSticker";
import { fr } from "@/lib/typo";

/**
 * Hero d'accueil : le texte et le portrait se SUPERPOSENT.
 *
 *  - Grand écran (lg, 1024 px et plus) : texte et portrait partagent la même rangée de grille
 *    (row-start-1). Le texte (z-10) occupe les colonnes 1 → 8, le portrait
 *    les colonnes 6 → 12, calé à droite : le texte effleure le dessin sans
 *    jamais passer sur l'arche craie du thème sombre (texte craie illisible).
 *  - Mobile : portrait en haut, le bloc texte remonte dessus (marge négative) ;
 *    la pastille de disponibilité vient se poser sur le bas de l'arche.
 *  - Le titre reste à taille raisonnable (text-display : 34 → 54 px) :
 *    c'est le dessin qui donne l'ampleur, pas la typo.
 */
export function Hero() {
  const { about, site } = getContent();
  const { title, titleHighlight } = about.hero;
  const i = titleHighlight ? title.indexOf(titleHighlight) : -1;

  return (
    <section className="container-site grid items-center pt-14 pb-12 sm:pt-20 lg:grid-cols-12 xl:pt-16">
      <PortraitSticker
        alt={site.ui.portraitAlt}
        className="mx-auto w-48 sm:ml-0 sm:w-72 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mx-0 lg:w-full lg:max-w-[26rem] lg:justify-self-end xl:max-w-[38rem]"
      />
      <div className="relative z-10 -mt-8 flex flex-col items-start sm:-mt-10 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:mt-0">
        {/* Pastille : sur mobile elle chevauche le bas de l'arche, d'où son fond */}
        <p className="inline-flex items-center gap-2.5 rounded-full bg-bg/90 py-1.5 pr-4 pl-3 text-label font-medium text-fg-muted shadow-soft backdrop-blur-sm lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <span aria-hidden className="size-2 breathe rounded-full bg-success" />
          {about.hero.availability}
        </p>
        {/* Le métier, lisible en 5 secondes, avant la promesse */}
        <p className="mt-6 font-medium text-fg lg:mt-8">{about.hero.eyebrow}</p>
        <h1 className="mt-3 max-w-[17ch] text-display font-semibold text-balance">
          {i < 0 || !titleHighlight ? (
            title
          ) : (
            <>
              {title.slice(0, i)}
              <span className="relative inline-block whitespace-nowrap">
                {titleHighlight}
                <Scribble
                  variant="circle"
                  delay={0.4}
                  className="absolute -top-[14%] -left-[9%] h-[128%] w-[118%] text-accent"
                />
              </span>
              {title.slice(i + titleHighlight.length)}
            </>
          )}
        </h1>
        {/* Mobile : le texte passe APRÈS les boutons, pour garder l'action dans le premier écran */}
        <p className="order-last mt-8 max-w-[34rem] text-lead text-fg-muted sm:order-none sm:mt-6 lg:max-w-[26rem] xl:mt-8 xl:max-w-[30rem]">
          {fr(about.hero.lead)}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 xl:mt-10">
          <ButtonLink href="/#projets" arrow>
            {site.ui.seeProjects}
          </ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            {site.ui.contactMe}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
