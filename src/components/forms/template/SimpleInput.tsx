'use client'

import { Button } from '@cn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@cn/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@cn/dialog'
import { Input } from '@cn/input'
import { useEffect, useState } from 'react'

export default function SimpleInputTest() {
  const [inputValue, setInputValue] = useState('')
  const [renderCount, setRenderCount] = useState(0)
  const [savedData, setSavedData] = useState<string[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('simpleInputData')
    if (storedData) {
      setSavedData(JSON.parse(storedData))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setRenderCount((prev) => prev + 1)
  }

  const handleSave = () => {
    const newData = [...savedData, inputValue]
    setSavedData(newData)
    localStorage.setItem('simpleInputData', JSON.stringify(newData))
    setInputValue('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Input Performance Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleChange}
          />
          <div>
            <p>Input value: {inputValue}</p>
            <p>Render count: {renderCount}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => setRenderCount(0)}>Reset Count</Button>
            <Button onClick={handleSave}>Save Input</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Saved Data</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Saved Inputs</DialogTitle>
                  <DialogDescription>
                    Here are all the inputs you've saved:
                  </DialogDescription>
                </DialogHeader>
                <ul className="mt-4 space-y-2">
                  {savedData.map((data, index) => (
                    <li key={index} className="rounded bg-gray-100 p-2">
                      {data}
                    </li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
