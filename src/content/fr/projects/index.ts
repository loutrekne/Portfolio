import type { CaseStudy } from "../../types";
import { project as ingeliDesignSystem } from "./ingeli-design-system";
import { project as polytropicAppsMobiles } from "./polytropic-apps-mobiles";
import { project as preciaMolen } from "./precia-molen";
import { project as merckScada } from "./merck-scada";
import { project as bollorePolaris } from "./bollore-polaris";
import { project as polytropicTechnicenter } from "./polytropic-technicenter";
import { project as iotmate } from "./iotmate";

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
 */
export const projects: CaseStudy[] = [
  ingeliDesignSystem,
  polytropicAppsMobiles,
  preciaMolen,
  merckScada,
  bollorePolaris,
  polytropicTechnicenter,
  iotmate,
];
