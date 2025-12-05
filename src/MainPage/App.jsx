import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Description  from './Description.jsx'
import Recipes from './Recipes.jsx'
import Flowchart from './Flowchart.jsx'
import '../MainPage_Styling/app.css'

function App() {
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    return (
    <>
      <div className='mainPage'>
        <div className='header'>
          <Topbar />
        </div>
        <div className='main'>
          <div className='sidebar'>
            <Description />
            <Recipes 
              selectedRecipes={selectedRecipes}
              setSelectedRecipes={setSelectedRecipes}
            />
          </div>
          <div className='content'>
            <Flowchart 
              recipes={selectedRecipes}
              setRecipes={setSelectedRecipes}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
