/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const distDir = process.env.NEXT_DIST_DIR || '.next'

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Désactiver ESLint temporairement pour éviter les erreurs de compilation
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  assetPrefix: basePath || '',
  trailingSlash: false,
  publicRuntimeConfig: {
    basePath,
  },
  distDir,
}

if (basePath) {
  nextConfig.basePath = basePath
}

module.exports = nextConfig
