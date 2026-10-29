/**
 * Point d'entrée unique du contenu.
 * Les composants appellent `getContent()` et ne connaissent jamais la langue
 * en dur. Pour ajouter l'anglais : créer src/content/en/{site,about,projects}.ts
 * avec les mêmes types, puis l'ajouter à `dictionaries` (voir CLAUDE.md > i18n).
 */
import type { AboutContent, Candidature, CaseStudy, Locale, SiteContent } from "./types";
import { site as siteFr } from "./fr/site";
import { about as aboutFr } from "./fr/about";
import { projects as projectsFr } from "./fr/projects";
import { candidatures as candidaturesFr } from "./fr/candidatures";

export const defaultLocale: Locale = "fr";

const dictionaries: Partial<
  Record<Locale, { site: SiteContent; about: AboutContent; projects: CaseStudy[] }>
> = {
  fr: { site: siteFr, about: aboutFr, projects: projectsFr },
};

export function getContent(locale: Locale = defaultLocale) {
  const dict = dictionaries[locale] ?? dictionaries[defaultLocale]!;
  const projects = [...dict.projects].sort((a, b) => a.index.localeCompare(b.index));
  return {
    ...dict,
    projects,
    featured: projects.filter((p) => p.featured),
    others: projects.filter((p) => !p.featured),
  };
}

export function getProject(slug: string, locale: Locale = defaultLocale) {
  const { featured } = getContent(locale);
  const i = featured.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return { project: featured[i], next: featured[(i + 1) % featured.length] };
}

/**
 * Candidature sur mesure. Les brouillons ne sont visibles qu'en développement
 * (npm run dev) : en production, ils renvoient une 404.
 */
export function getCandidatures(): Candidature[] {
  const isProd = process.env.NODE_ENV === "production";
  return candidaturesFr.filter((c) => !isProd || c.status === "prete");
}

export function getCandidature(slug: string): Candidature | null {
  return getCandidatures().find((c) => c.slug === slug) ?? null;
}

export type * from "./types";
