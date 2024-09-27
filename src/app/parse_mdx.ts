
import { RouteInfo, getProjectPaths } from '@/utils/doc_resolver'
import { createCLILogger } from '@/utils/logger/logger.cli'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'
import { appConfig } from '../config/app'
import { FormRoute, formRoutes } from './routes'

// import { matter } from 'vfile-matter'
// import { read } from 'to-vfile'

const logger = createCLILogger()
logger.setLevels(appConfig.loggingMode)

async function getMDXContent(filePath) {
  try {
    await fs.access(filePath, fs.constants.R_OK)
    // const fileContent = await read(filePath, 'utf8')
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // using 'gray-matter'
    const { data: frontmatter, content } = matter(fileContent);

    // logger.step("FrontMatter: ", frontmatter)
    // logger.step("Content: ", content)

    return {
      metadata: frontmatter,
      content,
    };

  } catch (error) {
    return { metadata: null, content: null}
  }
}

// async function getMDXContent(
//   filePath: string,
// ): Promise<any> {
//   try {
//     await fs.access(filePath, fs.constants.R_OK)
//     const fileContent = await read(filePath, 'utf8')
//     await matter(fileContent)

//     const content = fileContent.value || null;
//     const frontMatter = fileContent.data.matter || null;

//     logger.step("FrontMatter: ", frontMatter)
//     logger.step("Content: ", content)

//     return { metadata: frontMatter, content}

//   } catch (error) {
//     return { metadata: null, content: null}
//   }
// }

async function getDocsContent(
  routePath: string
): Promise<{ metadata: any | null; content: any | null }> {
  const filePath = path.join(process.cwd(), routePath)
  logger.info(`getMDX total filePath: ${filePath}`)

  try {
    // Dynamic import of MDX file
    // const mdxModule = await import(`../../${routePath}`)
    // const mdxModule = await getMDXContent(routePath)
    const { metadata, content } = await getMDXContent(routePath)
    if (content) {
      logger.info('-------------------------')
      // logger.info(`mdxModule [${routePath}]): `, content)
      // logger.info("type mdxModule: ", typeof content)
    }

    // const mdxModule = await import(routePath)
    // logger.info(`Successfully loaded MDX for route: ${routePath}`)

    // logger.info('metadata: ', metadata)
    
    // The default export is the React component for the MDX content
    // const content = mdxModule.default

    // if (!metadata || !metadata.shortDescription) {
    //   console.warn(
    //     `Missing shortDescription in metadata for route: ${routePath}`G
    //   )
    // }

    return {
      metadata: metadata,
      content: content
    }
  } catch (error) {
    console.error(`Error loading MDX for route: ${routePath}`, error)
    return {
      metadata: null,
      content: null
    }
  }
}


async function prepareRoutes(
  displayRoutes: FormRoute[],
  docRoutes: RouteInfo[]
): Promise<FormRoute[]> {
  const displayRoutesAll = await Promise.all(
    displayRoutes.map(async (displayRoute, index) => {
      // logger.verbose('docRoutes[displayRoute.path]: ', displayRoute.path)
      const docRoute = docRoutes.find((docItem) => {
        // console.warn("docItem.docs: ", docItem.folder)
        // console.warn("displayRoute.path: ", displayRoute.path)
        // console.warn("--------------------\n")
        return docItem.folder === displayRoute.path
      })

      if (!docRoute) {
        // logger.warn(
        //   `${index + 1}/${displayRoutes.length}\tdocRoute missing '${displayRoute.path}', skipping...`
        // )
        return displayRoute
      }

      // console.warn('found: ', docRoute)
      const { metadata, content } = docRoute.docs
        ? await getDocsContent(docRoute.docs)
        : { metadata: null, content: null }


      // console.warn('metadata: ', metadata)
      // console.warn('content: ', content)

      if (metadata) {
        displayRoute.shortDescription = metadata || "nothing"
      }

      if (content) {
        displayRoute.longDescription = content || "nothing"
      }

      // logger.struct('displayRoute: ', displayRoute)
      return displayRoute
    })
  )

  return displayRoutesAll
}

async function Homeris() {
  const routePaths = await getProjectPaths()
  const routeDisplayArr = await prepareRoutes(formRoutes, routePaths)

  // logger.step(`√ routeDisplayArr:`, routeDisplayArr)
}

// getMDXContent("C:\\rcm\\_react\\play_nextjs_forms\\src\\docs\\forms_vanilla.mdx")
Homeris()
