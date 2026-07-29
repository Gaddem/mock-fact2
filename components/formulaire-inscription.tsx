'use client'

import { useState } from 'react'

/**
 * Maquette de formulaire. Rien n'est envoyé nulle part : le site est une
 * démonstration, et il le dit à l'écran plutôt que de faire semblant.
 */
export function FormulaireInscription() {
  const [envoye, setEnvoye] = useState(false)

  return (
    <form
      onSubmit={(evenement) => {
        evenement.preventDefault()
        setEnvoye(true)
      }}
      className="border border-bordure bg-surface p-5 sm:p-7"
      style={{ borderRadius: 'var(--radius)' }}
    >
      <p className="surtitre">Réserver une place</p>
      <h2 className="mt-2 font-titre text-2xl font-semibold">Prévenez-nous de votre venue</h2>
      <p className="mt-3 max-w-[52ch] text-sm text-muted">
        Les rencontres sont gratuites et l&apos;entrée libre, mais les places assises partent vite.
        Un mot suffit pour qu&apos;on vous en garde une.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="surtitre block">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            className="mt-2 min-h-11 w-full border border-bordure bg-fond px-3 py-2"
            style={{ borderRadius: 'var(--radius)' }}
          />
        </div>

        <div>
          <label htmlFor="courriel" className="surtitre block">
            Courriel
          </label>
          <input
            id="courriel"
            name="courriel"
            type="email"
            autoComplete="email"
            className="mt-2 min-h-11 w-full border border-bordure bg-fond px-3 py-2"
            style={{ borderRadius: 'var(--radius)' }}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="rencontre" className="surtitre block">
            Rencontre
          </label>
          <select
            id="rencontre"
            name="rencontre"
            className="mt-2 min-h-11 w-full border border-bordure bg-fond px-3 py-2"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <option>Adèle Marquant — La Halle aux vents</option>
            <option>Atelier reliure — recoudre un livre abîmé</option>
            <option>Paul Estève lit Avant le nom des choses</option>
            <option>Club du cinquième rayon</option>
            <option>Colin Vasseur — Les Métiers du quai</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="mot" className="surtitre block">
            Un mot (facultatif)
          </label>
          <textarea
            id="mot"
            name="mot"
            rows={3}
            className="mt-2 w-full border border-bordure bg-fond px-3 py-2"
            style={{ borderRadius: 'var(--radius)' }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="min-h-11 border border-accent bg-accent px-6 font-titre text-sm text-surface"
          style={{ borderRadius: 'var(--radius)' }}
        >
          Envoyer
        </button>
        <p className="text-sm text-accent-2" role="status">
          {envoye
            ? 'Démonstration : rien n’a été envoyé, et aucune donnée n’a été enregistrée.'
            : 'Formulaire de démonstration — aucun envoi, aucune donnée conservée.'}
        </p>
      </div>
    </form>
  )
}
