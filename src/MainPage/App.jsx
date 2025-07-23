import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Description  from './Description.jsx'
import Recipes from './Recipes.jsx'
import Flowchart from './Flowschart.jsx'
import '../Styling/app.css'

function App() {
    return (
    <>
      <div className='mainPage'>
        <div className='header'>
          <Topbar />
        </div>
        <div className='main'>
          <div className='sidebar'>
            <Description />
            <Recipes />
          </div>
          <div className='content'>
            <Flowchart />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
