/**
 * Génère l'icône du site et l'image de partage.
 *
 *   node scripts/generer-visuels.mjs
 *
 * Les PNG produits sont commités. Le script est là pour pouvoir les refaire
 * à l'identique si la palette bouge.
 *
 * Le motif est le même dans les deux : la pile de couvertures vue de côté,
 * c'est-à-dire la signature du site réduite à cinq traits.
 */
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PAPIER = '#F7F3E9'
const ENCRE = '#1B1A17'
const VERT = '#3F5D45'
const BRIQUE = '#A4442F'

const chemin = (relatif) => fileURLToPath(new URL(relatif, import.meta.url))

// Icône : cinq feuillets empilés, décalés comme un tas posé sur la table.
const icone = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" fill="${VERT}"/>
  <g fill="${PAPIER}">
    <rect x="96" y="132" width="300" height="34" rx="4"/>
    <rect x="112" y="188" width="300" height="34" rx="4"/>
    <rect x="88"  y="244" width="300" height="34" rx="4"/>
    <rect x="120" y="300" width="300" height="34" rx="4"/>
  </g>
  <rect x="100" y="356" width="300" height="34" rx="4" fill="${BRIQUE}"/>
</svg>`

await sharp(Buffer.from(icone)).png().toFile(chemin('../app/icon.png'))
console.log('app/icon.png — 512×512')

// Partage : même motif couché, titre à droite, tout en tokens du site.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPIER}"/>
  <g>
    <rect x="72"  y="196" width="150" height="228" rx="4" fill="${VERT}"/>
    <rect x="150" y="176" width="150" height="248" rx="4" fill="${ENCRE}"/>
    <rect x="228" y="200" width="150" height="224" rx="4" fill="${BRIQUE}"/>
    <rect x="306" y="184" width="150" height="240" rx="4" fill="${VERT}" opacity="0.75"/>
  </g>
  <rect x="540" y="150" width="1" height="330" fill="#DCD3BF"/>
  <text x="592" y="196" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24"
        letter-spacing="4" fill="#6B6559">LIBRAIRIE IND&#201;PENDANTE</text>
  <text x="592" y="286" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="74"
        font-weight="600" fill="${ENCRE}">Le Cinqui&#232;me</text>
  <text x="592" y="368" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="74"
        font-weight="600" fill="${ENCRE}">Rayon</text>
  <text x="592" y="440" font-family="Georgia, serif" font-size="30" fill="${VERT}">
    Huit rayons, et un pour le reste.
  </text>
  <text x="592" y="490" font-family="Georgia, serif" font-size="22" fill="#6B6559">
    Nantes &#183; depuis 1998
  </text>
</svg>`

await sharp(Buffer.from(og)).png().toFile(chemin('../public/images/og.png'))
console.log('public/images/og.png — 1200×630')
