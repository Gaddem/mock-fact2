import type { Metadata } from 'next'
import { FicheLivre } from '@/components/fiche-livre'
import { IndexLateral } from '@/components/index-lateral'
import { Photo } from '@/components/photo'
import { Reveal } from '@/components/reveal'
import { livresDuRayon, tousLesRayons } from '@/lib/livres'
import livreOuvert from '@/public/images/livre-ouvert.jpg'

export const metadata: Metadata = {
  title: 'Le catalogue',
  description:
    'Huit rayons classés par lettre, des inclassables à la poésie. Chaque fiche porte l’avis de la personne qui a lu le livre.',
}

export default function Catalogue() {
  const entrees = tousLesRayons.map((rayon) => ({
    lettre: rayon.lettre,
    nom: rayon.nom,
    ancre: rayon.ancre,
  }))

  return (
    <>
      <section className="mx-auto max-w-[var(--contenu-max)] px-5 pt-14 sm:px-8 sm:pt-20">
        <p className="surtitre">Le catalogue</p>
        <h1 className="mt-5 max-w-[18ch] text-4xl font-semibold text-balance sm:text-6xl">
          Huit rayons, rangés par lettre
        </h1>
        <p className="chapo colonne mt-8">
          Ce n&apos;est pas un stock : c&apos;est ce qu&apos;on tient toute l&apos;année, quoi
          qu&apos;il arrive. Le reste se commande, arrive sous deux jours, et repart souvent le jour
          même.
        </p>
      </section>

      <Photo
        source={livreOuvert}
        alt=""
        sizes="100vw"
        variante="fondu"
        priorite
        className="mx-auto mt-12 h-[180px] max-w-[1600px] sm:h-[240px] lg:h-[300px]"
      />

      <div className="mx-auto max-w-[var(--contenu-max)] px-5 pb-[var(--section-y)] sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          {/* Index alphabétique : colonne en desktop, barre collante en mobile.
              `min-w-0` sur les deux cellules : sans ça, une piste de grille
              prend la largeur intrinsèque de son contenu et déborde. */}
          <div className="sticky top-[57px] z-30 -mx-5 min-w-0 border-b border-bordure bg-fond px-5 py-1 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
            <IndexLateral entrees={entrees} titre="Les rayons" />
          </div>

          <div className="filet-colonne min-w-0 lg:pl-14">
            {tousLesRayons.map((rayon) => (
              <section
                key={rayon.ancre}
                id={rayon.ancre}
                className="scroll-mt-32 border-b border-bordure py-12 last:border-0 lg:py-16"
              >
                <div className="flex items-baseline gap-4">
                  <span className="index-lettre font-titre text-3xl sm:text-4xl">
                    {rayon.lettre}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold sm:text-3xl">{rayon.nom}</h2>
                    <p className="surtitre mt-1">{rayon.sous_titre}</p>
                  </div>
                </div>

                <p className="colonne mt-5 text-muted">{rayon.description}</p>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {livresDuRayon(rayon.ancre).map((livre, rang) => (
                    <li key={livre.id}>
                      <Reveal cascade rang={rang} className="h-full">
                        <FicheLivre livre={livre} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
