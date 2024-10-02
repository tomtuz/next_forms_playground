import { configComments } from '@/plugins'
import type { Linter } from 'eslint'

export const comments: Linter.Config[] = [
  {
    ...configComments.recommended,
    name: '@eslint/cc/comments/recommended',
  },
  {
    name: '@eslint/cc/comments',
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true },
      ],
    },
  },
]
