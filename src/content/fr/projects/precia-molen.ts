import type { CaseStudy } from "../../types";

export const project: CaseStudy = {
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
    period: "Août – oct. 2026",
    role: "Product Designer & Design Engineer — audit UX, specs, prototype piloté par IA",
    tools: ["Markdown", "Agent IA", "React", "Feuille de style du design system"],
    tags: ["Audit UX", "Prototype", "Agents IA", "Design engineering"],
    challenge:
    "Plusieurs logiciels connectés entre eux, sans design system commun : chacun avait son propre style, daté et peu intuitif. Avant d'engager une refonte complète, il fallait vérifier avec le client que la nouvelle direction lui correspond.",
    sections: [
      {
        id: "audit",
        label: "01 · Audit",
        heading: "Partir de l'existant",
        body: [
          "La mission démarre par un audit UX du logiciel de gestion des pesées : liste des pesées, transactions, configuration des utilisateurs et du matériel.",
          "Le constat : pas de design system. Chaque logiciel avait sa propre apparence, avec des interfaces d'une autre époque, peu lisibles et peu engageantes au quotidien. Plutôt que de tout redessiner d'emblée, on a construit d'abord un POC : vérifier qu'il correspond à leurs usages, puis bâtir la suite ensemble, sur une base commune.",
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
  };
