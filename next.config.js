// Basic Next.js config
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure Pages directory is included in build
  webpack: (config) => {
    // Make sure webpack includes the Pages directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'Components'),
      '@/entities': path.resolve(__dirname, 'Entities'),
      '@/functions': path.resolve(__dirname, 'Functions'),
      '@/pages': path.resolve(__dirname, 'Pages'),
    };
    return config;
  },
};

module.exports = nextConfig;
