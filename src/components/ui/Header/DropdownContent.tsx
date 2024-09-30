import { useAppContext } from '@/contexts/AppContext'
import { DropdownMenuContent } from '@cn/dropdown-menu'
import { Input } from '@cn/input'
import { Search } from 'lucide-react'
import React, { useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import { MemoizedDropdownMenuItem } from './MemoizedDropdownMenuItem'
import { useHeaderSearch } from './useHeaderSearch'

const MemoizedList = React.memo(List)

export function DropdownContent({
  isRootPath,
  pathname
}: {
  isRootPath: boolean
  pathname: string
}) {
  const { searchTerm, handleSearchChange, filteredFormRoutes } =
    useHeaderSearch()
  const { selectedCategory, setSelectedCategory, categoryColors } =
    useAppContext()

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category)
    },
    [setSelectedCategory]
  )

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <MemoizedDropdownMenuItem
        key={filteredFormRoutes[index].id}
        formRoute={filteredFormRoutes[index]}
        isRootPath={isRootPath}
        pathname={pathname}
        handleCategorySelect={handleCategorySelect}
        categoryColors={categoryColors}
        selectedCategory={selectedCategory}
        style={style}
      />
    ),
    [
      filteredFormRoutes,
      isRootPath,
      pathname,
      handleCategorySelect,
      categoryColors,
      selectedCategory
    ]
  )

  return (
    <DropdownMenuContent className="w-56">
      <div className="p-2">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 opacity-50" />
          <Input
            type="search"
            placeholder="Search forms..."
            className="h-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <MemoizedList
        height={300}
        itemCount={filteredFormRoutes.length}
        itemSize={35}
        width="100%"
      >
        {renderRow}
      </MemoizedList>
    </DropdownMenuContent>
  )
}
