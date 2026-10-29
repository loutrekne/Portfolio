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
| Animations | **Motion** (`motion/react`) + CSS (`linear()` pour les ressorts simples) | Vrais ressorts physiques, glisser-déposer, tracés SVG ; respecte « réduire les animations » via `MotionProvider` |
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
    │   └── fr/
    │       ├── site.ts
    │       ├── about.ts
    │       └── projects/     ← un fichier par slug + index.ts
    ├── components/
    │   ├── interactions/ ThemeScript, ThemeToggle, HeaderShell, RevealObserver, CopyEmailButton, CountUp, MotionProvider
    │   ├── trait/    LE TRAIT : HeaderString, Scribble, DrawnRule, DrawnUnderline, PortraitSticker, ProjectRows
    │   ├── layout/   SiteHeader, SiteFooter
    │   ├── sections/ Hero, ProjectList, Principles, OtherWork, ContactCta
    │   ├── project/  Gabarit étude de cas : CaseHero (titre + fiche en bandeau), CaseOverview (« En bref » : défi, projet, chiffres), CaseToc (sommaire collant qui suit la lecture), CaseSectionBlock, PullQuote, NextProject
    │   └── ui/       Eyebrow, SectionHeader (label + titre + intro, pour toutes les sections), ButtonLink, Tag, MediaPlaceholder
    └── lib/cn.ts, typo.ts (fr() : espaces insécables avant : ; ? !)
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
5. Pour ajouter un projet : créer `content/fr/projects/<slug>.ts` et l'ajouter à `projects/index.ts`.

