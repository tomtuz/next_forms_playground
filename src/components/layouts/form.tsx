export default function FormLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex items-center justify-center">
      <div className="">{children}</div>
    </div>
  )
}
