const path = require( 'path' );

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  i18n: {
    locales: ['ms'],
    defaultLocale: 'ms'
  }
};
module.exports = nextConfig;
