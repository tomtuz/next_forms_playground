import type { Linter } from 'eslint'
// import type { Rules } from '../genTypes'
import { TSPlugin } from '@/plugins'
import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../../utils/globs'
import { restrictedSyntaxJs } from './javascript'

export const typescriptCore = TSPlugin.config({
  extends: [...TSPlugin.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  name: '@eslint/cc/typescript',
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      },
    ],

    // handled by unused-imports/no-unused-imports
    '@typescript-eslint/no-unused-vars': 'off',

    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': [
      'error',
      { allowBitwiseExpressions: true },
    ],

    'no-restricted-syntax': [
      'error',
      ...restrictedSyntaxJs,
      'TSEnumDeclaration[const=true]',
    ],
  },
  // } satisfies Rules,
}) as Linter.Config[]

export const typescript: Linter.Config[] = [
  ...typescriptCore,

  {
    files: ['**/*.d.ts'],
    name: '@eslint/cc/typescript/dts-rules',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    files: [GLOB_JS, '**/*.cjs'],
    name: '@eslint/cc/typescript/cjs-rules',
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
