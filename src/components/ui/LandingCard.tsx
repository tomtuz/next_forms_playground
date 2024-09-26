'use client'

import type { FormRoute } from '@/app/routes';
import { categoryColors } from '@/utils/categories';
import { Button } from '@cn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@cn/card';
import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';
import Markdown from 'react-markdown';
import { RouteInfoDialog } from './RouteInfoDialog';

interface LandingCardProps {
  formRoute: FormRoute;
}

export const LandingCard = memo(function LandingCard({
  formRoute
}: LandingCardProps) {
  return (
    <Card className="grid h-full grid-rows-[auto,1fr,auto] p-4 transition-shadow hover:shadow-lg">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-lg">{formRoute.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0 prose dark:prose-invert">
        <Markdown>{formRoute.shortDescription}</Markdown>
      </CardContent>
      <CardContent className="mt-auto p-0 pt-2 flex justify-between items-center">
        <span
          className={clsx(
            'rounded-full px-3 py-1 text-xs font-medium',
            categoryColors[formRoute.category]
          )}
        >
          {formRoute.category}
        </span>
        <div className="flex space-x-2">
          <Link href={formRoute.path} className="block">
            <Button variant="outline">Open</Button>
          </Link>
          <RouteInfoDialog formRoute={formRoute} />
        </div>
      </CardContent>
    </Card>
  );
});

LandingCard.displayName = 'LandingCard';
