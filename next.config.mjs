/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ignorer les erreurs de type
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration pour les routes API
  experimental: {
    serverComponentsExternalPackages: ['nodemailer', '@prisma/client'],
  },
  
  // Forcer le mode de sortie standalone
  output: 'standalone',
  
  // Ignorer les erreurs d'image
  images: {
    unoptimized: true,
  },
  
  // Webpack config pour résoudre les problèmes de modules
  webpack: (config) => {
    // Résoudre les problèmes avec certains modules côté serveur
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

export default nextConfig;