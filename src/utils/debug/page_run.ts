import { appConfig } from '@/config/app'
import { createCLILogger } from '@/utils/logger/logger.cli'
import fs from 'fs/promises'
import path from 'path'

interface RouteInfo {
  folder: string
  projectPath: string
  hasDocs: boolean
  docs: string
}

interface DocsIndex {
  [key: string]: string
}

const PROJECT_ROOT = process.cwd()
const APP_DIR = path.join(PROJECT_ROOT, 'src', 'app')
const DOCS_DIR = path.join(PROJECT_ROOT, 'src', 'docs')

const logger = createCLILogger()
logger.setLevels(appConfig.loggingMode)

async function readDocsIndex(docsDir: string): Promise<DocsIndex> {
  const indexPath = path.join(docsDir, 'index.json')
  try {
    const indexContent = await fs.readFile(indexPath, 'utf-8')
    return JSON.parse(indexContent)
  } catch (error) {
    logger.error(`Error reading docs index:`, error)
    return {}
  }
}

function normalizePathForComparison(pathToNormalize: string): string {
  return pathToNormalize.replace(/\\/g, '/').toLowerCase()
}

function getRelativePathFromRoot(absolutePath: string): string {
  return path.relative(PROJECT_ROOT, absolutePath).replace(/\\/g, '/')
}

async function processDirectory(
  currentPath: string,
  relativePath: string,
  docsIndex: DocsIndex
): Promise<RouteInfo[]> {
  const routes: RouteInfo[] = []
  const items = await fs.readdir(currentPath)

  for (const item of items) {
    const itemPath = path.join(currentPath, item)
    const stat = await fs.stat(itemPath)

    if (stat.isDirectory()) {
      const subRoutes = await processDirectory(
        itemPath,
        path.join(relativePath, item),
        docsIndex
      )
      routes.push(...subRoutes)
    } else if (item === 'page.tsx') {
      const folderPath = normalizePathForComparison(relativePath)
      const projectPath = getRelativePathFromRoot(currentPath)
      const hasDocs = folderPath in docsIndex
      const docFileName = hasDocs ? docsIndex[folderPath] : ''

      const routeInfo: RouteInfo = {
        folder: folderPath,
        projectPath,
        hasDocs,
        docs: hasDocs
          ? getRelativePathFromRoot(path.join(DOCS_DIR, docFileName))
          : ''
      }

      if (folderPath !== '') {
        routes.push(routeInfo)
        logger.verbose(`Discovered route: ${folderPath}`)
      }
    }
  }

  return routes
}

async function discoverRoutes(
  appDir: string,
  docsDir: string
): Promise<RouteInfo[]> {
  const docsIndex = await readDocsIndex(docsDir)
  logger.step('Docs index content', docsIndex)

  return processDirectory(appDir, '', docsIndex)
}

async function Home() {
  logger.verbose('logLevels (page.tsx):', logger.getLoggerInfo())
  logger.step('Starting route discovery...')

  const foundRoutes = await discoverRoutes(APP_DIR, DOCS_DIR)
  logger.step(`√ Discovered routes - (${foundRoutes.length})`, foundRoutes)

  await fs.writeFile(
    path.join(PROJECT_ROOT, 'src', 'routeData.json'),
    JSON.stringify(foundRoutes, null, 2)
  )
  logger.info('Route data written to src/routeData.json')
}

Home()
