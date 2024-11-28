import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
