import { fr } from "@/lib/typo";

/** Phrase-signature : grande, calme, en italique, ouverte par un guillemet terracotta. */
export function PullQuote({ text, source }: { text: string; source?: string }) {
  return (
    <figure className="reveal py-[var(--space-block)]">
      <span aria-hidden className="block text-[4rem] leading-none font-semibold text-accent">
        “
      </span>
      <blockquote className="-mt-4 max-w-[30ch] text-h2 font-medium text-balance italic">{fr(text)}</blockquote>
      {source && <figcaption className="mt-4 text-label text-fg-muted">{source}</figcaption>}
    </figure>
  );
}
