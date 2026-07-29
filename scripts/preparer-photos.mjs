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

  // Traitement cuit dans le JPEG, pas posé en `filter` CSS : un filtre sur
  // une image de 1800 px la re-rastérise à chaque frame dès qu'elle bouge.
  //
  // Le duplex demande DEUX passes : dans une seule, `greyscale` s'applique
  // après `tint` (l'ordre est interne, pas celui des appels) et efface la
  // teinte — on obtient un gris parfaitement neutre.
  const gris = await image
    .resize(photo.largeur, photo.hauteur, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: photo.brillance })
    .greyscale()
    .toColourspace('srgb')
    .png()
    .toBuffer()

  // Voile de papier : les photos doivent sembler imprimées sur la même
  // feuille que le texte, pas collées par-dessus.
  const couchePapier = await sharp({
    create: {
      width: photo.largeur,
      height: photo.hauteur,
      channels: 4,
      background: { ...hexVersRgb(PAPIER), alpha: 0.16 },
    },
  })
    .png()
    .toBuffer()

  const fichier = chemin(`../public/images/${photo.nom}.jpg`)

  await sharp(gris)
    .tint(TEINTE)
    .composite([{ input: couchePapier, blend: 'over' }])
    .jpeg({ quality: photo.qualite, progressive: true, mozjpeg: true })
    .toFile(fichier)

  // Contrôle de la teinte : trois moyennes de canaux identiques voudraient
  // dire que la passe de couleur a été effacée.
  const stats = await sharp(fichier).stats()
  const moyennes = stats.channels.map((canal) => canal.mean.toFixed(1)).join(' / ')
  console.log(`${photo.nom}.jpg — ${photo.largeur}×${photo.hauteur} — RVB moyens ${moyennes}`)
}

function hexVersRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

const credits = `# Crédits photo

Toutes les photos viennent de **Pexels** (licence Pexels : usage libre, y compris commercial,
sans attribution obligatoire). Elles sont recadrées et ré-encodées par
\`scripts/preparer-photos.mjs\`.

${PHOTOS.map((p) => `- \`${p.nom}.jpg\` — ${p.page}\n  ${p.usage}`).join('\n')}

La librairie, les livres, les auteurs et les éditeurs de ce site sont inventés : ces photos
illustrent une marque fictive et ne représentent aucun commerce réel.

Aucune photo retenue ne montre de personne identifiable, d'enseigne réelle ou de titre
lisible. Sept candidates ont été écartées après examen : deux librairies reconnaissables à
leur aménagement, une devanture portant le nom d'un commerce parisien, un portrait affiché au
mur, deux cadrages où les titres exposés se lisaient sans effort, et une étiquette de rayon
dans une langue qui contredisait le récit.
`

await writeFile(chemin('../public/images/CREDITS.md'), credits, 'utf8')
console.log('CREDITS.md écrit')
