/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        domains: ["praiki.com"],
        protocol: "https",
        hostname: "praiki.com",
        pathname: "public/assets/**",
      },
    ],
  },
};

module.exports = nextConfig;
