import type { NextConfig } from "next";

const isExport = process.env.NEXT_PUBLIC_BUILD_MODE === "export";

// Applied only when running the Next server (`npm run dev` / `npm run build:dev`).
// The GitHub Pages export cannot emit response headers; production HSTS stays on Cloudflare.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport ? true : false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.delcampe.net",
        pathname: "/static/img_large/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  ...(!isExport && {
    async headers() {
      return [{ source: "/(.*)", headers: securityHeaders }];
    },
    async redirects() {
      return [
        {
          source: "/:path*",
          has: [{ type: "header" as const, key: "x-forwarded-proto", value: "http" }],
          destination: "https://mmmoneybanknotes.com/:path*",
          permanent: true,
        },
      ];
    },
  }),
};

export default nextConfig;
