import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from '@supabase/supabase-js'

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
    async signIn({ user }) {
      if (!user.email) return false

      try {
        const { data: existingUser, error: queryError } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)
          .single()

        if (queryError && queryError.code !== 'PGRST116') {
          console.error('Erro na consulta:', queryError)
          return false
        }

        if (!existingUser) {
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
      return '/dashboards'
    }
  },
  pages: {
    signIn: '/',
    error: '/auth/error'
  }
})

export { handler as GET, handler as POST }