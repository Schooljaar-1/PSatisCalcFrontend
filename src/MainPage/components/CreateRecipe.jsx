import { useEffect, useState} from 'react';
import recipeImageNames from '../../assets/recipeImageNames.json'
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    // ---------FETCHING DATA FROM BACKEND + STATUS CHECK-----------
    const [recipeData, setRecipeData] = useState(null)

    function FetchData() {
        fetch(`${API_URL}/api/Recipe`)
            .then((res) => res.json()) 
            .then((data) => {
                if ("error" in data) {
                    handleErrorMessage(data.error);
                    return; // This stops further processing
                }
                // Process the data here instead of in another .then()
                setRecipeData(data);
            })
            .catch((err) => {
                handleErrorMessage(err.message || "Failed to fetch recipes");
            });
    }

    useEffect(() => {
        FetchData()
    }, []);

    const handleErrorMessage = (error) => {
        alert(error);
    }
    //--------------------------------------------------------------

    // Recipe to be send back to the backend and saved
    const [recipe, setRecipe] = useState(
        {
            name: "",
            version: "",
            machine: "",
            amount: "",
            type: "",
            image: "",
            parts: []
        }
    );

    // Coupling the user input to the recipe object that will be send to backend
    const HandleUserInput = ({ target }) => {
        const { name, value } = target;

        setRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Generating search window items for recipe image selector
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
    
    // Generating search window items for parts selector
    let parts;
    if (recipeData === null || recipeData === undefined) {
    parts = (
        <div className="spinner"></div>
    );
    } 
    else {
        parts = recipeData
            .map(object => {
                return (
                    <p>hi</p>
                );
            });
    }

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
                    <div className='createRecipeLeftMenuItems'>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Name:</b></p>
                            <input 
                                className='createRecipeMenuInputs' 
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
                                className='createRecipeMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe machine type...' 
                                onChange={HandleUserInput} 
                                id="recipe-version" 
                                name="machine" 
                                value={recipe.machine}
                            /> 
                        </div>
                    </div>
                    <div className='createRecipeRightMenuItems'>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Version:</b></p>
                            <input 
                                className='createRecipeMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe version...' 
                                onChange={HandleUserInput} 
                                id="recipe-name" 
                                name="version" 
                                value={recipe.version}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Amount:</b></p>
                            <input 
                                className='createRecipeMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe amounter p/m...' 
                                onChange={HandleUserInput} 
                                id="recipe-version" 
                                name="amount" 
                                value={recipe.amount}
                            /> 
                        </div>
                    </div>
                </div>
                <div className='createRecipePartsSelector'>
                    <div className='CreateRecipePartName'>
                        <p><b>Part name:</b></p>
                        <input 
                            className='createRecipePartInputs' 
                            type="text" 
                            placeholder='Enter recipe amounter p/m...' 
                            // onChange={HandleUserPartsInput} 
                            id="recipe-version" 
                            name="amount" 
                            // value={recipe.amount}
                        />
                    </div>
                    <div className='createRecipeScrollablePartsWindow'>
                        {/* TODO: Add all parts with their name and image*/}
                        {parts}
                    </div>
                </div>
            </div>
        </>
    );

}

export default CreateRecipe;