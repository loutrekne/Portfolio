import { Hero } from "@/components/sections/Hero";
import { ProjectList } from "@/components/sections/ProjectList";
import { Principles } from "@/components/sections/Principles";
import { OtherWork } from "@/components/sections/OtherWork";
import { ContactCta } from "@/components/sections/ContactCta";

/**
 * Accueil — one-scroll :
 * Hero → Projets sélectionnés → Comment je travaille → Aussi chez Ingeli → Contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectList />
      <Principles />
      <OtherWork />
      <ContactCta />
    </>
  );
}
