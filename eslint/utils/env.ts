import { isPackageExists } from 'local-pkg'
import process from 'node:process'

export const isInEditor = !!(
  (process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM) &&
  !process.env.CI
)
export const hasTypeScript = isPackageExists('typescript')
export const hasNext =
  isPackageExists('next')
export const hasReact =
  isPackageExists('react')
export const hasVue =
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('@slidev/cli')
export const hasUnocss =
  isPackageExists('unocss') ||
  isPackageExists('@unocss/webpack') ||
  isPackageExists('@unocss/nuxt')
