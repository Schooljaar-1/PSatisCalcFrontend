import { useEffect, useState} from 'react';
import '../MainPage_Styling/global.css'
import '../MainPage_Styling/recipes.css'

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
                    <h1>Create or Select Recipes</h1>
                    <button className="toggleButton" onClick={toggleButton}><b>{buttonMessage}</b></button>
                </div>


{/* TODO: Import the components via if statement on isOn*/}

            </div>
        </div>
        </>
    );
}

export default Recipes