import { Lien } from '@/components/lien'
import { Reveal } from '@/components/reveal'

export function PiedDePage() {
  return (
    <footer className="mt-24 border-t border-bordure">
      <div className="mx-auto max-w-[var(--contenu-max)] px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal cascade rang={0}>
            <p className="font-titre text-lg font-semibold">Le Cinquième Rayon</p>
            <p className="mt-2 text-sm text-muted">
              9 rue du Puits-Doré
              <br />
              34000 Montpellier
            </p>
          </Reveal>

          <Reveal cascade rang={1}>
            <p className="surtitre">Horaires</p>
            <p className="mt-2 text-sm text-muted">
              Mardi au samedi, 10h – 19h
              <br />
              Dimanche, 10h – 13h
              <br />
              Fermé le lundi
            </p>
          </Reveal>

          <Reveal cascade rang={2}>
            <p className="surtitre">La maison</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Lien href="/catalogue" className="lien flex min-h-11 items-center">
                  Le catalogue
                </Lien>
              </li>
              <li>
                <Lien href="/la-maison" className="lien flex min-h-11 items-center">
                  Notre histoire
                </Lien>
              </li>
              <li>
                <Lien href="/rencontres" className="lien flex min-h-11 items-center">
                  Rencontres et ateliers
                </Lien>
              </li>
            </ul>
          </Reveal>

          <Reveal cascade rang={3}>
            <p className="surtitre">Commandes</p>
            <p className="mt-2 text-sm text-muted">
              Toute commande arrive sous 48 heures ouvrées. Les tirages courts et les revues
              demandent parfois une semaine de plus.
            </p>
          </Reveal>
        </div>

        <p className="mt-12 border-t border-bordure pt-6 text-xs text-muted">
          Projet de démonstration — Développé par DEVAZU
        </p>
      </div>
    </footer>
  )
}
