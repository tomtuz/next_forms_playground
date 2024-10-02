import { pluginIgnore } from '@/plugins'
import type { Linter } from 'eslint'
import { GLOB_EXCLUDE } from '../../utils/globs'

export const ignores: Linter.Config[] = [
  {
    ignores: GLOB_EXCLUDE,
    name: 'cc/global-ignores',
  },
  {
    ...pluginIgnore({ strict: false }),
    name: 'cc/gitignore',
  },
]
