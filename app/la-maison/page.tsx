import type { Metadata } from 'next'
import { IndexLateral } from '@/components/index-lateral'
import { Lien } from '@/components/lien'
import { NoteMarge } from '@/components/note-marge'
import { Photo } from '@/components/photo'
import { Reveal } from '@/components/reveal'
import casse from '@/public/images/casse-typographique.jpg'
import etagere from '@/public/images/etagere-objets.jpg'

export const metadata: Metadata = {
  title: 'La maison',
  description:
    'Vingt-huit ans de librairie, un mur du fond, cinq étagères et un rayon qui n’a jamais voulu se ranger. L’histoire du Cinquième Rayon.',
}

const CHAPITRES = [
  { lettre: 'I', nom: 'Avant la librairie', ancre: 'avant' },
  { lettre: 'II', nom: 'Le mur du fond', ancre: 'mur-du-fond' },
  { lettre: 'III', nom: 'Ce qu’on ne vend pas', ancre: 'refus' },
  { lettre: 'IV', nom: 'Lire à voix haute', ancre: 'voix-haute' },
  { lettre: 'V', nom: 'Aujourd’hui', ancre: 'aujourdhui' },
]

export default function LaMaison() {
  return (
    <>
      <section className="mx-auto max-w-[var(--contenu-max)] px-5 pt-14 sm:px-8 sm:pt-20">
        <p className="surtitre">La maison · 1998 — aujourd’hui</p>
        <h1 className="mt-5 max-w-[20ch] text-4xl font-semibold text-balance sm:text-6xl">
          Vingt-huit ans, cinq étagères, un rayon de trop
        </h1>
        <p className="chapo colonne mt-8">
          On nous demande souvent d&apos;où vient le nom. La réponse tient en une étagère, mais
          l&apos;histoire autour en prend cinq — et comme c&apos;est une librairie, on a préféré
          l&apos;écrire en entier plutôt que de la résumer sur un carton.
        </p>
      </section>

      <div className="mx-auto max-w-[var(--contenu-max)] px-5 pb-[var(--section-y)] sm:px-8">
        <div className="mt-12 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <div className="sticky top-[57px] z-30 -mx-5 min-w-0 border-b border-bordure bg-fond px-5 py-1 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
            <IndexLateral entrees={CHAPITRES} titre="Les chapitres" />
          </div>

          {/* La colonne de lecture est `relative` : c'est elle qui sert de
              repère aux notes de marge à partir de 1280 px. Sa largeur y est
              donc plafonnée à la mesure (plus le retrait du filet) — sinon
              elle occupe toute la piste de grille et les notes, posées à
              `100% + 2,5rem`, sortent de la page. La réserve vaut exactement
              la largeur d'une note plus son écart : 13rem + 2,5rem. */}
          <article className="filet-colonne relative min-w-0 lg:pl-14 xl:max-w-[calc(100%-15.5rem)]">
            <section id="avant" className="colonne scroll-mt-32">
              <h2 className="text-2xl font-semibold sm:text-3xl">I. Avant la librairie</h2>
              <p className="lettrine mt-6">
                <span className="lettrine-marque">L</span>e local était une quincaillerie. Elle a
                fermé en janvier 1997, après quarante ans, et elle a laissé derrière elle deux
                choses dont nous vivons encore : un plancher qui grince exactement au milieu, et des
                étagères en sapin montées trop haut pour ce qu&apos;on y rangeait. Le premier devis
                reçu proposait de tout démonter. Nous avons gardé les étagères et changé le plancher
                — ce qui, avec le recul, était l&apos;inverse du raisonnable.
              </p>
              <p className="mt-5">
                Ouvrir une librairie en 1998 relevait déjà d&apos;une forme d&apos;entêtement. On
                nous a expliqué, avec beaucoup de patience, que le quartier n&apos;avait pas la
                population pour, que les marges étaient impossibles, que les gens achetaient
                ailleurs. Tout cela était exact. Le seul argument dont nous disposions en face,
                c&apos;était qu&apos;il n&apos;y avait plus un seul endroit où entrer sans acheter,
                et rester une heure.
              </p>

              <NoteMarge>
                Le plancher grince toujours au milieu. Deux clients réguliers s&apos;en servent pour
                annoncer leur arrivée sans dire bonjour.
              </NoteMarge>

              <p className="mt-5">
                Les six premiers mois, nous vendions surtout des cartes postales. Ce n&apos;est pas
                une coquetterie : c&apos;est la carte postale qui a payé les trois premières
                commandes d&apos;éditeurs. On a appris, cette année-là, une chose qui n&apos;est pas
                dans les manuels — une librairie tient d&apos;abord parce que quelqu&apos;un entre,
                et seulement ensuite parce que quelqu&apos;un achète.
              </p>
            </section>

            <section id="mur-du-fond" className="colonne mt-16 scroll-mt-32">
              <h2 className="text-2xl font-semibold sm:text-3xl">II. Le mur du fond</h2>
              <p className="mt-6">
                Le mur du fond porte cinq étagères. Les quatre premières ont été réparties dès la
                première semaine : littérature, sciences humaines, histoire, poésie. La cinquième
                est restée vide un mois entier, parce que nous n&apos;arrivions pas à décider de ce
                qu&apos;elle recevrait. Un soir, faute de mieux, nous y avons posé les sept ou huit
                livres qui traînaient depuis l&apos;ouverture sur le comptoir, faute de rayon.
              </p>
              <p className="mt-5">
                Il y avait là un traité de charpente marine, un livre d&apos;heures fac-similé, un
                recueil de constats d&apos;huissier réédité pour sa langue, et un texte d&apos;une
                trentaine de pages qui décrivait la fabrication d&apos;un seul objet, du début à la
                fin, sans jamais dire lequel. Aucun de ces quatre livres n&apos;avait de rayon. Tous
                ont trouvé preneur avant la fin du mois.
              </p>

              <blockquote className="exergue my-8 pl-5">
                « Le cinquième rayon, c&apos;est celui où l&apos;on met les livres qu&apos;on
                n&apos;a pas su défendre en une phrase. »
              </blockquote>

              <p className="mt-5">
                C&apos;est devenu une méthode. Quand un livre arrive et que la discussion pour lui
                trouver une place dure plus de cinq minutes, il monte au cinquième. Ce n&apos;est
                pas une relégation : c&apos;est l&apos;endroit le plus visible du magasin, à hauteur
                de regard, juste en face de la porte. Les gens s&apos;y arrêtent parce qu&apos;ils
                n&apos;y cherchent rien de précis, et c&apos;est exactement l&apos;état
                d&apos;esprit dans lequel on trouve quelque chose.
              </p>

              <NoteMarge>
                Record de séjour : onze ans pour un manuel de nœuds de pêche annoté à la main par
                son précédent propriétaire. Il n&apos;est pas à vendre.
              </NoteMarge>
            </section>

            <Photo
              source={etagere}
              alt="Étagère haute de la librairie : bocaux, poteries, fragments de bois et un caractère d’imprimerie posés en ligne."
              sizes="(min-width: 1024px) 780px, 100vw"
              variante="fondu"
              className="my-14 h-[200px] sm:h-[260px]"
            />

            <section id="refus" className="colonne scroll-mt-32">
              <h2 className="text-2xl font-semibold sm:text-3xl">III. Ce qu&apos;on ne vend pas</h2>
              <p className="mt-6">
                Une librairie se définit autant par ce qu&apos;elle refuse que par ce qu&apos;elle
                propose. Nous ne prenons pas les livres que personne ici n&apos;a lus. C&apos;est
                une règle coûteuse : elle nous fait rater des succès, et elle nous oblige à lire
                pendant les heures de fermeture. Elle a aussi une conséquence que nous n&apos;avions
                pas prévue — elle rend le conseil possible. Quand on demande « c&apos;est bien ? »,
                quelqu&apos;un peut répondre autre chose que « il paraît ».
              </p>
              <p className="mt-5">
                Nous ne faisons pas non plus de piles. Un titre est présenté à trois exemplaires,
                jamais trente. La table du fond accueille un dossier par trimestre, monté par une
                personne de l&apos;équipe, qui l&apos;assume et le signe. Ce trimestre, ce sont les
                métiers disparus du port fluvial ; le précédent, c&apos;était la littérature écrite
                en prison.
              </p>
              <p className="mt-5">
                Enfin, nous ne classons pas les traductions à part. Un roman traduit est un roman.
                Cette décision, prise sans y penser en 1998, a fini par devenir le sujet de
                discussions entières avec des visiteurs qui trouvaient étrange de croiser un auteur
                argentin entre deux auteurs français, à la lettre près. C&apos;est bien pour ça
                qu&apos;on la garde.
              </p>
            </section>

            <section id="voix-haute" className="colonne mt-16 scroll-mt-32">
              <h2 className="text-2xl font-semibold sm:text-3xl">IV. Lire à voix haute</h2>
              <p className="mt-6">
                Les rencontres ont commencé par accident, un mardi de novembre 2004, parce
                qu&apos;un auteur de passage attendait son train et qu&apos;il pleuvait. Il a lu
                vingt minutes debout entre deux rayons, devant sept personnes dont quatre
                n&apos;étaient entrées que pour s&apos;abriter. Depuis, il y a une lecture toutes
                les trois semaines, et la règle est restée la même : on lit d&apos;abord, on parle
                ensuite.
              </p>

              <NoteMarge>
                Sept personnes ce soir-là. Aujourd&apos;hui, la salle plafonne à quarante — au-delà,
                on n&apos;entend plus celui qui lit.
              </NoteMarge>

              <p className="mt-5">
                L&apos;ordre compte. Une rencontre qui s&apos;ouvre sur des questions devient un
                entretien ; une rencontre qui s&apos;ouvre sur un texte reste une lecture. Nous
                avons essayé l&apos;inverse deux ou trois fois, par politesse envers des invités
                pressés, et le résultat était chaque fois le même : on parlait du livre sans
                l&apos;avoir entendu.
              </p>
              <p className="mt-5">
                Les ateliers sont venus après, à la demande des habitués : reliure, réparation,
                parfois composition typographique quand la casse du fond veut bien fonctionner.
                Douze places, trois heures, et l&apos;obligation d&apos;apporter son propre livre
                abîmé.
              </p>
            </section>

            <section id="aujourdhui" className="colonne mt-16 scroll-mt-32">
              <h2 className="text-2xl font-semibold sm:text-3xl">V. Aujourd&apos;hui</h2>
              <p className="mt-6">
                Nous sommes quatre, dont deux à temps partiel. Le fonds tient environ six mille
                titres, ce qui est peu et parfaitement suffisant. Les commandes arrivent deux fois
                par semaine, le mardi et le vendredi, et repartent souvent dans la journée : les
                gens passent les chercher, et restent.
              </p>
              <p className="mt-5">
                Ce qui a changé en vingt-huit ans, ce n&apos;est pas le métier, c&apos;est le temps
                dont disposent les gens qui entrent. Il s&apos;est raccourci. Notre seule réponse a
                été de ralentir le magasin : moins de titres, plus de place entre les rayons, des
                chaises, et personne qui vienne demander si l&apos;on cherche quelque chose dans les
                dix premières minutes.
              </p>
              <p className="mt-5">
                Le cinquième rayon, lui, n&apos;a pas bougé. Il contient en ce moment trente-quatre
                livres. Aucun d&apos;eux ne se ressemble, et c&apos;est le seul endroit de la
                boutique dont nous ne connaissons pas le contenu par cœur.
              </p>
              <p className="mt-8">
                <Lien
                  href="/catalogue"
                  className="lien inline-flex min-h-11 items-center font-titre"
                >
                  Voir ce qu&apos;il y a en rayon
                </Lien>
              </p>
            </section>
          </article>
        </div>
      </div>

      <Photo
        source={casse}
        alt=""
        sizes="100vw"
        variante="fondu"
        className="mx-auto h-[200px] max-w-[1600px] sm:h-[280px] lg:h-[340px]"
      />

      <section className="mx-auto max-w-[var(--contenu-max)] px-5 py-[var(--section-y)] sm:px-8">
        <Reveal>
          <div className="colonne">
            <p className="surtitre">Et la casse typographique ?</p>
            <p className="mt-4 text-muted">
              Elle vient de l&apos;imprimerie qui occupait l&apos;arrière-cour jusqu&apos;en 1988.
              Deux tiroirs fonctionnent encore, assez pour composer un titre court. C&apos;est avec
              eux qu&apos;on imprime les cartons de rencontre, quatre fois par an, et c&apos;est la
              seule chose qu&apos;on fabrique ici.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
