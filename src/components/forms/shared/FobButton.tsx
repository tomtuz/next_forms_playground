import { TrashIcon } from 'lucide-react'

interface FobButtonProps {
  children?: React.ReactNode
  onClickDelete?: () => void
}

// FOB (Floating Action Button)
export function FobButton({ children, onClickDelete }: FobButtonProps) {
  return (
    <button
      type="button"
      className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 rounded-full bg-red-500 p-2 text-white transition duration-150 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      onClick={onClickDelete}
    >
      {children || <TrashIcon size={20} />}
    </button>
  )
}
