import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/cn/ui/toaster'
import { cn } from '@/lib/utils'
import { FormProvider } from '@/contexts/FormContext'
import { FormReactProvider } from '@/contexts/FormReactContext'
import React from 'react'
import Link from 'next/link'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line import/no-extraneous-dependencies, global-require
//   const whyDidYouRender = require('@welldone-software/why-did-you-render')
//   whyDidYouRender(React, {
//     trackAllPureComponents: true
//   })
// }

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
        <FormProvider>
          <FormReactProvider>{children}</FormReactProvider>
        </FormProvider>

        <div className="fixed -bottom-2.5 flex gap-3 p-4 outline outline-1 outline-blue-400">
          <div>
            <Link href="/forms/krik">Krik</Link>
          </div>
          <div>
            <Link href="/forms/list">List</Link>
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  )
}
