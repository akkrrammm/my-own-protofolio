import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root: a parent folder (the Desktop) contains another
  // project's lockfile, which would otherwise be picked up as the workspace root.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  images: {
    // AVIF first (smaller), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // 90 is reserved for the portrait, where illustration detail matters.
    qualities: [75, 90],
  },
};

export default nextConfig;
