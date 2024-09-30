import { FormRoute } from '@/app/routes'
import c from '@/utils/logger/colors'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

import { getProjectPaths, RouteInfo } from './doc_resolver'
import { getLogger } from './logger'
import { TransformData } from './logger/types'

const logger = getLogger({
  Info: true,
  Debug: true,
  Verbose: false
})

const CACHE_FILE = path.join(process.cwd(), 'src', 'docs_cache.json')
const INDEX_FILE = path.join(process.cwd(), 'src', 'docs', 'index.json')
const ROUTES_FILE = path.join(process.cwd(), 'src', 'app', 'routes.tsx')
const CACHE_STATE_FILE = path.join(process.cwd(), 'src', 'cache_state.json')

interface CacheData {
  lastModified: string
  routes: FormRoute[]
}

interface CacheState {
  routes: boolean
  docs: boolean
  total_cache: boolean
}

// Function to get cache state from file
async function getCacheState(): Promise<CacheState> {
  try {
    const stateContent = await fs.readFile(CACHE_STATE_FILE, 'utf-8')
    const parsedState = JSON.parse(stateContent)
    logger.info('parsedState: ', parsedState)
    return parsedState
  } catch (error) {
    logger.warn('Cache was not found, using defaults...')
    return { routes: false, docs: false, total_cache: false }
  }
}

// Function to set cache state in file
async function setCacheState(state: CacheState) {
  try {
    await fs.writeFile(CACHE_STATE_FILE, JSON.stringify(state, null, 2))
    logger.info('Cache state updated:', state)
  } catch (error) {
    logger.error('Error writing cache state file:', error)
  }
}

const statusTemplate = (title: string, message: string): TransformData => {
  return {
    meta: {
      formatter: c.blackBright,
      levels: ['Info', 'Debug']
    },
    textParts: [
      { m: `[${title}]`, c: c.blueBright },
      { m: `${message}`, c: c.white },
    ]
  }
}

// entry point
export async function getCachedRoutes(
  formRoutes: FormRoute[]
): Promise<FormRoute[]> {
  const cacheState = await getCacheState()

  try {
    const indexStats = await fs.stat(INDEX_FILE)
    const routesStats = await fs.stat(ROUTES_FILE)
    const cacheExists = await fs
      .access(CACHE_FILE)
      .then(() => true)
      .catch(() => false)

    const indexLastModified = indexStats.mtime.toISOString()
    const routesLastModified = routesStats.mtime.toISOString()

    // use only cache
    if (cacheState.total_cache && cacheExists) {
      const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8')
      const cacheData: CacheData = JSON.parse(cacheContent)

      if (cacheData.lastModified === indexLastModified) {
        logger.transform(statusTemplate('(0) TOTAL CACHE', '- using total cache'))
        return cacheData.routes
      }
    }

    if (cacheState.routes && cacheState.docs) {
      // logger.info('Recalculating total cache')
      logger.transform(statusTemplate('(2) CALC CACHE', '- calculating "docs" + "routes"'))
      const docRoutes = await getProjectPaths()
      const updatedRoutes = await prepareRoutes(formRoutes, docRoutes)
      await saveCache(updatedRoutes, indexLastModified)
      await setCacheState({ ...cacheState, total_cache: true })
      return updatedRoutes
    }

    if (!cacheState.docs) {
      logger.transform(statusTemplate('(1) CALC "docs"', '- calculating "docs"'))
      await recalculateDocs()
      await setCacheState({ ...cacheState, docs: true })
    }

    if (!cacheState.routes || routesLastModified > indexLastModified) {
      logger.transform(statusTemplate('(1) CALC "routes"', '- calculating "routes"'))
      await setCacheState({ ...cacheState, routes: true })
    }

    logger.transform(statusTemplate('(3) CALC ALL"', 'Recalculating everything'))
    const docRoutes = await getProjectPaths()
    const updatedRoutes = await prepareRoutes(formRoutes, docRoutes)
    await saveCache(updatedRoutes, indexLastModified)
    await setCacheState({ routes: true, docs: true, total_cache: true })

    return updatedRoutes
  } catch (error) {
    logger.error('Error in getCachedRoutes:', error)
    return formRoutes
  }
}

