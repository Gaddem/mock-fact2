# Le Cinquième Rayon — brief

## Brief

```
Marque       : Le Cinquième Rayon (librairie indépendante, inventée)
Secteur      : librairie indépendante
Promesse     : donner envie de lire avant même d'avoir choisi un livre —
               le site se lit comme la revue de la maison, pas comme un catalogue
Public       : lecteurs de quartier, curieux qui cherchent un conseil,
               visiteurs venus pour les rencontres d'auteurs
Ton          : lettré, chaleureux, un peu obstiné
Pages        : / · /catalogue · /la-maison · /rencontres · 404
Signature    : la pile de couvertures qui se déploie au défilement
Anti-brief   : voir plus bas
```

## Vérification d'unicité (contre `deja_utilises`)

| Axe bloquant        | Projet 1 (interdit)     | Projet 2                                       |
| ------------------- | ----------------------- | ---------------------------------------------- |
| Police              | Marcellus / Nunito Sans | **Outfit** (titres) / **Newsreader** (lecture) |
| Palette             | art-deco-or (sombre)    | **papier-vert-bouteille** (clair)              |
| Style visuel        | art-deco                | **editorial-magazine**                         |
| Layout              | timeline-verticale      | **colonnes-lecture-index-lateral**             |
| Secteur             | domaine viticole        | **librairie indépendante**                     |
| Animation signature | trace-svg               | **pile-couvertures**                           |

Axes souples — tous différents du projet 1, qui est le projet consécutif :

| Axe     | Projet 1               | Projet 2                                                                           |
| ------- | ---------------------- | ---------------------------------------------------------------------------------- |
| Forme   | arete-vive (0px)       | **coin-livre** (3px, coin de couverture)                                           |
| Densité | aeree (140px / 1100px) | **compacte-lecture** (88px / 1240px, colonne de texte 64ch)                        |
| Texture | chevrons-fins          | **grain-papier**                                                                   |
| Curseur | natif                  | **signet** (indicateur discret sur la pile de couvertures, ≥1024px, `hover:hover`) |

Aucun des 11 effets caractérisants déjà consommés n'est rejoué. Sont donc **exclus** :
rideau-intro, ouverture-typographique, trace-ornements, parallaxe-ornements, arc-chiffres,
chevrons-defilants, progression-lecture, entete-compacte, filet-survol, rideau-photo, croix-tracee.

Conséquences assumées : **pas d'intro/preloader**, **pas de barre de progression de lecture**
(pourtant le réflexe sur un site de texte long), **pas d'en-tête qui se compacte**, **pas de parallaxe**.
L'entrée se fait directement sur la pile de couvertures, sans rideau.

## Direction artistique

