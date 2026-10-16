/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint isn't set up in this project yet; type errors still fail the build.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
