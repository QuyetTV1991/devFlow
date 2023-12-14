/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://musical-rotary-phone-xp9q5r4wjqx2wvv-3000.app.github.dev/",
        "https://turbo-space-dollop-6999vxjv67xgc5q75-300.app.github.dev/",
        "localhost:3000",
      ],
    },
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: '*'
      },
    ]
  }
};

module.exports = nextConfig;
