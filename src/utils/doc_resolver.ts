import fs from 'fs/promises'
import path from 'path'
import { logger } from './logger'

logger.setLevels(
  {
    Info: true,
    Debug: true,
    Verbose: false
  }
  // true, // isIsolated
  // true, // isDisabled
)

export interface RouteInfo {
  folder: string
  projectPath: string
  hasDocs: boolean
  docs: string
}

export interface DocsIndex {
  [key: string]: string
}

const PROJECT_ROOT = process.cwd()
const APP_DIR = path.join(PROJECT_ROOT, 'src', 'app')
const DOCS_DIR = path.join(PROJECT_ROOT, 'src', 'docs')

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
  const dirNames = await fs.readdir(currentPath)

  for (const dirName of dirNames) {
    const itemPath = path.join(currentPath, dirName)
    const stat = await fs.stat(itemPath)

    if (stat.isDirectory()) {
      const subRoutes = await processDirectory(
        itemPath,
        path.join(relativePath, dirName),
        docsIndex
      )
      routes.push(...subRoutes)
    } else if (dirName === 'page.tsx') {
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

async function discoverRoutes(
  appDir: string,
  docsDir: string
): Promise<RouteInfo[]> {
  const docsIndex = await readDocsIndex(docsDir)
  logger.step('Docs index content', docsIndex)

  return processDirectory(appDir, '', docsIndex)
}

export async function getProjectPaths(): Promise<RouteInfo[]> {
  logger.verbose('logLevels (doc_resolver.tsx):', logger.getLoggerInfo())
  logger.info('Starting route discovery...')

  const foundRoutes = await discoverRoutes(APP_DIR, DOCS_DIR)

  const routeDataPath = path.join(PROJECT_ROOT, 'src', 'routeData.json')
  await fs.writeFile(routeDataPath, JSON.stringify(foundRoutes, null, 2))

  logger.warn(`Route data written to ${routeDataPath}`)
  return foundRoutes
}
