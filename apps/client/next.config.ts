import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    typedEnv: true,
  },
  output: "standalone",
  images: {
    //TEMP
    remotePatterns: [
      new URL("https://cdn.jsdelivr.net/**"),
      new URL(
        `https://haumaps-blog-782854916885.europe-north1.run.app/uploads/**`,
      ),
      new URL("https://avatars.githubusercontent.com/**"),
    ],
  },
};

export default nextConfig;
