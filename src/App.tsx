import { FormInput, Header } from './components'
import { List } from './components/List'
import { TodoProvider } from './providers/TodoContext'

function App() {
  return (
    <TodoProvider>
      <main className="h-full w-[582px] flex flex-col items-center pt-20 gap-12">
        <Header />
        <FormInput />
        <List />
      </main>
    </TodoProvider>
  )
}

export default App
