import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com",
      "source.unsplash.com", "foodish-api.com", "images.pexels.com"]
  }
};

export default nextConfig;