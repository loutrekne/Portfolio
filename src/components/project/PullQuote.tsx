/** Phrase-signature : grande, calme, en italique. */
export function PullQuote({ text, source }: { text: string; source?: string }) {
  return (
    <figure className="reveal py-[var(--space-block)]">
      <blockquote className="max-w-[30ch] text-h2 font-medium text-balance italic">{text}</blockquote>
      {source && <figcaption className="mt-4 text-label text-fg-muted">{source}</figcaption>}
    </figure>
  );
}
