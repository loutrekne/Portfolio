/**
 * ─────────────────────────────────────────────────────────────────────────
 *  AUDIT D'ACCESSIBILITÉ AUTOMATIQUE (axe-core + Playwright)
 * ─────────────────────────────────────────────────────────────────────────
 *  Utilisé par l'agent Cursor « a11y-audit » (.cursor/agents/a11y-audit.md),
 *  mais lançable seul :
 *
 *    1. Dans un terminal : npm run build && npm start      (site sur :3000)
 *    2. Dans un autre    : npm run a11y
 *       (ou BASE_URL=https://mon-site.vercel.app npm run a11y)
 *
 *  Ce que fait le script :
 *   - trouve toutes les pages (accueil, À propos, chaque étude de cas) ;
 *   - les teste en 4 configurations : mobile / desktop × clair / sombre ;
 *   - animations coupées (prefers-reduced-motion) pour mesurer l'état final,
 *     pas une apparition à mi-chemin (sinon faux échecs de contraste) ;
 *   - règles WCAG 2.0, 2.1 et 2.2, niveaux A et AA ;
 *   - écrit le détail dans docs/reviews/axe-latest.json et affiche un résumé.
 *
 *  Prérequis (une seule fois) : npx playwright install chromium
 *  axe ne détecte qu'environ un tiers des problèmes : le reste (clavier,
 *  lecteur d'écran, sens des alt…) est vérifié à la main par l'agent.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const CONFIGS = [
  { name: "mobile-clair", viewport: { width: 390, height: 844 }, colorScheme: "light", hasTouch: true },
  { name: "mobile-sombre", viewport: { width: 390, height: 844 }, colorScheme: "dark", hasTouch: true },
  { name: "desktop-clair", viewport: { width: 1440, height: 900 }, colorScheme: "light" },
  { name: "desktop-sombre", viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
];

const browser = await chromium.launch();

// 1 · Pages à tester : accueil + À propos + liens /projets/* trouvés sur l'accueil
const discover = await browser.newPage();
try {
  await discover.goto(BASE_URL, { waitUntil: "networkidle" });
} catch {
  console.error(`\n✗ Impossible d'ouvrir ${BASE_URL}. Le site tourne-t-il ? (npm run build && npm start)\n`);
  await browser.close();
  process.exit(1);
}
const projectPaths = await discover.$$eval('a[href^="/projets/"]', (as) => [
  ...new Set(as.map((a) => new URL(a.href).pathname)),
]);
await discover.close();
const paths = ["/", "/a-propos", ...projectPaths];

// 2 · Audit de chaque page dans chaque configuration
const results = [];
for (const config of CONFIGS) {
  const context = await browser.newContext({
    viewport: config.viewport,
    colorScheme: config.colorScheme,
    reducedMotion: "reduce",
    hasTouch: config.hasTouch ?? false,
  });
  for (const path of paths) {
    const page = await context.newPage();
    await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
    // Fait défiler la page pour déclencher les contenus qui apparaissent au scroll
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    for (const v of violations) {
      results.push({
        page: path,
        config: config.name,
        rule: v.id,
        impact: v.impact,
        description: v.help,
        helpUrl: v.helpUrl,
        wcag: v.tags.filter((t) => /^wcag\d/.test(t)),
        targets: v.nodes.map((n) => ({ selector: n.target.join(" "), html: n.html.slice(0, 200), why: n.failureSummary })),
      });
    }
    await page.close();
  }
  await context.close();
}
await browser.close();

// 3 · Rapport
await mkdir("docs/reviews", { recursive: true });
await writeFile(
  "docs/reviews/axe-latest.json",
  JSON.stringify({ date: new Date().toISOString(), baseUrl: BASE_URL, paths, results }, null, 2),
);

const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const byRule = new Map();
for (const r of results) {
  const key = r.rule;
  const entry = byRule.get(key) ?? { ...r, where: new Set(), count: 0 };
  entry.where.add(`${r.page} (${r.config})`);
  entry.count += r.targets.length;
  byRule.set(key, entry);
}
const sorted = [...byRule.values()].sort((a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9));

console.log(`\nAudit axe · ${paths.length} pages × ${CONFIGS.length} configurations · ${BASE_URL}`);
if (sorted.length === 0) {
  console.log("✓ Aucune violation détectée automatiquement. Reste la vérification manuelle.\n");
} else {
  for (const r of sorted) {
    console.log(`\n[${r.impact}] ${r.rule} — ${r.description} (${r.count} élément·s)`);
    console.log(`  WCAG : ${r.wcag.join(", ") || "bonne pratique"}`);
    console.log(`  Où   : ${[...r.where].slice(0, 6).join(" · ")}${r.where.size > 6 ? " …" : ""}`);
  }
  console.log(`\nDétail complet : docs/reviews/axe-latest.json\n`);
}
process.exit(sorted.some((r) => r.impact === "critical" || r.impact === "serious") ? 1 : 0);
