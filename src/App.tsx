import { FormInput, Header } from './components'
import { TodoProvider } from './providers/TodoContext'

function App() {
  return (
    <TodoProvider>
      <main className="h-full w-[582px] flex flex-col items-center pt-20 gap-12">
        <Header />
        <FormInput />
      </main>
    </TodoProvider>
  )
}

export default App
