import { forceRefreshCache } from '@/utils/cache_docs'
import { NextResponse } from 'next/server'

export async function POST() {
  await forceRefreshCache()
  return NextResponse.json({ message: 'Cache refreshed' })
}
