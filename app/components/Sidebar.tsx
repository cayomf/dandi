'use client';

import React from 'react';
import Link from 'next/link';
import { HomeIcon, CodeBracketIcon, RocketLaunchIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from 'next/image'

const menuItems = [
  { name: 'Visão Geral', icon: HomeIcon, href: '/dashboards', external: false },
  { name: 'Playground da API', icon: CodeBracketIcon, href: '/playground', external: false },
];

const Sidebar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false }) // Não redireciona automaticamente
    router.push('/') // Redireciona para a página inicial
  }

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <RocketLaunchIcon className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold">Dandi</span>
        </Link>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
                {item.external && (
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700 space-y-3">
        <div className="flex items-center gap-3 p-2">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Foto do perfil"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-600 rounded-full">
              {session?.user?.name?.[0] || 'U'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">
              {session?.user?.name || 'Usuário'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session?.user?.email || ''}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSignOut}
          className="w-full text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
