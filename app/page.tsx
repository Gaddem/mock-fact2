import { Lien } from '@/components/lien'
import { Photo } from '@/components/photo'
import { PileCouvertures } from '@/components/pile-couvertures'
import { Reveal } from '@/components/reveal'
import { selection, tousLesRayons } from '@/lib/livres'
import pagesOuvertes from '@/public/images/pages-ouvertes.jpg'

export default function Accueil() {
  const prochaine = {
    date: '11 septembre',
    titre: 'Adèle Marquant — La Halle aux vents',
  }

  return (
    <>
      {/* Ouverture : pas de hero pleine hauteur, pas de titre centré, pas de
          bouton coloré. Une colonne éditoriale calée à gauche, et l'ardoise
          de la maison en regard. */}
      <section className="mx-auto max-w-[var(--contenu-max)] px-5 pt-14 pb-[var(--section-y)] sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="surtitre">Librairie indépendante · depuis 1998</p>
            <h1 className="mt-5 text-4xl font-semibold text-balance sm:text-6xl lg:text-7xl">
              On peut rester debout deux heures et repartir sans rien acheter.
            </h1>
            <p className="chapo colonne mt-8">
              Le Cinquième Rayon tient huit rayons, dont un qui n&apos;a pas de nom propre : celui
              où finissent les livres qu&apos;aucun autre ne veut. C&apos;est lui qui a donné son
              nom à la maison, et c&apos;est encore celui devant lequel on passe le plus de temps.
            </p>
            <p className="colonne mt-5 text-muted">
              Tout ce qui est en rayon a été lu par quelqu&apos;un d&apos;ici. Quand ce n&apos;est
              pas le cas, on le dit.
            </p>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <Lien href="/catalogue" className="lien flex min-h-11 items-center font-titre">
                Parcourir le catalogue
              </Lien>
              <Lien href="/la-maison" className="lien flex min-h-11 items-center font-titre">
                Comment on en est arrivés là
              </Lien>
            </p>
          </div>

          <aside className="border-t border-bordure pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p className="surtitre">L&apos;ardoise</p>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="font-titre font-medium">Cette semaine en vitrine</dt>
                <dd className="mt-1 text-muted">
                  Cinq titres de la rentrée, deux revues de poésie, et le dossier du trimestre sur
                  les métiers du port fluvial.
                </dd>
              </div>
              <div>
                <dt className="font-titre font-medium">Prochaine rencontre</dt>
                <dd className="mt-1 text-muted">
                  {prochaine.date} — {prochaine.titre}.
                  {/* Sur sa propre ligne, et pas au fil du texte : un lien
                      pris dans une phrase fait une cible de 14 px de haut. */}
                  <Lien
                    href="/rencontres"
                    className="lien mt-1 flex min-h-11 items-center text-texte"
                  >
                    Réserver une place
                  </Lien>
                </dd>
              </div>
              <div>
                <dt className="font-titre font-medium">Commandes</dt>
                <dd className="mt-1 text-muted">
                  Sous 48 heures ouvrées. Une semaine pour les tirages courts.
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Signature : le tas de couvertures se défait au défilement. */}
      <section className="border-t border-bordure bg-surface">
        <div className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="surtitre">La sélection du mois</p>
              <h2 className="mt-3 text-3xl font-semibold text-balance sm:text-5xl">
                Cinq livres sortis de la pile
              </h2>
            </div>
            <Lien href="/catalogue" className="lien flex min-h-11 items-center font-titre text-sm">
              Voir les huit rayons
            </Lien>
          </div>

          <p className="colonne mt-6 text-muted">
            Chaque premier mardi, on vide la table du fond et on recommence. Ce qui reste ci-dessous
            a survécu à la discussion.
          </p>

          <div className="mt-12">
            <PileCouvertures livres={selection} />
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {selection.map((livre, rang) => (
              <li key={livre.id}>
                <Reveal cascade rang={rang}>
                  <p className="font-titre text-base font-medium">{livre.titre}</p>
                  <p className="mt-1 text-sm text-muted">
                    {livre.auteur} · {livre.editeur}
                  </p>
                  <p className="mt-2 text-sm">{livre.accroche}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Les rayons, en index : c'est la grammaire du site. */}
      <section className="border-t border-bordure">
        <div className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
          <p className="surtitre">Les rayons</p>
          <h2 className="mt-3 max-w-[20ch] text-3xl font-semibold text-balance sm:text-5xl">
            Huit lettres, et un rayon qui n&apos;obéit à personne
          </h2>

          <ul className="mt-12 grid gap-y-8 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4">
            {tousLesRayons.map((rayon, rang) => (
              <li key={rayon.ancre}>
                <Reveal cascade rang={rang}>
                  <Lien
                    href={`/catalogue#${rayon.ancre}`}
                    className="group block border-t border-bordure pt-4"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="index-lettre font-titre text-2xl">{rayon.lettre}</span>
                      <span className="lien font-titre text-lg font-medium">{rayon.nom}</span>
                    </span>
                    <span className="mt-2 block text-sm text-muted">{rayon.sous_titre}</span>
                  </Lien>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chronique : un vrai bloc de texte long, en pleine page d'accueil. */}
      <section className="border-t border-bordure bg-surface">
        <div className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="surtitre">La chronique</p>
              <p className="mt-3 text-sm text-muted">
                Publiée le premier mardi de chaque mois, affichée en vitrine et lue à voix haute
                pour qui le demande.
              </p>
            </div>

            <Reveal>
              <article className="colonne">
                <h2 className="text-3xl font-semibold text-balance sm:text-4xl">
                  Éloge des livres qu&apos;on ne sait pas ranger
                </h2>
                <p className="lettrine mt-6">
                  <span className="lettrine-marque">I</span>l y a, dans toute librairie, une poignée
                  d&apos;ouvrages qui mettent le classement en échec. Un carnet d&apos;atelier qui
                  n&apos;est ni un essai ni un album. Une correspondance qui tient de
                  l&apos;enquête. Un livre de cuisine écrit comme un journal de deuil. Le premier
                  réflexe du métier consiste à trancher : on choisit un rayon, on range, on passe à
                  la suite.
                </p>
                <p className="mt-5">
                  Nous avons fait l&apos;inverse. Le cinquième rayon du mur du fond ne reçoit que
                  ces livres-là. Il n&apos;a ni ordre alphabétique ni logique thématique — il a une
                  seule règle : chaque titre y reste tant que personne n&apos;a su dire où le mettre
                  ailleurs. Certains y passent une semaine. Un y est depuis onze ans.
                </p>
                <p className="mt-5">
                  Ce rayon est devenu, sans qu&apos;on l&apos;ait décidé, le plus fréquenté de la
                  boutique. Les gens s&apos;y arrêtent parce qu&apos;ils n&apos;y cherchent rien.
                  C&apos;est la seule étagère du magasin devant laquelle personne ne sait ce
                  qu&apos;il va trouver, et c&apos;est apparemment tout ce qu&apos;il fallait.
                </p>
                <p className="mt-8">
                  <Lien
                    href="/la-maison"
                    className="lien inline-flex min-h-11 items-center font-titre"
                  >
                    Lire la suite dans « La maison »
                  </Lien>
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Respiration : la photo ne porte jamais de texte. */}
      <Photo
        source={pagesOuvertes}
        alt=""
        sizes="100vw"
        variante="fondu"
        className="mx-auto h-[220px] max-w-[1600px] sm:h-[300px] lg:h-[380px]"
      />

      <section className="mx-auto max-w-[var(--contenu-max)] px-5 pb-[var(--section-y)] sm:px-8">
        <div className="border-t border-bordure pt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="surtitre">Le {prochaine.date}, 19h</p>
              <h2 className="mt-3 max-w-[24ch] text-2xl font-semibold text-balance sm:text-4xl">
                {prochaine.titre}
              </h2>
              <p className="colonne mt-4 text-muted">
                Premier roman, trois hivers dans une halle désaffectée. Quinze minutes de lecture,
                puis on parle. Entrée libre, six places assises encore disponibles.
              </p>
            </div>
            <Lien href="/rencontres" className="lien flex min-h-11 items-center font-titre">
              Toutes les rencontres
            </Lien>
          </div>
        </div>
      </section>
    </>
  )
}
