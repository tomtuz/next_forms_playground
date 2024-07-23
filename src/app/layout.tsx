import './globals.css'
import React from 'react'
import { Inter as FontSans } from 'next/font/google'

import { Toaster } from '@/cn/ui/toaster'
import { cn } from '@/lib/utils'

import { FormProvider } from '@/contexts/FormContext'
import Header from '@/components/ui/Header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col items-center justify-center bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Header />
        <FormProvider>{children}</FormProvider>
        <Toaster />
      </body>
    </html>
  )
}
