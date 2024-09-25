import { Textarea } from '@cn/textarea'

interface LongInputProps {
  id?: string
  placeholder: string
}

export function LongInput({
  id,
  placeholder = 'Type here...'
}: Readonly<LongInputProps>) {
  return <Textarea id={id} placeholder={placeholder} />
}
