import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport ? true : false,
  // Served from custom domain root (mmmoneybanknotes.com) — no basePath needed
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
