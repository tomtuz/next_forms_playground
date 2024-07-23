import { JotaiProvider } from '@/providers/jotai'
import { ListPage } from '@/components/testing/jotai/ListPage'

export default function Home() {
  return (
    <JotaiProvider>
      <main>
        <ListPage />
      </main>
    </JotaiProvider>
  )
}
