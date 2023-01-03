/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lens.infura-ipfs.io'],
  },
}

module.exports = nextConfig
