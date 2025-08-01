import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // enable `next export`
  // output: 'export',

  // disable built-in Image Optimization
  images: {
    unoptimized: true,
  },

  trailingSlash: true,
}

export default nextConfig
