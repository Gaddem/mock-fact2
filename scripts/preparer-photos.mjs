/**
 * Télécharge les photos sources (Pexels, licence libre) et les prépare.
 *
 *   node scripts/preparer-photos.mjs
 *
 * Les fichiers produits sont commités : le build ne dépend jamais du réseau.
 * Ce script sert à les régénérer à l'identique.
 *
 * L'export est statique (`images.unoptimized`) : aucune optimisation à la
 * volée, les dimensions finales sont décidées ici une bonne fois.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

/** Accent du site. Les photos sont reteintées dessus, en dur. */
const TEINTE = '#3F5D45'

/** Papier du site. Un voile clair pose les photos dans la même encre. */
const PAPIER = '#F7F3E9'

/**
 * Le sujet des photos, c'est la matière de la lecture — pages, tranches,
 * caractères, table du fond — jamais les rayons d'une autre librairie.
 * Ce choix n'est pas décoratif : il règle trois problèmes d'un coup.
 *
 * — aucune enseigne réelle : la librairie est inventée, elle n'emprunte
 *   la caution de personne (une devanture parisienne et deux librairies
 *   parfaitement reconnaissables sont sorties pour ce motif) ;
 * — aucune personne identifiable ;
 * — aucun titre ni éditeur lisible : les couvertures du site sont
 *   composées en typographie, une photo montrant les livres des autres
 *   contredirait exactement ce parti pris.
 */
const PHOTOS = [
  {
    nom: 'mur-de-pages',
    source:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1920&auto=format&fit=crop',
    page: 'https://unsplash.com/photos/52c61a468e7d',
    largeur: 1920,
    hauteur: 1100,
    qualite: 74,
    usage: 'accueil — fond de l’ouverture',
    /**
     * Seule photo du site qui passe derrière du texte, donc seule à porter
     * ce traitement — réglé ici, dans le fichier, et pas au cas par cas
     * dans les pages : une page finirait par l'oublier.
     *
     * Elle échappe au duplex vert des autres : le geste qui fait tenir une
     * bande de respiration efface une photo qu'on doit reconnaître. Ici,
     * simple désaturation légère — le sépia du papier tombe déjà dans la
     * palette.
     *
     * Le plancher est posé par un `lighten` sur un gris plat, pas par une
     * compression de plage. La différence est tout : une compression écrase
     * l'image entière et la rend informe, un `lighten` ne touche QUE les
     * pixels sous le seuil et laisse les autres intacts. Tout ce qui est
     * au-dessus du plancher sort du script au pixel près. Le plancher est
     * posé un cran au-dessus de la valeur visée : la compression JPEG
     * dépasse sous le seuil autour des contours, et c'est ce dépassement,
     * pas la consigne, que mesure le contrôle de contraste.
     *
     * Le flou est cuit dans le JPEG : en `filter: blur()` CSS, une image de
     * 1920 px se re-rastérise à chaque frame dès que quoi que ce soit bouge
     * au-dessus. Il reste léger — juste assez pour qu'aucun mot des livres
     * photographiés ne se déchiffre.
     */
    fond: { flou: 2.5, saturation: 0.85, voile: 0.1, plancher: 182, opacite: 1 },
  },
  {
    nom: 'pages-ouvertes',
    source: 'https://images.pexels.com/photos/46275/pexels-photo-46275.jpeg',
    page: 'https://www.pexels.com/photo/books-table-blurred-book-46275/',
    // Calé à droite de la colonne de texte : on garde la tranche et les
    // pages en éventail. Un cadrage plus large laissait lire trois lignes
    // d'un roman en anglais — sur le site d'une librairie française, ça se
    // remarque, et ce n'est pas le texte de la maison.
    recadrage: { left: 2300, top: 300, width: 3700, height: 1562 },
    largeur: 1800,
    hauteur: 760,
    brillance: 1.02,
    qualite: 74,
    usage: 'accueil — bande après la chronique',
  },
  {
    nom: 'livre-ouvert',
    source: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg',
    page: 'https://www.pexels.com/photo/pages-on-an-opened-book-415071/',
    recadrage: { left: 0, top: 700, width: 5896, height: 2470 },
    largeur: 1600,
    hauteur: 670,
    brillance: 1.0,
    qualite: 72,
    usage: 'catalogue — bandeau de tête',
  },
  {
    nom: 'etagere-objets',
    source: 'https://images.pexels.com/photos/5490167/pexels-photo-5490167.jpeg',
    page: 'https://www.pexels.com/photo/shelves-with-books-and-decorations-5490167/',
    // Seulement l'étagère haute : plus bas, une rangée de dos de livres
    // porte des titres parfaitement lisibles.
    recadrage: { left: 0, top: 20, width: 1728, height: 660 },
    largeur: 1600,
    hauteur: 611,
    brillance: 1.0,
    qualite: 74,
    usage: 'la maison — respiration au milieu de l’article',
  },
  {
    nom: 'casse-typographique',
    source: 'https://images.pexels.com/photos/4140925/pexels-photo-4140925.jpeg',
    page: 'https://www.pexels.com/photo/cabinet-drawers-with-various-vintage-letterpress-4140925/',
    recadrage: { left: 0, top: 500, width: 5472, height: 2290 },
    largeur: 1600,
    hauteur: 670,
    brillance: 1.22,
    qualite: 74,
    usage: 'la maison — pied d’article',
  },
  {
    nom: 'coin-lecture',
    source: 'https://images.pexels.com/photos/19343312/pexels-photo-19343312.jpeg',
    page: 'https://www.pexels.com/photo/empty-table-and-chairs-in-a-restaurant-in-dim-light-19343312/',
    recadrage: { left: 400, top: 600, width: 7700, height: 3600 },
    largeur: 1800,
    hauteur: 842,
    brillance: 1.28,
    qualite: 72,
    usage: 'rencontres — bandeau de tête',
  },
]

