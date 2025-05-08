import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    typedEnv: true,
  },
  output: "standalone",
};

export default nextConfig;
