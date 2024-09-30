import { useState } from 'react'

type StorageKey = {
  keyName: string
  defaultValue: CacheState
}

interface CacheState {
  routes: boolean,
  docs: boolean,
  total_cache: boolean
}

export interface UserStorage extends StorageKey {
  keyName: 'cacheState'
  defaultValue: CacheState
}

// @ts-ignore
export const seLocalStorage = (key: StorageKey): StorageKey['defaultValue'] => {
  const { keyName, defaultValue } = key

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        return JSON.parse(value)
      }
      else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    }
    catch (err) {
      return defaultValue
    }
  })

  // @ts-ignore
  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    }
    catch (err) {
      console.log(err)
    }
    setStoredValue(newValue)
  }

  // @ts-ignore
  return [storedValue, setValue]
}
