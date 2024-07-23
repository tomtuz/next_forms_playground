'use client'

import { useAtom } from 'jotai'
import { componentListAtom } from '@/stores/jotai'
import type { ComponentItem } from '@/stores/jotai'
import { useState } from 'react'
import { Button, Card, Input } from '@/cn/ui'

export function ListPage() {
  const [list, setList] = useAtom(componentListAtom)
  const [newItemName, setNewItemName] = useState('')
  const [newItemData, setNewItemData] = useState(0)

  const addItem = () => {
    const newItem: ComponentItem = { name: newItemName, data: newItemData }
    setList((prevList) => [...prevList, newItem])
    setNewItemName('')
    setNewItemData(0)
  }

  const removeItem = (index: number) => {
    setList((prevList) => prevList.filter((_, i) => i !== index))
  }

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <h1>Jotai List</h1>
        <Card className="flex flex-col">
          {list.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-2">
                <div className="h-full rounded-md bg-red-200 p-2">
                  {item.name}
                </div>
                <div className="h-full rounded-md bg-red-300 p-2">
                  {item.data}
                </div>
                <Button onClick={() => removeItem(index)}>Remove</Button>
              </div>
            </div>
          ))}
        </Card>

        <div>
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Component Name"
          />
          <Input
            type="number"
            value={newItemData}
            onChange={(e) => setNewItemData(Number(e.target.value))}
            placeholder="Data"
          />
          <Button onClick={addItem}>Add Item</Button>
        </div>
      </nav>
    </div>
  )
}
