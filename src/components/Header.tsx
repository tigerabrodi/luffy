import { useTodoStateContext } from '../hooks/useStateContext'

export const Header = () => {
  const state = useTodoStateContext()

  const completedTodos = state.todos.filter((todo) => todo.isCompleted)
  const completedTodosCount = completedTodos.length
  const todosCount = state.todos.length

  return (
    <div className="flex items-center p-2 gap-16">
      <div className="flex flex-col items-center">
        <h1 className="sr-only">Luffy</h1>
        <h2 className="text-3xl font-bold text-gray-800">Todos done</h2>
        <p className="text-gray-700 font-medium text-base text-center">
          Keep working hard
        </p>
      </div>
      <div className="bg-gray-800 flex items-center justify-center size-32 rounded-full">
        <span className="text-blue-100 font-medium text-2xl">
          {completedTodosCount}/{todosCount}
        </span>
      </div>
    </div>
  )
}
