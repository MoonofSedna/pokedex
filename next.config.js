/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 36000,
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "raw.githubusercontent.com",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
