import { Button, Input } from '@/cn/ui'
import { Form } from '@/types/react'
import { Control, Controller } from 'react-hook-form'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'

interface QuestionHeaderProps {
  index: number
  control: Control<Form>
  remove: () => void
}

export function QuestionTitle({ index, control, remove }: QuestionHeaderProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  return (
    <div className="relative mb-2 flex items-center justify-center bg-blue-100 p-4 outline outline-1">
      <div className="flex w-full items-center justify-center gap-2 bg-blue-200">
        <div className="flex flex-col">
          <div>Question Title</div>
          <div className="flex">
            <Controller
              name={`fields.${index}.label`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Question" className="w-full" />
              )}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={remove}
              className="bg-red-100"
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
