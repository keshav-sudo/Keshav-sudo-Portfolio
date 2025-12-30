/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['github-readme-stats.vercel.app', 'github-readme-streak-stats.herokuapp.com', 'github-profile-trophy.vercel.app'],
  },
}

module.exports = nextConfig
