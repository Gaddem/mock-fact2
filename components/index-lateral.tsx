'use client'

import { useEffect, useRef, useState } from 'react'

export type EntreeIndex = {
  lettre: string
  nom: string
  ancre: string
}

/**
 * Index alphabétique de la marge : la lettre de la section en cours
 * s'encre, et le signet vient se poser dessus.
 *
 * Une entrée est active par défaut (la première) : si l'observateur ne se
 * déclenche jamais, l'index reste un sommaire utilisable, il ne se vide pas.
 *
 * En dessous de 1024 px il devient une barre horizontale collante — même
 * information, même ordre, jamais un contenu réservé au grand écran.
 */
export function IndexLateral({ entrees, titre }: { entrees: EntreeIndex[]; titre: string }) {
  const [actif, setActif] = useState(entrees[0]?.ancre ?? '')
  const visibles = useRef(new Set<string>())

  useEffect(() => {
    const sections = entrees
      .map((entree) => document.getElementById(entree.ancre))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const observateur = new IntersectionObserver(
      (entrants) => {
        for (const entrant of entrants) {
          if (entrant.isIntersecting) visibles.current.add(entrant.target.id)
          else visibles.current.delete(entrant.target.id)
        }

        // La première section de la liste encore visible gagne : en
        // descendant, l'index avance d'un cran à la fois, sans clignoter.
        const gagnante = entrees.find((entree) => visibles.current.has(entree.ancre))
        if (gagnante) setActif(gagnante.ancre)
      },
      { rootMargin: '-25% 0px -55% 0px' },
    )

    for (const section of sections) observateur.observe(section)
    return () => observateur.disconnect()
  }, [entrees])

  return (
    <nav aria-label={titre} className="lg:sticky lg:top-28">
      <p className="surtitre mb-3 hidden lg:block">{titre}</p>

      {/* La barre défile sur elle-même en mobile. Pas de marge négative ici :
          c'est le conteneur de page qui gère le débord jusqu'au bord, et deux
          bleeds imbriqués élargissaient la colonne de grille au-delà du
          viewport — invisible, parce que `overflow-x: hidden` le rognait. */}
      <ul className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
        {entrees.map((entree) => (
          <li
            key={entree.ancre}
            className="index-item relative shrink-0 lg:pl-4"
            data-actif={entree.ancre === actif}
          >
            <span className="signet hidden lg:block" aria-hidden="true" />
            <a
              href={`#${entree.ancre}`}
              aria-current={entree.ancre === actif ? 'true' : undefined}
              className="flex min-h-11 items-center gap-2 whitespace-nowrap px-2 lg:px-0 lg:py-1"
            >
              <span className="index-lettre text-base">{entree.lettre}</span>
              <span className="index-nom text-sm text-muted">{entree.nom}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
