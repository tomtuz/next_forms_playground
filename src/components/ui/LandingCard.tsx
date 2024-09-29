import type { FormRoute } from '@/app/routes'
import { categoryColors } from '@/utils/categories'
import { logger } from '@/utils/logger'
import { useClickDebugger } from '@/utils/useClickDebugger'
import { useToast } from '@cn'
import { Button } from '@cn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@cn/card'
import clsx from 'clsx'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useCallback, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { RouteInfoDialog } from './RouteInfoDialog'

interface LandingCardProps {
  formRoute: FormRoute
}

const MarkdownRenderer = memo(({ content }: { content: string }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
))

MarkdownRenderer.displayName = 'MarkdownRenderer'

export const LandingCard = memo(function LandingCard({
  formRoute
}: LandingCardProps) {
  // Hooks

  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [isCreatingDocs, setIsCreatingDocs] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  // immediate hooks
  useClickDebugger(cardRef, undefined, 'LandingCard')

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

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    router.push(formRoute.path)
  }, [])

  // Other

  const getCategoryColor = (category: string | undefined) => {
    if (!category) return 'bg-gray-200 text-gray-800'
    return category in categoryColors
      ? categoryColors[category as keyof typeof categoryColors]
      : 'bg-gray-200 text-gray-800'
  }

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
          <MarkdownRenderer content={formRoute.shortDescription} />
        </CardContent>
        <CardContent className="mt-auto flex items-center justify-between p-0 pt-2">
          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium',
              getCategoryColor(formRoute.category)
            )}
          >
            {formRoute.category || 'Uncategorized'}
          </span>
          <div className="flex space-x-2" data-prevent-navigation>
            <Link href={formRoute.path} className="block">
              <Button variant="outline">Open</Button>
            </Link>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                setDialogOpen(true)
              }}
              data-testid="more-info-button"
            >
              More Info
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCreateDocs}
              disabled={isCreatingDocs}
              data-testid="create-docs-button"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <RouteInfoDialog
        formRoute={formRoute}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
})

LandingCard.displayName = 'LandingCard'
