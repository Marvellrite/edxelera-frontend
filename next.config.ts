import type { NextConfig } from 'next';
import nextPwa from 'next-pwa';

const withPWA = nextPwa({
   dest: 'public',
   register: true,
   skipWaiting: true,
});

const nextConfig: NextConfig = {
   allowedDevOrigins: [
      'http://localhost:3000',
      'http://10.75.10.31',
      'http://192.168.10.31:3000',
      'http://10.75.191.239:3000',
   ],
   images: {
      qualities: [70, 75, 100],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
         },
         {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
         },
      ],
   },
   turbopack: {},
   webpack(config) {
      // Add SVGR support for importing SVGs as React components
      config.module.rules.push({
         test: /\.svg$/,
         //  issuer: /\.[jt]sx?$/,
         use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      });

      return config;
   },
};

export default withPWA(nextConfig);
