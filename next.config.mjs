import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vsupu83zlkfucch6.public.blob.vercel-storage.com',
        port: '',
        pathname: '/content/**',
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
