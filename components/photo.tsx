import Image, { type StaticImageData } from 'next/image'

type Props = {
  source: StaticImageData
  /** Vide + conteneur `aria-hidden` si la photo est décorative. */
  alt: string
  sizes: string
  className?: string
  variante?: 'fondu' | 'fondu-lateral'
  priorite?: boolean
}

/**
 * Les photos sont des respirations entre deux blocs de texte : jamais de
 * titre par-dessus, jamais d'arête nue. Le traitement (désaturation
 * partielle, teinte bouteille) est cuit dans le JPEG au build — un
 * `filter:` CSS re-rastériserait l'image à chaque frame dès qu'elle bouge.
 */
export function Photo({ source, alt, sizes, className = '', variante, priorite }: Props) {
  const decorative = alt === ''

  return (
    <div
      className={`photo ${variante ? `photo--${variante}` : ''} ${className}`}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={source}
        alt={alt}
        sizes={sizes}
        priority={priorite}
        className="photo-img"
        placeholder="blur"
      />
    </div>
  )
}
