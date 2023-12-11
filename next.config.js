/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://musical-rotary-phone-xp9q5r4wjqx2wvv-3000.app.github.dev/",
        "localhost:3000",
      ],
    },
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
