import type { CaseStudy } from "../types";

/**
 * Études de cas (FR).
 *
 * Ordre = ordre d'affichage (champ `index`).
 * featured: true  → étude de cas complète, listée dans "Projets sélectionnés".
 * featured: false → carte courte dans "Aussi chez Ingeli".
 *
 * Source : Book 2026 + CV 2026. Les "TODO(louise)" signalent un fait à
 * compléter (mesure d'impact, constat d'audit…). Ne jamais inventer de chiffre.
 *
 * Visuels attendus dans /public/images/projects/<slug>/ (voir CLAUDE.md).
 *
 * TODO(louise) : préciser les périodes des projets Ingeli (actuellement "2026").
 */
export const projects: CaseStudy[] = [
  // ───────────────────────────────────────────────────────────── 01
  {
    slug: "ingeli-design-system",
    index: "01",
    featured: true,
    status: "visuals-pending",
    client: "Ingeli",
    sector: "IoT industriel · confort thermique & pesage",
    title: "Du Figma-first au code-first",
    tagline:
      "Faire du code la source de vérité d'un design system multi-marques, et confier le handoff à des agents IA.",
    summary:
      "Chez Ingeli, éditeur de logiciels IoT pour des équipementiers du confort thermique et du pesage, j'ai structuré le process design from scratch et fait basculer le design system de Figma vers le code. Un repo Git, une feuille de style agnostique du framework, et deux agents IA qui gardent Figma et Blazor synchronisés.",
    context: "Ingeli · Lyon",
    period: "Depuis nov. 2025",
    role: "Product Designer & Design Engineer — design ops, design system, pipeline IA",
    team: ["Louise Knoery — Product Designer & Design Engineer", "Rabie & François-Xavier — développement"],
    tools: [
      "Figma Variables",
      "SCSS",
      "Blazor (C#)",
      "Git",
      "Claude Code",
      "OpenCode",
      "MCP Figma",
      "WebStorm",
      "YouTrack",
    ],
    tags: ["Design system", "Design engineering", "Agents IA", "Design ops"],
    challenge:
      "Un seul design system doit servir 4 produits, plusieurs marques clientes et deux modes d'affichage, avec une équipe dev qui livre en Blazor et une seule designer côté produit.",
    sections: [
      {
        id: "v1-figma-first",
        label: "01 · V1",
        heading: "Un design system Figma-first",
        body: [
          "J'ai d'abord construit le design system entièrement dans Figma, avec les Variables. L'objectif : un seul set de composants pour tous les projets Ingeli, des thèmes clients commutables en un clic et un mode clair / sombre.",
          "Côté méthode, ce socle change tout : les composants sont prêts, je ne redessine pas, j'assemble. Je passe directement en hi-fi, sans wireframes basse fidélité. Le client valide ce qu'il verra en production, pas une approximation.",
        ],
        bullets: [
          "Tokens primitifs et sémantiques dans Figma Variables",
          "Composants avec propriétés et variants",
          "Thèmes clients commutables en un clic",
          "Documentation en pages Figma",
        ],
      },
      {
        id: "point-de-rupture",
        label: "02 · Le point de rupture",
        heading: "Trois limites qui ont rendu la V2 inévitable",
        body: ["La V1 fonctionnait côté design. À l'usage, trois limites sont apparues."],
        cards: [
          {
            title: "Figma n'était pas la source de vérité",
            text: "Un dev modifiait un composant Blazor sans que je le voie. Au tour suivant, la maquette était désynchronisée. Qui a raison : le design ou le code ?",
          },
          {
            title: "Deux historiques qui ne se parlent pas",
            text: "Figma a son historique, Git a le sien. Impossible de retrouver quand, et pourquoi, la couleur accent avait changé.",
          },
          {
            title: "Un handoff resté manuel",
            text: "Chaque composant Figma devait être recodé à la main en Blazor. Les specs se perdaient entre les deux mondes.",
          },
        ],
      },
      {
        id: "v2-code-first",
        label: "03 · V2",
        heading: "Code-first, Git comme historique",
        body: [
          "J'ai déplacé la source de vérité dans un repo dédié, versionné en Git. La feuille de style devient la référence : les composants Blazor de production la consomment, et un autre framework peut faire de même. Un prototype React l'a d'ailleurs consommée telle quelle.",
          "L'historique Git devient l'historique du design system. Chaque changement est tracé, daté, commenté. Je sais pourquoi la couleur accent a changé il y a trois mois.",
        ],
      },
      {
        id: "agents-ia",
        label: "04 · Pipeline",
        heading: "Deux agents IA dans la boucle design → code → Figma",
        body: [
          "Pour que le code-first tienne au quotidien, la boucle entre design, code et Figma doit rester fluide. J'ai mis en place deux agents, chacun sur un sens du trajet.",
        ],
        cards: [
          {
            title: "Claude Code : de la spec au composant",
            text: "Il lit mes specs (Figma, Markdown) et génère les composants Blazor en respectant la gouvernance du design system. Je revois, j'ajuste, je commit.",
          },
          {
            title: "OpenCode + MCP Figma : du code vers Figma",
            text: "Quand un composant évolue dans le code, sa version Figma est mise à jour automatiquement. Les deux mondes restent alignés sans effort manuel.",
          },
        ],
      },
      {
        id: "role",
        label: "05 · Le rôle",
        heading: "Ce que ça change dans mon métier",
        body: [
          "Je ne livre plus des maquettes que d'autres traduisent. Je co-construis un système qui vit en continu, avec un historique partagé et des agents qui maintiennent sa cohérence.",
          "Je passe moins de temps à documenter manuellement, et plus de temps à décider des règles du système. J'ai aussi formé les équipes dev et business aux bonnes pratiques UX/UI et à l'accessibilité (WCAG).",
        ],
      },
    ],
    outcomes: [
      { value: "4", label: "produits servis par un seul design system" },
      { value: "1", label: "source de vérité : un repo Git versionné" },
      { value: "2", label: "agents IA intégrés au pipeline de handoff" },
      // TODO(louise) : ajouter une mesure d'impact si disponible
      // (ex. temps de handoff avant/après, nb de composants générés).
    ],
    pullQuote: {
      text: "Le handoff design → dev arrête d'être un endroit où les choses se perdent.",
    },
    cover: {
      src: "/images/projects/ingeli-design-system/cover.png",
      alt: "Panneau Variables de Figma montrant les collections Brand, Aliases et Mapped du design system Ingeli",
    },
  },

  // ───────────────────────────────────────────────────────────── 02
  {
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
    period: "2026",
    role: "Product Designer — discovery, benchmark, UX/UI mobile, thèmes multi-marques",
    tools: ["Figma", "Figma Variables", "Analyse qualitative", "Benchmark fonctionnel"],
    tags: ["Discovery", "Mobile", "IoT", "Multi-marques"],
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
  },

  // ───────────────────────────────────────────────────────────── 03
  {
    slug: "precia-molen",
    index: "03",
    featured: true,
    status: "visuals-pending",
    client: "Precia Molen",
    sector: "Pesage industriel",
    title: "De la spec Markdown à l'écran interactif",
    tagline: "Un audit UX et un POC React généré par agent IA, sans passer par une seule maquette.",
    summary:
      "Precia Molen, industriel du pesage, voulait un audit UX et un POC d'interface pour son logiciel de gestion des pesées. J'ai rédigé les specs en Markdown, un agent IA a généré un prototype React interactif, écrans complets inclus. Puis j'y ai appliqué la feuille de style du design system Blazor : le prototype est visuellement identique au DS, sans être passé par Figma.",
    context: "Ingeli · Lyon",
    period: "2026",
    role: "Product Designer & Design Engineer — audit UX, specs, prototype piloté par IA",
    tools: ["Markdown", "Agent IA", "React", "Feuille de style du design system"],
    tags: ["Audit UX", "Prototype", "Agents IA", "Design engineering"],
    challenge:
      "Prouver la valeur d'une refonte à un industriel, vite, avec quelque chose qu'il peut manipuler plutôt que commenter.",
    sections: [
      {
        id: "audit",
        label: "01 · Audit",
        heading: "Partir de l'existant",
        body: [
          "La mission démarre par un audit UX du logiciel de gestion des pesées : liste des pesées, transactions, configuration des utilisateurs et du matériel.",
          // TODO(louise) : 2–3 constats clés de l'audit (ex. lisibilité des statuts, filtres, densité de la liste).
        ],
      },
      {
        id: "spec-to-screen",
        label: "02 · Pipeline",
        heading: "La spec devient l'écran",
        body: [
          "Au lieu de maquetter, j'ai écrit des specs en Markdown. Un agent IA les lit et génère un prototype React interactif, écrans entiers inclus.",
          "C'est le pipeline du design system Ingeli testé en vraie situation client, hors de Blazor.",
        ],
      },
      {
        id: "ds-agnostique",
        label: "03 · Preuve",
        heading: "La preuve que le design system est agnostique",
        body: [
          "J'ai appliqué au React généré la même feuille de style que celle des composants Blazor en production. Résultat : un prototype visuellement identique au design system, sans passer par la maquette.",
          "Le design system reste la référence, et Figma n'est plus un passage obligé.",
        ],
      },
    ],
    outcomes: [
      { value: "0", label: "maquette Figma : de la spec au prototype interactif" },
      { value: "1", label: "feuille de style partagée entre Blazor et React" },
    ],
    pullQuote: {
      text: "L'agent lit la spec, génère les composants, hérite de la feuille de style. Le design system reste la référence.",
    },
    cover: {
      src: "/images/projects/precia-molen/cover.png",
      alt: "Prototype React de la liste des pesées Precia Molen : filtres, tableau des transactions et statuts",
    },
  },

  // ───────────────────────────────────────────────────────────── 04
  {
    slug: "merck-scada",
    index: "04",
    featured: true,
    status: "visuals-pending",
    client: "Merck",
    sector: "Pharmaceutique · industrie 4.0",
    title: "Une machine de la taille d'une pièce, six façons de la piloter",
    tagline:
      "L'interface SCADA d'une machine automatisée de test d'échantillons, pensée pour six profils d'utilisateurs.",
    summary:
      "Merck préparait une machine automatisée de test d'échantillons pour le contrôle environnemental de l'air en zones contrôlées : unités de filtration, bras robotisés, dispositifs d'imagerie, chambres de décontamination. Avec l'équipe Seven Circles, j'ai conçu son interface de contrôle, de l'opérateur au directeur.",
    context: "Seven Circles · Lyon",
    period: "2023 – 2024",
    role: "Product Designer — architecture de l'information, wireframes hi-fi, illustrations, maquettes et prototypage",
    team: [
      "Benoit Jacques — Lead UX",
      "Aymeric Bianco Pellé — Product Designer",
      "Louise Knoery — Product Designer",
    ],
    tools: ["Figma", "Prototypage interactif"],
    tags: ["SCADA", "Industrie", "Design system", "Prototypage"],
    challenge:
      "Rendre pilotable un système industriel complexe par six profils aux besoins divergents, dans un environnement pharmaceutique où l'erreur coûte cher.",
    sections: [
      {
        id: "personas",
        label: "01 · Utilisateurs",
        heading: "Six personas, une seule interface",
        body: [
          "Opérateurs, directeurs, experts biologiques, maintenance, managers, ingénieurs : chacun attend autre chose de la machine. L'architecture de l'information devait servir chaque rôle sans complexifier l'expérience des autres.",
        ],
        bullets: ["Operator", "Director", "Experts biologiques", "Maintenance", "Managers", "Ingénieurs"],
      },
      {
        id: "methode",
        label: "02 · Méthode",
        heading: "Un prototype par tâche, une validation par sprint",
        body: [],
        cards: [
          {
            title: "Discover",
            text: "Lecture du cahier des charges, atelier user flow, backlog priorisé par sprints.",
          },
          {
            title: "Prototype",
            text: "Pour chaque tâche utilisateur, un prototype interactif décrivant le flux type.",
          },
          { title: "Test", text: "À chaque fin de sprint, présentation des propositions aux experts." },
          {
            title: "Final design",
            text: "Optimisation UI, visuels, animations et nouveaux composants du design system, avec les devs.",
          },
        ],
      },
      {
        id: "design-system",
        label: "03 · Design system",
        heading: "Un design system pensé pour l'industrie",
        body: [
          "Tokens de couleur (primary, accent, positive, negative), échelle typographique, rayons, espacements, épaisseurs de bordure, et des composants métier : statuts de machine, cartes de tâches, boutons, champs.",
        ],
      },
      {
        id: "ecrans",
        label: "04 · Écrans",
        heading: "Du tableau de bord au plan d'échantillonnage",
        body: [
          "Tableau de bord (usage, flotte de robots, maintenance à venir, alarmes, tâches en cours), plans d'échantillonnage versionnés avec circuit d'approbation et déclenchement manuel, gestion des procédures de nettoyage, détail d'un plan par équipe et par planning.",
        ],
      },
    ],
    outcomes: [
      { value: "6", label: "personas servis par une même interface" },
      { value: "4", label: "étapes par sprint : discover, prototype, test, final" },
    ],
    cover: {
      src: "/images/projects/merck-scada/cover.png",
      alt: "Écran Sampling plans de l'interface SCADA Merck sur tablette : cartes de plans versionnés avec actions d'approbation",
    },
  },

  // ───────────────────────────────────────────────────────────── 05
  {
    slug: "bollore-polaris",
    index: "05",
    featured: true,
    status: "visuals-pending",
    client: "Bolloré Logistics",
    sector: "Logistique B2B",
    title: "Rendre visible le voyage d'une marchandise",
    tagline:
      "Polaris, un outil de pilotage de fret B2B : de la demande de devis au suivi de livraison, coûts, délais et CO₂ compris.",
    summary:
      "Polaris accompagne les clients B2B de Bolloré Logistics de la demande de devis jusqu'à la livraison, en mesurant l'impact de chaque phase en coûts, en temps et en CO₂. Sur le MVP centré sur la brique TRACK, j'ai mené personas, interviews, architecture de l'information, prototypage et mise en place du design system.",
    context: "Seven Circles · Lyon",
    period: "2023 – 2024",
    role: "Product Designer — personas, interviews, architecture de l'information, maquettes, design system",
    team: ["Aymeric Bianco Pellé — Lead Product Designer", "Louise Knoery — Product Designer"],
    tools: ["Figma", "FigJam", "Jira"],
    tags: ["SaaS B2B", "Logistique", "Design system", "Recherche"],
    challenge:
      "Une chaîne de transport fragmentée (modes, escales, retards) et des clients qui veulent une seule chose : savoir où est leur marchandise, et ce qu'elle leur coûte.",
    sections: [
      {
        id: "recherche",
        label: "01 · Recherche",
        heading: "Comprendre les clients avant la donnée",
        body: [
          "Personas et interviews utilisateurs ont cadré le MVP autour de la brique TRACK : le suivi d'expédition, là où se concentre l'attente des clients.",
        ],
      },
      {
        id: "architecture",
        label: "02 · Architecture",
        heading: "Du global au détail en un clic",
        body: [
          "La liste des expéditions donne la vue d'ensemble : statut, départ, destination, mode de transport, retards visibles d'un coup d'œil, filtres par date et par mode. La fiche expédition raconte le voyage : timeline des étapes, cargaison, références, coûts, empreinte carbone, contacts.",
        ],
      },
      {
        id: "design-system",
        label: "03 · Design system",
        heading: "Un design system dédié",
        body: [
          "Composants, champs, calendrier avec raccourcis (demain, semaine prochaine…), styles de texte et couleurs sémantiques, posés dès le MVP pour que le produit puisse grandir sans se fragmenter.",
        ],
      },
    ],
    outcomes: [
      { value: "3", label: "dimensions d'impact suivies : coûts, temps, CO₂" },
      { value: "MVP", label: "brique TRACK conçue de la recherche au design system" },
    ],
    cover: {
      src: "/images/projects/bollore-polaris/cover.png",
      alt: "Liste des expéditions de Polaris : tableau filtrable avec statuts, départs, destinations et retards",
    },
  },

  // ───────────────────────────────────────────── Autres projets (cartes courtes)
  {
    slug: "polytropic-technicenter",
    index: "06",
    featured: false,
    status: "visuals-pending",
    client: "Polytropic",
    sector: "Supervision professionnelle",
    title: "TechniCenter : de 2 pages à 1",
    tagline: "Réunir le ticket d'intervention avec sa machine.",
    summary:
      "Le ticket vivait sur une page séparée de la machine : le technicien naviguait entre les deux à chaque intervention. En fusionnant les pages, le ticket devient un bloc de la fiche machine. Zéro changement de contexte.",
    context: "Ingeli · Lyon",
    period: "2026",
    role: "Product Designer — refonte de l'outil de supervision",
    tools: ["Figma"],
    tags: ["Web app", "Supervision"],
    sections: [],
    outcomes: [{ value: "2 → 1", label: "pages pour traiter une intervention" }],
  },
  {
    slug: "iotmate",
    index: "07",
    featured: false,
    status: "visuals-pending",
    client: "IoTMate",
    sector: "Supervision multi-sites",
    title: "IoTMate : des dashboards qui se lisent",
    tagline: "Dashboards de supervision multi-sites.",
    summary:
      "Conception de dashboards de supervision multi-sites : widgets de données, contrôles temporels et sélection de période pour lire l'historique d'un parc d'équipements.",
    context: "Ingeli · Lyon",
    period: "2026",
    role: "Product Designer — dashboards",
    tools: ["Figma"],
    tags: ["Dashboard", "Data viz"],
    sections: [],
    outcomes: [],
  },
];
