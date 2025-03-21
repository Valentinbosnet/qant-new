import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cette fonction peut être marquée comme `async` si vous utilisez `await` à l'intérieur
export function middleware(request: NextRequest) {
  // Continuer la requête sans modification
  return NextResponse.next();
}

// Configurer le matcher pour exclure les routes API de la génération statique
export const config = {
  matcher: [
    // Exclure les fichiers et les routes API
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};