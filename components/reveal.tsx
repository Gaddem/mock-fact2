'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { mouvementReduit, revelerEnVue } from '@/lib/scroll'

type Props = {
  children: ReactNode
  className?: string
  /**
   * `feuillet` : la feuille se pose, légèrement de travers.
   * `marge` : entrée par la gauche, pour ce qui vit dans la marge.
   * Par défaut, montée simple.
   */
  sens?: 'feuillet' | 'marge'
  /** Rang dans une grille : sert au décalage en cascade. */
  rang?: number
  cascade?: boolean
}

/**
 * Entrée en scène au défilement.
 *
 * L'état de repos est l'état visible : `data-visible` est posé par
 * l'observateur partagé, et un filet de sécurité le pose de toute façon au
 * bout de deux secondes. Si l'observateur ne se déclenche jamais, on perd
 * l'animation, jamais le contenu.
 *
 * L'attribut est écrit sur le nœud plutôt que tenu en état React : c'est du
 * pilotage d'API navigateur, ça n'a aucune raison de provoquer un rendu.
 *
 * Inactif sous 768 px : sur un écran étroit, presque tout est déjà dans le
 * viewport au chargement, et l'effet n'ajoute que de l'attente.
 */
export function Reveal({ children, className = '', sens, rang, cascade }: Props) {
  const boite = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = boite.current
    if (!element) return

    const montrer = () => {
      element.dataset.visible = 'true'
    }

    if (mouvementReduit() || window.innerWidth < 768) {
      montrer()
      return
    }

    const filet = window.setTimeout(montrer, 2000)
    const nettoyer = revelerEnVue(element, montrer)

    return () => {
      window.clearTimeout(filet)
      nettoyer()
    }
  }, [])

  return (
    <div
      ref={boite}
      className={`reveal ${className}`}
      data-sens={sens}
      data-stagger={cascade ? '' : undefined}
      style={rang === undefined ? undefined : ({ '--i': rang } as React.CSSProperties)}
    >
      {children}
    </div>
  )
}
