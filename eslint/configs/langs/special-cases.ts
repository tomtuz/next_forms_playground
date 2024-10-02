import { pluginImport } from '@/plugins'
import type { Config } from '../../types'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../../utils/globs'

export const specialCases: Config[] = [
  {
    files: ['**/scripts/*', '**/cli.*'],
    name: '@eslint/cc/special/cli',
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: [`**/*.{test,spec}.${GLOB_SRC_EXT}`],
    name: '@eslint/cc/special/tests',
    rules: {
      'no-unused-expressions': 'off',
      'unicorn/consistent-function-scoping': 'off',
    },
  },
  {
    files: [
      `**/*config*.${GLOB_SRC_EXT}`,
      `**/{views,pages,routes,middleware,plugins,api,modules}/${GLOB_SRC}`,
      `**/{index,vite,esbuild,rollup,rolldown,webpack,rspack}.${GLOB_SRC_EXT}`,
      '**/*.d.ts',
      `${GLOB_MARKDOWN}/**`,
      '**/.prettierrc*',
    ],
    name: '@eslint/cc/special/allow-default-export',
    plugins: {
      import: pluginImport as any,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
