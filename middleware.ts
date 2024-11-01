import { withAuth } from "next-auth/middleware"

// Simplificando o middleware para apenas proteger as rotas necessárias
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
})

// Protegendo apenas as rotas que precisam de autenticação
export const config = {
  matcher: ['/dashboards/:path*', '/playground/:path*']
} 