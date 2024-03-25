import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['lucide-react'],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
