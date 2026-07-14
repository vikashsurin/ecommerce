import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [new URL('https://picsum.photos/**')]
  }
}

export default nextConfig
