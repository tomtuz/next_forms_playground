// import { ScrollArea } from '@/cn/ui/scroll-area'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // return <ScrollArea>{children}</ScrollArea>
  return <div className="flex h-full align-top">{children}</div>
}
