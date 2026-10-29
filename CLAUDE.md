# CLAUDE.md — Portfolio Louise Knoery

> À lire en premier par tout agent (Cursor, Claude Code…). Ce fichier décrit la vision, l'architecture, les règles et l'état du projet. Le mettre à jour à chaque étape terminée (section « État actuel »).
> Lire aussi `AGENTS.md` : Next.js 16 a des conventions récentes, la doc de référence est dans `node_modules/next/dist/docs/`.

## 1. Vision

Portfolio web de **Louise Knoery, Product Designer & Design Engineer** (Lyon).
**Objectif : décrocher un CDI** (Product Designer confirmée / Design Engineer). Cible : recruteurs, design managers, leads produit et tech.

Ce qu'elle cherche : **une équipe avec qui collaborer pour construire des produits utilisables et agréables**. Le site parle donc d'abord de collaboration et d'utilisabilité ; le design engineering (design system code-first, agents IA) est un atout, pas le sujet principal.

Positionnement en une phrase : *« Je rends simples les logiciels complexes. Avec les équipes qui les construisent. »*

Le site doit **prouver ce qu'il raconte** : simple à utiliser, accessible AA, agréable au toucher, code propre.

Ambiance (v2, d'après les retours de Louise) : **naturelle, minimaliste, humaine**. Papier blanc cassé et encre chaude, un seul accent (bleu marine par défaut) qui porte les boutons et le surlignage, une seule typo (Figtree), formes douces, et des **micro-interactions satisfaisantes** (ressorts, surlignage, copie d'email, compteurs). À éviter : tout ce qui fait « produit IA » (indigo/violet électrique, gris bleutés, mono façon terminal, dégradés).

## 2. Stack

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 16.4** (App Router, React 19, Turbopack) | Écosystème React = celui des équipes visées ; SSG de toutes les pages ; les agents IA le maîtrisent |
| Langage | **TypeScript 5.9** strict | Contenu typé = l'agent ne peut pas casser la structure |
| Styles | **Tailwind CSS 4.3**, config CSS-first (`@theme`) | Pas de `tailwind.config.js` en v4 : la config vit dans `src/app/globals.css` |
| Tokens | `src/styles/tokens.css` (CSS custom properties pures) | Agnostique du framework, comme le DS V2 d'Ingeli |
| Police | `next/font/google` : Figtree (variable + italiques) | Auto-hébergée au build, zéro CLS |
| Animations | CSS (`linear()` pour les ressorts) + 5 petits composants client | Aucune librairie d'animation |
| Contenu | Fichiers TS typés dans `src/content/fr/` | Pas de CMS ; i18n-ready |
| Qualité | ESLint (flat config `eslint-config-next`), Prettier + plugin Tailwind | |
| Déploiement | Vercel (recommandé) | Preview par branche, domaine perso |

Node ≥ 20.9. Ne pas passer à TypeScript 7 sans vérifier la compatibilité Next.

## 3. Arborescence

```
.
├── CLAUDE.md                 ← ce fichier
├── AGENTS.md                 ← règles Next.js générées (ne pas supprimer)
├── docs/design-system.md     ← palette, typo, échelles, contrastes, règles visuelles
├── public/
│   ├── cv/                   ← louise-knoery-cv.pdf (À DÉPOSER)
│   └── images/projects/<slug>/  ← cover.png + visuels de chaque étude de cas
└── src/
    ├── app/
    │   ├── globals.css       ← import Tailwind + tokens + @theme inline (= config Tailwind)
    │   ├── layout.tsx        ← polices, header, footer, skip link, metadata
    │   ├── page.tsx          ← accueil (one-scroll)
    │   ├── a-propos/page.tsx
    │   ├── projets/[slug]/page.tsx  ← gabarit d'étude de cas (SSG)
    │   └── not-found.tsx
    ├── styles/tokens.css     ← SOURCE DE VÉRITÉ visuelle (primitives → sémantiques → échelles)
    ├── content/
    │   ├── types.ts          ← types de tout le contenu
    │   ├── index.ts          ← getContent(), getProject()
    │   └── fr/{site,about,projects}.ts  ← TOUS les textes
    ├── components/
    │   ├── interactions/ ThemeScript, ThemeToggle, HeaderShell, RevealObserver, CopyEmailButton, CountUp
    │   ├── layout/   SiteHeader, SiteFooter
    │   ├── sections/ Hero, ProjectList, Principles, OtherWork, ContactCta
    │   ├── project/  SpecSheet, CaseSectionBlock, Outcomes, PullQuote
    │   └── ui/       Eyebrow, ButtonLink, Tag, MediaPlaceholder
    └── lib/cn.ts
```

## 4. Plan du site

- `/` Accueil : Hero → Projets sélectionnés (5) → Comment je travaille (4 principes) → Aussi chez Ingeli (2 cartes) → Contact
- `/projets/[slug]` : Hero → visuel → fiche technique + défi → sections narratives → chiffres → phrase-signature → projet suivant
  - `ingeli-design-system` · `polytropic-apps-mobiles` · `precia-molen` · `merck-scada` · `bollore-polaris`
