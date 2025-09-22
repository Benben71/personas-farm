/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const distDir = process.env.NEXT_DIST_DIR || '.next'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: basePath || '',
  publicRuntimeConfig: {
    basePath,
  },
  distDir,
}

if (basePath) {
  nextConfig.basePath = basePath
}

module.exports = nextConfig
