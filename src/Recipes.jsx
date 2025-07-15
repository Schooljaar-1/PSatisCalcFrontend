import { useEffect, useState} from 'react';
import './Styling/global.css'
import './Styling/recipes.css'

function Recipes(){
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    

    return (
        <>
        <div className="recipesBox">
            <div className='recipesContent'>
                <p>kaasje</p>
            </div>
        </div>
        </>
    );
}

export default Recipes