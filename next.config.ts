import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';
const hasCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport ? true : false,
  basePath: isExport && !hasCustomDomain ? '/MM-Money-Site' : '',
  assetPrefix: isExport && !hasCustomDomain ? '/MM-Money-Site' : '',
  images: {
    unoptimized: true, // works for both static export and dev
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.delcampe.net',
        pathname: '/static/img_large/**',
      },
    ],
  },
};

export default nextConfig;
