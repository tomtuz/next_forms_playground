'use client'
import React from 'react'
import { RecoilLogger } from 'recoil-devtools-logger'
import LogMonitor from 'recoil-devtools-log-monitor'
import DockMonitor from 'recoil-devtools-dock'

// Implementation reference
// https://github.com/ulises-jeremias/recoil-devtools/
export const Devtools = () => {
  return (
    <>
      <RecoilLogger />
      <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        changeMonitorKey="ctrl-m"
        defaultIsVisible
      >
        <LogMonitor markStateDiff />
      </DockMonitor>
    </>
  )
}
