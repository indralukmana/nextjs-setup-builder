import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    // public/ does not directory-index index.html; map clean URLs explicitly.
    // beforeFiles runs before the public-file check so /storybook lands on the shell.
    return {
      beforeFiles: [
        { source: "/storybook", destination: "/storybook/index.html" },
        { source: "/storybook/", destination: "/storybook/index.html" },
      ],
    };
  },
  async headers() {
    return [
      // Storybook embeds its preview in a same-origin iframe; DENY would break it.
      {
        source: "/storybook",
        headers: securityHeaders,
      },
      {
        source: "/storybook/:path*",
        headers: securityHeaders,
      },
      {
        source: "/:path((?!storybook(?:/|$)).*)",
        headers: [...securityHeaders, { key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
