'use client'

import { Button } from '@/cn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/cn/ui/card'
import { Input } from '@/cn/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { formRoutes } from './routes'

const categories = ['All', ...new Set(formRoutes.map((formRoute) => formRoute.category))]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTests = formRoutes.filter(
    (formRoute) =>
      (selectedCategory === 'All' || formRoute.category === selectedCategory) &&
      (formRoute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formRoute.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className=''>
      <h1 className="mb-8 text-center text-4xl font-bold">
        Form Performance Playground
      </h1>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Input
          type="search"
          placeholder="Search Forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-64"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTests.map((formRoute) => (
          <Link href={`/forms/${formRoute.id}`} key={formRoute.id} className="block">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{formRoute.name}</CardTitle>
                <CardDescription>{formRoute.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  Category: {formRoute.category}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
