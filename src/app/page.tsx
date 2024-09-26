import HomeContent from '@/components/ui/HomeContent'
import fs from 'fs'
import path from 'path'
import { FormRoute, routesData } from './routes'

const defaultShortContent = '- No short information available'
const defaultLongContent = '- No detailed information available'

// handle missing 'docs' files
function getMDXContent(routePath: string, isShort: boolean) {
  const fileName = isShort ? 'short-info.mdx' : 'info.mdx'
  const filePath = path.join(process.cwd(), 'src', 'docs', routePath, fileName)

  if (!fs.existsSync(filePath)) {
    const content = isShort ? defaultShortContent : defaultLongContent
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content)
  }

  return fs.readFileSync(filePath, 'utf-8')
}

const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

// ensure 'docs' files exist and can be resolved resolve
function prepareRoutes(): FormRoute[] {
  return routesData.map((route) => {
    const normalizedPath = normalizePath(route.path)
    const shortDescription = getMDXContent(normalizedPath, true)
    const longDescription = getMDXContent(normalizedPath, false)

    return {
      ...route,
      shortDescription,
      longDescription
    }
  })
}

// End of server-side calculations
export default function Home() {
  const routes = prepareRoutes()

  return <HomeContent initialRoutes={routes} />
}
