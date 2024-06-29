import { Item } from './Item'
import { useTodoStateContext } from '../hooks/useStateContext'

export const List = () => {
  const state = useTodoStateContext()

  return (
    <ul className="empty:hidden flex flex-col w-[90%] gap-6">
      {state.todos.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  )
}
