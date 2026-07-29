/**
 * Une seule boucle rAF pour tout ce qui dépend du défilement.
 *
 * Chaque composant s'abonne quand il approche du viewport et se désabonne
 * quand il en sort ; la boucle ne tourne que s'il reste un abonné, et
 * s'arrête quand l'onglet passe en arrière-plan.
 *
 * Écouter `scroll` serait plus court mais rate le défilement inertiel, le
 * zoom et les sauts d'ancre — et quinze écouteurs qui recalculent chacun
 * leur géométrie coûtent plus cher qu'une boucle partagée.
 */

type Abonne = () => void

const abonnes = new Set<Abonne>()
let frame = 0

const boucle = () => {
  for (const abonne of abonnes) abonne()
  frame = abonnes.size ? requestAnimationFrame(boucle) : 0
}

const demarrer = () => {
  if (!frame && abonnes.size && !document.hidden) frame = requestAnimationFrame(boucle)
}

const arreter = () => {
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) arreter()
    else demarrer()
  })
}

export function abonnerScroll(abonne: Abonne) {
  abonnes.add(abonne)
  demarrer()

  return () => {
    abonnes.delete(abonne)
    if (!abonnes.size) arreter()
  }
}

/** L'utilisateur a demandé moins de mouvement : on n'anime rien. */
export function mouvementReduit() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Abonne `abonne` seulement pendant que `cible` est proche du viewport.
 * Retourne la fonction de nettoyage à rendre depuis l'effet.
 */
export function abonnerEnVue(cible: Element, abonne: Abonne, marge = '30%') {
  let desabonner: (() => void) | null = null

  const observateur = new IntersectionObserver(
    ([entree]) => {
      if (entree.isIntersecting && !desabonner) {
        desabonner = abonnerScroll(abonne)
      } else if (!entree.isIntersecting && desabonner) {
        desabonner()
        desabonner = null
      }
    },
    { rootMargin: `${marge} 0px ${marge} 0px` },
  )

  observateur.observe(cible)

  return () => {
    observateur.disconnect()
    desabonner?.()
  }
}

/**
 * Un seul IntersectionObserver pour toutes les entrées en scène.
 *
 * Le site en compte plus de soixante : autant d'observateurs séparés, c'est
 * autant de callbacks à faire tourner au même moment sur le fil principal.
 * Un observateur partagé, une entrée par élément, et on se désabonne dès
 * que l'élément est passé — il ne repasse jamais à l'invisible.
 */
const rappels = new WeakMap<Element, () => void>()
let observateurEntree: IntersectionObserver | null = null

export function revelerEnVue(element: Element, quand: () => void) {
  observateurEntree ??= new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue
        rappels.get(entree.target)?.()
        rappels.delete(entree.target)
        observateurEntree?.unobserve(entree.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  rappels.set(element, quand)
  observateurEntree.observe(element)

  return () => {
    rappels.delete(element)
    observateurEntree?.unobserve(element)
  }
}

/**
 * Montée d'un élément dans le viewport, de 0 à 1.
 *
 * Les deux repères sont des fractions de la hauteur d'écran : 0 quand le
 * bord haut de l'élément est à `depart`, 1 quand il atteint `arrivee`.
 *
 * Rapporter l'avancée à la hauteur de l'ÉLÉMENT plutôt qu'à celle de
 * l'écran donne un effet qu'on ne voit jamais : un bloc court finit sa
 * course alors qu'il dépasse à peine du bas de la fenêtre.
 */
export function montee(element: Element, depart = 1, arrivee = 0.28) {
  const boite = element.getBoundingClientRect()
  const hauteur = window.innerHeight
  const course = hauteur * (depart - arrivee)
  if (course <= 0) return 1
  return Math.min(1, Math.max(0, (hauteur * depart - boite.top) / course))
}
