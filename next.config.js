/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        domains: ["Freelance.com"],
        protocol: "https",
        hostname: "Freelance.com",
        pathname: "public/assets/**",
      },
    ],
  },
};

module.exports = nextConfig;
