// import { ScrollArea } from '@/cn/ui/scroll-area'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // return <ScrollArea>{children}</ScrollArea>
  return <div>{children}</div>
}
