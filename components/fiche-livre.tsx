import type { Livre } from '@/lib/livres'

/**
 * Fiche du catalogue. La tranche de pages, à gauche, s'épaissit quand la
 * fiche prend le focus ou le survol — c'est le seul mouvement de la carte.
 */
export function FicheLivre({ livre }: { livre: Livre }) {
  return (
    <article className="fiche h-full p-5 pl-7 sm:p-6 sm:pl-8">
      <span className="tranche" aria-hidden="true" />

      <div className="flex items-baseline justify-between gap-4">
        <p className="surtitre">{livre.editeur}</p>
        {livre.coup_de_coeur && <p className="surtitre text-accent-2">Coup de cœur</p>}
      </div>

      <h3 className="mt-2 font-titre text-xl font-semibold text-balance sm:text-2xl">
        {livre.titre}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {livre.auteur} · {livre.annee}
      </p>

      <p className="mt-4 text-[0.95em]">{livre.accroche}</p>

      <p className="mt-4 border-t border-bordure pt-4 text-sm text-muted italic">{livre.note}</p>

      <p className="mt-4 font-titre text-sm">
        {livre.prix}
        <span className="text-muted"> · {livre.pages} pages</span>
      </p>
    </article>
  )
}
