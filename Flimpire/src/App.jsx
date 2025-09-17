import { useState } from 'react'
import Log_Anime from './components/Log_Anime'
import Log_Page from './components/Log_Page'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Log_Page />
    </>
  )
}

export default App
