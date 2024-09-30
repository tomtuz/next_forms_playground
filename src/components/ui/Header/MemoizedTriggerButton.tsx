import { FormRoute } from '@/app/routes'
import React from 'react'
import { MemoizedChevronDown } from './MemoizedChevronDown'

interface MemoizedTriggerButtonProps {
  currentFormRoute: FormRoute | undefined
}

export const MemoizedTriggerButton = React.memo<MemoizedTriggerButtonProps>(
  ({ currentFormRoute }) => (
    <>
      {currentFormRoute ? currentFormRoute.name : 'Forms'}{' '}
      <MemoizedChevronDown className="ml-2 h-4 w-4" />
    </>
  )
)

MemoizedTriggerButton.displayName = 'MemoizedTriggerButton'
