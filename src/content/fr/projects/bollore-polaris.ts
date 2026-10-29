import type { CaseStudy } from "../../types";

export const project: CaseStudy = {
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
    skills: ["recherche", "logiciel-metier", "design-system"],
    sectors: ["logistique"],
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
  };
