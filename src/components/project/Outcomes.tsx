import type { Outcome } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/interactions/CountUp";

/** Chiffres clés, qui "montent" à l'arrivée. N'afficher que des faits vérifiés. */
export function Outcomes({ items, label }: { items: Outcome[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <section className="reveal py-[var(--space-block)]">
      <Eyebrow>{label}</Eyebrow>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((o) => (
          <div key={o.label} className="rounded-md bg-surface p-6">
            <dt className="sr-only">{o.label}</dt>
            <dd>
              <CountUp value={o.value} className="block text-h1 font-semibold" />
              <span className="mt-2 block text-small text-fg-muted">{o.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
