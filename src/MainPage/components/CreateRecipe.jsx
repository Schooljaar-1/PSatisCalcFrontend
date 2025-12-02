import { useEffect, useState} from 'react';
import recipeImageNames from '../../assets/recipeImageNames.json'
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [recipe, setRecipe] = useState(
        {
            name: "",
            version: "",
            machine: "",
            amount: 0,
            type: "",
            image: "",
            parts: []
        }
    );

    const HandleUserInput = ({ target }) => {
        const { name, value } = target;

        setRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Generating search window items
    let content;
    content = recipeImageNames
        .filter(object => !recipe.image || object.replace(/\s+/g, '').toLowerCase().includes(recipe.image.replace(/\s+/g, '').toLowerCase()))
        .map(object => {
            const imageName = object.replace(/\s+/g, '');
            return (
                <div className='createObjectMapping' key={object} onClick={() => setRecipe(prev => ({
                    ...prev,
                    image: imageName
                }))}>
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
                            src={`/recipeImages/${recipe.image}.png`}
                            alt={`${recipe.image}.png`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/recipeImages/unknown.png';
                            }}
                        />
                        <input 
                            className='createRecipeUserInputField' 
                            type="text" 
                            placeholder='Enter name of item for image reference...' 
                            onChange={HandleUserInput} 
                            id="recipe-name"
                            name="image" 
                            value={recipe.image}/>
                    </div>
                    <div className='createRecipeSelectWindow'>
                        {content}
                    </div>

                </div>
                <div className='createRecipeMainInfo'>
                {/* TODO: Create input fields for main recipe information, after generate parts dynamically max 3 I believe. */}
                    <div className='createRecipeLeftMenuItems'>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Name:</b></p>
                            <input 
                                className='createRecipeLeftMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe name...' 
                                onChange={HandleUserInput} 
                                id="recipe-name" 
                                name="name" 
                                value={recipe.name}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Machine:</b></p>
                            <input 
                                className='createRecipeLeftMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe machine type...' 
                                onChange={HandleUserInput} 
                                id="recipe-version" 
                                name="machine" 
                                value={recipe.machine}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Version:</b></p>
                            <input 
                                className='createRecipeLeftMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe version...' 
                                onChange={HandleUserInput} 
                                id="recipe-version" 
                                name="version" 
                                value={recipe.version}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default CreateRecipe;