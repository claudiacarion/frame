import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rqvjqrxajmxgdaxzvzkn.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  logging: {
    serverFunctions: false,
  },
};

export default nextConfig;
