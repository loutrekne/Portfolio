# AGENTS.md — Portfolio de Louise Knoery

Point d'entrée de tout agent de code (Cursor, Claude Code, Codex…). Ce fichier est court : il dit **quoi lire**, **quelles règles ne jamais enfreindre** et **comment travailler avec Louise**. Le détail est dans `CLAUDE.md`.

## 1. À lire avant d'écrire du code

1. **`CLAUDE.md`** : source de vérité. Vision, arborescence, règles complètes (§5), état du projet (§7), « Le trait » (§9), agents de revue (§10).
2. **`docs/design-system.md`** : couleurs et contrastes, typo, formes, micro-interactions.
3. **`node_modules/next/dist/docs/`** pour toute API Next.js (voir le bloc en bas de ce fichier : Next 16 a changé beaucoup de choses).

## 2. Le projet en bref

- Portfolio de **Louise Knoery, Product Designer & Design Engineer**. Objectif : décrocher un **CDI** dans une équipe où designers, devs et produit conçoivent ensemble des produits utilisables.
- Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 (configuré dans le CSS) · Motion (`motion/react`) · TypeScript. Déployé sur Vercel.
- Direction : naturelle, minimaliste, humaine. Papier & encre, Figtree, **un seul accent terracotta**. Motif graphique : **le trait** dessiné à la main.
- Contenus en français (prêts pour l'anglais) dans `src/content/fr/`.

## 3. Règles à ne jamais enfreindre

- **Aucun texte visible en dur** dans un composant : tout vient de `src/content/<locale>/`.
- **Ne jamais inventer un chiffre, un résultat, une date ou une citation.** S'il manque une information, laisser un `TODO(louise)` et le signaler.
- **Tokens uniquement** : pas de couleur ni de taille en dur. Nouveau token → `src/styles/tokens.css` (clair + sombre), puis mappé dans `@theme inline` (`globals.css`).
- **Tactile** : un effet de survol fait maison va dans `@media (hover: hover)` et a son équivalent à l'appui (`:active`, `group-active:`, `whileTap`). Ce qui est cliquable doit se voir **au repos**.
- **Mouvement** : chaque animation répond à un geste ou accompagne une arrivée. `prefers-reduced-motion` est toujours respecté.
- **Accessibilité** : WCAG 2.2 AA. Focus visible, clavier, `alt` utiles, traits décoratifs en `aria-hidden`.
- **Typographie française** : passer les textes longs par `fr()` (`src/lib/typo.ts`) pour les espaces insécables avant `: ; ? !`.
- Server Components par défaut ; `"use client"` seulement pour une vraie interaction.

## 4. Travailler avec Louise

- Réponses **en français**, formulations **affirmées** (pas de « peut-être » ni de « il faudrait éventuellement »).
- Préférer des **micro-modifications expliquées** à des réécritures complètes : dire quel fichier, quoi changer, et pourquoi.
- Pour situer un passage, donner un **texte à chercher (Cmd + F)** plutôt qu'un numéro de ligne.
- Ne pas modifier un fichier sans rapport avec la demande (pas de reformatage global).

## 5. Avant de dire « c'est fini »

```bash
npm run typecheck && npm run lint && npm run build
```

- Changement visible : vérifier en mobile (390 px) et desktop, en clair et en sombre (`npm run screenshots`, site lancé).
- Changement d'interface : proposer un passage de `/a11y-audit` (et `/ux-review` si c'est un changement de parcours ou de contenu).
- Mettre à jour `CLAUDE.md` : §3 (arborescence) si un composant est créé ou supprimé, §7 (état) quand une étape est terminée.

## 6. Sous-agents de revue (`.cursor/agents/`)

Ils ne modifient jamais le code : ils écrivent un rapport priorisé (P0 / P1 / P2) dans `docs/reviews/`.

| Agent | Appel | Rôle |
|---|---|---|
| `ux-review` | `/ux-review` (+ page ou section) | Revue UX avec trois lecteurs en tête (recruteur·se, design manager, tech lead), à partir de captures réelles du site. |
| `a11y-audit` | `/a11y-audit` | Audit WCAG 2.2 AA : test automatique `npm run a11y` (axe) + vérification manuelle (clavier, structure, contrastes, mouvement, tactile, lecteur d'écran). |

Les corrections issues d'un rapport se font ensuite, constat par constat, à la demande de Louise.

## 7. Agent de candidature (`.cursor/agents/candidature.md`)

`/candidature` + une offre d'emploi collée : crée une page `/pour/<entreprise>` en brouillon (attentes de l'offre → projets qui les prouvent, sans rien inventer). Louise relit, réécrit le mot d'accueil et publie. Détails : `CLAUDE.md` §12.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
