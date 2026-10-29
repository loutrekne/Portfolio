import type { Candidature } from "../../types";
import { candidature as exemple } from "./exemple";

/**
 * Pages de candidature sur mesure (/pour/<slug>).
 * Ajouter une candidature : créer <slug>.ts (agent Cursor `/candidature`),
 * l'importer ici et l'ajouter au tableau.
 */
export const candidatures: Candidature[] = [exemple];
