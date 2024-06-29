import type { Todo } from '../schemas/todos'

import { Checkbox } from './Checkbox'
import { Menubar } from './Menubar'
import { useTodoDispatchContext } from '../hooks/useDispatchContext'

type ItemProps = {
  item: Todo
}

export const Item = ({ item }: ItemProps) => {
  const dispatch = useTodoDispatchContext()

  function onCheckedChange(checked: boolean) {
    dispatch({
      type: 'CHECK_TODO',
      payload: { id: item.id, isCompleted: checked },
    })
  }

  function onEdit() {
    // dispatch({ type: 'EDIT_TODO', payload: { id: item.id } })
  }

  function onDelete() {
    dispatch({ type: 'DELETE_TODO', payload: { id: item.id } })
  }

  return (
    <li className="flex items-center gap-3 px-4 py-3 border border-gray-800 rounded-md">
      <Checkbox checked={item.isCompleted} onCheckedChange={onCheckedChange} />

      <p className="text-base font-medium text-gray-800 flex-grow">
        {item.title}
      </p>

      <Menubar onEdit={onEdit} onDelete={onDelete} />
    </li>
  )
}
