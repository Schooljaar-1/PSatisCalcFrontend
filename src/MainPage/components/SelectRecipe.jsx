import { useEffect, useState} from 'react';
import '../../MainPage_Styling/global.css'
import './selectRecipe.css'
import mockData from './mockData.json'

function SelectRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [recipeData, setRecipeData] = useState(null);
    const [userInput, setUserInput] = useState(null);
    
    // ---------FETCHING DATA FROM BACKEND-----------
    function FetchData() {
        fetch(`${API_URL}/api/Recipe`)
            .then((res) => res.json()) 
            .then((data) => {
                setRecipeData(data);
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    useEffect(() => {
        FetchData()
    }, []);

    const handleErrorMessage = (error) => {
        alert(error);
    }

    const handleUserInput = ({ target }) => {
        setUserInput(target.value)
    }
    // ---------FETCHING DATA FROM BACKEND-----------
    
    let content;

    if (recipeData === null) {
    content = (
        <div className="spinner"></div>
    );
    } 
    else {
    content = recipeData
    .filter(object =>
        userInput === null || object.name.toLowerCase().includes(userInput.toLowerCase())
    )
    // TODO: the onclick things under here should add the recipe in an array to be shown at the flowchart div. From there amount can be chosen and also ofc be deselected. Try to see if you can get deselect to happen at right click
    .map(object => (
        <div className='objectMapping' key={object.name}>
            <div className='objectImageDiv' onClick={() => console.log(`Clicked item: ${object.name}`)}>
                <img 
                    className='objectImage'
                    src={`/recipeImages/${object.name.replace(/\s+/g, '_')}_image.png`}
                    alt={object.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/recipeImages/unknown.png';
                    }}
                />
            </div>
            <div className='objectDescriptionDiv' onClick={() => console.log(`Clicked item: ${object.name}`)}>
                <div className='objectBasicDescription'>
                    <p><b>Name:</b> {object.name}</p>
                    <p><b>Machine:</b> {object.machine}</p>
                    <p><b>Version:</b> {object.version}</p>
                </div>
                <div className='objectAdvancedDescriptionDiv' onClick={() => console.log(`Clicked item: ${object.name}`)}>
                    <p><b>Parts:</b> {object.parts.map(part => `${part.partName}(${part.amount.teller})`).join(', ')}</p>
                    <p><b>Amount:</b> {object.amount}/min</p>
                </div>
                <div className='objectEditAndDelete'>
                    <div className='objectDelete'>
                        {/* TODO: make these buttons actually work, but make sure that it doesn't double click because the div is already onClick! *ALREADY FIXED DOUBLE CLICK WB06/08/25*/}
                        <button className='deleteButton'><b>DELETE</b></button>                    
                    </div>
                    <div className='objectEdit'>
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
    )
}

export default SelectRecipe