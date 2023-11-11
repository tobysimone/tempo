/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/:path*',
          destination: '/artist/homepage/:subdomain',
          has: [{ type: 'host', key: 'subdomain', value: '(?<subdomain>.+)\.localhost' }]
        }
      ]
    }
  }
}
module.exports = nextConfig