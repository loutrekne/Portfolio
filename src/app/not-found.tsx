import type { Metadata } from "next";
import { getContent } from "@/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Titre d'onglet propre (sinon la 404 porte le titre de l'accueil) : « Page introuvable — Louise Knoery ». */
export const metadata: Metadata = { title: getContent().site.ui.notFoundMeta };

export default function NotFound() {
  const { site } = getContent();
  return (
    <div className="container-site section-y">
      <Eyebrow index="404">Erreur</Eyebrow>
      <h1 className="mt-6 text-h1 font-semibold">{site.ui.notFoundTitle}</h1>
      <p className="mt-6 text-lead text-fg-muted">{site.ui.notFoundText}</p>
      <ButtonLink href="/" arrow className="mt-10">
        {site.ui.backHome}
      </ButtonLink>
    </div>
  );
}
