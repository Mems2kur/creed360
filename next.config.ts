import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Property photos and verification documents are sent through Server Actions,
    // so we raise the default 1MB limit.
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default nextConfig;
