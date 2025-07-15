import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Description  from './Description.jsx'
import Recipes from './Recipes.jsx'

function App() {
    return (
    <>
      <div className='page'>
        <Topbar />
        <Description />
        <Recipes />
      </div>
    </>
  )
}

export default App
