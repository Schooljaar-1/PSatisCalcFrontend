import { useState } from 'react'
import Topbar from './Topbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Topbar />
    </>
  )
}

export default App
