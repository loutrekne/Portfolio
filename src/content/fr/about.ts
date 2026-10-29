import type { AboutContent } from "../types";

/**
 * "À propos" (FR) — hero d'accueil, bio courte, bio longue, principes, parcours.
 * Source : CV 2026 + Book 2026. Aucun chiffre inventé.
 */
export const about: AboutContent = {
  hero: {
    eyebrow: "Product Designer & Design Engineer · Lyon",
    title: "Je rends simples les logiciels complexes. Avec les équipes qui les construisent.",
    titleHighlight: "simples",
    lead: "4 ans de product design sur des logiciels métiers : fintech, santé, logistique, IoT industriel. Je travaille au plus près des devs, du produit et des utilisateurs pour livrer des interfaces qu'on comprend sans mode d'emploi. Et comme je parle aussi le langage du code, ce qu'on décide ensemble arrive intact en production.",
    // TODO(louise) : confirmer la date de disponibilité avant mise en ligne.
    availability: "Ouverte aux opportunités en CDI",
  },

  short:
    "Product Designer depuis 4 ans sur des logiciels métiers, je travaille là où l'interface a peu de droit à l'erreur : supervision de pompes à chaleur, machine de test pharmaceutique, suivi de fret international, pesage industriel. Ma façon de faire : comprendre les utilisateurs, concevoir avec l'équipe, et suivre le design jusque dans le code pour qu'il reste simple une fois livré.",

  long: [
    "Je suis Product Designer et Design Engineer, basée à Lyon. Depuis 4 ans, je conçois des logiciels métiers là où l'interface a peu de droit à l'erreur : la supervision de pompes à chaleur connectées, le pilotage d'une machine automatisée de test pharmaceutique, le suivi de fret international, le pesage industriel.",
    "Mon terrain de jeu, c'est la complexité. Six personas sur une même machine. Un technicien qui jongle entre deux écrans à chaque intervention. Des utilisateurs qui notent leur app 1,9★ sans jamais se plaindre de l'interface. Mon travail commence par trouver le vrai problème, souvent produit avant d'être visuel, puis par le rendre simple.",
    "Ce qui me distingue : je ne m'arrête pas à la maquette. Chez Ingeli, j'ai fait évoluer le design system d'une V1 Figma-first vers une V2 code-first, versionnée en Git et agnostique du framework. J'y ai branché des agents IA qui génèrent les composants et resynchronisent Figma. Je passe moins de temps à documenter, et plus de temps à décider des règles du système.",
    "Avant Ingeli, j'ai mené 5 projets de A à Z chez Seven Circles (Merck, Bolloré Logistics…), audité l'accessibilité et l'éco-conception d'interfaces chez Wide à Genève, et posé un premier design system chez Apidae Tourisme. En 2025, un bootcamp Data Analytics au Wagon m'a appris à lire les données que mes interfaces affichent.",
    "Ce que je cherche aujourd'hui : une équipe avec qui construire, pas seulement à qui livrer des maquettes. Designers, devs et PO qui se parlent chaque jour, et des produits dont on est fiers parce que les gens s'en servent sans effort.",
  ],

  principles: [
    {
      title: "Trouver le vrai problème",
      text: "Avant d'ouvrir Figma, j'écoute ce que les utilisateurs disent déjà : avis stores, interviews, benchmarks. Sur Polytropic, ça a déplacé le chantier de l'interface vers la fiabilité.",
    },
    {
      title: "Concevoir avec, pas pour",
      text: "Ateliers de co-conception, tests utilisateurs, rituels design–dev au quotidien : les bonnes idées viennent rarement d'une seule personne. J'anime, je synthétise, et on décide ensemble.",
    },
    {
      title: "Adapter la méthode au contexte",
      text: "Des wireframes quand l'univers visuel reste à construire, du hi-fi direct quand le design system fait déjà le travail. Le bon processus, c'est celui qui épouse la réalité du projet.",
    },
    {
      title: "Garder le design intact jusqu'en production",
      text: "Un design system qui vit dans le code, et des agents IA qui gardent Figma et le produit alignés. Ce qu'on a validé ensemble, c'est ce que les utilisateurs reçoivent.",
    },
  ],

  skills: [
    {
      label: "Product design",
      items: [
        "Recherche utilisateur",
        "Interviews & tests",
        "Ateliers de co-conception",
        "Architecture de l'information",
        "User flows",
        "Prototypage",
      ],
    },
    {
      label: "Design systems",
      items: [
        "Design tokens",
        "Thèmes multi-marques",
        "Modes clair / sombre",
        "Composants & variants",
        "Documentation",
        "Gouvernance",
      ],
    },
    {
      label: "Design engineering",
      items: ["HTML", "CSS / SCSS", "Astro", "Prototypes React", "Lecture Blazor / C#", "Git"],
    },
    {
      label: "IA & workflows",
      items: ["Claude Code", "OpenCode", "MCP Figma", "Specs Markdown pour agents"],
    },
    {
      label: "Accessibilité",
      items: ["WCAG", "Audits d'accessibilité", "Éco-conception"],
    },
    {
      label: "Data",
      items: ["SQL", "Python", "BigQuery", "dbt", "Power BI", "Looker Studio"],
    },
    {
      label: "Méthodes & outils",
      items: ["Lean UX", "Double Diamond", "Design Ops", "Scrum", "Figma", "Jira", "Confluence", "Notion"],
    },
  ],

  experience: [
    {
      period: "Depuis nov. 2025",
      title: "Product Designer & Design Engineer",
      org: "Ingeli",
      place: "Lyon",
      text: "Logiciels IoT industriels (confort thermique, pesage). Design ops from scratch, design system V1 Figma-first → V2 code-first, pipeline Figma-to-Blazor outillé par agents IA, formation des équipes à l'UX et à l'accessibilité.",
    },
    {
      period: "2025",
      title: "Bootcamp Data Analytics",
      org: "Le Wagon",
      place: "Lyon",
    },
    {
      period: "Janv. 2023 – août 2024",
      title: "UX/UI Designer",
      org: "Seven Circles",
      place: "Lyon",
      text: "SaaS métiers (fintech, santé, pharma, environnement, logistique) pour des clients internationaux. 5 projets menés de A à Z, workshops, tests utilisateurs, design systems.",
    },
    {
      period: "Févr. – sept. 2022",
      title: "UX Designer",
      org: "Wide Switzerland",
      place: "Genève",
      text: "Audits d'accessibilité, d'ergonomie et d'éco-conception ; refontes d'interfaces web.",
    },
    {
      period: "Sept. 2020 – févr. 2022",
      title: "UI/UX Designer",
      org: "Apidae Tourisme",
      place: "Lyon",
      text: "Recherche utilisateur, refonte graphique, charte UI et premier design system partagé avec les devs.",
    },
    {
      period: "2019 – 2020",
      title: "Graphiste · Webdesigner",
      org: "Millet Mountain Group · Fredel Family",
      place: "Annecy · Lyon",
    },
  ],

  education: [
    { period: "2025", title: "Data Analytics Bootcamp", org: "Le Wagon" },
    { period: "2020 – 2022", title: "Mastère Direction Artistique Digitale", org: "YNOV Lyon" },
    { period: "2017 – 2020", title: "Bachelor Chef de Projet Web", org: "Digital Campus Lyon" },
  ],

  certifications: ["Web Accessibility for All — Contentsquare (WCAG)"],

  languages: ["Français — natif", "Anglais — B2 (TOEIC 905)", "Espagnol — notions"],
};
