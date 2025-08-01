import { useEffect, useState} from 'react';
import '../MainPage_Styling/global.css'
import '../MainPage_Styling/recipes.css'
import SelectRecipe from './components/SelectRecipe.jsx'

function Recipes(){
    const [isOn, setIsOn] = useState(false);
    const buttonMessage = isOn ? "SELECT" : "CREATE";

    const toggleButton = () => {
        setIsOn(prev => !prev);
    }

    return (
        <>
        <div className="recipesBox">
            <div className='recipesContent'>
                <div className='titleAndToggleBar'>
                    <h1>{isOn ? 'Create' : 'Select'} Recipes </h1>
                    <button className={`toggleButton ${isOn ? 'toggleOn' : 'toggleOff'}`} onClick={toggleButton}><b>{buttonMessage}</b></button>
                </div>
                <hr />
                <div className='selectAndCreate'>

                    {isOn ? <p>Kaas</p> : <SelectRecipe />}

                </div>
            </div>
        </div>
        </>
    );
}

export default Recipes