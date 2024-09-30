import { formRoutes } from '@/app/routes'
import debounce from 'lodash/debounce'
import { useCallback, useMemo, useState } from 'react'

export function useHeaderSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const debouncedSetSearchTerm = useMemo(
    () => debounce(setDebouncedSearchTerm, 300),
    []
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      debouncedSetSearchTerm(e.target.value)
    },
    [debouncedSetSearchTerm]
  )

  const filteredFormRoutes = useMemo(() => {
    const lowercaseSearchTerm = debouncedSearchTerm.toLowerCase()
    return formRoutes.filter(
      (formRoute) =>
        formRoute.name.toLowerCase().includes(lowercaseSearchTerm) ||
        formRoute.category.toLowerCase().includes(lowercaseSearchTerm)
    )
  }, [debouncedSearchTerm])

  return {
    searchTerm,
    handleSearchChange,
    filteredFormRoutes
  }
}
