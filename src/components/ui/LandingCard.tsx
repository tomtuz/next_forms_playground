'use client'

import type { FormRoute } from '@/app/routes'
import { categoryColors } from '@/utils/categories'
import { useToast } from '@cn'
import { Button } from '@cn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@cn/card'
import clsx from 'clsx'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { memo, useState } from 'react'
import Markdown from 'react-markdown'
import { RouteInfoDialog } from './RouteInfoDialog'

interface LandingCardProps {
  formRoute: FormRoute
}

export const LandingCard = memo(function LandingCard({
  formRoute
}: LandingCardProps) {
  const [isCreatingDocs, setIsCreatingDocs] = useState(false)
  const { toast } = useToast()

  const handleCreateDocs = async () => {
    setIsCreatingDocs(true);
    try {
      const response = await fetch('/api/create-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: formRoute.path }),
      });

      if (!response.ok) {
        throw new Error('Failed to create doc');
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: `${data.message}. File created: ${data.filepath}`,
      });
    } catch (error) {
      console.error('Error creating doc:', error);
      toast({
        title: "Error",
        description: "Failed to create docs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingDocs(false);
    }
  };

  return (
    <Card className="grid h-full grid-rows-[auto,1fr,auto] p-4 transition-shadow hover:shadow-lg">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-lg">{formRoute.name}</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert flex flex-col p-0">
        <Markdown>{formRoute.shortDescription}</Markdown>
      </CardContent>
      <CardContent className="mt-auto flex items-center justify-between p-0 pt-2">
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
          <Button
            variant="outline"
            size="icon"
            onClick={handleCreateDocs}
            disabled={isCreatingDocs}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

LandingCard.displayName = 'LandingCard'
