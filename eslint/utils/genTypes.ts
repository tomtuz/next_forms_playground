import * as configs from '@/configs'
import { customConfig } from '@/presets'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { existsSync } from 'node:fs'
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import pico from 'picocolors'

const TYPES_DIR = './out'

async function ensureTypesDirectory() {
  if (!existsSync(TYPES_DIR)) {
    await mkdir(TYPES_DIR, { recursive: true })
  }
}

async function generateTypes(configName: string, config: any) {
  try {
    const dts = await flatConfigsToRulesDTS(
      customConfig(config, {}),
      { includeAugmentation: false, exportTypeName: `${configName}Rules` }
    )
    await writeFile(path.join(TYPES_DIR, `${configName}.d.ts`), dts)
    console.log(pico.green(`Type definitions for ${configName} generated!`))
  } catch (error) {
    console.error(pico.red(`Error generating types for ${configName}:`), error)
  }
}

async function cleanupOldTypeFiles(currentConfigs: string[]) {
  const files = await readdir(TYPES_DIR)
  for (const file of files) {
    console.log("cleanup file: ", file)
    if (file.endsWith('.d.ts') && !currentConfigs.includes(file.replace('.d.ts', ''))) {
      await unlink(path.join(TYPES_DIR, file))
      console.log(pico.yellow(`Removed old type file: ${file}`))
    }
  }
}

async function generateAllTypes() {
  try {
    await ensureTypesDirectory()

    const configNames = Object.keys(configs)
    console.log("allConfigNames: ", configNames)

    // Generate types for each configuration
    for (const [configName, config] of Object.entries(configs)) {
      console.log("[W] configName: ", config)
      await generateTypes(configName, config)
    }

    // Generate combined types
    const combinedDts = await flatConfigsToRulesDTS(
      customConfig([], {}),
      { includeAugmentation: false, exportTypeName: 'CombinedRules' }
    )
    await writeFile(path.join(TYPES_DIR, 'index.d.ts'), combinedDts)
    console.log(pico.green('Combined type definitions generated!'))

    // Cleanup old type files
    await cleanupOldTypeFiles([...configNames, 'index'])

    console.log(pico.green('Type generation completed successfully!'))
  } catch (error) {
    console.error(pico.red('Error generating types:'), error)
    process.exit(1)
  }
}

generateAllTypes()
