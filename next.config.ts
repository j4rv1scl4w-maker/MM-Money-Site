import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'delcampe-static.net',
        pathname: '/img/lot/**',
      },
    ],
    // Required for static export (GitHub Pages)
    // unoptimized: true,
  },
};

export default nextConfig;
