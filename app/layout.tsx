import type { Metadata } from 'next'
import { Newsreader, Outfit } from 'next/font/google'
import { EnTete } from '@/components/en-tete'
import { PiedDePage } from '@/components/pied-de-page'
import './globals.css'

// L'inverse du réflexe : le géométrique porte les titres, le serif de
// labeur porte le texte long — c'est lui, le sujet du site.
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--police-titre',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--police-texte',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gaddem.github.io/mock-fact2/'),
  title: {
    default: 'Le Cinquième Rayon — Librairie indépendante à Montpellier',
    template: '%s · Le Cinquième Rayon',
  },
  description:
    'Librairie de quartier, huit rayons et un cinquième qui accueille ce qui ne rentre nulle part. Sélections lues, rencontres, ateliers.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Cinquième Rayon',
    title: 'Le Cinquième Rayon — Librairie indépendante à Montpellier',
    description:
      'Huit rayons, et un cinquième pour ce qui ne rentre nulle part. Sélections lues, rencontres, ateliers.',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'Le Cinquième Rayon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Cinquième Rayon',
    description: 'Huit rayons, et un cinquième pour ce qui ne rentre nulle part.',
    images: ['/images/og.png'],
  },
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${newsreader.variable}`}>
      <body className="flex min-h-screen flex-col">
        <div className="grain" aria-hidden="true" />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-accent focus:px-4 focus:text-surface"
        >
          Aller au contenu
        </a>
        <EnTete />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <PiedDePage />
      </body>
    </html>
  )
}
