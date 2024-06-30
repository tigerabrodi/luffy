# Todo App built with React

I decided to build another Todo App and try out two things:

- Context and Reducer pattern: Two contexts, one for the state and one for dispatch.
- View Transitions API: To animate the items when they are added or removed.

# Demo

{incoming}

# Get it up and running

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev`

# Context and Reducer pattern

## Problem with a single context

Whenever you update state in a context, all components that consume the context are re-rendered. Even if the state they consume isn't the one that changed.

This isn't always a problem, but it's not efficient. If a component is simply triggering an update to happen, it doesn't need to re-render. Therefore, it shouldn't.

To be clear: A component that consume a `setState` function shouldn't re-render when the state changes. It's only causing the update to happen but doesn't need to know about the state.

## Solution: Two contexts

The solution to this is to use two contexts and a reducer. One for the state and one for the dispatch.

Components that dispatch actions will not re-render when state changes.

Mind you, this isn't always needed and of course an overkill for a todo app, but I wanted to try it out and see how it re-renders behave.

<details>
  <summary>🍿 Todo Context Code</summary>

```tsx
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
```

</details>