const chemin = (relatif) => fileURLToPath(new URL(relatif, import.meta.url))

await mkdir(chemin('../public/images/'), { recursive: true })

for (const photo of PHOTOS) {
  const reponse = await fetch(photo.source, { headers: { 'user-agent': 'Mozilla/5.0' } })
  if (!reponse.ok) throw new Error(`${photo.nom} : HTTP ${reponse.status}`)

  const octets = Buffer.from(await reponse.arrayBuffer())

  // Ré-encodage systématique : jamais servir le binaire distant tel quel.
  const image = sharp(octets)
  if (photo.recadrage) image.extract(photo.recadrage)

  const couche = async (couleur, alpha) =>
    sharp({
      create: {
        width: photo.largeur,
        height: photo.hauteur,
        channels: 4,
        background: { ...couleur, alpha },
      },
    })
      .png()
      .toBuffer()

  const fichier = chemin(`../public/images/${photo.nom}.jpg`)

  if (photo.fond) {
    // La photo de fond garde ses couleurs : c'est une image qu'on doit
    // reconnaître, pas une respiration entre deux blocs.
    const base = await image
      .resize(photo.largeur, photo.hauteur, { fit: 'cover', position: 'attention' })
      .modulate({ saturation: photo.fond.saturation })
      .blur(photo.fond.flou)
      .composite([{ input: await couche(hexVersRgb(PAPIER), photo.fond.voile), blend: 'over' }])
      .toBuffer()

    // `lighten` contre un gris plat : chaque canal prend le maximum des deux.
    // Les pixels au-dessus du plancher ressortent inchangés, seuls les fonds
    // les plus sombres sont relevés — c'est la garantie de contraste, sans
    // toucher au reste de l'image.
    const p = photo.fond.plancher
    await sharp(base)
      .composite([{ input: await couche({ r: p, g: p, b: p }, 1), blend: 'lighten' }])
      .jpeg({ quality: photo.qualite, progressive: true, mozjpeg: true })
      .toFile(fichier)
  } else {
    // Traitement cuit dans le JPEG, pas posé en `filter` CSS : un filtre sur
    // une image de 1800 px la re-rastérise à chaque frame dès qu'elle bouge.
    //
    // Le duplex demande DEUX passes : dans une seule, `greyscale` s'applique
    // après `tint` (l'ordre est interne, pas celui des appels) et efface la
    // teinte — on obtient un gris parfaitement neutre.
    const gris = await image
      .resize(photo.largeur, photo.hauteur, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: photo.brillance ?? 1 })
      .greyscale()
      .toColourspace('srgb')
      .png()
      .toBuffer()

    // Voile de papier : les photos doivent sembler imprimées sur la même
    // feuille que le texte, pas collées par-dessus.
    await sharp(gris)
      .tint(TEINTE)
      .composite([{ input: await couche(hexVersRgb(PAPIER), 0.16), blend: 'over' }])
      .jpeg({ quality: photo.qualite, progressive: true, mozjpeg: true })
      .toFile(fichier)
  }

  // Contrôle de la teinte : trois moyennes de canaux identiques voudraient
  // dire que la passe de couleur a été effacée.
  const stats = await sharp(fichier).stats()
  const moyennes = stats.channels.map((canal) => canal.mean.toFixed(1)).join(' / ')
  const extremes = photo.fond
    ? ` — min/max ${Math.min(...stats.channels.map((c) => c.min))}/${Math.max(...stats.channels.map((c) => c.max))}`
    : ''
  console.log(
    `${photo.nom}.jpg — ${photo.largeur}×${photo.hauteur} — RVB moyens ${moyennes}${extremes}`,
  )

  if (photo.fond) {
    const c = await controlerContraste(fichier, photo.fond.opacite, PAPIER)
    console.log(
      `  contraste à ${photo.fond.opacite} d'opacité — luminance ${c.min} à ${c.max} · ` +
        `encre ${c.encre}:1 · muted du fond ${c.mutedFond}:1 · muted global ${c.muted}:1 · ` +
        `vert ${c.accent}:1 · brique ${c.accent2}:1`,
    )
  }
}

