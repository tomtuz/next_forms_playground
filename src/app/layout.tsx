import { Inter as FontSans } from 'next/font/google'
import React from 'react'
import './globals.css'

import { cn } from '@/lib/utils'
import { Toaster } from '@cn/toaster'

import Header from '@/components/ui/Header'
import { FormProvider } from '@/contexts/FormContext'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Input Performance Playground',
  description: 'Test and analyze form and input performance'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Header />
        <FormProvider>
          <main className="flex-grow pt-16">
            <div className="container mx-auto px-4">
              {/* Breadcrumbs can be added here */}
              <div className="mt-4">{children}</div>
            </div>
          </main>
        </FormProvider>
        <Toaster />
      </body>
    </html>
  )
}
