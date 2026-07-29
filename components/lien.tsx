import NextLink from 'next/link'
import type { ComponentProps } from 'react'

/**
 * Lien interne, préchargement coupé.
 *
 * En export statique, Next demande la charge utile de la route survolée
 * (`__next.<route>.__PAGE__.txt`) ; l'export l'écrit sous un chemin
 * différent, et chaque survol laisse une 404 dans la console. Sur un site
 * de cinq pages, le préchargement ne gagne rien de mesurable — la 404, elle,
 * se voit.
 */
export function Lien(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />
}
