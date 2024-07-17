import { Button, Input } from '@/cn/ui'
import { useRenderCount } from '@/hooks/useCountRedraw'
import { Form } from '@/types/react'
import { Control, Controller } from 'react-hook-form'

interface QuestionHeaderProps {
  index: number
  control: Control<Form>
  remove: () => void
}

export function QuestionHeader({
  index,
  control,
  remove
}: QuestionHeaderProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  return (
    <div className="mb-2 flex items-center justify-center bg-blue-100 outline outline-1">
      <div className="flex w-full items-center justify-center gap-2">
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

        <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
          <span>{renderCount}</span>
        </span>
      </div>
    </div>
  )
}
