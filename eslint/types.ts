import type { Linter } from 'eslint'

export type CombinedRules = Linter.RulesRecord
export type Config = Linter.Config<Linter.RulesRecord & CombinedRules>
export type Awaitable<T> = T | Promise<T>