**Typographie inversée.** Le réflexe du secteur, c'est un serif en titre et un sans en lecture.
Ici c'est l'inverse : **Outfit** (géométrique, chasse large, capitales basses) porte les titres,
**Newsreader** (serif de labeur, dessiné pour l'écran) porte tout le texte long, en 19px / 1.7.
Le site revendique que le texte long est le sujet : c'est lui qui reçoit la police soignée.

**Palette** — papier chaud, encre, vert bouteille.

| Token        | Valeur    | Rôle                                             |
| ------------ | --------- | ------------------------------------------------ |
| `--fond`     | `#F7F3E9` | papier chaud                                     |
| `--surface`  | `#FFFCF5` | encart, fiche, carte                             |
| `--texte`    | `#1B1A17` | encre                                            |
| `--muted`    | `#6B6559` | légendes, métadonnées                            |
| `--accent`   | `#3F5D45` | vert bouteille — index, liens, filets            |
| `--accent-2` | `#A4442F` | brique — signets, coups de cœur, tag « rentrée » |
| `--bordure`  | `#DCD3BF` | filets de colonne, séparateurs                   |

Contrastes calculés sur `--fond` (#F7F3E9, L = 0,8975) :

| Paire                   | Ratio      | Verdict         |
| ----------------------- | ---------- | --------------- |
| encre / papier          | **15,7:1** | AAA             |
| vert bouteille / papier | **6,6:1**  | AA texte normal |
| brique / papier         | **5,5:1**  | AA texte normal |
| muted / papier          | **5,2:1**  | AA texte normal |

Aucune couleur ne descend sous 4,5:1 : même les métadonnées passent en texte normal.
Les valeurs sur `--surface` sont mécaniquement supérieures. Recalcul exhaustif en fin de dev.

**Layout — colonnes de lecture + index alphabétique latéral.**
Colonne de texte plafonnée à 64ch, jamais pleine largeur. Un index alphabétique tient la marge
gauche en ≥1024px (rayons de la librairie : A comme _Antiquité_, P comme _Poésie_…) ; il passe en
barre horizontale collante sous 1024px. Grille éditoriale à filets verticaux, pas de cartes flottantes.

## Animation signature — `pile-couvertures`

Les couvertures des sélections arrivent **empilées**, légèrement décalées et pivotées comme un tas
posé sur une table, puis **se déploient en éventail** puis en grille à mesure qu'on défile.

- Une seule boucle rAF partagée (`lib/scroll.ts`), abonnement piloté par `IntersectionObserver`,
  arrêt sur `visibilitychange`, sortie tôt si la valeur n'a pas changé.
- La boucle écrit une seule variable, `--deploiement` (0 → 1). Tout le reste est en CSS.
- **`translate` / `rotate` / `scale` uniquement** — jamais `top`/`left`/`width`.
- **État de repos = déployé.** Le HTML rend la grille finale ; c'est le script qui pose
  `data-pile="actif"` et empile. Sans JS, sans observateur, ou en `prefers-reduced-motion` :
  la grille est là, complète, lisible. On perd l'effet, jamais le contenu.

### Effets secondaires (même vocabulaire : le feuillet qui se pose)

Tous nouveaux, aucun dans `deja_utilises`. Un seul geste décliné à trois échelles — montée
simple pour le texte courant, feuillet légèrement de travers (`rotate` + `scale`) pour ce qui a
l'épaisseur d'un objet, entrée par la marge pour ce qui vit dans la marge :

- `feuillet-pose` — la déclinaison ci-dessus, sur les fiches, les couvertures de rayon, les
  photos et les rangées de l'agenda.
- `filet-exergue` — le filet de la citation se tire de haut en bas à l'arrivée du bloc.
- `index-deroule` — l'index alphabétique se déroule entrée par entrée à l'arrivée sur la page.
- `index-lettre-active` — la lettre de l'index latéral correspondant à la section lue s'encre en vert.
- `lettrine-posee` — la lettrine des articles s'aligne sur la grille de ligne de base à l'entrée.
- `notes-marginales` — les notes de marge se révèlent au niveau de leur paragraphe (≥1280px ;
  en dessous, elles reviennent dans le flux — rien d'informatif ne dépend de la largeur d'écran).
- `tranche-page` — les fiches livre montrent une tranche de pages sur le bord ; elle s'épaissit à l'ouverture de la fiche.
- `signet-ancre` — un signet de tissu marque la section courante dans l'index.

Primitives libres réutilisées sans état d'âme : fondu-montant, stagger-grille, changement d'état au survol.

## Anti-brief

1. **Aucune couverture photographiée.** Toutes les couvertures sont composées en typographie avec
   les tokens du projet. Une photo d'étagère montre des titres et des éditeurs réels : la marque est
   fictive, elle n'emprunte la caution de personne. Bénéfice secondaire : les couvertures sont du DOM,
   donc animables sans re-rastérisation.
2. **Aucune carte arrondie flottante, aucune ombre douce, aucun dégradé.** La hiérarchie vient des
   filets, de la chasse et du blanc de marge — comme dans une revue. Une seule ombre autorisée dans
   tout le site : celle, dure et courte, du tas de couvertures.
3. **Aucun hero pleine hauteur avec titre centré et bouton coloré.** L'accueil ouvre sur un chapô en
   colonne éditoriale, décalé à gauche, avec la pile de couvertures en regard. Pas de bouton
   « Découvrir » : les liens sont des liens, soulignés.

À quoi s'ajoute un interdit de forme : **pas de bandeau défilant** — déjà consommé au projet 1.

**Exception assumée à l'anti-brief.** Le brief initial interdisait toute photo derrière du texte.
L'ouverture de l'accueil en porte une — un mur de pages ouvertes. La règle sautée n'est pas
remplacée par de l'à-peu-près : la photo a sa variante dédiée, le flou et l'écrasement de sa
dynamique sont cuits dans le fichier, et son opacité d'affichage n'est pas choisie à l'œil —
`scripts/preparer-photos.mjs` mesure le contraste pixel par pixel à cette opacité exacte, et la
mesure est refaite sur la page rendue, grain compris, à 1440 px comme à 375 px.

**Ce qui plafonnait la photo, c'était le gris secondaire à 12 px** — pas la photo. Tant que
`--muted` s'appliquait sur le fond, il fallait délaver l'image jusqu'à ne plus rien voir pour
tenir AA. Le token est donc densifié **sur cette zone seulement** (`.sur-fond`,
`--muted: #3A362F`) : la hiérarchie tient — c'est toujours un gris, pas de l'encre — et le
budget de contraste se libère d'un coup. Partout ailleurs le token global ne bouge pas, le
texte y est posé sur du papier nu.

Résultat contre-intuitif : la photo est passée de délavée à franchement présente (plancher 219
→ 140, opacité 0,42 → 0,8) **et** le pire pixel est monté de 4,52:1 à **6,48:1**. Le mauvais
bouton, c'était l'image ; le bon, c'était la couleur du texte.

## Pages

| Page          | Contenu                                                                                                                 | Ce qu'elle démontre                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/`           | chapô éditorial, pile de couvertures (la sélection du mois), les cinq rayons, une chronique longue, prochaine rencontre | la signature + la mise en page éditoriale                                    |
| `/catalogue`  | index alphabétique complet des rayons, fiches livre à tranche de pages, filtres visuels non fonctionnels                | l'index latéral dans son usage plein                                         |
| `/la-maison`  | article long (≈1 200 mots) : l'histoire de la librairie, lettrine, notes marginales, citations en exergue               | **le texte long comme sujet** — colonne 64ch, rythme vertical, veuves gérées |
| `/rencontres` | agenda des rencontres, formulaire d'inscription en état de démonstration explicite                                      | densité d'information sans cartes                                            |
| 404           | « Ce rayon n'existe pas » — même grille, index conservé                                                                 | cohérence jusqu'au bout                                                      |

Contenus 100 % inventés : titres, auteurs, éditeurs, dates. Aucun ouvrage réel, aucun avis attribué
à une personne identifiable.

## Photos

Six emplacements, six photos distinctes, aucune répétition :

0. `/` — **fond de l'ouverture** (mur de pages ouvertes, Unsplash) — la seule qui passe
   derrière du texte, avec la variante `fond` dédiée
1. `/` — bande après la chronique (tranche et pages en éventail)
2. `/catalogue` — bandeau de tête (livre ouvert, pages en éventail sur mur clair)
3. `/la-maison` — respiration au milieu de l'article (étagère haute : bocaux, poteries, bois)
4. `/la-maison` — pied d'article (tiroirs de casse typographique)
5. `/rencontres` — bandeau de tête (table, lampe, salle vide)

**Le sujet des photos, c'est la matière de la lecture, pas les rayons d'une autre librairie.**
Ce choix n'est pas décoratif : il règle d'un coup l'enseigne réelle, la personne identifiable et
le titre lisible. Sept candidates ont été écartées après examen — deux librairies reconnaissables
à leur aménagement, une devanture portant le nom d'un commerce parisien, un portrait affiché au
mur, deux cadrages où les titres exposés se lisaient sans effort, et une étiquette de rayon dans
une langue qui contredisait le récit.

Licence Pexels vérifiée à la source. Traitement cuit dans le fichier (duplex vert bouteille en
deux passes `sharp`, puis voile de papier à 16 % pour que la photo semble imprimée sur la même
feuille que le texte), bords dissous par `mask-image`. Script de préparation committé,
`CREDITS.md` généré. Toutes sous 110 Ko, JPEG progressif.

**La règle du « pixel le plus clair » ne s'applique pas telle quelle ici.** Elle vient d'un site
sombre à texte clair. Ce site-ci, c'est de l'encre sur du papier : le pixel qui décide est le plus
**sombre**. Le script calcule les deux et garde le pire cas pour chacune des quatre couleurs de
texte.

## Technique

- Next.js 16 App Router, `output: 'export'`, TypeScript strict, Tailwind v4, `next/font`.
- **`basePath = '/mock-fact2'`** en production (dépôt `mock-fact2`), `assetPrefix` assorti,
  `trailingSlash: true`, `images.unoptimized`, `public/.nojekyll`, `robots.txt` en `Disallow: /`.
- Tout le CSS maison dans `@layer components` ; seul le bloc `prefers-reduced-motion` reste hors couche.
- Footer commun : « Projet de démonstration — Développé par DEVAZU ».
- Pas de route handler, pas de base, pas d'envoi : le formulaire des rencontres est une maquette,
  et le dit à l'écran.

## Vérifications — résultats

| Contrôle                                              | Résultat                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| `npx tsc --noEmit`                                    | passe                                                                            |
| `npm run lint`                                        | passe                                                                            |
| `npm run build`                                       | `out/` généré, 5 pages                                                           |
| Matrice 320/375/414/768/834/1024/1280/1536 × 5 pages  | zéro défilement horizontal, zéro débordement, zéro rognage                       |
| Cibles tactiles                                       | toutes ≥ 44 px de haut                                                           |
| Contrastes (couleurs calculées)                       | 10 couples texte/fond réels, tous AA ; le plus faible à **5,22:1**               |
| Contrastes (pixels rendus, grain et photo de fond)    | tous AA ; **6,48:1** au pire sur le hero (6,25:1 à 375 px), **4,74:1** ailleurs  |
| Entrées en scène                                      | 35 blocs sur l'accueil, 20 sur l'article : tous visibles en fin de défilement    |
| `prefers-reduced-motion`                              | `data-pile` non posé, aucun `translate`/`rotate`, les 35 blocs visibles d'emblée |
| Lighthouse mobile (build de production servi en gzip) | perf **91–94** · accessibilité **100** · bonnes pratiques **100** · SEO **54**   |

**SEO 54, et c'est normal :** les deux audits qui échouent sont `is-crawlable` (le site est en
`noindex`) et `robots-txt` — deux conséquences directes des règles du cadre. Le `robots.txt` d'un
dépôt Pages n'est de toute façon jamais servi à la racine du domaine, seul endroit où un robot le
cherche ; le `noindex` fait le travail.

**Trois pièges rencontrés, qui valaient d'être notés :**

- Le contraste calculé sur les couleurs des tokens ignore ce qui est peint **par-dessus**. Le
  grain de papier, à 0,42 d'opacité, faisait tomber le texte secondaire de 5,22:1 à **4,52:1** sur
  toutes les pages — au-dessus d'AA, mais sans marge, et le calcul par couleurs ne le voyait pas.
  Trouvé en mesurant les pixels rendus d'une page **sans** photo de fond, en cherchant le coût de
  la photo : la photo ne coûtait rien, le grain coûtait tout. Ramené à 0,28.

- Une piste de grille prend la largeur intrinsèque de son contenu. Sans `min-w-0` sur les
  cellules, l'index latéral élargissait la colonne bien au-delà du viewport — invisible, parce que
  `overflow-x: hidden` le rognait proprement.
- Dans le bloc ≥768 px, `.pile-item { --r: 0 }` ne bat pas les `:nth-child()` du bloc mobile,
  plus spécifiques quel que soit l'ordre. Trois couvertures gardaient un décalage vertical d'une à
  deux hauteurs de carte.
