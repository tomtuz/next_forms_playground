import { formRoutes } from '@/app/routes'
import { colorSet } from '@/constants'

export const categories = [
  'All',
  ...new Set(formRoutes.map((formRoute) => formRoute.category))
]

export const generateCategoryColors = (categories: string[]) => {
  return categories.reduce(
    (acc, category, index) => {
      if (category === 'All') {
        acc[category] = 'bg-gray-50 text-gray-800'
      } else {
        const [bgColor, textColor] =
          colorSet[index % colorSet.length].split(' ')
        acc[category] =
          `${bgColor} ${textColor} hover:${bgColor.replace('50', '100')}`
      }
      return acc
    },
    {} as Record<string, string>
  )
}

export const categoryColors = generateCategoryColors(categories)
