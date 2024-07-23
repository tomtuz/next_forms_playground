export interface ComponentItem {
  name: string
  data: number
}

import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

interface ListStore {
  items: ComponentItem[]
  addItem: (item: ComponentItem) => void
  removeItem: (index: number) => void
}

const listStore = (set: any) => ({
  items: [] as ComponentItem[],
  addItem: (item: ComponentItem) =>
    set(
      (state: ListStore) => ({ items: [...state.items, item] }),
      false,
      'ADD_ITEM'
    ),
  removeItem: (index: number) =>
    set(
      (state: ListStore) => ({
        items: state.items.filter((_, i) => i !== index)
      }),
      false,
      'REMOVE_ITEM'
    )
})

const useListStore = create<ListStore>()(
  subscribeWithSelector(
    devtools(listStore, {
      name: 'List Store',
      enabled: process.env.NODE_ENV === 'development'
    })
  )
)

export default useListStore
