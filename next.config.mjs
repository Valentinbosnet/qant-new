/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignorer les erreurs de type
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Ignorer les erreurs ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration pour les routes API
  experimental: {
    serverComponentsExternalPackages: ['nodemailer', '@prisma/client'],
  },
  
  // Forcer le mode de sortie standalone
  output: 'standalone',
  
  // Webpack config pour résoudre les problèmes de modules
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Résoudre les problèmes avec certains modules côté serveur
      config.externals = [...config.externals, 'nodemailer'];
    }
    return config;
  },
}

export default nextConfig;