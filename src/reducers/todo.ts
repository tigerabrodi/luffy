import type { State } from '../providers/TodoContext'

export type Action =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'CHECK_TODO'; payload: { id: string; isCompleted: boolean } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }

export const todoReducer = (state: State, action: Action): State => {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          title: action.payload.title,
          isCompleted: false,
        },
      ],
    }
  }

  if (action.type === 'CHECK_TODO') {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: action.payload.isCompleted }
          : todo
      ),
    }
  }

  if (action.type === 'DELETE_TODO') {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload.id),
    }
  }

  if (action.type === 'EDIT_TODO') {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      ),
    }
  }

  return state
}
