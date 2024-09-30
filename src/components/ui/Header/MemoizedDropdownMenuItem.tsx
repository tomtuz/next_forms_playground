import { FormRoute } from '@/app/routes'
import { DropdownMenuItem } from '@cn/dropdown-menu'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface MemoizedDropdownMenuItemProps {
  formRoute: FormRoute
  isRootPath: boolean
  pathname: string
  handleCategorySelect: (category: string) => void
  categoryColors: Record<string, string>
  selectedCategory: string
  style: React.CSSProperties
}

export const MemoizedDropdownMenuItem =
  React.memo<MemoizedDropdownMenuItemProps>(
    ({
      formRoute,
      isRootPath,
      pathname,
      handleCategorySelect,
      categoryColors,
      selectedCategory,
      style
    }) => (
      <div style={style}>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={`${formRoute.path}`}
            className={clsx(
              'flex items-center justify-between',
              !isRootPath && pathname === `${formRoute.path}` && 'bg-accent'
            )}
            onClick={() => handleCategorySelect(formRoute.category)}
          >
            {formRoute.name}
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium',
                categoryColors[formRoute.category],
                (isRootPath && selectedCategory === formRoute.category) ||
                  (!isRootPath && pathname === `${formRoute.path}`)
                  ? 'ring-2 ring-primary'
                  : ''
              )}
            >
              {formRoute.category}
            </span>
          </Link>
        </DropdownMenuItem>
      </div>
    )
  )

MemoizedDropdownMenuItem.displayName = 'MemoizedDropdownMenuItem'
