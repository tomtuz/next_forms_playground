import { pluginMarkdown } from '@/plugins'
import type { Linter } from 'eslint'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_VUE } from '../../utils/globs'

export const markdown: Linter.Config[] = [
  ...pluginMarkdown.configs.processor.map((config: Linter.Config) => ({
    ...config,
    name: `@eslint/cc/${config.name || 'anonymous'}`,
  })),

  {
    files: [`${GLOB_MARKDOWN}/${GLOB_SRC}`, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
    name: '@eslint/cc/markdown-rules',
    rules: {
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',

      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',

      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
]
