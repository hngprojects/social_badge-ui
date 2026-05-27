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
