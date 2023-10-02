'use client'
import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'
import { AuthContextProvider } from "@/app/firebase/AuthContext";
import { ThemeProvider } from "next-themes";

import Header from '@/components/ui/header'
import Banner from '@/components/banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'LinkThink',
  description: 'Sharing Ideas and Opportunities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased dark:bg-gray-900 tracking-tight`}>
          <AuthContextProvider>
            <div className="flex flex-col min-h-screen overflow-hidden">
        <ThemeProvider attribute="class">
              <Header />
              {children}
              <Banner />
        </ThemeProvider>
            </div>
          </AuthContextProvider>
      </body>
    </html>
  )
}
