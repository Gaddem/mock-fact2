import livres from '@/data/livres.json'
import rayons from '@/data/rayons.json'

export type Livre = (typeof livres)[number]
export type Rayon = (typeof rayons)[number]

export const tousLesLivres: Livre[] = livres
export const tousLesRayons: Rayon[] = rayons

export const selection = livres.filter((livre) => livre.selection)

export function livresDuRayon(ancre: string) {
  return livres.filter((livre) => livre.rayon === ancre)
}

export function nomDuRayon(ancre: string) {
  return rayons.find((rayon) => rayon.ancre === ancre)?.nom ?? ancre
}
