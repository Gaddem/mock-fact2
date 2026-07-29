import type { Livre } from '@/lib/livres'

/**
 * Couverture composée en typographie, jamais photographiée.
 *
 * Une photo d'étagère montre des titres et des éditeurs réels : la
 * librairie est inventée, elle n'emprunte la caution de personne.
 * Bénéfice secondaire, décisif pour la pile : c'est du DOM, donc ça
 * s'anime sans re-rastériser une image à chaque frame.
 */
export function Couverture({ livre }: { livre: Livre }) {
  return (
    <article className="couverture" data-teinte={livre.teinte}>
      <p className="couverture-auteur pl-2 opacity-75">{livre.editeur}</p>
      <h3 className="couverture-titre pl-2">{livre.titre}</h3>
      <p className="couverture-auteur pl-2">{livre.auteur}</p>
    </article>
  )
}
