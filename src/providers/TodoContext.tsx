import type { Action } from '../reducers/todo'
import type { Todo } from '../schemas/todos'
import type { ReactNode, Dispatch } from 'react'

import { createContext, useReducer } from 'react'

import { todoReducer } from '../reducers/todo'

export type State = {
  todos: Array<Todo>
}

const initialState: State = {
  todos: [],
}

export const TodoStateContext = createContext<State | undefined>(undefined)
export const TodoDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

type StateProviderProps = {
  children: ReactNode
}

const TodoProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export { TodoProvider }
