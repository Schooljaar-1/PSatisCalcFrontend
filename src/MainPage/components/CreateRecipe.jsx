import { useEffect, useState} from 'react';
import recipeImageNames from '../../assets/recipeImageNames.json'
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [imageName, setimageName] = useState("");

    const HandleUserInput = ( {target} ) => {
        setimageName(target.value)
    }

    // Generating search window items
    let content;
    content = recipeImageNames
        .filter(object => imageName === null || object.replace(/\s+/g, '').toLowerCase().includes(imageName.replace(/\s+/g, '').toLowerCase()))
        .map(object => {
            const imageName = object.replace(/\s+/g, '');
            return (
                <div className='createObjectMapping' key={object} onClick={()=>setQuery(imageName)}>
                    <img 
                        className='queryItemImage'
                        src={`recipeImages/${imageName}.png`}
                        alt={`${object}.png`}
                    />
                    <p className='objectImageText'>{object}</p>
                </div>
            );
        });


    return(
        <>
            <div className='createRecipeContainer'>

                <div className='createRecipeQueryAndSelecter'>

                    <div className='createRecipeSelectImage'>
                        <img 
                            className='itemImage'
                            src={`/recipeImages/${imageName}.png`}
                            alt={`${imageName}.png`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/recipeImages/unknown.png';
                            }}
                        />
                        <input 
                            className='createRecipeUserInputField' 
                            type="text" 
                            placeholder='Enter name of item...' 
                            onChange={HandleUserInput} 
                            id="recipe-name" 
                            value={imageName}
                        />
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