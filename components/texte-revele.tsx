'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { mouvementReduit, revelerEnVue } from '@/lib/scroll'

type Props = {
  children: ReactNode
  className?: string
  /** Blocs à faire entrer, relativement au conteneur. */
  selecteur?: string
}

/**
 * Fait entrer un texte long bloc par bloc, sans alourdir le balisage.
 *
 * Sur un site dont le sujet est le texte long, c'est le texte qui doit
 * avoir le mouvement : envelopper vingt paragraphes à la main donnerait
 * autant de conteneurs sans contenu propre.
 *
 * Deux précautions :
 * — seuls les blocs encore sous la ligne de flottaison sont pris. Poser
 *   l'état de départ sur un bloc déjà peint le ferait clignoter ;
 * — la classe est ajoutée après hydratation, donc le rendu serveur est
 *   l'état de repos, c'est-à-dire l'état visible. Sans script, l'article
 *   est simplement là.
 */
export function TexteRevele({
  children,
  className,
  selecteur = ':scope > section > :not(aside)',
}: Props) {
  const boite = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = boite.current
    if (!element || mouvementReduit() || window.innerWidth < 768) return

    const nettoyages: (() => void)[] = []

    for (const bloc of element.querySelectorAll<HTMLElement>(selecteur)) {
      if (bloc.getBoundingClientRect().top < window.innerHeight * 0.9) continue

      bloc.classList.add('reveal')
      const montrer = () => {
        bloc.dataset.visible = 'true'
      }

      const filet = window.setTimeout(montrer, 2500)
      const stop = revelerEnVue(bloc, montrer)

      nettoyages.push(() => {
        window.clearTimeout(filet)
        stop()
      })
    }

    return () => {
      for (const nettoyer of nettoyages) nettoyer()
    }
  }, [selecteur])

  return (
    <div ref={boite} className={className}>
      {children}
    </div>
  )
}
