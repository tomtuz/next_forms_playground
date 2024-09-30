import type { FormRoute } from '@/app/routes'
import { useClickDebugger } from '@/hooks/debug/useClickDebugger'
import { categoryColors } from '@/utils/categories'
import { logger } from '@/utils/logger'
import { useToast } from '@cn'
import { Button } from '@cn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@cn/card'
import clsx from 'clsx'
import { PlusCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentType } from 'react'
import React, { memo, Suspense, useCallback, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface LandingCardProps {
  formRoute: FormRoute
}

interface RouteInfoDialogProps {
  formRoute: FormRoute
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const RouteInfoDialog: ComponentType<RouteInfoDialogProps> = dynamic(
  () => import('./RouteInfoDialog').then((mod) => mod.RouteInfoDialog),
  {
    loading: () => <div>Loading...</div>,
  }
)

const MarkdownRenderer = memo(({ content }: { content: string }) => {
  return useMemo(
    () => <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>,
    [content]
  )
})

MarkdownRenderer.displayName = 'MarkdownRenderer'

export const LandingCard = memo(function LandingCard({
  formRoute
}: LandingCardProps) {
  // Hooks

  const memoContent = useMemo(() => ({ formRoute }), [formRoute])
  const router = useRouter()
  const { toast } = useToast()
  const [isCreatingDocs, setIsCreatingDocs] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cardRef] = useClickDebugger(undefined, 'LandingCard')

  // Funcs

  const handleCreateDocs = useCallback(async () => {
    logger.step('--- Creating docs ---')
    setIsCreatingDocs(true)
    try {
      const response = await fetch('/api/create-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: formRoute.path })
      })

      if (!response.ok) {
        throw new Error('Failed to create doc')
      }

      const data = await response.json()
      logger.info('√ Doc created successfully:', data.filepath)
      toast({
        title: 'Success',
        description: `${data.message}. File created: ${data.filepath}`
      })
    } catch (error) {
      console.error('x Error creating doc:', error)
      toast({
        title: 'Error',
        description: 'Failed to create docs. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsCreatingDocs(false)
    }
  }, [formRoute.path, toast])

  const handleCardClick = useCallback(() => {
    router.push(formRoute.path)
  }, [formRoute.path, router])

  const handleOpenDialog = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setDialogOpen(true)
  }, [])

  const handleCreateDocsClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      handleCreateDocs()
    },
    [handleCreateDocs]
  )

  // Other

  return (
    <>
      <Card
        ref={cardRef}
        className="grid h-full cursor-pointer grid-rows-[auto,1fr,auto] p-4 transition-shadow hover:shadow-lg"
        onClick={handleCardClick}
        data-testid="landing-card"
      >
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg">{formRoute.name}</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert flex flex-col p-0">
          <MarkdownRenderer content={memoContent.formRoute.shortDescription} />
        </CardContent>
        <CardContent className="mt-auto flex items-center justify-between p-0 pt-2">
          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium',
              categoryColors[formRoute.category]
            )}
          >
            {formRoute.category || 'Uncategorized'}
          </span>
          <div className="flex space-x-2">
            <Link href={formRoute.path} className="block">
              <Button variant="outline">Open</Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleOpenDialog}
              data-testid="more-info-button"
            >
              More Info
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCreateDocsClick}
              disabled={isCreatingDocs}
              data-testid="create-docs-button"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        <RouteInfoDialog
          formRoute={memoContent.formRoute}
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </Suspense>
    </>
  )
})

LandingCard.displayName = 'LandingCard'
