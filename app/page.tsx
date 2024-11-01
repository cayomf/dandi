'use client'
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/dashboards',
        redirect: true
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  const handleManageKeys = () => {
    router.push('/dashboards')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          DANDI LTDA
        </h1>
        
        {session?.user && (
          <div className="flex items-center gap-3 bg-black/[.05] dark:bg-white/[.06] px-4 py-2 rounded-lg">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Foto do perfil"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm">
              Bem-vindo, {session.user.name || 'usuário'}!
            </span>
          </div>
        )}

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
          {session && (
            <button
              onClick={handleManageKeys}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-black dark:text-white"
            >
              Gerenciar Chaves de API
            </button>
          )}
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Sair ({session.user?.email})
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Entrar com Google
            </button>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* ... conteúdo do footer ... */}
      </footer>
    </div>
  );
}
