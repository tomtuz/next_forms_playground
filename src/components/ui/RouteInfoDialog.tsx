'use client'

import { Button } from '@cn/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@cn/dialog'
import { Suspense, useState } from 'react'
// import Markdown from 'react-markdown'

export function RouteInfoDialog({ formRoute }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleMoreInfoClick}>More Info</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{formRoute.name} - Implementation Details</DialogTitle>
          <DialogDescription>
            Detailed information about the {formRoute.name} implementation.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto prose dark:prose-invert">
          <Suspense fallback={<div>Loading detailed description...</div>}>
            {/* <Markdown>{formRoute.longDescription}</Markdown> */}
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}
