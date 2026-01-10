/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/swag/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/swag/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
