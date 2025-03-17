import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // En mode développement, permettre l'accès aux pages d'administration sans vérification
  if (process.env.NODE_ENV === "development" && pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Liste des chemins publics qui ne nécessitent pas d'authentification
  const publicPaths = [
    "/",
    "/login",
    "/signin",
    "/signup",
    "/register",
    "/api/auth",
    "/api/register",
    "/api/verify-email",
    "/api/resend-verification",
    "/verify-email",
    "/verify-email-notice",
    "/setup/init-admin",
    "/api/setup/init-admin",
  ]

  // Vérifier si le chemin actuel est public
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Vérifier si le chemin est une API (sauf celles qui nécessitent une authentification)
  const isApiPath =
    pathname.startsWith("/api/") && !pathname.startsWith("/api/user/") && !pathname.startsWith("/api/admin/")

  // Si c'est un chemin public ou une API, autoriser l'accès
  if (isPublicPath || isApiPath) {
    return NextResponse.next()
  }

  // Vérifier si l'utilisateur est authentifié
  const token = await getToken({ req: request })

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!token) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Pour le débogage, autoriser l'accès à toutes les pages en développement
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

