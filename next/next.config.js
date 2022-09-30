/** @type {import('next').NextConfig} */
const os = require('os');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Compression should not even change anything by setting it like this
  compress: true,
  // Disable TrailingSlash Redirects
  trailingSlash: false,
  // powered-by header disable/enable
  poweredByHeader: false,
  // CORS
  crossOrigin: 'anonymous',

  // In buffer pages settings
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 30000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 250,
  },

  experimental: {
    cpus: process.env.CORE_COUNT || os.cpus().length || 1,
  }

  //images: {
  //  unoptimized: true
  //},
};

module.exports = nextConfig;
