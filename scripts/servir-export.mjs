/**
 * Sert l'export statique `out/` sous son `basePath` de production.
 *
 *   npm run build && npm run apercu   →  http://localhost:4174/mock-fact2/
 *
 * Indispensable pour juger la fluidité : `npm run dev` sert React en mode
 * développement, non minifié, avec HMR. L'hydratation y coûte plusieurs fois
 * son prix de production. Aucune mesure d'animation faite en `dev` n'est
 * représentative.
 *
 * Servir `out/` à la racine ne marche pas : les assets pointent vers
 * `/mock-fact2/_next/…`. D'où ce petit serveur, qui monte l'export sous le
 * bon préfixe.
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, extname, normalize } from 'node:path'
import { createGzip } from 'node:zlib'

const BASE = '/mock-fact2'
const PORT = 4174
const RACINE = fileURLToPath(new URL('../out/', import.meta.url))

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

const fichier = async (chemin) => {
  try {
    const infos = await stat(chemin)
    return infos.isFile() ? chemin : null
  } catch {
    return null
  }
}

const serveur = createServer(async (requete, reponse) => {
  const url = new URL(requete.url, `http://localhost:${PORT}`)

  if (!url.pathname.startsWith(BASE)) {
    reponse.writeHead(302, { location: `${BASE}/` })
    reponse.end()
    return
  }

  // `normalize` puis vérification du préfixe : sans ça, un `..` encodé
  // permettrait de lire hors du dossier d'export.
  const relatif = normalize(decodeURIComponent(url.pathname.slice(BASE.length))).replace(
    /^([/\\])+/,
    '',
  )
  const cible = join(RACINE, relatif)

  if (!cible.startsWith(RACINE)) {
    reponse.writeHead(403).end('Interdit')
    return
  }

  const trouve =
    (await fichier(cible)) ??
    (await fichier(join(cible, 'index.html'))) ??
    (await fichier(`${cible}.html`))

  if (!trouve) {
    const page404 = await fichier(join(RACINE, '404.html'))
    reponse.writeHead(404, { 'content-type': TYPES['.html'] })
    if (page404) createReadStream(page404).pipe(reponse)
    else reponse.end('404')
    return
  }

  const type = TYPES[extname(trouve)] ?? 'application/octet-stream'

  // Pages compresse les fichiers texte. Sans ça ici, le JS et le CSS
  // arrivent trois fois plus gros qu'en ligne et toute mesure de
  // performance faite sur l'aperçu est fausse.
  const compressible = /^(text\/|application\/(javascript|json))/.test(type)
  const accepte = (requete.headers['accept-encoding'] ?? '').includes('gzip')

  reponse.writeHead(200, {
    'content-type': type,
    'cache-control': 'no-store',
    ...(compressible && accepte ? { 'content-encoding': 'gzip', vary: 'Accept-Encoding' } : {}),
  })

  const flux = createReadStream(trouve)
  if (compressible && accepte) flux.pipe(createGzip()).pipe(reponse)
  else flux.pipe(reponse)
})

serveur.listen(PORT, () => {
  console.log(`Export servi sur http://localhost:${PORT}${BASE}/`)
})
