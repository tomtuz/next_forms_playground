import { FormRoute, formRoutes } from '@/app/routes'
import { RouteInfo, getProjectPaths } from '@/utils/doc_resolver'
import { getLogger } from '@/utils/logger'
import { TransformData } from '@/utils/logger/types'
import fs from 'fs/promises'
import matter from 'gray-matter'
import c from 'picocolors'

const logger = getLogger({
  Info: true,
  Debug: true,
  Verbose: false
})

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

    return {
      metadata: frontmatter,
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
          { m: `${docRoute ? '[OK]' : '[-]'}`, c: docRoute ? c.green : null }
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
        displayRoute.shortDescription = metadata || 'nothing'
      }

      if (content) {
        displayRoute.longDescription = content || 'nothing'
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

async function RunParse() {
  logger.verbose('logLevels (parse_mdx.tsx):', logger.getLoggerInfo())
  const routePaths = await getProjectPaths()
  const routeDisplayArr = await prepareRoutes(formRoutes, routePaths)

  logger.verbose('√ routeDisplayArr:\n', routeDisplayArr)
}

RunParse()
