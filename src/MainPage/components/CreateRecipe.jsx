import { useEffect, useState} from 'react';
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [query, setQuery] = useState("");

    const options = ["boter", "kaas", "Eieren"]

    const HandleUserInput = ( {target} ) => {
        setQuery(target.value)
    }


    return(
        <>
            <div className='createRecipeContainer'>

                <div className='createRecipeQueryAndSelecter'>

                    <div className='createRecipeSelectImage'>
                        <img 
                            className='itemImage'
                            src={`/recipeImages/${query}.png`}
                            alt={`${query}.png`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/recipeImages/unknown.png';
                            }}
                        />
                        <input className='createRecipeUserInputField' type="text" placeholder='Enter name of item...' onChange={HandleUserInput} id="recipe-name"/>
                    </div>
                    <div className='createRecipeSelectWindow'>
                        <p>KLaas</p>
                    </div>

                </div>

            </div>
        </>
    );

}

export default CreateRecipe;