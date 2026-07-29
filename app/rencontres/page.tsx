import type { Metadata } from 'next'
import { FormulaireInscription } from '@/components/formulaire-inscription'
import { Photo } from '@/components/photo'
import { Reveal } from '@/components/reveal'
import rencontres from '@/data/rencontres.json'
import coinLecture from '@/public/images/coin-lecture.jpg'

export const metadata: Metadata = {
  title: 'Rencontres et ateliers',
  description:
    'Lectures, rencontres d’auteurs, club du cinquième rayon et ateliers de reliure. Entrée libre, quarante places assises.',
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T12:00:00`),
  )

export default function Rencontres() {
  return (
    <>
      <section className="mx-auto max-w-[var(--contenu-max)] px-5 pt-14 sm:px-8 sm:pt-20">
        <p className="surtitre">Rencontres et ateliers</p>
        <h1 className="mt-5 max-w-[18ch] text-4xl font-semibold text-balance sm:text-6xl">
          On lit d&apos;abord, on parle ensuite
        </h1>
        <p className="chapo colonne mt-8">
          Toutes les trois semaines, entre deux rayons. Quarante places assises, autant de debout,
          et jamais de micro : au-delà, on n&apos;entend plus celui qui lit.
        </p>
      </section>

      <Photo
        source={coinLecture}
        alt=""
        sizes="100vw"
        variante="fondu"
        priorite
        className="mx-auto mt-12 h-[200px] max-w-[1600px] sm:h-[280px] lg:h-[340px]"
      />

      <section className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">Les prochaines dates</h2>

        <ul className="mt-10">
          {rencontres.map((rencontre, rang) => (
            <li key={rencontre.id}>
              <Reveal cascade rang={rang}>
                <article className="grid gap-4 border-t border-bordure py-8 lg:grid-cols-[10rem_minmax(0,1fr)_11rem] lg:gap-10">
                  <div>
                    <p className="font-titre text-lg font-medium">{formatDate(rencontre.date)}</p>
                    <p className="mt-1 text-sm text-muted">{rencontre.heure}</p>
                  </div>

                  <div>
                    <p className="surtitre">{rencontre.type}</p>
                    <h3 className="mt-2 text-xl font-semibold text-balance sm:text-2xl">
                      {rencontre.titre}
                    </h3>
                    <p className="colonne mt-3 text-muted">{rencontre.resume}</p>
                  </div>

                  <p className="text-sm lg:text-right">
                    {rencontre.restantes === 0 ? (
                      <span className="font-titre text-accent-2">Complet</span>
                    ) : (
                      <>
                        <span className="font-titre text-accent">{rencontre.restantes} places</span>
                        <span className="block text-muted">sur {rencontre.places}</span>
                      </>
                    )}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-bordure">
        <div className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="surtitre">Comment ça se passe</p>
              <div className="colonne mt-5 space-y-4 text-muted">
                <p>
                  Les chaises sortent une heure avant. Ceux qui arrivent en avance sont mis à
                  contribution, c&apos;est la coutume et personne ne s&apos;en plaint.
                </p>
                <p>
                  La lecture dure entre quinze et quarante minutes selon le texte. Ensuite, la
                  discussion : elle s&apos;arrête quand plus personne ne lève la main, jamais à une
                  heure fixée d&apos;avance.
                </p>
                <p>
                  Les ateliers de reliure sont limités à douze personnes, et il faut apporter son
                  propre livre abîmé — sans ça, il n&apos;y a rien à réparer.
                </p>
              </div>
            </div>

            <FormulaireInscription />
          </div>
        </div>
      </section>
    </>
  )
}
