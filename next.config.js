/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // env: {
    //   API_URL: "https://dummyjson.com/users",
    //   LIMIT: 10,
    // },
    images: {
        domains: ['robohash.org'],
    },
};

module.exports = nextConfig;
