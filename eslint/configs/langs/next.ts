
// "airbnb",
// "airbnb-typescript",
// "prettier",
// "next/core-web-vitals"

import type { Awaitable } from '@/types'
import type { Linter } from 'eslint'
// type InteropDefault<T> = T extends { default: infer U } ? U : T

async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}

// React
// import ReactModernPlugin from '@eslint-react/eslint-plugin';
// import ReactBasePlugin from 'eslint-plugin-react';
// import ReactHooksPlugin from 'eslint-plugin-react-hooks';
// import ReactRefreshPlugin from 'eslint-plugin-react-refresh';

// import { parse } from 'path';
import { GLOB_REACT } from '@/utils/globs'

const [
  pluginReact,
  pluginReactHooks,
  pluginReactRefresh,
  parserTs,
] = await Promise.all([
  interopDefault(import('@eslint-react/eslint-plugin')),
  //@ts-ignore
  interopDefault(import('eslint-plugin-react-hooks')),
  //@ts-ignore
  interopDefault(import('eslint-plugin-react-refresh')),
  interopDefault(import('@typescript-eslint/parser')),
] as const)

// extends: [
//   'eslint:recommended',
//   'plugin:@typescript-eslint/strict-type-checked',
//   'plugin:@typescript-eslint/stylistic-type-checked',
//   'next/core-web-vitals',
//   'prettier',
// ],

// name: 'antfu/react/setup',
const plugins = pluginReact.configs.all.plugins
export const next: Linter.Config[] = [
  {
    name: '@eslint/cc/next',
    plugins: {
      //@ts-ignore
      'react': plugins['@eslint-react'],
      //@ts-ignore
      'react-dom': plugins['@eslint-react/dom'],
      'react-hooks': pluginReactHooks,
      //@ts-ignore
      'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
      //@ts-ignore
      'react-naming-convention': plugins['@eslint-react/naming-convention'],
      'react-refresh': pluginReactRefresh,
    },
  },
  {
      files: [GLOB_REACT],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          project: './tsconfig.json',
        },
        sourceType: 'module',
      },
      name: 'antfu/react/rules',
      rules: {
        // recommended rules from @eslint-react/dom
        'react-dom/no-children-in-void-dom-elements': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: true,
          },
        ],

        // recommended rules from @eslint-react
        'react/ensure-forward-ref-using-ref': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-prop': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-create-ref': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-implicit-key': 'error',
        'react/no-missing-key': 'error',
        'react/no-nested-components': 'warn',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'error',
        'react/no-unstable-default-props': 'error',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-useless-fragment': 'warn',
        'react/prefer-destructuring-assignment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',
        'react/no-leaked-conditional-rendering': 'warn',
      },
    },
]

