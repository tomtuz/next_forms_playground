export interface ComponentItem {
  name: string
  data: number
}

import { atom, selector } from 'recoil'

export const componentListState = atom<ComponentItem[]>({
  key: 'componentListState',
  default: []
})

export const componentListStatsState = selector({
  key: 'componentListStatsState',
  get: ({ get }) => {
    const list = get(componentListState)
    return {
      count: list.length,
      totalData: list.reduce((sum, item) => sum + item.data, 0)
    }
  }
})
