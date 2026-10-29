import { Hero } from "@/components/sections/Hero";
import { ProjectList } from "@/components/sections/ProjectList";
import { Principles } from "@/components/sections/Principles";
import { OtherWork } from "@/components/sections/OtherWork";
import { ContactCta } from "@/components/sections/ContactCta";
import { DrawnRule } from "@/components/trait/DrawnRule";

/** Séparateur tracé à la main entre deux sections. */
function Rule() {
  return (
    <div className="container-site">
      <DrawnRule />
    </div>
  );
}

/**
 * Accueil — one-scroll :
 * Hero → Projets sélectionnés → Comment je travaille → Aussi chez Ingeli → Contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Rule />
      <ProjectList />
      <Rule />
      <Principles />
      <Rule />
      <OtherWork />
      <ContactCta />
    </>
  );
}
