/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Ensure monorepo builds resolve dependencies from repo root on Vercel
    outputFileTracingRoot: path.join(__dirname, '..'),
  },
  trailingSlash: false,
  // Remove invalid key for Next 15 config validation
  // Static params generation is controlled per route/components
  // Disable prefetching for persona routes to prevent 404 errors
  async headers() {
    return [
      {
        source: '/persona/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: false,
  assetPrefix: '',
  // Force static file serving
  async rewrites() {
    return [
      {
        source: '/info-personas/:path*',
        destination: '/info-personas/:path*',
      },
      {
        source: '/pasteur-personas/:path*',
        destination: '/pasteur-personas/:path*',
      },
    ]
  },
}

module.exports = nextConfig
