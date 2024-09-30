import { Formatter } from '@/utils/logger/types'

const isServer = typeof window === 'undefined'

const formatter =
  (open: string, close: string, replace = open): Formatter =>
  (input: string | number | null | undefined) => {
    const string = String(input) // More explicit conversion
    const index = string.indexOf(close, open.length)
    return index !== -1
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close
  }

const replaceClose = (
  string: string,
  close: string,
  replace: string,
  index: number
): string => {
  let result = ''
  let cursor = 0
  let nextIndex = index
  do {
    result += string.substring(cursor, nextIndex) + replace
    cursor = nextIndex + close.length
    nextIndex = string.indexOf(close, cursor)
  } while (nextIndex !== -1)
  return result + string.substring(cursor)
}

type InitFunction = (open: string, close: string, replace?: string) => Formatter

const init: InitFunction = isServer
  ? formatter
  : () => (input: string | number | null | undefined) => String(input)

const colors: Record<string, Formatter> = {
  reset: init('\x1b[0m', '\x1b[0m'),
  bold: init('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m'),
  dim: init('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m'),
  italic: init('\x1b[3m', '\x1b[23m'),
  underline: init('\x1b[4m', '\x1b[24m'),
  inverse: init('\x1b[7m', '\x1b[27m'),
  hidden: init('\x1b[8m', '\x1b[28m'),
  strikethrough: init('\x1b[9m', '\x1b[29m'),

  black: init('\x1b[30m', '\x1b[39m'),
  red: init('\x1b[31m', '\x1b[39m'),
  green: init('\x1b[32m', '\x1b[39m'),
  yellow: init('\x1b[33m', '\x1b[39m'),
  blue: init('\x1b[34m', '\x1b[39m'),
  magenta: init('\x1b[35m', '\x1b[39m'),
  cyan: init('\x1b[36m', '\x1b[39m'),
  white: init('\x1b[37m', '\x1b[39m'),
  gray: init('\x1b[90m', '\x1b[39m'),

  bgBlack: init('\x1b[40m', '\x1b[49m'),
  bgRed: init('\x1b[41m', '\x1b[49m'),
  bgGreen: init('\x1b[42m', '\x1b[49m'),
  bgYellow: init('\x1b[43m', '\x1b[49m'),
  bgBlue: init('\x1b[44m', '\x1b[49m'),
  bgMagenta: init('\x1b[45m', '\x1b[49m'),
  bgCyan: init('\x1b[46m', '\x1b[49m'),
  bgWhite: init('\x1b[47m', '\x1b[49m'),

  blackBright: init('\x1b[90m', '\x1b[39m'),
  redBright: init('\x1b[91m', '\x1b[39m'),
  greenBright: init('\x1b[92m', '\x1b[39m'),
  yellowBright: init('\x1b[93m', '\x1b[39m'),
  blueBright: init('\x1b[94m', '\x1b[39m'),
  magentaBright: init('\x1b[95m', '\x1b[39m'),
  cyanBright: init('\x1b[96m', '\x1b[39m'),
  whiteBright: init('\x1b[97m', '\x1b[39m'),

  bgBlackBright: init('\x1b[100m', '\x1b[49m'),
  bgRedBright: init('\x1b[101m', '\x1b[49m'),
  bgGreenBright: init('\x1b[102m', '\x1b[49m'),
  bgYellowBright: init('\x1b[103m', '\x1b[49m'),
  bgBlueBright: init('\x1b[104m', '\x1b[49m'),
  bgMagentaBright: init('\x1b[105m', '\x1b[49m'),
  bgCyanBright: init('\x1b[106m', '\x1b[49m'),
  bgWhiteBright: init('\x1b[107m', '\x1b[49m')
}

// Freeze the colors object to prevent modifications
export default Object.freeze(colors)
