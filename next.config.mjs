/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "qrlyjjp3vyom7aer.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
