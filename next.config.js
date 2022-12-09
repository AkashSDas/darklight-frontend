/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,

  // To be able to import SVGs as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.giphy.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/akashsdas/**",
      },
    ],
  },
};

module.exports = nextConfig;
