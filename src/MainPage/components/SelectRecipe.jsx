import { useEffect, useState} from 'react';
import '../../MainPage_Styling/global.css'
import './selectRecipe.css'

function SelectRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log(API_URL);

    const [recipeData, setRecipeData] = useState(null);
    const [userInput, setUserInput] = useState(null);
    
    useEffect(() => {
        fetch(`${API_URL}/api/Recipe`)
            .then((res) => res.json()) 
            .then((data) => {
                setRecipeData(data);
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }, []);

    // console.log(recipeData);

    const handleErrorMessage = (error) => {
        alert(error);
    }

    const handleUserInput = ({ target }) => {
        setUserInput(target.value)
    }
    
    return (
        <>
        <div className='selectRecipeContainer'>
            <input className='userInputField' type="text" placeholder='Enter a recipe name...' onChange={handleUserInput} id="recipe-name"/>
            <p>{recipeData === null ? <i>Loading...</i> : 'worked'}</p>
        </div>
        </>
    )
}

export default SelectRecipe