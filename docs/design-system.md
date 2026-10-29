# Design system — Portfolio Louise Knoery · v2

Source de vérité : `src/styles/tokens.css`. Ce document explique les choix.

## Intention : naturel, minimaliste, agréable

Un site humain et calme, qui fait du bien à parcourir. Pas de look « produit IA » : ni indigo électrique, ni gris bleuté de dashboard, ni typo mono de terminal.
- **Minimaliste** : une seule famille de caractères, un seul accent, beaucoup d'air, peu de filets.
- **Naturel** : papier blanc cassé et encre chaude, comme un carnet. L'accent souligne ce qui compte (boutons, index, surlignage), il ne décore pas.
- **Satisfaisant** : chaque geste (survol, clic, scroll) reçoit une réponse douce, avec un léger ressort. Rien ne bouge pour rien.

## Couleurs

### Neutres « papier & encre »

| Rôle | Clair | Sombre |
|---|---|---|
| `bg` | papier `#f7f6f2` | nuit `#151513` |
| `surface` (cartes) | blanc `#ffffff` | `#1d1c19` |
| `surface-muted` | `#efede7` | `#26251f` |
| `fg` texte | encre `#1c1b18` — 15.9:1 | craie `#eeece6` — 15.5:1 |
| `fg-muted` | `#5d5b54` — 6.3:1 | `#a6a398` — 7.2:1 |
| `fg-subtle` | `#6b695f` — 5.1:1 | `#8f8c82` — 5.4:1 |
| `border` | `#e4e1d9` | `#2c2b26` |

### Accent : terracotta

Un seul accent, défini sur `:root` dans `tokens.css`. Il porte le **bouton principal**, les index (01, 02…), les puces, la barre de lecture et le « coup de surligneur » (`highlight`, une teinte claire de l'accent).

| | `accent` / bouton | `highlight` | Caractère |
|---|---|---|---|
| **Clair** | `#a8492a` — 5.3:1 (blanc dessus : 5.8:1) | `#f1c9b6` | Terre cuite. Chaleureux, artisanal. |
| **Sombre** | `#eba283` — 8.7:1 (`btn-bg` `#f2c6b2`) | `#83402a` | Même famille, plus claire pour le contraste. |

- Texte nuit sur bouton sombre : ≥ 11.7:1.
- Texte posé sur `highlight` : encre en clair (≥ 11.3:1), craie en sombre (≥ 6.5:1).
- `success` vert `#3f8f5a` : uniquement la pastille « disponible ».

## Typographie

Une seule famille : **Figtree** (variable, avec italiques). Humaniste et ouverte : chaleureuse sans être enfantine, très lisible en petit. Graisses : 400 texte, 500 labels, 600 titres.

| Token | Taille | Interlignage | Approche |
|---|---|---|---|
| `text-display` | 42 → 88 px | 1.04 | −0.03em |
| `text-h1` | 36 → 68 px | 1.04 | −0.03em |
| `text-h2` | 26 → 42 px | 1.2 | −0.018em |
| `text-h3` | 19 → 24 px | 1.2 | −0.018em |
| `text-lead` | 18 → 21 px | 1.55 | |
| `text-body` | 17 px | 1.65 | |
| `text-small` | 15 px | 1.55 | |
| `text-label` | 14 px, graisse 500 | 1.4 | casse normale |

Les labels sont en casse normale : plus doux à lire que des capitales espacées.

## Formes et espace

- Rayons : 8 px (tags), 14 px (cartes), 20 px (visuels, grands blocs), pilule (boutons).
- Les cartes se détachent par leur fond (`surface`) plutôt que par des bordures. Ombre très douce, uniquement au survol.
- Conteneur 1216 px, gouttière 20 → 40 px, mesure de lecture 64ch, 80 → 144 px entre sections.

## Micro-interactions

Toutes en CSS ou en très petits composants client, sans librairie. Toutes neutralisées par `prefers-reduced-motion`.

| Interaction | Où | Comment |
|---|---|---|
| **Coup de surligneur** | liens du header, titres de projets, « projet suivant » | `.mark` : le fond `highlight` se dessine de gauche à droite (ressort, 520 ms) |
| **Mot surligné** | hero (« simples ») | `.mark-static` |
| **Bouton à ressort** | tous les boutons | `.btn-spring` : se soulève de 2 px, s'enfonce à 96 % au clic, revient avec un rebond ; la flèche glisse de 4 px |
| **Rangée de projet** | accueil | fond `surface` qui apparaît, index qui avance, flèche qui glisse et apparaît |
| **Copier l'email** | contact | `CopyEmailButton` : le libellé glisse vers « Adresse copiée », une coche se dessine, annonce lecteur d'écran |
| **Compteurs** | « En chiffres » | `CountUp` : de 0 à la valeur en 900 ms à l'arrivée à l'écran (une fois) |
| **Apparitions** | blocs `.reveal` | `RevealObserver` : fondu + 18 px, en cascade de 60 ms ; sans JS rien n'est masqué |
| **Header discret** | partout | se cache quand on descend, revient dès qu'on remonte, prend un fond flouté une fois la page défilée |
| **Barre de lecture** | études de cas | 3 px en accent, liée au scroll en CSS pur (`animation-timeline: scroll()`) |
| **Soleil / lune** | header | les deux icônes pivotent et se croisent ; choix mémorisé, sans flash au chargement |
| **Disponible** | hero | pastille verte qui respire (2.8 s) |
| **Cartes** | principes, autres projets, chapitres | `.lift` : se soulèvent de 3 px avec un ressort |

Courbes (dans `tokens.css`) :
- `--ease-spring` : ressort amorti (ζ 0.7), dépassement de 4 %. Survols, apparitions.
- `--ease-bounce` : ressort joueur (ζ 0.55), dépassement de 12 %. Clics, confirmations.
- Les deux sont écrites avec la fonction CSS `linear()` : un vrai ressort, sans JS.
