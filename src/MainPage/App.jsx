import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Description from './Description.jsx'
import Recipes from './Recipes.jsx'
import Flowchart from './Flowchart.jsx'
import SavedPage from './SavedPage.jsx'
import '../MainPage_Styling/app.css'

function App() {
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    return (
        <BrowserRouter>
            <div className='mainPage'>
                <div className='header'>
                    <Topbar />
                </div>

                <Routes>
                    <Route
                        path="/"
                        element={
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
                        }
                    />

                    <Route
                        path="/saved"
                        element={
                            <SavedPage />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App