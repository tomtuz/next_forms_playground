import { LoggerInterface, OutputLevel, TransformData } from './types'

export function createBrowserLogger(
  initSettings?: OutputLevel
): LoggerInterface {
  let isIsolated: boolean = false
  let isDisabled: boolean = false
  const level: OutputLevel = {
    Info: true,
    Debug: false,
    Verbose: false
  }

  const setLevels = (
    levelObj: Partial<OutputLevel>,
    isolatedLogger?: boolean,
    disableLogs?: boolean
  ): void => {
    Object.assign(level, levelObj)
    if (isolatedLogger) {
      isIsolated = isolatedLogger
    }
  }

  const setLevel = (levelKey: keyof OutputLevel, value: boolean): void => {
    level[levelKey] = value
  }

  const getLevels = (): OutputLevel => ({ ...level })

  const getLoggerInfo = () => ({ levels: level, isIsolated, isDisabled })

  const error = (message?: any, ...optionalParams: any[]): void => {
    console.error(message, ...optionalParams)
  }

  const warn = (message?: any, ...optionalParams: any[]): void => {
    console.warn(message, ...optionalParams)
  }

  const info = (message?: any, ...optionalParams: any[]): void => {
    if (level.Info) console.info(message, ...optionalParams)
  }

  const debug = (message?: any, ...optionalParams: any[]): void => {
    if (level.Debug) console.debug(message, ...optionalParams)
  }

  const verbose = (message?: any, ...optionalParams: any[]): void => {
    if (level.Verbose) console.log(message, ...optionalParams)
  }

  const header = (message?: any, ...optionalParams: any[]): void => {
    console.log(`\n${message}\n${'='.repeat(String(message).length)}`)
  }

  const step = (message?: any, ...optionalParams: any[]): void => {
    console.log(`\n${message}\n${'-'.repeat(String(message).length)}`)
  }

  const struct = (message: string, obj: any, verbose = true): void => {
    if (verbose) {
      console.log(message, obj)
    }
  }

  const status = (
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): void => {
    const prefix = status_type ? `[${status_type.toUpperCase()}] ` : ''
    console.log(`${prefix}${message}`)
  }

  const rawStatus = (
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): string => {
    const prefix = status_type ? `[${status_type.toUpperCase()}] ` : ''
    return `${prefix}${message}`
  }

  const transform = (
    transformData: TransformData,
    callback?: () => void
  ): void => {
    if (isDisabled) {
      return
    }

    // Destructure TransformData, providing default values
    const { meta, textParts } = transformData

    // Validate textParts
    if (!Array.isArray(textParts) || textParts.length === 0) {
      return
    }

    // Determine if logging should proceed based on levels
    const currentLevels = getLevels()
    const shouldLog = (() => {
      if (!meta || !meta.levels || meta.levels.length === 0) {
        // If levels are not set, enable if any currentLevels are true
        return Object.values(currentLevels).some((level) => level)
      } else {
        // Check if any of the specified levels are enabled
        return meta.levels.some(
          (level) => currentLevels[level as keyof OutputLevel]
        )
      }
    })()

    if (!shouldLog) {
      return
    }

    // Efficiently build the result string
    const result = textParts.reduce((acc, { m, end = ' ' }) => {
      return acc + m + end
    }, '')

    console.log(result)

    // Call the callback if provided
    callback?.()
  }

  // handle default settings
  if (initSettings) {
    setLevels(initSettings)
  }

  return {
    setLevels,
    setLevel,
    getLevels,
    getLoggerInfo,
    error,
    warn,
    info,
    debug,
    verbose,
    header,
    step,
    struct,
    status,
    rawStatus,
    transform
  }
}
