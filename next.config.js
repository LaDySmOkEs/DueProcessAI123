// Enhanced Next.js config for deployment directory inclusion
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Ensure all directories are accessible during build
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack configuration if needed for static assets
    return config;
  },
  
  // Include all directories in static file serving
  async rewrites() {
    return [
      // Add any custom rewrites for accessing directory contents
    ];
  },
  
  // Ensure TypeScript paths are resolved correctly
  experimental: {
    // Enable any experimental features needed for directory access
  },
  
  // Output configuration for deployment
  output: 'standalone',
  
  // Ensure all static files are included
  distDir: '.next',
};

module.exports = nextConfig;