/**
 * Contraste d'une photo de fond, mesuré sur les pixels et pas sur la moyenne.
 *
 * La règle habituelle dit « le pixel le plus clair » : elle vient d'un site
 * sombre à texte clair. Ici c'est l'inverse — de l'encre sur du papier — donc
 * c'est le pixel le plus SOMBRE qui décide. On calcule les deux et on garde
 * le pire cas pour chaque couleur de texte.
 *
 * La chaîne reproduite est celle du navigateur : image, puis opacité du
 * conteneur par-dessus le papier de la page.
 */
async function controlerContraste(fichier, opacite, papier) {
  const { data, info } = await sharp(fichier).raw().toBuffer({ resolveWithObject: true })
  const fond = hexVersRgb(papier)

  const canal = (v) => {
    const x = v / 255
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  }
  const luminance = (r, v, b) => 0.2126 * canal(r) + 0.7152 * canal(v) + 0.0722 * canal(b)
  const melange = (photo, papier) => opacite * photo + (1 - opacite) * papier

  let min = 1
  let max = 0
  for (let i = 0; i < data.length; i += info.channels) {
    const l = luminance(
      melange(data[i], fond.r),
      melange(data[i + 1], fond.g),
      melange(data[i + 2], fond.b),
    )
    if (l < min) min = l
    if (l > max) max = l
  }

  const ratio = (couleur) => {
    const l = luminance(...couleur)
    const pire = Math.min((min + 0.05) / (l + 0.05), (max + 0.05) / (l + 0.05))
    return pire.toFixed(2)
  }

  return {
    min: min.toFixed(3),
    max: max.toFixed(3),
    encre: ratio([27, 26, 23]),
    muted: ratio([107, 101, 89]),
    // Gris secondaire densifié, celui qui s'applique sur le fond.
    mutedFond: ratio([58, 54, 47]),
    accent: ratio([63, 93, 69]),
    accent2: ratio([164, 68, 47]),
  }
}

function hexVersRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

const credits = `# Crédits photo

Les photos viennent de **Pexels** et d'**Unsplash** (licences Pexels et Unsplash : usage libre,
y compris commercial, sans attribution obligatoire). Elles sont recadrées et ré-encodées par
\`scripts/preparer-photos.mjs\`.

${PHOTOS.map((p) => `- \`${p.nom}.jpg\` — ${p.page}\n  ${p.usage}`).join('\n')}

La librairie, les livres, les auteurs et les éditeurs de ce site sont inventés : ces photos
illustrent une marque fictive et ne représentent aucun commerce réel.

Aucune photo retenue ne montre de personne identifiable, d'enseigne réelle ou de titre
lisible. Sept candidates ont été écartées après examen : deux librairies reconnaissables à
leur aménagement, une devanture portant le nom d'un commerce parisien, un portrait affiché au
mur, deux cadrages où les titres exposés se lisaient sans effort, et une étiquette de rayon
dans une langue qui contredisait le récit.

\`mur-de-pages.jpg\` est la seule photo qui passe derrière du texte. Son flou et l'écrasement
de sa dynamique sont cuits dans le fichier, et son opacité d'affichage est vérifiée pixel par
pixel par ce même script : le texte secondaire tient ${(await controlerContraste(chemin('../public/images/mur-de-pages.jpg'), 0.42, PAPIER)).muted}:1 sur le pire pixel.
`

await writeFile(chemin('../public/images/CREDITS.md'), credits, 'utf8')
console.log('CREDITS.md écrit')
