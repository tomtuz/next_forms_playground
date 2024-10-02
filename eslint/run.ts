/**
 * @file Main entry point for the ESLint configuration
 * This file exports all the necessary modules, types, and configuration functions
 */

import { customConfig } from './presets'
import { Config } from './types'

export * from './configs'
export * from './plugins'
export * from './presets'
export * from './types'
export * from './utils/env'
export * from './utils/globs'

/**
 * Create an ESLint configuration
 * @param configs Array of custom configurations to include
 * @param options Additional options for customization
 * @returns ESLint configuration
 */
export function mapConfig(
  configArr: Config[] = [],
  options: {
    vue?: boolean
    react?: boolean
    next?: boolean
    prettier?: boolean
    markdown?: boolean
    unocss?: boolean
    sortKeys?: boolean
    command?: boolean
  } = {}
): Config[] {
  return customConfig(configArr, options)
}
