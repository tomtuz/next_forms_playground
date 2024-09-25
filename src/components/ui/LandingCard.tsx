import type { FormRoute } from '@/app/routes'
import { categoryColors } from '@/utils/categories'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@cn/card'
import clsx from 'clsx'
import Link from 'next/link'
import { memo } from 'react'

interface LandingCardProps {
  formRoute: FormRoute
}

export const LandingCard = memo(function LandingCard({
  formRoute
}: LandingCardProps) {
  return (
    <Link href={formRoute.path} className="block h-full">
      <Card className="grid h-full grid-rows-[auto,1fr,auto] p-4 transition-shadow hover:shadow-lg">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg">{formRoute.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-0">
          {Array.isArray(formRoute.description) ? (
            <ul className="list-disc pl-5 text-sm">
              {formRoute.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <CardDescription className="text-sm">
              {formRoute.description}
            </CardDescription>
          )}
        </CardContent>
        <CardContent className="mt-auto p-0 pt-2">
          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium',
              categoryColors[formRoute.category]
            )}
          >
            {formRoute.category}
          </span>
        </CardContent>
      </Card>
    </Link>
  )
})
LandingCard.displayName = 'LandingCard'
