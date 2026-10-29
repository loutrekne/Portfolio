import Image from "next/image";
import type { CaseSection } from "@/content";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

/** Rendu générique d'une section d'étude de cas (texte, puces, cartes, visuels). */
export function CaseSectionBlock({ section, pendingLabel }: { section: CaseSection; pendingLabel: string }) {
  return (
    <section id={section.id} className="reveal py-[var(--space-block)]">
      <div className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-12">
        <Eyebrow className="lg:pt-3">{section.label}</Eyebrow>
        <div>
          <h2 className="max-w-[24ch] text-h2 font-semibold text-balance">{section.heading}</h2>
          {section.body.map((para, i) => (
            <p key={i} className="mt-5 measure text-fg-muted">
              {para}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-6 measure space-y-2">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {section.cards && (
            <ol
              className={cn(
                "mt-8 grid gap-4 sm:grid-cols-2",
                section.cards.length % 3 === 0 && "xl:grid-cols-3",
              )}
            >
              {section.cards.map((c, i) => (
                <li key={c.title} className="lift rounded-md border border-border bg-surface p-6">
                  <span className="text-label font-medium text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold">{c.title}</h3>
                  <p className="mt-2 text-small text-fg-muted">{c.text}</p>
                </li>
              ))}
            </ol>
          )}
          {section.media?.map((m) =>
            m.width && m.height ? (
              <figure key={m.src} className="mt-10">
                <Image src={m.src} alt={m.alt} width={m.width} height={m.height} className="rounded-lg" />
                {m.caption && <figcaption className="mt-3 text-label text-fg-subtle">{m.caption}</figcaption>}
              </figure>
            ) : (
              <MediaPlaceholder key={m.src} label={pendingLabel} className="mt-10" />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
