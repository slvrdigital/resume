
import type { NextConfig } from 'next'

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://yevheni.goatcounter.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  frame-src 'self' https://emgithub.com;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yevheni.goatcounter.com',
        port: '',
        pathname: '/count**',
      },
    ]
  },
  reactStrictMode: true,
  distDir: '../../out',
  output: 'export',
}

export default nextConfig
