import { logger } from '@/utils/logger'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@cn/dialog'
import { Suspense, useCallback } from 'react'
import Markdown from 'react-markdown'
import { useClickDebugger } from '../../hooks/debug/useClickDebugger'

interface RouteInfoDialogProps {
  formRoute: {
    name: string
    longDescription: string
  }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function RouteInfoDialog({
  formRoute,
  isOpen,
  onOpenChange
}: RouteInfoDialogProps) {
  const [dialogRef] = useClickDebugger(undefined, 'RouteInfoDialog')

  const handleOpenChange = useCallback(
    (open: boolean) => {
      logger.info('--- Dialog open state changed ---')
      logger.info(`Dialog is now ${open ? 'open' : 'closed'}`)
      onOpenChange(open)
    },
    [onOpenChange]
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={dialogRef}
        className="max-w-3xl"
        data-testid="route-info-dialog"
      >
        <DialogHeader>
          <DialogTitle>{formRoute.name} - Implementation Details</DialogTitle>
          <DialogDescription>
            Detailed information about the {formRoute.name} implementation.
          </DialogDescription>
        </DialogHeader>
        <div className="prose dark:prose-invert mt-4 max-h-[70vh] overflow-y-auto">
          <Suspense fallback={<div>Loading detailed description...</div>}>
            <Markdown>{formRoute.longDescription}</Markdown>
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}

RouteInfoDialog.displayName = 'RouteInfoDialog'
