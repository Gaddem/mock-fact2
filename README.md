# Le Cinquième Rayon

Site vitrine de démonstration pour une librairie indépendante inventée. Next.js en export
statique, publié sur GitHub Pages.

Marque, livres, auteurs, éditeurs, adresses et dates sont fictifs.

## Développement

```bash
npm install
npm run dev
```

## Vérifications

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run apercu
```

`npm run apercu` sert `out/` sous son `basePath` de production (`/mock-fact2`) avec
compression gzip, comme le fera Pages. C'est le seul contexte où juger la fluidité :
`next dev` sert React non minifié, l'hydratation y coûte plusieurs fois son prix.

## Régénérer les visuels

```bash
node scripts/preparer-photos.mjs   # photos (réseau requis), + CREDITS.md
node scripts/generer-visuels.mjs   # icône et image de partage
```

Les fichiers produits sont commités : le build ne dépend jamais du réseau.

## Déploiement

Push sur `main` → GitHub Actions build et publie `out/`.
Côté dépôt : Settings → Pages → Source : **GitHub Actions**.
