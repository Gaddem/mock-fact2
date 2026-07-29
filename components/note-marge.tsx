'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { mouvementReduit, revelerEnVue } from '@/lib/scroll'

/**
 * Note de marge, alignée sur son paragraphe à partir de 1280 px, dans le
 * flux en dessous. Même texte dans les deux cas : rien d'informatif ne doit
 * dépendre de la largeur de l'écran.
 */
export function NoteMarge({ children }: { children: ReactNode }) {
  const boite = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = boite.current
    if (!element) return

    const montrer = () => {
      element.dataset.visible = 'true'
    }

    if (mouvementReduit()) {
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
    <aside ref={boite} className="note-marge">
      {children}
    </aside>
  )
}
