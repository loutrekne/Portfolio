/**
 * Types du contenu éditorial.
 *
 * RÈGLE : aucun texte visible ne doit être écrit en dur dans un composant.
 * Tout passe par `src/content/<locale>/*.ts`, typé ici. C'est ce qui rend
 * le site "prêt pour l'anglais" : ajouter `src/content/en/` suffit
 * (voir CLAUDE.md > i18n).
 */

export type Locale = "fr" | "en";

/** Visuel d'un projet. `src` est relatif à /public. */
export interface Media {
  src: string;
  alt: string;
  /** Légende façon commentaire de code, ex. "Avant : 2 pages séparées". */
  caption?: string;
  width?: number;
  height?: number;
}

/** Un chiffre ou un fait marquant. N'y mettre QUE des faits vérifiés. */
export interface Outcome {
  value: string;
  label: string;
}

/** Une section narrative d'une étude de cas. */
export interface CaseSection {
  /** Ancre HTML (kebab-case). */
  id: string;
  /** Petit label mono au-dessus du titre, ex. "02 · Le point de rupture". */
  label: string;
  heading: string;
  /** Paragraphes. */
  body: string[];
  bullets?: string[];
  /** Cartes numérotées (méthode, limites, recommandations…). */
  cards?: { title: string; text: string }[];
  media?: Media[];
}

export type ProjectStatus =
  /** Textes + visuels prêts. */
  | "ready"
  /** Textes prêts, visuels manquants : afficher un placeholder sobre. */
  | "visuals-pending";

/**
 * Catégories des filtres de l'accueil. Le slug sert aussi de lien partageable :
 * /?focus=design-system#projets ouvre l'accueil déjà filtré.
 * Ajouter une catégorie : l'ajouter ici, lui donner un libellé dans
 * site.filters (src/content/fr/site.ts), puis la poser sur les projets.
 */
export type SkillCategory = "design-system" | "recherche" | "logiciel-metier" | "mobile" | "ia";
export type SectorCategory = "industrie-iot" | "pharma" | "logistique" | "grand-public";

export interface CaseStudy {
  slug: string;
  /** Numéro affiché ("01"). Détermine aussi l'ordre. */
  index: string;
  /** true = étude de cas complète ; false = carte courte "Autres projets". */
  featured: boolean;
  status: ProjectStatus;

  client: string;
  /** Secteur, ex. "IoT industriel · confort thermique". */
  sector: string;
  /** Titre éditorial (l'angle), pas le nom du client. */
  title: string;
  /** Une phrase qui résume l'enjeu. */
  tagline: string;
  /** 2–3 phrases pour la carte projet et la meta description. */
  summary: string;

  /** Cadre : employeur / agence · période. */
  context: string;
  period: string;
  role: string;
  team?: string[];
  tools: string[];
  tags: string[];
  /** Compétences démontrées par le projet (filtres de l'accueil). */
  skills: SkillCategory[];
  /** Secteurs du projet (filtres de l'accueil). */
  sectors: SectorCategory[];

  /** Le défi, en une ou deux phrases. */
  challenge?: string;
  sections: CaseSection[];
  outcomes: Outcome[];
  /** Phrase-signature affichée en serif italique. */
  pullQuote?: { text: string; source?: string };
  cover?: Media;
}

export interface Principle {
  title: string;
  text: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  place?: string;
  text?: string;
}

export interface AboutContent {
  /** Hero de la page d'accueil. */
  hero: {
    eyebrow: string;
    title: string;
    /** Fragment du titre affiché "surligné" (doit apparaître tel quel dans `title`). */
    titleHighlight?: string;
    lead: string;
    availability: string;
  };
  /** Version courte (accueil). */
  short: string;
  /** Version longue (page À propos), en paragraphes. */
  long: string[];
  principles: Principle[];
  skills: SkillGroup[];
  experience: TimelineItem[];
  education: TimelineItem[];
  certifications: string[];
  languages: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  role: string;
  location: string;
  meta: { title: string; description: string };
  nav: NavItem[];
  /** Catégories des projets : libellés + phrase de la sélection reçue par lien (?focus=…). */
  filters: {
    selectionIntro: string;
    /** « 1 projet sur {total} » / « {n} projets sur {total} ». */
    countOne: string;
    countMany: string;
    /** « Voir les {total} projets ». */
    showAll: string;
    skills: Record<SkillCategory, string>;
    sectors: Record<SectorCategory, string>;
  };
  contact: {
    email: string;
    linkedin: string;
    cvHref: string;
    ctaTitle: string;
    ctaText: string;
  };
  /** Micro-textes d'interface (boutons, labels). */
  ui: Record<
    | "skipLink"
    | "portraitAlt"
    | "seeProject"
    | "copied"
    | "themeLight"
    | "themeDark"
    | "contact"
    | "seeProjects"
    | "contactMe"
    | "downloadCv"
    | "linkedin"
    | "cv"
    | "newTab"
    | "pdfNewTab"
    | "copyFailed"
    | "themeNowLight"
    | "themeNowDark"
    | "notFoundMeta"
    | "selectedWork"
    | "otherWork"
    | "howIWork"
    | "howIWorkTitle"
    | "howIWorkIntro"
    | "otherWorkTitle"
    | "otherWorkIntro"
    | "readCase"
    | "nextProject"
    | "backHome"
    | "client"
    | "period"
    | "role"
    | "team"
    | "tools"
    | "challenge"
    | "inBrief"
    | "candEyebrow"
    | "candHello"
    | "candSignature"
    | "candNeedsEyebrow"
    | "candNeedsTitle"
    | "candSeeProject"
    | "candProjects"
    | "candAllWork"
    | "candDraft"
    | "theProject"
    | "onThisPage"
    | "allProjects"
    | "outcomes"
    | "visualsPending"
    | "skills"
    | "experience"
    | "education"
    | "certifications"
    | "languages"
    | "notFoundTitle"
    | "notFoundText",
    string
  >;
}

/**
 * Page de candidature sur mesure : /pour/<slug>.
 * Préparée par l'agent Cursor `candidature` à partir d'une offre d'emploi,
 * RELUE ET RÉÉCRITE par Louise avant envoi.
 */
export interface Candidature {
  /** Segment d'URL : /pour/<slug> (kebab-case, nom de l'entreprise). */
  slug: string;
  /** "brouillon" : visible seulement en local (npm run dev), jamais en production. */
  status: "brouillon" | "prete";
  company: string;
  role: string;
  /** Date de préparation, ex. "Novembre 2026". */
  date: string;
  /** Lien de l'offre (pour mémoire, non affiché). */
  offerUrl?: string;
  /** 2 ou 3 phrases, à la première personne, écrites (ou réécrites) par Louise. */
  greeting: string;
  /** Ce que l'offre demande → le projet qui le prouve. 3 ou 4 lignes. */
  matches: {
    /** L'attente, reprise de l'offre (courte). */
    need: string;
    /** Slug d'un projet « featured ». */
    project: string;
    /** Pourquoi ce projet répond à l'attente : un FAIT tiré de l'étude de cas. */
    proof: string;
  }[];
  /** Projets à lire en premier, dans l'ordre (slugs). */
  projects: string[];
}
