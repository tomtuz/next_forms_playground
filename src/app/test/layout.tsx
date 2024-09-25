import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function FormsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full flex-col">
      <nav className="p-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 md:space-x-3">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                Current Test
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-4xl outline-1 outline-green-200">
          {children}
        </div>
      </div>
    </div>
  )
}

