/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CAPTURES D'ÉCRAN DU SITE (Playwright)
 * ─────────────────────────────────────────────────────────────────────────
 *  Utilisé par l'agent Cursor « ux-review » (.cursor/agents/ux-review.md)
 *  pour REGARDER le site, et lançable seul :
 *
 *    1. Dans un terminal : npm run dev                     (site sur :3000)
 *    2. Dans un autre    : npm run screenshots
 *       Options : PAGES="/,/a-propos" pour limiter les pages
 *                 BASE_URL=https://mon-site.vercel.app pour le site en ligne
 *
 *  Produit, dans docs/reviews/captures/ (dossier ignoré par Git) :
 *   - une capture « premier écran » et une capture pleine page,
 *   - pour chaque page × mobile 390 / tablette 1024 / desktop 1440 × clair / sombre.
 *  Les animations d'apparition sont jouées avant la capture (défilement lent).
 *
 *  Prérequis (une seule fois) : npx playwright install chromium
 * ─────────────────────────────────────────────────────────────────────────
 */
import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT = "docs/reviews/captures";
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, hasTouch: true },
  { name: "tablette", width: 1024, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
];
const THEMES = ["light", "dark"];

const browser = await chromium.launch();

// Pages : celles passées dans PAGES, sinon accueil + À propos + études de cas
let paths = process.env.PAGES?.split(",").map((p) => p.trim());
if (!paths) {
  const page = await browser.newPage();
  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
  } catch {
    console.error(`\n✗ Impossible d'ouvrir ${BASE_URL}. Le site tourne-t-il ? (npm run dev)\n`);
    await browser.close();
    process.exit(1);
  }
  const projects = await page.$$eval('a[href^="/projets/"]', (as) => [
    ...new Set(as.map((a) => new URL(a.href).pathname)),
  ]);
  await page.close();
  paths = ["/", "/a-propos", ...projects];
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme,
      hasTouch: vp.hasTouch ?? false,
      isMobile: vp.hasTouch ?? false,
    });
    for (const path of paths) {
      const page = await context.newPage();
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      await page.waitForTimeout(2500); // laisse le portrait se dessiner
      const slug = path === "/" ? "accueil" : path.replace(/^\//, "").replaceAll("/", "-");
      const base = `${OUT}/${slug}--${vp.name}--${theme === "light" ? "clair" : "sombre"}`;
      await page.screenshot({ path: `${base}--1-premier-ecran.png` });
      // Défilement lent : déclenche les apparitions, compteurs et traits dessinés
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 300) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
      });
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${base}--2-page-entiere.png`, fullPage: true });
      await page.close();
    }
    await context.close();
  }
}
await browser.close();
console.log(`\n✓ ${paths.length * VIEWPORTS.length * THEMES.length * 2} captures dans ${OUT}/\n`);
