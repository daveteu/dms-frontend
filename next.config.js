/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/api/:paths*',
        destination: 'http://localhost:3000/api/:paths*',
        permanent: true,
      },
      {
        source: '/auth/login',
        destination: 'http://localhost:3000/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
