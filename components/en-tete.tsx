'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Lien } from '@/components/lien'

const LIENS = [
  { href: '/', libelle: 'Accueil' },
  { href: '/catalogue', libelle: 'Catalogue' },
  { href: '/la-maison', libelle: 'La maison' },
  { href: '/rencontres', libelle: 'Rencontres' },
]

export function EnTete() {
  const [ouvert, setOuvert] = useState(false)
  const chemin = usePathname()

  const estCourant = (href: string) => (href === '/' ? chemin === '/' : chemin.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-fond">
      <div className="mx-auto flex max-w-[var(--contenu-max)] items-center justify-between gap-4 px-5 sm:px-8">
        <Lien
          href="/"
          className="flex min-h-14 flex-col justify-center py-2 leading-none"
          aria-label="Le Cinquième Rayon, accueil"
        >
          <span className="font-titre text-lg font-semibold tracking-tight sm:text-xl">
            Le Cinquième Rayon
          </span>
          <span className="surtitre mt-1 hidden sm:block">Librairie · Nantes</span>
        </Lien>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {LIENS.map((lien) => (
              <li key={lien.href}>
                <Lien
                  href={lien.href}
                  aria-current={estCourant(lien.href) ? 'page' : undefined}
                  className="lien flex min-h-11 items-center font-titre text-sm tracking-wide"
                  data-courant={estCourant(lien.href)}
                >
                  {lien.libelle}
                </Lien>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((etat) => !etat)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span className="h-px w-full bg-texte" />
            <span className="h-px w-full bg-texte" />
            <span className="h-px w-full bg-texte" />
          </span>
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className="border-t border-bordure md:hidden"
        >
          <ul className="mx-auto max-w-[var(--contenu-max)] px-5 py-2 sm:px-8">
            {LIENS.map((lien) => (
              <li key={lien.href} className="border-b border-bordure last:border-0">
                <Lien
                  href={lien.href}
                  aria-current={estCourant(lien.href) ? 'page' : undefined}
                  onClick={() => setOuvert(false)}
                  className="flex min-h-12 items-center font-titre text-base"
                >
                  {lien.libelle}
                </Lien>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
