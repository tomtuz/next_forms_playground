import { forceRefreshDocs } from '@/utils/cache_docs'
import { NextResponse } from 'next/server'

export async function POST() {
  await forceRefreshDocs()
  return NextResponse.json({ message: 'Docs refreshed' })
}
