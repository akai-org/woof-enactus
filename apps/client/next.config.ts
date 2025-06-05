import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    typedEnv: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://cdn.jsdelivr.net/**"),
      new URL(`${process.env.NEXT_PUBLIC_CMS_API_URL}/uploads/**`),
      new URL("https://avatars.githubusercontent.com/**"),
    ],
  },
};

export default nextConfig;
