/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.coingecko.com' },
      { protocol: 'https', hostname: '**.defillama.com' },
    ],
  },
  env: {
    MIMO_BASE_URL: process.env.MIMO_BASE_URL || 'https://api.mimo.ai/v1',
  },
};

module.exports = nextConfig;
