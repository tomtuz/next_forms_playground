import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { path: routePath } = await request.json()
    const normalizedPath = routePath.startsWith('/')
      ? routePath.slice(1)
      : routePath
    const docsDir = path.join(process.cwd(), 'src', 'docs', normalizedPath)

    console.log('path: ', routePath)
    console.log('normalizedPath: ', normalizedPath)
    console.log('docsDir: ', docsDir)

    fs.mkdirSync(docsDir, { recursive: true })

    const shortFilePath = path.join(docsDir, 'short-info.mdx')
    const longFilePath = path.join(docsDir, 'info.mdx')

    let message = 'Docs updated successfully'
    let filepath = docsDir

    if (!fs.existsSync(shortFilePath)) {
      fs.writeFileSync(shortFilePath, '- Short description created')
      message = 'Docs created successfully'
      filepath = shortFilePath
    }

    if (!fs.existsSync(longFilePath)) {
      fs.writeFileSync(longFilePath, '- Long description created')
      message = 'Docs created successfully'
      filepath = longFilePath
    }

    return NextResponse.json({ message, filepath })
  } catch (error) {
    console.error('Error creating/updating docs:', error)
    return NextResponse.json(
      { error: 'Failed to create/update docs' },
      { status: 500 }
    )
  }
}
