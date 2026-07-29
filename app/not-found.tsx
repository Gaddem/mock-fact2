import { Lien } from '@/components/lien'
import { tousLesRayons } from '@/lib/livres'

export default function Introuvable() {
  return (
    <section className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
      <p className="surtitre">Erreur 404</p>
      <h1 className="mt-5 max-w-[16ch] text-4xl font-semibold text-balance sm:text-6xl">
        Ce rayon n&apos;existe pas
      </h1>
      <p className="chapo colonne mt-8">
        Ça arrive aussi en boutique. La page que vous cherchez a changé d&apos;adresse, ou n&apos;a
        jamais existé — auquel cas elle aurait sa place au cinquième rayon, avec le reste de ce
        qu&apos;on ne sait pas classer.
      </p>

      <p className="mt-8">
        <Lien href="/" className="lien flex min-h-11 items-center font-titre">
          Revenir à l&apos;accueil
        </Lien>
      </p>

      <div className="mt-16 border-t border-bordure pt-10">
        <p className="surtitre">Les rayons qui existent, eux</p>
        <ul className="mt-6 grid gap-y-4 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4">
          {tousLesRayons.map((rayon) => (
            <li key={rayon.ancre}>
              <Lien
                href={`/catalogue#${rayon.ancre}`}
                className="flex min-h-11 items-baseline gap-3"
              >
                <span className="index-lettre font-titre text-xl">{rayon.lettre}</span>
                <span className="lien font-titre">{rayon.nom}</span>
              </Lien>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
