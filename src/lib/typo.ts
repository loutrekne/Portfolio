/**
 * Typographie française : remplace l'espace avant « : ; ? ! » et à l'intérieur
 * des guillemets par une espace insécable fine, pour que la ponctuation ne
 * se retrouve jamais seule en début de ligne.
 * Les contenus restent écrits avec des espaces normales (plus simple à éditer).
 */
export function fr(text: string): string {
  return text
    .replace(/ ([:;?!»])/g, " $1")
    .replace(/« /g, "« ");
}
