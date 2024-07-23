import { atom } from 'jotai'

export interface ComponentItem {
  name: string
  data: number
}

export const componentListAtom = atom<ComponentItem[]>([])
componentListAtom.debugLabel = 'componentListAtom'
