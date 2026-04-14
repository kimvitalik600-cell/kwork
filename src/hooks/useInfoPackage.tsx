import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { InfoPackageItem, CatalogObject } from '@/types'

interface InfoPackageContextType {
  items: InfoPackageItem[]
  addItem: (object: CatalogObject) => void
  removeItem: (objectId: string) => void
  clearPackage: () => void
  itemCount: number
  totalCompensation: number
  hasItem: (objectId: string) => boolean
}

const InfoPackageContext = createContext<InfoPackageContextType | null>(null)

export function InfoPackageProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InfoPackageItem[]>(() => {
    const stored = localStorage.getItem('rulwear-info-package')
    return stored ? JSON.parse(stored) : []
  })

  const persist = (newItems: InfoPackageItem[]) => {
    setItems(newItems)
    localStorage.setItem('rulwear-info-package', JSON.stringify(newItems))
  }

  const addItem = useCallback((object: CatalogObject) => {
    setItems(prev => {
      if (prev.some(i => i.objectId === object.id)) return prev
      const newItems = [...prev, { objectId: object.id, object, addedAt: new Date().toISOString() }]
      localStorage.setItem('rulwear-info-package', JSON.stringify(newItems))
      return newItems
    })
  }, [])

  const removeItem = useCallback((objectId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.objectId !== objectId)
      localStorage.setItem('rulwear-info-package', JSON.stringify(newItems))
      return newItems
    })
  }, [])

  const clearPackage = useCallback(() => {
    persist([])
  }, [])

  const hasItem = useCallback((objectId: string) => {
    return items.some(i => i.objectId === objectId)
  }, [items])

  return (
    <InfoPackageContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearPackage,
        itemCount: items.length,
        totalCompensation: items.reduce((sum, i) => sum + i.object.compensation, 0),
        hasItem,
      }}
    >
      {children}
    </InfoPackageContext.Provider>
  )
}

export function useInfoPackage() {
  const context = useContext(InfoPackageContext)
  if (!context) throw new Error('useInfoPackage must be used within InfoPackageProvider')
  return context
}