**Style**
6. Jamais de couleur en dur (`#…`, `text-yellow-500`). Utiliser les utilitaires sémantiques : `bg-bg`, `bg-surface`, `bg-surface-muted`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-highlight`, `bg-btn text-btn-fg`, `border-border`…
7. Nouveau token → l'ajouter dans `tokens.css` (clair + sombre, et pour chaque palette si c'est un accent), puis le mapper dans `@theme inline`.
8. Typo : une seule famille (Figtree). `text-display | text-h1 | text-h2 | text-h3 | text-lead | text-small | text-label`. Titres en `font-semibold`, labels en `font-medium`, casse normale (pas de capitales espacées, pas de mono).
9. Un seul accent : bouton principal (`bg-btn`), index, puces, surlignage (`.mark`, `.mark-static`, `bg-highlight`). `success` ne sert qu'à la pastille « disponible ».
10. Formes douces : `rounded-sm` (tags), `rounded-md` (cartes), `rounded-lg` (visuels, grands blocs), `rounded-pill` (boutons). Les cartes se détachent par leur fond, pas par des filets.
11. Micro-interactions : réutiliser les classes de `globals.css` (`mark`, `btn-spring`, `lift`, `reveal`, `breathe`, `reading-progress`) et les courbes `ease-spring` / `ease-bounce`. Une interaction doit répondre à un geste et confirmer quelque chose ; jamais d'animation décorative en boucle (hors pastille « disponible »).

**Accessibilité & perf**
12. WCAG AA minimum (contrastes vérifiés dans `docs/design-system.md`), focus visible, navigation clavier, `alt` descriptifs, `prefers-reduced-motion` respecté.
13. Toutes les pages sont statiques. Images via `next/image` avec `width/height`.
13 ter. **Clavier et Motion** : Motion rend focusable tout `motion.*` qui a `onTap` / `whileTap` (tabindex 0). Sur une enveloppe qui contient déjà un lien, ou sur un geste bonus (portrait), passer `tabIndex={-1}`. Cartes entièrement cliquables : « lien étiré » (le lien sur le titre, `after:absolute after:inset-0`, conteneur `relative`), jamais un `<a>` qui englobe toute la carte, ni `aria-labelledby` (échec 2.5.3).
13 quater. **Lecteurs d'écran** : chiffres animés → valeur finale en `sr-only`, animation en `aria-hidden` (`CountUp`). Messages de statut (copie, thème) dans une région `aria-live` placée hors du bouton. Liens externes et PDF : « (nouvel onglet) » / « (PDF, nouvel onglet) » en `sr-only`. Un label qui nomme une section = `<Eyebrow as="h2">`.
13 bis. **Tactile** : tout effet de survol fait maison est enveloppé dans `@media (hover: hover)` (sinon il reste « collé » après un tap) et a son équivalent à l'appui (`:active`, `group-active:`, `whileTap` côté Motion). Les variantes Tailwind `hover:` sont déjà protégées. Le correctif iOS pour `:active` est dans `MotionProvider`.

**Code**
14. Server Components par défaut. `"use client"` uniquement pour une interaction réelle.
15. Un composant = un fichier, nommé en PascalCase, commenté en tête (rôle en une ligne).
16. Avant de terminer une tâche : `npm run typecheck && npm run lint && npm run build`.

## 6. i18n (FR maintenant, EN plus tard)

Le site est en français. Pour ajouter l'anglais :
1. Créer `src/content/en/{site,about,projects}.ts` (mêmes types, mêmes slugs).
2. Déclarer `en` dans `dictionaries` (`src/content/index.ts`).
3. Ajouter le routing par langue (`app/[locale]/…`) en suivant `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` ; FR reste sans préfixe.
4. Ajouter un sélecteur de langue dans `SiteHeader` et les `alternates.languages` dans les metadata.

## 7. État actuel (29/10/2026, v3)

✅ Fait
- Next.js 16 + Tailwind 4 + TS + Motion. En ligne sur Vercel (https://portfolio-xi-ruby-36.vercel.app/), dépôt GitHub loutrekne/Portfolio.
- Direction naturelle et minimaliste : papier & encre, Figtree, accent unique terracotta, thèmes clair / sombre sans flash, contrastes AA.
- **Le trait** (§9) : corde du header (souris + tap), séparateurs dessinés, soulignements au feutre, cercle du hero.
- **Hero** : portrait dessiné qui se trace, cligne et suit la souris, avec passage terracotta décalé (risographie) ; superposé au texte à partir de xl ; en sombre, encre sur arche craie.
- **Accueil** : projets visiblement cliquables au repos, sections avec en-tête commun (`SectionHeader`), principes en liste numérotée, cartes « Aussi chez Ingeli » enrichies.
- **Études de cas** : nouveau gabarit (bandeau de fiche projet, « En bref » avec défi + chiffres, sommaire collant qui suit la lecture, projet suivant).
- **Mobile** : retours visuels à l'appui, aucun effet de survol collé, correctif iOS `:active`.
- Typographie française automatique (`fr()`).
- TechniCenter passé en étude de cas complète (6 projets), filtres compétence / secteur avec liens recruteurs (§11).
- Agents de revue Cursor `ux-review` et `a11y-audit` (§10) ; audit axe : 0 violation sur 7 pages × 4 configurations.

⏳ À faire, par priorité
1. **Visuels** : extraire du Book 2026 ce qui existe, compléter avec des captures (TechniCenter : `cover.png`, `avant-machine.png`, `avant-ticket.png`, `apres-fiche-machine.png` ; panneau Variables Figma…). Les placer dans `public/images/projects/<slug>/`, renseigner `cover`/`media` (avec `width`/`height`), passer `status` à `"ready"`.
2. **Faits à compléter** (`grep -rn "TODO(louise)" src`).
3. Domaine personnalisé + `metadataBase`.
4. Images Open Graph par projet (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts`.
5. Version anglaise.

