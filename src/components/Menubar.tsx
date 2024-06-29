import * as RadixMenubar from '@radix-ui/react-menubar'
import { Pen, EllipsisVertical, Trash } from 'lucide-react'

type MenubarProps = {
  onEdit: () => void
  onDelete: () => void
}

export const Menubar = ({ onEdit, onDelete }: MenubarProps) => {
  return (
    <RadixMenubar.Root>
      <RadixMenubar.Menu>
        <RadixMenubar.Trigger className="cursor-pointer text-gray-800 flex items-center justify-center">
          <EllipsisVertical size={24} />
        </RadixMenubar.Trigger>
        <RadixMenubar.Portal>
          <RadixMenubar.Content
            className="bg-gray-50 shadow-md flex flex-col w-28"
            align="end"
            side="bottom"
          >
            <RadixMenubar.Item
              className="flex items-center py-4 gap-2 text-gray-800 cursor-pointer hover:bg-gray-100 pl-[18px]"
              onClick={onEdit}
            >
              <Pen size={16} />
              <span className="text-gray-800 font-medium text-base">Edit</span>
            </RadixMenubar.Item>

            <RadixMenubar.Item
              className="flex items-center py-4 gap-2 text-gray-800 cursor-pointer hover:bg-gray-100 pl-[18px]"
              onClick={onDelete}
            >
              <Trash size={16} />
              <span className="text-gray-800 font-medium text-base">
                Delete
              </span>
            </RadixMenubar.Item>
          </RadixMenubar.Content>
        </RadixMenubar.Portal>
      </RadixMenubar.Menu>
    </RadixMenubar.Root>
  )
}
