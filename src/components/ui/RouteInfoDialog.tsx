import { logger } from '@/utils/logger';
import { useClickDebugger } from '@/utils/useClickDebugger';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@cn/dialog';
import { Suspense, useCallback, useRef } from 'react';
import Markdown from 'react-markdown';

interface RouteInfoDialogProps {
  formRoute: {
    name: string;
    longDescription: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RouteInfoDialog({ formRoute, isOpen, onOpenChange }: RouteInfoDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useClickDebugger(dialogRef, undefined, 'RouteInfoDialog');

  const handleOpenChange = useCallback((open: boolean) => {
    logger.info('--- Dialog open state changed ---')
    logger.info(`Dialog is now ${open ? 'open' : 'closed'}`)
    onOpenChange(open);
  }, [onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
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
        <div className="max-h-[70vh] overflow-y-auto prose dark:prose-invert mt-4">
          <Suspense fallback={<div>Loading detailed description...</div>}>
            <Markdown>{formRoute.longDescription}</Markdown>
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}

RouteInfoDialog.displayName = 'RouteInfoDialog'
