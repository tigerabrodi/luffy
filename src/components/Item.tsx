import type { Todo } from '../schemas/todos'

import { Checkbox } from './Checkbox'

type ItemProps = {
  item: Todo
}

export const Item = ({ item }: ItemProps) => {
  return (
    <li className="flex items-center gap-3 px-4 py-3 border border-gray-800 rounded-md">
      <Checkbox checked={item.isCompleted} onCheckedChange={() => {}} />
      <p className="text-base font-medium text-gray-800 flex-grow">
        {item.title}
      </p>
    </li>
  )
}
