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

    // let content = mockData.map(object => (
    //     <div className='objectMappingTest' key={object.name}>
    //         {object.name}
    //     </div>
    // ));
    let content;

    if (recipeData === null) {
    content = (
        <div className="spinner"></div>
    );
    } 
    else {
    content = recipeData.map(object => (
        <div className='objectMapping'>
            <div className='objectImageDiv'>
                <img 
                    className='objectImage'
                    key={`${object.name.replace(/\s+/g, '_')}_image`}
                    src={`/recipeImages/${object.name.replace(/\s+/g, '_')}_image.png`}
                />
                {console.log(`${object.name.replace(/\s+/g, '_')}_image.png`)}       

            </div>
            <div>
                Pluis
            </div>
        </div>
    ));
    }
    
    
    return (
        <>
        <div className='selectRecipeContainer'>
            <input className='userInputField' type="text" placeholder='Enter a recipe name...' onChange={handleUserInput} id="recipe-name"/>
            
            {/* TODO: Make up divs, also code to show unknown image if the image isn't added to the public folder yet */}
            {/* TODO: unpack the data and make them into nice divs with buttons to add them to the calculation */}

            <div className='generatedDivList'>
                {content}
            </div>
        </div>
        </>
    )
}

export default SelectRecipe