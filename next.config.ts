import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   experimental: {
//     authInterrupts: true,
//   },
// images: {
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "api.qrserver.com",
//     },
//     {
//       protocol: "https",
//       hostname: "res.cloudinary.com",
//       pathname: "/**",
//     },
//     {
//       protocol: "https",
//       hostname: "lh3.googleusercontent.com",
//     },
//   ],
// },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://api.staging.social-badge.hng14.com/api/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;
