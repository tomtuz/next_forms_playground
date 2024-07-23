'use client'

import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { componentListState, componentListStatsState } from '@/stores/recoil'
import type { ComponentItem } from '@/stores/recoil'
import { Card, Button, Input } from '@/cn/ui'

export function ListPage() {
  const [list, setList] = useRecoilState(componentListState)
  const stats = useRecoilValue(componentListStatsState)
  const [newItemName, setNewItemName] = useState('')
  const [newItemData, setNewItemData] = useState(0)

  const addItem = () => {
    const newItem: ComponentItem = { name: newItemName, data: newItemData }
    setList((oldList) => [...oldList, newItem])
    setNewItemName('')
    setNewItemData(0)
  }

  const removeItem = (index: number) => {
    setList((oldList) => oldList.filter((_, i) => i !== index))
  }

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <h1>Recoil List</h1>
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
