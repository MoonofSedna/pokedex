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
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
