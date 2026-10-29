import { getContent } from "@/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CopyEmailButton } from "@/components/interactions/CopyEmailButton";
import { fr } from "@/lib/typo";

/** Appel à l'action final : copier l'email en un clic, télécharger le CV, ou passer par LinkedIn. */
export function ContactCta() {
  const { site } = getContent();
  return (
    <section id="contact" className="container-site">
      <div className="reveal rounded-lg bg-surface px-6 py-16 sm:px-12 sm:py-24">
        <Eyebrow>{site.ui.contact}</Eyebrow>
        <h2 className="mt-6 max-w-[18ch] text-h1 font-semibold text-balance">{site.contact.ctaTitle}</h2>
        <p className="mt-6 measure text-lead text-fg-muted">{fr(site.contact.ctaText)}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CopyEmailButton email={site.contact.email} copiedLabel={site.ui.copied} />
          <ButtonLink href={site.contact.cvHref} variant="secondary">
            {site.ui.downloadCv}
          </ButtonLink>
          <ButtonLink href={site.contact.linkedin} variant="ghost">
            {site.ui.linkedin}
          </ButtonLink>
        </div>
      </div>
      <div className="h-[var(--space-section)]" aria-hidden />
    </section>
  );
}
