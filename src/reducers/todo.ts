import type { State } from '../providers/TodoContext'
import type { Todo } from '../schemas/todos'

import { TODO_LOCAL_STORAGE_KEY } from '../lib/constants'

export type Action =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'CHECK_TODO'; payload: { id: string; isCompleted: boolean } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }
  | { type: 'SET_TODOS'; payload: { todos: Array<Todo> } }

export const todoReducer = (state: State, action: Action): State => {
  if (action.type === 'ADD_TODO') {
    const newTodos = [
      ...state.todos,
      {
        id: Date.now().toString(),
        title: action.payload.title,
        isCompleted: false,
      },
    ]

    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(newTodos))

    return {
      ...state,
      todos: newTodos,
    }
  }

  if (action.type === 'CHECK_TODO') {
    const newTodos = state.todos.map((todo) =>
      todo.id === action.payload.id
        ? { ...todo, isCompleted: action.payload.isCompleted }
        : todo
    )

    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(newTodos))

    return {
      ...state,
      todos: newTodos,
    }
  }

  if (action.type === 'DELETE_TODO') {
    const newTodos = state.todos.filter((todo) => todo.id !== action.payload.id)

    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(newTodos))

    return {
      ...state,
      todos: newTodos,
    }
  }

  if (action.type === 'EDIT_TODO') {
    const newTodos = state.todos.map((todo) =>
      todo.id === action.payload.id
        ? { ...todo, title: action.payload.title }
        : todo
    )

    localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(newTodos))

    return {
      ...state,
      todos: newTodos,
    }
  }

  return state
}
