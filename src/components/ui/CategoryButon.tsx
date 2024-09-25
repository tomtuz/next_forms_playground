import { Button } from '@cn'
import clsx from 'clsx'
import { memo } from 'react'

interface CategoryButtonProps {
  category: string
  isSelected: boolean
  onClick: () => void
  categoryColors: Record<string, string>
}

export const CategoryButton = memo(function CategoryButton({
  category,
  isSelected,
  onClick,
  categoryColors
}: CategoryButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={clsx(
        'whitespace-nowrap transition-all',
        categoryColors[category],
        isSelected
          ? 'ring-2 ring-black ring-offset-2'
          : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-2'
      )}
    >
      {category}
    </Button>
  )
})