async function updateRoutes(
  formRoutes: FormRoute[],
  docRoutes: RouteInfo[]
): Promise<FormRoute[]> {
  const displayRoutesAll = await Promise.all(
    formRoutes.map(async (route: FormRoute) => {
      const docRoute = docRoutes.find((dr) => dr.folder === route.path)
      if (docRoute && docRoute.docs) {
        const { metadata, content } = await getMDXContent(docRoute.docs)
        return {
          ...route,
          shortDescription: metadata || route.shortDescription,
          longDescription: content || route.longDescription
        }
      }
      return route
    })
  )

  return displayRoutesAll
}

async function saveCache(routes: FormRoute[], lastModified: string) {
  const cacheData: CacheData = { lastModified, routes }
  await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))
}

async function getMDXContent(
  filePath: string
): Promise<{ metadata: any | null; content: any | null }> {
  try {
    await fs.access(filePath, fs.constants.R_OK)
    const fileContent = await fs.readFile(filePath, 'utf-8')

    // using 'gray-matter'
    const fileMatter = matter(fileContent)
    const { data: frontmatter, content } = fileMatter
    logger.verbose('fileMatter: ', fileMatter)

    // Convert frontmatter to markdown
    const metadata =
      Object.keys(frontmatter).length > 0
        ? Object.entries(frontmatter)
            .map(([key, value]) => `**${key}**: ${value}`)
            .join('\n\n')
        : null

    return {
      metadata,
      content
    }
  } catch (error) {
    console.error(`Error loading MDX for route: ${filePath}`, error)
    return { metadata: null, content: null }
  }
}

async function prepareRoutes(
  displayRoutes: FormRoute[],
  docRoutes: RouteInfo[]
): Promise<FormRoute[]> {
  logger.step("Matching 'routes' to 'docs': ")
  const totalCount = displayRoutes.length
  const outputArr: { folder: string; metadata: any }[] = []

  const displayRoutesAll = await Promise.all(
    displayRoutes.map(async (displayRoute, index) => {
      const docRoute = docRoutes.find((docItem) => {
        if (docItem.docs === '') {
          return false
        }
        return docItem.folder === displayRoute.path
      })

      const statusInfo: TransformData = {
        meta: {
          formatter: c.blackBright,
          levels: ['Info', 'Debug']
        },
        textParts: [
          { m: `[${index}/${totalCount}]`, end: '\t ', c: c.blueBright },
          { m: '(displayRoute)', c: c.underline },
          { m: `[${displayRoute.path}]`, c: c.yellow },
          { m: `<->` },
          { m: `[${docRoute ? `${docRoute.docs}` : 'x'}]`, c: c.yellow },
          { m: '(docs)', c: c.underline },
          {
            m: `${docRoute ? '[OK]' : '[-]'}`,
            c: docRoute ? c.green : undefined
          }
        ]
      }
      logger.transform(statusInfo)

      if (!docRoute) {
        return displayRoute
      }

      const { metadata, content } = docRoute.docs
        ? await getMDXContent(docRoute.docs)
        : { metadata: null, content: null }

      if (metadata) {
        outputArr.push({ folder: docRoute.folder, metadata })
      }

      if (metadata) {
        displayRoute.shortDescription = metadata
      }

      if (content) {
        displayRoute.longDescription = content
      }

      return displayRoute
    })
  )

  logger.step(`Show 'MDX' metadata: `)
  for (let i = 0; i < outputArr.length; i++) {
    const { folder, metadata } = outputArr[i]
    const metadataEmpty = Object.keys(metadata).length === 0
    const metadataInfo: TransformData = {
      textParts: [
        { m: `${i + 1}. [${folder}]:`, c: c.blueBright },
        {
          m: metadataEmpty
            ? '[None]'
            : `\n${JSON.stringify(metadata, null, 2)}`,
          c: c.white
        }
      ]
    }
    logger.transform(metadataInfo)
  }

  return displayRoutesAll
}

export async function forceRefreshCache() {
  try {
    await fs.unlink(CACHE_FILE)
    await setCacheState({ routes: false, docs: false, total_cache: false })
    logger.info('Cache file deleted and state reset')
  } catch (error) {
    logger.error('Error deleting cache file:', error)
  }
}

async function recalculateDocs() {

  // Implement logic to recalculate docs/index.json
  // This might involve reimplementing parts of doc_resolver.ts
}

export async function forceRefreshDocs() {
  try {
    await recalculateDocs()
    const currentState = await getCacheState()
    await setCacheState({ ...currentState, docs: false, total_cache: false })
    logger.info('Docs recalculated and state updated')
  } catch (error) {
    logger.error('Error refreshing docs:', error)
  }
}
