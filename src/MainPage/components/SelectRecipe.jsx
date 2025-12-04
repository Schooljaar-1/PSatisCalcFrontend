import { useEffect, useState} from 'react';
import '../../MainPage_Styling/global.css'
import './selectRecipe.css'
import mockData from './mockData.json'

function SelectRecipe({ selectedRecipes, setSelectedRecipes}){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [recipeData, setRecipeData] = useState(null);
    const [userInput, setUserInput] = useState(null);
    const [apiIsOnline, setApiIsOnline] = useState(false);

    
    // ---------FETCHING DATA FROM BACKEND + STATUS CHECK-----------
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

    const APIStatusCheck = async () => {
        try{
            const res =  await fetch(`${API_URL}/api/Recipe/status`)
            if(res.status === 200){
                setApiIsOnline(true);
            }
        }
        catch{
            setApiIsOnline(false);
        }
    }
    useEffect(() => {
        APIStatusCheck();
    }, []);
    // ---------FETCHING DATA FROM BACKEND + STATUS CHECK-----------

    // ---------ADDITIONAL FUNCTIONS--------------------------------
    const handleUserInput = ({ target }) => {
        setUserInput(target.value)
    }

    const handleRemoveRecipeByName = async (recipeName) => {
        try {
            const res = await fetch(`${API_URL}/api/Recipe/name/${recipeName}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                alert("Error deleting recipe:", errorMessage);
                return;
            }

            const message = await res.text();
            alert(message);
            // Removing also from local array
            setRecipeData((prev) => prev.filter(r => r.name !== recipeName));

        } 
        catch (error) {
            console.error("Network or server error:", error);
        }
    };

    const addRecipeToSelected = (object) => {
        if (!selectedRecipes.some(r => r.name === object.name)) {
            setSelectedRecipes([...selectedRecipes, object]);
        }
    }
    // ---------ADDITIONAL FUNCTIONS--------------------------------
    
    let content;

    // TODO: Use API status check to prevent infinite spinner border when no recipes are present. (No data + API online --> No recipes found)
    if (recipeData === null || recipeData === undefined) {
    content = (
        <div className="spinner"></div>
    );
    } 
    else {
    // console.log(content);
    content = recipeData.filter(object =>userInput === null || object.name.toLowerCase().includes(userInput.toLowerCase()))
    
    // TODO: the onclick things under here should add the recipe in an array to be shown at the flowchart div. From there amount can be chosen and also ofc be deselected. Try to see if you can get deselect to happen at right click
    .map(object => (
        <div className='objectMapping' key={object.name}>
            <div className='objectImageDiv' onClick={() => addRecipeToSelected(object)}>
                <img 
                    className='objectImage'
                    src={`/recipeImages/${object.image}.png`}
                    alt={object.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/recipeImages/unknown.png';
                    }}
                />
            </div>
            <div className='objectDescriptionDiv' onClick={() => addRecipeToSelected(object)}>
                <div className='objectBasicDescription'>
                    <p><b>Name:</b> {object.name}</p>
                    <p><b>Machine:</b> {object.machine}</p>
                    <p><b>Version:</b> {object.version}</p>
                </div>
                <div className='objectAdvancedDescriptionDiv' onClick={() => addRecipeToSelected(object)}>
                    <p><b>Parts:</b> {object.parts.map(part => `${part.partName}(${part.amount.teller}/${part.amount.noemer})`).join(', ')}</p>
                    <p><b>Amount:</b> {object.amount.teller}/{object.amount.noemer} per minute</p>
                </div>
                <div className='objectEditAndDelete'>
                    <div className='objectDelete'>
                        <button className='deleteButton' onClick={() => handleRemoveRecipeByName(object.name)}><b>DELETE</b></button>                    
                    </div>
                    <div className='objectEdit'>
                        {/* TODO: Make edit function into backend */}
                        <button className='editButton'><b>EDIT</b></button>
                    </div>
                </div>
            </div>
        </div>
    ));
    }
    
    return (
        <>
        <div className='selectRecipeContainer'>
            <input className='userInputField' type="text" placeholder='Enter a recipe name...' onChange={handleUserInput} id="recipe-name"/>
            <div className='generatedDivList'>
                {content}
            </div>
        </div>
        </>
    );
}

export default SelectRecipe