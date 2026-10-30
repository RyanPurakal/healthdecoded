/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'healthdecodedinitiative.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jrcilodmysniipvuxadg.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
