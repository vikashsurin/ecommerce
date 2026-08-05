import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      new URL('https://picsum.photos/**'),
      new URL('http://localhost:9000/**'),
    ]
  }
}

export default nextConfig
