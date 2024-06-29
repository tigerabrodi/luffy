import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import '@fontsource-variable/inter'
import './index.css'
import { TodoProvider } from './providers/TodoContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
)
