import { Button, Input } from '@/cn/ui'
import { Form } from '@/types/react'
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'

interface QuestionHeaderProps {
  index: number
  remove: (index: number) => void
}

export function QuestionTitle({ index, remove }: QuestionHeaderProps) {
  const renderCount = useRenderCount()
  const { register } = useFormContext<Form>()

  return (
    <div className="relative mb-2 flex items-center justify-center bg-blue-100 p-4 outline outline-1">
      <div className="flex w-full items-center justify-center gap-2 bg-blue-200">
        <div className="flex flex-col">
          <div>Question Title</div>
          <div className="flex">
            <input
              {...register(`fields.${index}.label`)}
              placeholder="Question"
              className="w-full"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-red-100"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      {renderCountElement(renderCount, 'QuestionTitle')}
    </div>
  )
}
