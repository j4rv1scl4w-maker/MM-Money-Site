import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport ? true : false,
  basePath: isExport ? '/MM-Money-Site' : '',
  assetPrefix: isExport ? '/MM-Money-Site/' : '',
  images: {
    unoptimized: true, // works for both static export and dev
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'delcampe-static.net',
        pathname: '/img/lot/**',
      },
    ],
  },
};

export default nextConfig;
