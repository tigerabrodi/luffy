import type { Todo } from '../schemas/todos'

import { useEffect, useState } from 'react'

import { Checkbox } from './Checkbox'
import { Menubar } from './Menubar'
import { useTodoDispatchContext } from '../hooks/useDispatchContext'
import { EDIT_TODO_DELAY } from '../lib/constants'

type ItemProps = {
  item: Todo
}

export const Item = ({ item }: ItemProps) => {
  const dispatch = useTodoDispatchContext()

  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(item.title)

  function onCheckedChange(checked: boolean) {
    dispatch({
      type: 'CHECK_TODO',
      payload: { id: item.id, isCompleted: checked },
    })
  }

  function onEdit() {
    setIsEditing(!isEditing)
  }

  function onDelete() {
    dispatch({ type: 'DELETE_TODO', payload: { id: item.id } })
  }

  useEffect(() => {
    let timeout: number | null = null

    if (isEditing && newTitle && newTitle !== item.title) {
      timeout = setTimeout(() => {
        dispatch({
          type: 'EDIT_TODO',
          payload: { id: item.id, title: newTitle },
        })
      }, EDIT_TODO_DELAY)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [dispatch, isEditing, item.id, item.title, newTitle])

  return (
    <li className="flex items-center gap-3 px-4 py-3 border border-gray-800 rounded-md">
      <Checkbox checked={item.isCompleted} onCheckedChange={onCheckedChange} />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          autoFocus
          onChange={(event) => setNewTitle(event.target.value)}
          onBlur={() => setIsEditing(false)}
          placeholder="Cook food"
          aria-label="Edit title"
          className="text-base bg-transparent font-medium text-gray-800 placeholder:opacity-80 focus:outline-none flex-grow"
        />
      ) : (
        <p className="text-base font-medium text-gray-800 flex-grow">
          {item.title}
        </p>
      )}

      <Menubar onEdit={onEdit} onDelete={onDelete} />
    </li>
  )
}
