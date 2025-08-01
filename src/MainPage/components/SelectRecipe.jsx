import { useEffect, useState} from 'react';
import '../../MainPage_Styling/global.css'
import './selectRecipe.css'
import mockData from './mockData.json'

function SelectRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    const [recipeData, setRecipeData] = useState(mockData);
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

    let content = mockData.map(object => (
        <div className='objectMappingTest' key={object.name}>
            {object.name}
        </div>
    ));

    // if (recipeData === null) {
    // content = <p><i>Loading...</i></p>;
    // } else {
    // content = <p>worked</p>;
    // }
    
    return (
        <>
        <div className='selectRecipeContainer'>
            <input className='userInputField' type="text" placeholder='Enter a recipe name...' onChange={handleUserInput} id="recipe-name"/>
            {/* TODO: make the loading show a loading icon instead of silly text. */}
            {/* TODO: unpack the data and make them into nice divs with buttons to add them to the calculation */}
            {content}
        </div>
        </>
    )
}

export default SelectRecipe