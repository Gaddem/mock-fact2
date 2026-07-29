'use client'

import { useEffect, useRef } from 'react'
import { Couverture } from '@/components/couverture'
import { abonnerEnVue, montee, mouvementReduit } from '@/lib/scroll'
import type { Livre } from '@/lib/livres'

/**
 * Signature du site : les couvertures arrivent empilées comme un tas posé
 * sur la table, puis se déploient dans leur grille au défilement.
 *
 * L'état de repos est l'état déployé. Le HTML rend la grille finale ;
 * `data-pile` n'est posé que si le JS tourne et que le mouvement n'est pas
 * réduit. Sans script, sans observateur, la sélection est là, entière.
 *
 * La boucle n'écrit qu'une variable, `--d`. Le reste (translation vers le
 * tas, inclinaison, échelle) se calcule en CSS à partir de la place de
 * chaque couverture dans la grille — aucune mesure de géométrie par livre.
 */
export function PileCouvertures({ livres }: { livres: Livre[] }) {
  const grille = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const element = grille.current
    if (!element || mouvementReduit()) return

    element.dataset.pile = 'actif'

    // Réécrire un style identique invalide quand même le style calculé :
    // on mémorise la dernière valeur et on sort tôt.
    let derniere = -1

    const suivre = () => {
      const avancee = montee(element)
      if (Math.abs(avancee - derniere) < 0.004) return
      derniere = avancee
      element.style.setProperty('--d', avancee.toFixed(3))
    }

    const nettoyer = abonnerEnVue(element, suivre)

    return () => {
      nettoyer()
      delete element.dataset.pile
      element.style.removeProperty('--d')
    }
  }, [])

  return (
    <ul
      ref={grille}
      className="pile curseur-signet grid grid-cols-2 gap-[var(--gap)] md:grid-cols-5"
    >
      {livres.map((livre, rang) => (
        <li key={livre.id} className="pile-item" style={{ '--i': rang } as React.CSSProperties}>
          <Couverture livre={livre} />
        </li>
      ))}
      {/* Comble le trou laissé par le cinquième titre sur deux colonnes.
          Inutile à partir de 768 px, où la rangée est pleine. */}
      <li className="self-end pb-2 md:hidden">
        <p className="surtitre">Sélection</p>
        <p className="mt-1 text-sm text-muted">
          Cinq titres choisis ce mois-ci, tous lus par quelqu&apos;un de la maison.
        </p>
      </li>
    </ul>
  )
}
