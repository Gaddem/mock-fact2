import type { NextConfig } from 'next'

// Doit correspondre exactement au nom du dépôt GitHub : c'est lui qui donne
// le préfixe d'URL sur Pages. Un écart et tous les assets partent en 404.
const repo = 'mock-fact2'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
}

export default nextConfig
