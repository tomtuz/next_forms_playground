import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/cn/ui/toaster'
import { cn } from '@/lib/utils'
import { FormProvider } from '@/contexts/FormContext'
import { ScrollArea } from '@/cn/ui/scroll-area'

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
          'flex min-h-screen items-center justify-center bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {/* <FormProvider>
          <ScrollArea>{children}</ScrollArea>
        </FormProvider> */}
        <FormProvider>{children}</FormProvider>
        <Toaster />
      </body>
    </html>
  )
}
