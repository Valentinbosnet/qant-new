/** @type {import('next').NextConfig} */
const nextConfig = {
    // Désactiver la génération statique pour toute l'application
    output: 'standalone',
    
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
      serverComponentsExternalPackages: ['@prisma/client'],
      // Désactiver la génération statique pour les routes API
      appDir: true,
    },
  }
  
  export default nextConfig;