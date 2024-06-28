import type { Todo } from '../schemas/todos'
import type { ReactNode, Dispatch } from 'react'

import { createContext, useReducer } from 'react'

export type State = {
  todos: Array<Todo>
}

export type Action = { type: 'ADD_TODO'; payload: string }

const initialState: State = {
  todos: [],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            title: action.payload,
            isCompleted: false,
          },
        ],
      }
    default:
      return state
  }
}

export const TodoStateContext = createContext<State | undefined>(undefined)
export const TodoDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

type StateProviderProps = {
  children: ReactNode
}

const TodoProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export { TodoProvider }
