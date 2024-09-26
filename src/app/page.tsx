import HomeContent from '@/components/ui/HomeContent'
import fs from 'fs/promises'
import path from 'path'
import { FormRoute, formRoutes } from './routes'

const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

async function getMDXContent(routePath: string, fileName: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'src', 'docs', routePath, fileName)
  try {
    await fs.access(filePath, fs.constants.R_OK)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return fileContent
  } catch (error) {
    return null
  }
}


async function prepareRoutes(): Promise<FormRoute[]> {
  // console.log("\nPreparing routes...")
  
  const preparedRoutes = await Promise.all(formRoutes.map(async (route) => {
    const normalizedPath = normalizePath(route.path)
    // console.log(`\n- Processing route: ${route.name}`)
    // console.log(`  Path: ${normalizedPath}`)

    const shortDescription = await getMDXContent(normalizedPath, 'short-info.mdx')
    const longDescription = await getMDXContent(normalizedPath, 'info.mdx')

    // console.log(`  Short description: ${shortDescription ? '[√]' : '[x]'}`)
    // console.log(`  Long description: ${longDescription ? '[√]' : '[x]'}`)

    if (shortDescription !== null || longDescription !== null) {
      // console.log(`  Updating route with new descriptions`)
      return {
        ...route,
        shortDescription: shortDescription || route.shortDescription,
        longDescription: longDescription || route.longDescription
      }
    }

    // console.log(`  No changes for this route`)
    return route
  }))

  // console.log("\nRoutes preparation completed")
  return preparedRoutes
}

export default async function Home() {
  console.log("\nRendering Home component")
  const routes = await prepareRoutes()
  console.log(`\nSummary:`)
  console.log(`  - Prepared ${routes.length} routes`)
  
  return <HomeContent initialRoutes={routes} />
}
