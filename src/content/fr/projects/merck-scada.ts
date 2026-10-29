import type { CaseStudy } from "../../types";

export const project: CaseStudy = {
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
    skills: ["recherche", "logiciel-metier", "design-system"],
    sectors: ["pharma", "industrie-iot"],
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
  };
