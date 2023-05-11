/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: true,
  },
  images: {
    domains: ["robohash.org"],
  },
};

module.exports = nextConfig;
