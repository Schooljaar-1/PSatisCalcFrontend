import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Description  from './Description.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Topbar />
      <Description />
    </>
  )
}

export default App
