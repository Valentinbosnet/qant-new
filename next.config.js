/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour le build statique
  output: 'standalone',
  
  // Ignorer les erreurs de type
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configurer les routes API comme dynamiques
  experimental: {
    // Permettre les routes dynamiques
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig