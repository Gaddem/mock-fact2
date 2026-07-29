'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { mouvementReduit } from '@/lib/scroll'

type Props = {
  children: ReactNode
  className?: string
  /** Rang dans une grille : sert au décalage en cascade. */
  rang?: number
  cascade?: boolean
}

/**
 * Fondu montant à l'entrée dans le viewport.
 *
 * L'état de repos est l'état visible : `data-visible` est posé par
 * l'observateur, et un filet de sécurité le pose de toute façon au bout de
 * deux secondes. Si l'observateur ne se déclenche jamais, on perd
 * l'animation, jamais le contenu.
 *
 * L'attribut est écrit sur le nœud plutôt que tenu en état React : c'est du
 * pilotage d'API navigateur, ça n'a aucune raison de provoquer un rendu.
 *
 * Inactif sous 768 px : sur un écran étroit, presque tout est déjà dans le
 * viewport au chargement, et l'effet n'ajoute que de l'attente.
 */
export function Reveal({ children, className = '', rang, cascade }: Props) {
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

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          montrer()
          observateur.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    observateur.observe(element)

    return () => {
      window.clearTimeout(filet)
      observateur.disconnect()
    }
  }, [])

  return (
    <div
      ref={boite}
      className={`reveal ${className}`}
      data-stagger={cascade ? '' : undefined}
      style={rang === undefined ? undefined : ({ '--i': rang } as React.CSSProperties)}
    >
      {children}
    </div>
  )
}
