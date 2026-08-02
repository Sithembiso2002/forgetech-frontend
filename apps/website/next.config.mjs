/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",   // ← add this line
      },
    ],
  },
};


export default nextConfig;