## 8. Commandes

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # next typegen + tsc
npm run lint
npm run build
npm run format
npm run screenshots  # captures mobile / tablette / desktop × clair / sombre → docs/reviews/captures/ (site lancé)
npm run a11y         # audit axe WCAG 2.2 AA de toutes les pages → docs/reviews/axe-latest.json (site lancé)
```
Première fois pour les deux derniers : `npx playwright install chromium`.

## 9. Le trait (langage graphique)

Le motif du site est **le trait dessiné à la main**, en terracotta, qui prolonge le portrait dessiné de Louise. Tous les composants sont dans `src/components/trait/` :

| Composant | Rôle |
|---|---|
| `HeaderString` | Corde fine sous l'en-tête : se courbe vers la souris, se teinte de terracotta, revient en vibrant |
| `Scribble` | Trait SVG qui se dessine : `circle` (mot entouré), `underline`, `arrow` ; modes `mount`, `inView`, `parent` |
| `DrawnRule` | Séparateur de section qui se trace en terracotta puis redevient neutre |
| `DrawnUnderline` | Soulignement au feutre au survol (CSS pur, utilisable côté serveur) : nav, footer, bouton « ghost » |
| `PortraitSticker` | Portrait du hero, sans arche : encre + passage terracotta décalé (effet risographie) qui suit la souris ; se tire à la souris (élastique). Thème sombre : même dessin à l'encre, sur une arche craie (`--portrait-sheet`). Le hero le superpose au texte (même rangée de grille, à partir de xl) |
| `PortraitDrawing` | Le dessin qui se trace (contours de haut en bas, puis l'encre), puis cligne des yeux et suit la souris ; un clic le redessine. Option `wash` : passage terracotta décalé. Encre = `--portrait-ink` (toujours encre : un dessin inversé en blanc donne un négatif). Données générées dans `portrait-paths.ts` |
| `ProjectRows` | Liste des projets filtrable (§11), visiblement cliquable au repos : pastille flèche (desktop) ou « Lire l'étude de cas → » (mobile). Titre souligné au survol / à l'appui + pastille « Voir le projet → » qui suit la souris |

Règles : un trait répond à un geste ou accompagne une arrivée, jamais en boucle. Sur écran tactile, pas de pastille ni de glisser ; un tap dans l'en-tête pince la corde (HeaderString). Les tracés utilisent `pathLength={1}` + `strokeDashoffset` **sans** `vector-effect="non-scaling-stroke"` (Chrome découpe le trait en pointillés sinon).

## 10. Agents de revue (Cursor)

Deux sous-agents dans `.cursor/agents/`, à appeler dans le chat de Cursor. Ils ne modifient jamais le code : ils écrivent un rapport priorisé (P0 / P1 / P2) dans `docs/reviews/`.

| Agent | Appel | Ce qu'il fait |
|---|---|---|
| `ux-review` | `/ux-review` (+ page ou section, optionnel) | Regarde le site via `npm run screenshots` (et le navigateur de Cursor), avec trois lecteurs en tête : recruteur·se, design manager, tech lead. Grille : premier écran, hiérarchie, affordances, études de cas, design system, micro-interactions, mobile, contenus. Rapport : `docs/reviews/AAAA-MM-JJ-ux-review.md` |
| `a11y-audit` | `/a11y-audit` | WCAG 2.2 A + AA. Test automatique `npm run a11y` (axe, 4 configurations), puis vérification manuelle : clavier, structure, alternatives, contrastes, mouvement, tactile, zoom, lecteur d'écran. Rapport : `docs/reviews/AAAA-MM-JJ-a11y.md` |

Les captures et le JSON d'axe sont ignorés par Git ; les rapports `.md` sont versionnés.

## 11. Filtres et liens recruteurs

La liste « Projets sélectionnés » se filtre par **compétence** ou par **secteur** (un filtre à la fois). Le filtre actif est écrit dans l'URL : on copie l'adresse et on l'envoie, la page s'ouvre déjà filtrée.

| Pour un poste orienté… | Lien (ajouter le domaine devant) |
|---|---|
| Design system | `/?focus=design-system#projets` |
| Recherche, discovery | `/?focus=recherche#projets` |
| Logiciel métier, SaaS B2B | `/?focus=logiciel-metier#projets` |
| Mobile | `/?focus=mobile#projets` |
| IA, design engineering | `/?focus=ia#projets` |
| Industrie, IoT | `/?focus=industrie-iot#projets` |
| Pharma, santé | `/?focus=pharma#projets` |
| Logistique | `/?focus=logistique#projets` |
| Grand public (B2C) | `/?focus=grand-public#projets` |

- Catégories : types `SkillCategory` / `SectorCategory` (`src/content/types.ts`), libellés dans `site.filters` (`src/content/fr/site.ts`), et champs `skills` / `sectors` dans chaque fichier projet.
- Une catégorie sans projet n'est pas affichée. Un `focus` inconnu est ignoré (liste complète).
- Composants : `ProjectFilters` (pastilles, `aria-pressed`, nombre annoncé) et `ProjectRows` (l'URL est la source de vérité, via `useSyncExternalStore`).
