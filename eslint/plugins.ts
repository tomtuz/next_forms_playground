/* eslint-disable import/first */
// @ts-nocheck

export type InteropDefault<T> = T extends { default: infer U } ? U : T

/* #__NO_SIDE_EFFECTS__ */
function interopDefault<T>(m: T): InteropDefault<T> {
  return 'default' in m ? interopDefault(m.default) : m
}

// async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
//   const resolved = await m
//   return (resolved as any).default || resolved
// }

import JSPlugin from '@eslint/js'
import TSPlugin from 'typescript-eslint'

export const JSConfig: any = interopDefault(JSPlugin)

export { TSPlugin }

// export * as _nextPlugin from "next/core-web-vitals"
// export const nextPlugin: any = interopDefault(_nextPlugin)

import * as _reactPlugin from 'eslint-plugin-react'
export const reactPlugin: any = interopDefault(_reactPlugin)

import * as _pluginVue from 'eslint-plugin-vue'
export const pluginVue: any = interopDefault(_pluginVue)

import * as _pluginNode from 'eslint-plugin-n'
export const pluginNode: typeof import('eslint-plugin-n') =
  interopDefault(_pluginNode)

import * as _pluginMarkdown from '@eslint/markdown'
export const pluginMarkdown: any = interopDefault(_pluginMarkdown)

import * as _pluginPrettier from 'eslint-plugin-prettier'
export const pluginPrettier: any = interopDefault(_pluginPrettier)

import * as _configPrettier from 'eslint-config-prettier'
export const configPrettier: any = interopDefault(_configPrettier)

import * as _pluginUnusedImports from 'eslint-plugin-unused-imports'
export const pluginUnusedImports: any = interopDefault(_pluginUnusedImports)

import * as _pluginIgnore from 'eslint-config-flat-gitignore'
export const pluginIgnore: any = interopDefault(_pluginIgnore)

export { default as configComments } from '@eslint-community/eslint-plugin-eslint-comments/configs'

import * as _pluginAntfu from 'eslint-plugin-antfu'
export const pluginAntfu: typeof import('eslint-plugin-antfu').default =
  interopDefault(_pluginAntfu)

export * as pluginImport from 'eslint-plugin-import-x'

import * as _pluginPerfectionist from 'eslint-plugin-perfectionist'
export const pluginPerfectionist: any = interopDefault(_pluginPerfectionist)

import * as _pluginJsdoc from 'eslint-plugin-jsdoc'
export const pluginJsdoc: any = interopDefault(_pluginJsdoc)

export * as pluginJsonc from 'eslint-plugin-jsonc'
export * as pluginYml from 'eslint-plugin-yml'

export * as parserJsonc from 'jsonc-eslint-parser'
export * as parserVue from 'vue-eslint-parser'
export * as parserYml from 'yaml-eslint-parser'

