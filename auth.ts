import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        // Implemente sua lógica de autorização aqui
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
}) 