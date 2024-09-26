import { FormRoute, routesData } from '@/app/routes';
import { colorSet } from '@/constants';

export const categories = [
  'All',
  ...new Set(routesData.map((formRoute: FormRoute) => formRoute.category).filter(Boolean))
] as string[];

export const generateCategoryColors = (categories: string[]) => {
  return categories.reduce<Record<string, string>>(
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
    {}
  )
}

export const categoryColors = generateCategoryColors(categories)
