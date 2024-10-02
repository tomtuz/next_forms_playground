import { mapConfig } from '@eslint/cc'

export default mapConfig(
  [
    {
      files: ['src/**/*.ts'],
      rules: {
        'perfectionist/sort-objects': 'error'
      }
    },
    {
      files: ['**/*.md/*'],
      rules: {
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off'
      }
    }
  ],
  { next: true, prettier: true }
)
