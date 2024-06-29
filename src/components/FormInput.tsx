import { useRef, useState } from 'react'

import { useTodoDispatchContext } from '../hooks/useDispatchContext'

export const FormInput = () => {
  const [todoValue, setTodoValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useTodoDispatchContext()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!todoValue) return

    dispatch({ type: 'ADD_TODO', payload: { title: todoValue } })
    setTodoValue('')
    inputRef.current?.focus()
  }

  return (
    <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        value={todoValue}
        onChange={(event) => setTodoValue(event.target.value)}
        placeholder="Wash dishes"
        className="flex-grow px-3 py-[10px] border border-gray-800 rounded-md text-gray-800 placeholder:opacity-80 text-lg font-medium bg-white focus:outline-none focus:shadow-md"
      />
      <button
        type="submit"
        className="bg-gray-800 px-4 rounded-lg text-blue-100 shadow-md h-full text-lg disabled:opacity-50"
        disabled={!todoValue}
      >
        Add item
      </button>
    </form>
  )
}
