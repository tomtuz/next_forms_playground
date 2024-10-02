import { parserYml, pluginYml } from '@/plugins'
import type { Linter } from 'eslint'
import { GLOB_YAML } from '../../utils/globs'

export const yml: Linter.Config[] = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYml,
    },
    name: '@eslint/cc/yaml',
    plugins: {
      yml: pluginYml as any,
    },
    rules: {
      ...(pluginYml.configs.standard.rules as Linter.RulesRecord),
      ...(pluginYml.configs.prettier.rules as Linter.RulesRecord),
      'yml/no-empty-mapping-value': 'off',
    },
  },
]
