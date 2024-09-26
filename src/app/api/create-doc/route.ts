import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: Request) {
  const { id, content } = await request.json()
  const docPath = path.join(process.cwd(), 'docs', `${id}.mdx`)

  try {
    await fs.mkdir(path.dirname(docPath), { recursive: true })
    await fs.writeFile(docPath, content)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating file:', error)
    return NextResponse.json({ success: false, error: 'Failed to create file' }, { status: 500 })
  }
}
