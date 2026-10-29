import type { CaseStudy } from "../../types";

export const project: CaseStudy = {
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
    skills: ["design-system", "ia"],
    sectors: ["industrie-iot"],
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
          "L'historique Git devient l'historique du design system. Chaque changement est tracé, daté, commenté. Je retrouve quand, et pourquoi, la couleur accent a changé.",
        ],
      },
      {
        id: "agents-ia",
        label: "04 · Pipeline",
        heading: "Deux agents IA dans la boucle design → code → Figma",
        body: [
          "Pour que le code-first tienne au quotidien, la boucle entre design, code et Figma doit rester fluide. J'ai mis en place deux agents, chacun sur un sens du trajet.",
          "En quatre semaines d'historique Git, j'ai écrit avec l'agent environ 12 000 lignes d'outillage : générateurs, contrôles, tests. Avant chaque commit, 25 étapes de contrôle s'enchaînent et s'arrêtent au premier échec.",
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
      { value: "1 → 7", label: "une source, sept sorties générées : tokens, kit, Figma, code…" },
      { value: "237", label: "paires de contraste vérifiées à chaque build, 0 échec" },
      { value: "37", label: "composants dans le kit, dont 22 documentés" },
      { value: "317", label: "variables Figma synchronisées et contrôlées" },
    ],
    pullQuote: {
      text: "Le handoff design → dev arrête d'être un endroit où les choses se perdent.",
    },
    cover: {
      src: "/images/projects/ingeli-design-system/cover.png",
      alt: "Panneau Variables de Figma montrant les collections Brand, Aliases et Mapped du design system Ingeli",
    },
  };
