import type { Candidature } from "../../types";

/**
 * EXEMPLE FICTIF pour tester la page /pour/exemple en local.
 * Statut "brouillon" : n'est jamais publié en production. À supprimer ou garder comme modèle.
 */
export const candidature: Candidature = {
  slug: "exemple",
  status: "brouillon",
  company: "Atelier Exemple",
  role: "Product Designer confirmée",
  date: "Novembre 2026",
  greeting:
    "Votre offre parle d'un design system à faire grandir avec les équipes de développement, sur un logiciel métier exigeant. C'est exactement ce que je fais depuis un an chez Ingeli. Voici les projets qui vous montreront comment.",
  matches: [
    {
      need: "Faire évoluer un design system partagé avec les devs",
      project: "ingeli-design-system",
      proof: "J'ai fait passer le design system d'Ingeli de Figma au code : une source, sept sorties générées, 317 variables Figma synchronisées.",
    },
    {
      need: "Partir des besoins réels des utilisateurs",
      project: "polytropic-apps-mobiles",
      proof: "44 avis stores analysés et 7 apps benchmarkées avant d'ouvrir Figma : le vrai chantier était la fiabilité, pas l'interface.",
    },
    {
      need: "Simplifier des parcours métier complexes",
      project: "polytropic-technicenter",
      proof: "Pour les techniciens, une intervention se traite désormais sur une seule page au lieu de deux.",
    },
  ],
  projects: ["ingeli-design-system", "polytropic-apps-mobiles", "polytropic-technicenter"],
};
