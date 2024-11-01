import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from '@supabase/supabase-js'

// Inicializar cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      try {
        // Verificar se o usuário já existe
        const { data: existingUser, error: queryError } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)
          .single()

        if (queryError && queryError.code !== 'PGRST116') { // PGRST116 é o código para "não encontrado"
          console.error('Erro na consulta:', queryError)
          return false
        }

        if (!existingUser) {
          // Se não existir, criar novo usuário
          const { error: insertError } = await supabase.from('users').insert({
            email: user.email,
            name: user.name,
            image: user.image
          })

          if (insertError) {
            console.error('Erro ao inserir:', insertError)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('Erro geral:', error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      // Redireciona para /dashboards após login bem-sucedido
      return `${baseUrl}/dashboards`
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  debug: process.env.NODE_ENV === 'development', // Ative isso para ver mais logs no desenvolvimento
})

export { handler as GET, handler as POST } 