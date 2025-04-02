import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl', 
      },
      {
        protocol: 'https',
        hostname: 'shipchic.oldk.dev',  
      },
      {
        protocol: 'https',
        hostname: 'admin-shipchic.oldk.dev',  
      },
      {
        protocol: 'http',
        hostname: 'localhost', 
        port: '3001',
      }
    ],
  },
};

export default nextConfig;
