import React from 'react'
import { useRecoilValue } from 'recoil'
import { commonNotification } from '@/components/testing/recoil/State'

// Notification provider
const Notification = () => {
  const notification = useRecoilValue(commonNotification)

  const { title, message, initialized } = notification

  if (!initialized) {
    return null
  }

  return (
    <div>
      <strong>{title}</strong>
      <strong>{message}</strong>
    </div>
  )
}

export default Notification
