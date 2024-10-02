import { config } from 'process'
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  next,
  node,
  prettier,
  react,
  regexp,
  sortImports,
  sortPackageJson,
  sortTsconfig,
  specialCases,
  typescript,
  vue,
  yml
} from './configs'

import { hasNext, hasReact, hasUnocss, hasVue } from './utils/env'

import type { Config } from './types'

/** Ignore common files and include javascript support */
export const presetJavaScript: Config[] = [
  ...ignores,
  ...javascript,
  ...comments,
  ...imports,
  ...node,
  ...jsdoc,
  ...regexp,
]
/** Includes basic json(c) file support and sorting json keys */
export const presetJsonc: Config[] = [
  ...jsonc,
  ...sortPackageJson,
  ...sortTsconfig,
]
/** Includes markdown, yaml + `presetJsonc` support */
export const presetLangsExtensions: Config[] = [
  ...markdown,
  ...yml,
  ...presetJsonc,
]
/** Includes `presetJavaScript` and typescript support */
export const presetBasic: Config[] = [
  ...presetJavaScript,
  ...typescript,
  ...sortImports,
]
/**
 * Includes
 * - `presetBasic` (JS+TS) support
 * - `presetLangsExtensions` (markdown, yaml, jsonc) support
 * - Vue support
 * - UnoCSS support (`uno.config.ts` is required)
 * - Prettier support
 */
export const presetAll: Config[] = [
  ...presetBasic,
  ...presetLangsExtensions,
  ...vue,
  ...prettier,
]
export { presetAll as all, presetBasic as basic }

/** `customConfig`'s preset. */
export function customConfig(
  configArr: Config[] = [],
  {
    vue: enableVue = hasVue,
    react: enableReact = hasReact,
    next: enableNext = hasNext,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    unocss: enableUnocss = hasUnocss,
    command: enableCommand = true,
  }: Partial<{
    vue: boolean,
    react: boolean,
    next: boolean,
    prettier: boolean,
    markdown: boolean,
    unocss: boolean,
    sortKeys: boolean
    command: boolean,
  }> = {},
): Config[] {
  const presetConfigs: Config[] = [...presetBasic, ...yml, ...presetJsonc]

  if (enableVue) {
    presetConfigs.push(...vue)
  }
  if (enableNext) {
    presetConfigs.push(...next)
  }
  if (enableReact) {
    presetConfigs.push(...react)
  }
  if (enableMarkdown) {
    presetConfigs.push(...markdown)
  }
  if (enablePrettier) {
    presetConfigs.push(...prettier)
  }
  if (Object.keys(config).length > 0) {
    presetConfigs.push(...(Array.isArray(configArr) ? configArr : [configArr]))
  }
  presetConfigs.push(...specialCases)

  return presetConfigs
}