- `/a-propos` : bio longue, compétences, parcours, formation, certifications, langues, CV
- `/cv` → redirige vers `/cv/louise-knoery-cv.pdf`
- Plus tard : `/en/...`

## 5. Règles (à respecter par tout agent)

**Contenu**
1. Aucun texte visible en dur dans un composant. Tout vient de `src/content/<locale>/`.
2. **Ne jamais inventer un chiffre, un résultat ou une citation.** Les `TODO(louise)` signalent les faits à fournir par Louise.
3. Pas de nom de personne extérieure sur le site sans accord (l'avis store cité est anonymisé).
4. Ton : français, phrases courtes, assertives, à la première personne. Pas de jargon creux (« passionnée », « pixel perfect », « innovant »).

**Style**
5. Jamais de couleur en dur (`#…`, `text-yellow-500`). Utiliser les utilitaires sémantiques : `bg-bg`, `bg-surface`, `bg-surface-muted`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-highlight`, `bg-btn text-btn-fg`, `border-border`…
6. Nouveau token → l'ajouter dans `tokens.css` (clair + sombre, et pour chaque palette si c'est un accent), puis le mapper dans `@theme inline`.
7. Typo : une seule famille (Figtree). `text-display | text-h1 | text-h2 | text-h3 | text-lead | text-small | text-label`. Titres en `font-semibold`, labels en `font-medium`, casse normale (pas de capitales espacées, pas de mono).
8. Un seul accent : bouton principal (`bg-btn`), index, puces, surlignage (`.mark`, `.mark-static`, `bg-highlight`). `success` ne sert qu'à la pastille « disponible ».
9. Formes douces : `rounded-sm` (tags), `rounded-md` (cartes), `rounded-lg` (visuels, grands blocs), `rounded-pill` (boutons). Les cartes se détachent par leur fond, pas par des filets.
10. Micro-interactions : réutiliser les classes de `globals.css` (`mark`, `btn-spring`, `lift`, `reveal`, `breathe`, `reading-progress`) et les courbes `ease-spring` / `ease-bounce`. Une interaction doit répondre à un geste et confirmer quelque chose ; jamais d'animation décorative en boucle (hors pastille « disponible »).

**Accessibilité & perf**
11. WCAG AA minimum (contrastes vérifiés dans `docs/design-system.md`), focus visible, navigation clavier, `alt` descriptifs, `prefers-reduced-motion` respecté.
12. Toutes les pages sont statiques. Images via `next/image` avec `width/height`.

**Code**
13. Server Components par défaut. `"use client"` uniquement pour une interaction réelle.
14. Un composant = un fichier, nommé en PascalCase, commenté en tête (rôle en une ligne).
15. Avant de terminer une tâche : `npm run typecheck && npm run lint && npm run build`.

## 6. i18n (FR maintenant, EN plus tard)

Le site est en français. Pour ajouter l'anglais :
1. Créer `src/content/en/{site,about,projects}.ts` (mêmes types, mêmes slugs).
2. Déclarer `en` dans `dictionaries` (`src/content/index.ts`).
3. Ajouter le routing par langue (`app/[locale]/…`) en suivant `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` ; FR reste sans préfixe.
4. Ajouter un sélecteur de langue dans `SiteHeader` et les `alternates.languages` dans les metadata.

## 7. État actuel (29/10/2026, v2)

✅ Fait
- Squelette Next.js 16 + Tailwind 4 + TS, build vérifié (11 pages statiques)
- v2 : direction naturelle et minimaliste (papier & encre, Figtree, 4 palettes d'accent : marine par défaut, roi, terracotta, lavande)
- Micro-interactions : surligneur, boutons à ressort, copie d'email, compteurs, apparitions, header discret, barre de lecture, bascule de thème sans flash
- Textes recentrés sur la collaboration et l'utilisabilité (hero, principes, contact)
- Design tokens clair/sombre (suit le système, forçable), contrastes AA vérifiés
- Tous les textes FR : hero, à propos, 4 principes, 5 études de cas, 2 projets courts, parcours
- Gabarits : accueil, étude de cas, à propos, 404

⏳ À faire, par priorité
1. **Visuels** : exporter `cover.png` (1600×1000) + visuels de sections pour chaque projet dans `public/images/projects/<slug>/`, renseigner `cover`/`media` (avec `width`/`height`), passer `status` à `"ready"`, remplacer `MediaPlaceholder` par `next/image`.
2. **Infos de contact** : email, LinkedIn, CV PDF, domaine (`metadataBase`).
3. **Faits à compléter** (`grep -rn "TODO(louise)" src`) : constats de l'audit Precia Molen, périodes des projets Ingeli, mesures d'impact.
4. **Choisir la palette** (marine / roi / terracotta / lavande) et supprimer les autres de `tokens.css`.
5. Vignette du projet qui suit doucement le curseur au survol des rangées (desktop), quand les visuels existent.
6. Interaction-signature sur l'étude 01 : un même bouton qui bascule entre « vue Figma » et « vue code ».
7. Images Open Graph par projet (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts`.
8. Déploiement Vercel + domaine.
9. Version anglaise.

## 8. Commandes

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # next typegen + tsc
npm run lint
npm run build
npm run format
```
