import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport ? true : false,
  basePath: isExport ? '/MM-Money-Site' : '',
  assetPrefix: isExport ? '/MM-Money-Site' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.delcampe.net',
        pathname: '/static/img_large/**',
      },
    ],
  },
  // Headers only apply in server mode (build:dev / start), not static export
  ...(!isExport && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/(.*)',
          has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
          destination: 'https://mmmoneybanknotes.com/:path*',
          permanent: true,
        },
      ];
    },
  }),
};

export default nextConfig;
