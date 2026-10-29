import type { CaseStudy } from "../../types";

export const project: CaseStudy = {
    slug: "polytropic-apps-mobiles",
    index: "02",
    featured: true,
    status: "visuals-pending",
    client: "Polytropic · Warmeo",
    sector: "Pompes à chaleur connectées",
    title: "Le vrai chantier n'était pas l'interface",
    tagline: "Une discovery qui recadre le projet, puis une app IoT pour deux personas et deux marques.",
    summary:
      "Avant de redessiner l'app utilisateur Polytropic, j'ai analysé 44 avis stores et benchmarké 7 apps concurrentes. Le diagnostic a recadré le projet : les utilisateurs ne se plaignaient pas de l'interface, mais de la fiabilité. J'ai ensuite conçu l'app pour deux personas, installateurs et particuliers, déclinée en deux marques via les thèmes du design system.",
    context: "Ingeli · Lyon",
    period: "Mai – sept. 2026",
    role: "Product Designer — discovery, benchmark, UX/UI mobile, thèmes multi-marques",
    tools: ["Figma", "Figma Variables", "Analyse qualitative", "Benchmark fonctionnel"],
    tags: ["Discovery", "Mobile", "IoT", "Multi-marques"],
    skills: ["recherche", "mobile", "design-system"],
    sectors: ["industrie-iot", "grand-public"],
    challenge:
      "Des notes de 1,9★ sur iOS et 2,7★ sur Android. La tentation : refaire l'interface. La question : est-ce vraiment elle que les utilisateurs rejettent ?",
    sections: [
      {
        id: "ecouter",
        label: "01 · Diagnostic",
        heading: "Écouter ce que les utilisateurs disent déjà",
        body: [
          "J'ai codé et catégorisé 44 avis uniques laissés sur les stores. L'insight a renversé le brief : les utilisateurs ne se plaignent jamais de l'interface. Ils se plaignent de la fiabilité, de l'appairage cassé, de la désynchronisation entre l'app et la pompe à chaleur.",
          "Le vrai chantier n'était pas design, il était produit. J'ai traduit le diagnostic en 13 chantiers priorisés P0 / P1 / P2 pour toute l'équipe.",
        ],
      },
      {
        id: "benchmark",
        label: "02 · Marché",
        heading: "Cartographier les patterns du marché",
        body: [
          "En parallèle, j'ai analysé 7 apps de pilotage d'équipements (My BMW, Airzone Cloud, S-Miles Enduser, iAquaLink, Pentair Pool, Daikin Onecta, Google Home / Nest) sur 6 axes fonctionnels, dans une matrice comparative notée.",
        ],
        bullets: [
          "Architecture & navigation",
          "Statut système synthétique",
          "Pilotage (consigne, modes, marche / arrêt)",
          "Programmation & automatisation",
          "Notifications & gestion des alarmes",
          "Ergonomie tactile (thumb zone)",
        ],
      },
      {
        id: "recommandations",
        label: "03 · Recommandations",
        heading: "5 recommandations structurantes pour la refonte",
        body: [],
        cards: [
          {
            title: "Un statut « All Good »",
            text: "Un message global qui répond d'un coup d'œil à la seule question qui compte : est-ce que tout va bien ?",
          },
          {
            title: "Une bottom tab bar",
            text: "Les actions principales dans la zone du pouce, comme sur les apps de référence du benchmark.",
          },
          {
            title: "Un pilotage dédié",
            text: "Consigne, modes et marche / arrêt réunis dans un espace clair, accessible directement.",
          },
          {
            title: "Une programmation flexible",
            text: "Des plannings adaptés aux usages réels plutôt que des créneaux rigides.",
          },
          {
            title: "Des notifications transmises au SAV",
            text: "L'alerte ne s'arrête pas au particulier : le professionnel est informé et peut agir.",
          },
        ],
      },
      {
        id: "deux-personas",
        label: "04 · Design",
        heading: "Un design system, deux personas",
        body: [
          "L'app sert deux publics. Les professionnels, installateurs sur le terrain, suivent un parc de machines : tableau de bord, alarmes récentes en tête, accès rapide à chaque installation. Les clients finaux pilotent leur équipement : température, seuils, modes.",
          "Les deux partagent le même design system, avec des composants adaptés à chaque contexte d'usage.",
        ],
      },
      {
        id: "deux-marques",
        label: "05 · Multi-marques",
        heading: "Deux marques, une seule gouvernance",
        body: [
          "Le même design system décline l'app en marque Warmeo via les thèmes clients. On change les primitives (couleurs, logo), tout le reste suit automatiquement, en clair comme en sombre. La gouvernance du thème se fait en un seul endroit.",
        ],
      },
    ],
    outcomes: [
      { value: "44", label: "avis stores codés et analysés" },
      { value: "7", label: "apps concurrentes benchmarkées sur 6 axes" },
      { value: "13", label: "chantiers priorisés P0 / P1 / P2" },
      { value: "2", label: "marques servies par le même design system" },
    ],
    pullQuote: {
      // Avis public anonymisé volontairement (pas de nom propre sur le site).
      text: "« L'application indique que la PAC est connectée mais les données sont celles du cache. UX = 0. »",
      source: "Avis Android, avril 2026",
    },
    cover: {
      src: "/images/projects/polytropic-apps-mobiles/cover.png",
      alt: "Trois écrans de l'app mobile Polytropic : tableau de bord professionnel, pilotage d'une installation en mode clair et en mode sombre",
    },
  };
