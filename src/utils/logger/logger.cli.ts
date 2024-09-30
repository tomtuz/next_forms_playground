import c from 'picocolors'
import { LoggerInterface, OutputLevel, TransformData } from './types'

export function createCLILogger(initSettings?: OutputLevel): LoggerInterface {
  let isIsolated: boolean = false
  let isDisabled: boolean = false
  const level: OutputLevel = {
    Info: true,
    Debug: false,
    Verbose: false
  }

  const status_prefix = {
    success: { ascii: '[OK]' },
    error: { ascii: '[X]' },
    info: { ascii: '[i]' }
  }

  const setLevels = (
    levelObj: Partial<OutputLevel>,
    isolatedLogger?: boolean,
    disableLogs?: boolean
  ): void => {
    Object.assign(level, levelObj)
    verbose('\nlog_level: ', level)

    if (isolatedLogger) {
      isIsolated = isolatedLogger
      verbose('\nisIsolated: ', isIsolated)
    }

    if (disableLogs) {
      isDisabled = disableLogs
      verbose('\nisDisabled: ', isDisabled)
    }
  }

  const setLevel = (levelKey: keyof OutputLevel, value: boolean): void => {
    level[levelKey] = value
    verbose(`Log level '${levelKey}' set to ${value}`)
  }

  const getLevels = (): OutputLevel => ({ ...level })

  const getLoggerInfo = () => ({ levels: level, isIsolated, isDisabled })

  const error = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }
    console.error(c.red(message), ...optionalParams)
  }

  const warn = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }
    const headerPart = `${c.yellow(message)}`
    handleParams(headerPart, optionalParams)
  }

  const info = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }
    if (level.Info) {
      handleParams(message, optionalParams)
    }
  }

  const debug = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }
    if (level.Debug) {
      const headerPart = `${c.red(message)}\n`
      handleParams(headerPart, optionalParams)
    }
  }

  const verbose = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }
    if (level.Verbose) {
      handleParams(message, optionalParams)
    }
  }

  const header = (message?: any, ...optionalParams: any[]): void => {
    const divider = '='.repeat(String(message).length)
    const headerPart = c.blue(`\n${message}\n${divider}`)
    handleParams(headerPart, optionalParams)
  }

  const step = (message?: any, ...optionalParams: any[]): void => {
    if (isDisabled) {
      return
    }

    const divider = '-'.repeat(String(message).length)
    const headerPart = c.cyan(`\n${message}\n${divider}\n`)
    handleParams(headerPart, optionalParams)
  }

  const struct = (message: string, obj: any, verbose = true): void => {
    if (isDisabled) {
      return
    }

    if (verbose) {
      console.log(`${message}\n${JSON.stringify(obj, null, 2)}`)
    }
  }

  const handleParams = (headContent: any, paramsArr: any[]) => {
    if (isDisabled) {
      return
    }
    if (paramsArr.length === 0) {
      console.log(headContent)
      return
    }

    if (paramsArr.length === 1) {
      const stringMessage = JSON.stringify(paramsArr[0], null, 2)
      console.log(`${headContent}${stringMessage}`)
    } else {
      const stringMessage = JSON.stringify(paramsArr, null, 2)
      console.log(`${headContent}${stringMessage}`)
    }
  }

  const status = (
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): void => {
    switch (status_type) {
      case 'success':
        console.log(`${c.green(status_prefix.success.ascii)} ${message}`)
        break
      case 'error':
        console.log(`${c.red(status_prefix.error.ascii)} ${message}`)
        break
      case 'info':
        console.log(`${c.blue(status_prefix.info.ascii)} ${message}`)
        break
      default:
        console.log(message)
    }
  }

  const rawStatus = (
    message?: any,
    status_type?: 'success' | 'error' | 'info' | 'custom'
  ): string => {
    switch (status_type) {
      case 'success':
        return `${c.green(status_prefix.success.ascii)} ${message}`
        break
      case 'error':
        return `${c.red(status_prefix.error.ascii)} ${message}`
        break
      case 'info':
        return `${c.blue(status_prefix.info.ascii)} ${message}`
        break
      default:
        return message
    }
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

    // Use meta.formatter if provided, otherwise default to white
    const baseFormatter = meta?.formatter || c.white

    // Efficiently build the result string
    const result = textParts.reduce(
      (acc, { m, end = ' ', c: itemFormatter }) => {
        const formatter = itemFormatter || baseFormatter
        return acc + formatter(m) + end
      },
      ''
    )

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
