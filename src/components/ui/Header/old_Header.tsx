// 'use client'

// import { FormRoute, formRoutes } from '@/app/routes'
// import { useAppContext } from '@/contexts/AppContext'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from '@cn/dropdown-menu'
// import { Input } from '@cn/input'
// import clsx from 'clsx'
// import debounce from 'lodash/debounce'
// import { ChevronDown, Search } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { FixedSizeList as List } from 'react-window'

// // Memoize ChevronDown
// const MemoizedChevronDown = React.memo(ChevronDown)

// interface MemoizedDropdownMenuItemProps {
//   formRoute: FormRoute
//   isRootPath: boolean
//   pathname: string
//   handleCategorySelect: (category: string) => void
//   categoryColors: Record<string, string>
//   selectedCategory: string
//   style: React.CSSProperties
// }

// const MemoizedDropdownMenuItem = React.memo<MemoizedDropdownMenuItemProps>(
//   ({
//     formRoute,
//     isRootPath,
//     pathname,
//     handleCategorySelect,
//     categoryColors,
//     selectedCategory,
//     style
//   }) => (
//     <div style={style}>
//       <DropdownMenuItem asChild className="cursor-pointer">
//         <Link
//           href={`${formRoute.path}`}
//           className={clsx(
//             'flex items-center justify-between',
//             !isRootPath && pathname === `${formRoute.path}` && 'bg-accent'
//           )}
//           onClick={() => handleCategorySelect(formRoute.category)}
//         >
//           {formRoute.name}
//           <span
//             className={clsx(
//               'rounded-full px-3 py-1 text-xs font-medium',
//               categoryColors[formRoute.category],
//               (isRootPath && selectedCategory === formRoute.category) ||
//                 (!isRootPath && pathname === `${formRoute.path}`)
//                 ? 'ring-2 ring-primary'
//                 : ''
//             )}
//           >
//             {formRoute.category}
//           </span>
//         </Link>
//       </DropdownMenuItem>
//     </div>
//   )
// )

// MemoizedDropdownMenuItem.displayName = 'MemoizedDropdownMenuItem'

// interface MemoizedTriggerButtonProps {
//   currentFormRoute: FormRoute | undefined
// }

// const MemoizedTriggerButton = React.memo<MemoizedTriggerButtonProps>(
//   ({ currentFormRoute }) => (
//     <>
//       {currentFormRoute ? currentFormRoute.name : 'Forms'}{' '}
//       <MemoizedChevronDown className="ml-2 h-4 w-4" />
//     </>
//   )
// )

// MemoizedTriggerButton.displayName = 'MemoizedTriggerButton'

// const MemoizedList = React.memo(List)

// export default function Header() {
//   const pathname = usePathname()
//   const [searchTerm, setSearchTerm] = useState('')
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
//   const [isClient, setIsClient] = useState(false)
//   const { selectedCategory, setSelectedCategory, categoryColors } =
//     useAppContext()

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const filteredFormRoutes = useMemo(() => {
//     if (!isClient) return []
//     const lowercaseSearchTerm = debouncedSearchTerm.toLowerCase()
//     return formRoutes.filter(
//       (formRoute) =>
//         formRoute.name.toLowerCase().includes(lowercaseSearchTerm) ||
//         formRoute.category.toLowerCase().includes(lowercaseSearchTerm)
//     )
//   }, [debouncedSearchTerm, isClient])

//   const currentFormRoute = useMemo(() => {
//     if (!isClient) return undefined
//     const pathName = pathname?.substring(1)
//     return formRoutes.find((route) => pathName === `${route.path}`)
//   }, [pathname, isClient])

//   const handleCategorySelect = useCallback(
//     (category: string) => {
//       setSelectedCategory(category)
//     },
//     [setSelectedCategory]
//   )

//   const isRootPath = pathname === '/'

//   const debouncedSetSearchTerm = useMemo(
//     () => debounce(setDebouncedSearchTerm, 300),
//     []
//   )

//   const handleSearchChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchTerm(e.target.value)
//       debouncedSetSearchTerm(e.target.value)
//     },
//     [debouncedSetSearchTerm]
//   )

//   const renderRow = useCallback(
//     ({ index, style }: { index: number; style: React.CSSProperties }) => (
//       <MemoizedDropdownMenuItem
//         key={filteredFormRoutes[index].id}
//         formRoute={filteredFormRoutes[index]}
//         isRootPath={isRootPath}
//         pathname={pathname}
//         handleCategorySelect={handleCategorySelect}
//         categoryColors={categoryColors}
//         selectedCategory={selectedCategory}
//         style={style}
//       />
//     ),
//     [filteredFormRoutes, isRootPath, pathname, handleCategorySelect, categoryColors, selectedCategory]
//   )

//   if (!isClient) {
//     return null // or a loading spinner
//   }

//   return (
//     <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="text-2xl font-bold">
//           Form Playground
//         </Link>
//         <DropdownMenu>
//           <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
//             <MemoizedTriggerButton currentFormRoute={currentFormRoute} />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56">
//             <div className="p-2">
//               <div className="flex items-center space-x-2">
//                 <Search className="h-4 w-4 opacity-50" />
//                 <Input
//                   type="search"
//                   placeholder="Search forms..."
//                   className="h-8"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>
//             </div>
//             {isClient && (
//               <MemoizedList
//                 height={300}
//                 itemCount={filteredFormRoutes.length}
//                 itemSize={35}
//                 width="100%"
//               >
//                 {renderRow}
//               </MemoizedList>
//             )}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   )
// }
