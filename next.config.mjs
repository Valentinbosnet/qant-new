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
  
  // Désactiver la minification SWC qui peut causer des problèmes
  swcMinify: false,
  
  // Configuration pour les routes API
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  // Forcer le mode de sortie standalone
  output: 'standalone',
}

export default nextConfig;