import type { CaseStudy } from "../../types";

/**
 * TechniCenter (Polytropic) — étude de cas courte.
 * Sources : Book 2026 (page « De 2 pages à 1 ») + réponses de Louise (29/10/2026).
 * TODO(louise) : déposer les captures dans /public/images/projects/polytropic-technicenter/
 *   cover.png · avant-machine.png · avant-ticket.png · apres-fiche-machine.png
 *   puis renseigner width / height ci-dessous et passer status à "ready".
 * TODO(louise) : ajouter un retour terrain ou une mesure quand il y en aura un.
 */
export const project: CaseStudy = {
    slug: "polytropic-technicenter",
    index: "06",
    featured: true,
    status: "visuals-pending",
    client: "Polytropic",
    sector: "Supervision professionnelle",
    title: "TechniCenter : de 2 pages à 1",
    tagline: "Réunir le ticket d'intervention avec sa machine, et limiter les sous-pages.",
    summary:
      "TechniCenter est l'outil de supervision des professionnels Polytropic : techniciens SAV et installateurs, au bureau comme sur le terrain. Le ticket d'intervention vivait sur une page séparée de la machine : à chaque intervention, il fallait naviguer entre les deux. J'ai recentré l'outil sur la fiche machine et fait du ticket un bloc de cette fiche. Zéro changement de contexte.",
    context: "Ingeli · Lyon",
    period: "Déc. 2025 – mars 2026",
    role: "Product Designer — refonte de l'outil de supervision",
    tools: ["Figma"],
    tags: ["Web app", "Supervision"],
    skills: ["logiciel-metier", "recherche"],
    sectors: ["industrie-iot"],
    challenge:
      "Un technicien ouvrait la fiche d'une machine, puis une autre page pour son ticket. À chaque intervention, il jonglait entre les deux, et chaque fonctionnalité ajoutait une sous-page de plus.",
    sections: [
      {
        id: "utilisateurs",
        label: "01 · Utilisateurs",
        heading: "Un outil, plusieurs métiers",
        body: [
          "TechniCenter sert tous les profils professionnels de Polytropic : techniciens SAV et installateurs, au bureau comme sur le terrain. Leur point commun : tout part d'une machine, la pompe à chaleur qu'ils suivent ou sur laquelle ils interviennent.",
        ],
      },
      {
        id: "diagnostic",
        label: "02 · Diagnostic",
        heading: "Deux pages pour une seule intervention",
        body: [
          "Le point de départ, ce sont les retours des techniciens, complétés par une analyse d'utilisabilité de l'outil existant.",
          "Le ticket d'intervention vivait sur une page séparée de la fiche machine. Pour traiter une intervention, il fallait passer de l'une à l'autre, et l'outil multipliait les sous-pages au fil des fonctionnalités.",
        ],
        media: [
          {
            src: "/images/projects/polytropic-technicenter/avant-machine.png",
            alt: "Avant : la fiche machine de la V1, sans le ticket d'intervention",
            caption: "Avant : la fiche machine…",
          },
          {
            src: "/images/projects/polytropic-technicenter/avant-ticket.png",
            alt: "Avant : la page du ticket d'intervention, séparée de la machine",
            caption: "… et le ticket, sur une autre page",
          },
        ],
      },
      {
        id: "fiche-machine",
        label: "03 · Parti pris",
        heading: "Tout sur la fiche machine",
        body: [
          "Mon objectif principal : limiter les sous-pages. J'ai concentré le travail sur la page machine et ses fonctionnalités, pour que le technicien trouve au même endroit l'état de l'équipement et ce qu'il doit y faire.",
          "Le ticket devient un bloc de la fiche machine. On ouvre la machine, on traite l'intervention, sans quitter la page.",
        ],
        media: [
          {
            src: "/images/projects/polytropic-technicenter/apres-fiche-machine.png",
            alt: "Après : la fiche machine unifiée, avec le ticket d'intervention intégré en bloc",
            caption: "Après : une seule fiche, le ticket intégré",
          },
        ],
      },
      {
        id: "contraintes",
        label: "04 · Contraintes",
        heading: "Simplifier dans un cadre donné",
        body: [
          "L'interface est développée en Blazor (C#), avec les composants du design system Ingeli : chaque proposition devait tenir dans ce cadre technique.",
          "Le client avait aussi des demandes précises. Mon rôle : les intégrer sans perdre l'objectif de départ, moins de pages et moins d'allers-retours.",
        ],
      },
      {
        id: "resultat",
        label: "05 · Résultat",
        heading: "Livré, et la suite",
        body: [
          "La refonte est livrée. Une intervention se traite désormais depuis une seule page au lieu de deux.",
          "Il n'y a pas encore de retour mesuré des techniciens. C'est la prochaine étape : vérifier sur le terrain que la fiche unifiée tient ses promesses.",
        ],
      },
    ],
    outcomes: [{ value: "2 → 1", label: "pages pour traiter une intervention" }],
    cover: {
      src: "/images/projects/polytropic-technicenter/cover.png",
      alt: "Fiche machine TechniCenter avec le ticket d'intervention intégré",
    },
  };
