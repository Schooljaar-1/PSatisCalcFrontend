import { useEffect, useState} from 'react';
import recipeImageNames from '../../assets/recipeImageNames.json'
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [query, setQuery] = useState("");

    const HandleUserInput = ( {target} ) => {
        setQuery(target.value)
    }

    let content;
    content = recipeImageNames.filter(object => query===null ||  object.toLowerCase().includes(query.toLowerCase()))
    .map(object => (
        <div className='createObjectMapping'>
            <p>hello</p>
        </div>
    ));


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
                        {content}
                    </div>

                </div>

            </div>
        </>
    );

}

export default CreateRecipe;