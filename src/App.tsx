import { useEffect } from 'react'

import { FormInput, Header } from './components'
import { List } from './components/List'
import { useTodoDispatchContext } from './hooks/useDispatchContext'
import { TODO_LOCAL_STORAGE_KEY } from './lib/constants'
import { todoSchema } from './schemas/todos'

function App() {
  const dispatch = useTodoDispatchContext()

  useEffect(() => {
    const todos = localStorage.getItem(TODO_LOCAL_STORAGE_KEY)

    if (todos) {
      dispatch({
        type: 'SET_TODOS',
        payload: { todos: todoSchema.array().parse(JSON.parse(todos)) },
      })
    }
  }, [dispatch])

  return (
    <main className="h-full w-[600px] flex flex-col items-center pt-20 gap-12">
      <Header />
      <FormInput />
      <List />
    </main>
  )
}

export default App
