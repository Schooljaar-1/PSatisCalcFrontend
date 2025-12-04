import { useEffect, useState} from 'react';
import recipeImageNames from '../../assets/recipeImageNames.json'
import '../../MainPage_Styling/global.css'
import './createRecipe.css'

function CreateRecipe(){
    // Setting URL for fetch
    const API_URL = import.meta.env.VITE_API_URL;

    // ---------FETCHING DATA FROM BACKEND + STATUS CHECK + SENDING CREATED RECIPE-----------
    const [recipeData, setRecipeData] = useState(null)

    function normalizeRecipe(obj) {
        // Support both camelCase and PascalCase from backend, and mixed keys inside nested objects
        const normalizeAmount = (amt) => {
            if (!amt) return { Teller: 0, Noemer: 1 };
            return {
                Teller: amt.Teller ?? amt.teller ?? 0,
                Noemer: amt.Noemer ?? amt.noemer ?? 1,
            };
        };

        return {
            Name: obj.Name ?? obj.name ?? "",
            Version: obj.Version ?? obj.version ?? "",
            Machine: obj.Machine ?? obj.machine ?? "",
            Type: obj.Type ?? obj.type ?? "",
            Image: obj.Image ?? obj.image ?? "",
            Amount: normalizeAmount(obj.Amount ?? obj.amount),
            Parts: (obj.Parts ?? obj.parts ?? []).map(p => ({
                PartName: p.PartName ?? p.partName ?? "",
                Amount: normalizeAmount(p.Amount ?? p.amount),
            }))
        };
    }

    function FetchData() {
        fetch(`${API_URL}/api/Recipe`)
            .then((res) => res.json()) 
            .then((data) => {
                if ("error" in data) {
                    handleErrorMessage(data.error);
                    return; // This stops further processing
                }
                const normalized = Array.isArray(data) ? data.map(normalizeRecipe) : [];
                setRecipeData(normalized);
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

    // Funct to finally send newly created recipe to backend for storage inside JSON file
    const handleNewRecipeSubmit = async () => {
        const { Name, Version, Machine, Amount, Type, Image } = recipe;

        // Check all required fields at once
        if (!Name || !Version || !Machine || !Type || !Image || Amount == null) {
            alert('Please fill in all fields before submitting (only parts may be empty).');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/Recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(recipe)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to submit recipe (${res.status}): ${text}`);
            }

            alert('Recipe submitted successfully.');
            FetchData();
            resetRecipe();

        } catch (err) {
            handleErrorMessage(err.message || 'Failed to submit recipe');
        }
    };
    //---------------------------------------------------------------------------------------------------------------

    // Recipe to be send back to the backend and saved
    const [recipe, setRecipe] = useState(
        {
            Name: "",
            Version: "",
            Machine: "",
            Amount: {
                Teller: 0,
                Noemer: 1
            },
            Type: "",
            Image: "",
            Parts: []
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
        .filter(object => !recipe.Image || object.replace(/\s+/g, '').toLowerCase().includes(recipe.Image.replace(/\s+/g, '').toLowerCase()))
        .map(object => {
            const imageName = object.replace(/\s+/g, '');
            return (
                <div className='createObjectMapping' key={object} onClick={() => setRecipe(prev => ({
                    ...prev,
                    Image: imageName
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
    
    // Function for when part is clicked
    const handleAddPart = (newPartName) => {
        if(recipe.Parts?.some(p => p.PartName === newPartName)){
            console.log(`Partlist already contains part with name: ${newPartName}`)
            console.log(`Partslist: ${recipe.Parts.map(p => p.PartName)}`)
            return;
        }
        else{
            setRecipe(prev => ({
                ...prev,
                Parts: [
                    ...prev.Parts,
                    {
                        PartName: newPartName,
                        Amount: {
                            Teller: 1,
                            Noemer: 1
                        }
                    }
                ]
            }))
        }
        console.log(`Part: ${newPartName} added to partslist.`)
    }

    // Generating search window items for parts selector
    const [newUserPart, setnewUserPart] = useState("")
    let parts;
    if (recipeData === null || recipeData === undefined) {
    parts = (
        <div className="spinner"></div>
    );
    } 
    else {
        const term = (newUserPart || "").toLowerCase();
        parts = recipeData
            .filter(object => !term || ((object?.Name || "").toLowerCase().includes(term)))
            .map(object => {
                return (
                    <div className='CreateRecipeWindowParts' onClick={() => handleAddPart(object.Name)}>
                        <div className='objectImageDiv'>
                            <img 
                                className='objectImage'
                                src={`/recipeImages/${object.Image}.png`}
                                alt={object.Name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/recipeImages/unknown.png';
                                }}
                            />
                        </div>
                        <div className='objectDescriptionDiv'>
                            <div className='objectBasicDescription'>
                                <p><b>Name:</b> {object.Name}</p>
                                <p><b>Machine:</b> {object.Machine}</p>
                                <p><b>Version:</b> {object.Version}</p>
                            </div>
                            <div className='objectAdvancedDescriptionDivWoBorder'>
                                <p><b>Parts:</b> {(object.Parts || []).map(part => `${part.PartName}(${part.Amount.Teller}/${part.Amount.Noemer})`).join(', ')}</p>
                                <p><b>Amount:</b> {(object.Amount?.Teller ?? "-")}/{(object.Amount?.Noemer ?? "-")} per minute</p>
                            </div>
                        </div>
                    </div>
                );
            });
    }

    // Adding funct for selected parts to be removed from the list
    const handleRemovePart = (partNameToRemove) => {
        setRecipe(prev => ({
            ...prev,
            Parts: prev.Parts.filter(p => p.PartName !== partNameToRemove)
        }));
    };

    // Function to clear our recipe
    const resetRecipe = () => {
        setRecipe({
            Name: "",
            Version: "",
            Machine: "",
            Amount: { Teller: 0, Noemer: 1 },
            Type: "",
            Image: "",
            Parts: []
        });
    };

    return(
        <>
            <div className='createRecipeContainer'>

                <div className='createRecipeQueryAndSelecter'>

                    <div className='createRecipeSelectImage'>
                        <img 
                            className='itemImage'
                            src={`/recipeImages/${recipe.Image}.png`}
                            alt={`${recipe.Image}.png`}
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
                            id="recipe-image"
                            name="Image" 
                            value={recipe.Image}/>
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
                                name="Name" 
                                value={recipe.Name}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Machine:</b></p>
                            <input 
                                className='createRecipeMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe machine type...' 
                                onChange={HandleUserInput} 
                                id="recipe-machine" 
                                name="Machine" 
                                value={recipe.Machine}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <p><b>Type:</b></p>
                            <input 
                                className='createRecipeMenuInputs' 
                                type="text" 
                                placeholder='Enter recipe type...' 
                                onChange={HandleUserInput} 
                                id="recipe-type" 
                                name="Type" 
                                value={recipe.Type}
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
                                id="recipe-version" 
                                name="Version" 
                                value={recipe.Version}
                            /> 
                        </div>
                        <div className='createRecipeLeftMenuSingle'>
                            <div className='objectAdvancedDescriptionDivWoBorder'>
                                <div>
                                    <p><b>Amount:</b></p>
                                </div>
                                <div>
                                    <input 
                                        className='createRecipePartAmountInput' 
                                        type="number" 
                                        placeholder='Teller...' 
                                        onChange={({ target }) => {
                                            const value = parseInt(target.value, 10) || 0;
                                            setRecipe(prev => ({
                                                ...prev,
                                                Amount: { ...prev.Amount, Teller: value }
                                            }));
                                        }} 
                                        id="recipe-amount-teller" 
                                        value={recipe.Amount.Teller}
                                    /> 
                                    <span>/</span>
                                    <input 
                                        className='createRecipePartAmountInput' 
                                        type="number" 
                                        placeholder='Noemer...' 
                                        onChange={({ target }) => {
                                            const value = parseInt(target.value, 10) || 1;
                                            setRecipe(prev => ({
                                                ...prev,
                                                Amount: { ...prev.Amount, Noemer: value }
                                            }));
                                        }} 
                                        id="recipe-amount-noemer" 
                                        value={recipe.Amount.Noemer}
                                    /> 
                                    <span> per minute</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='createRecipePartsSelector'>
                    <div className='CreateRecipePartName'>
                        <p><b>Part name:</b></p>
                        <input 
                            className='createRecipePartInputs' 
                            type="text" 
                            placeholder='Enter part name...' 
                            onChange={e => setnewUserPart(e.target.value)} 
                            id="recipe-version" 
                            name="amount" 
                            value={newUserPart}
                        />
                    </div>
                    <div className='createRecipeScrollablePartsWindow'>
                        {parts}
                    </div>
                    <div className='createRecipeAddedParts'>
                        {(!recipe.Parts || recipe.Parts.length === 0) ? (
                            <p>No parts added yet. <i>Applicable for base resources (e.g. iron ore).</i></p>
                        ) : (
                            recipe.Parts.map((part, index) => (
                                <div
                                    className='CreateRecipeWindowParts'
                                    key={part.PartName ?? index}
                                    onClick={(e) => {
                                        if (e.target.tagName !== 'INPUT') {
                                            handleRemovePart(part.PartName);
                                        }
                                    }}
                                >
                                    <div className='objectDescriptionDiv'>
                                        <div className='objectBasicDescription'>
                                            <p><b>Part name:</b> {part.PartName}</p>
                                        </div>
                                        <div className='objectAdvancedDescriptionDivWoBorder'>
                                            <div>
                                               <p><b>Amount:</b></p> 
                                            </div>
                                            <div>
                                                <input 
                                                    className='createRecipePartAmountInput' 
                                                    type="number" 
                                                    value={part.Amount.Teller} 
                                                    onChange={(e) => {
                                                        const newAmount = parseInt(e.target.value, 10) || 0;
                                                        setRecipe(prev => {
                                                            const updatedParts = prev.Parts.map(p => 
                                                                p.PartName === part.PartName ? { ...p, Amount: { ...p.Amount, Teller: newAmount } } : p
                                                            );
                                                            return { ...prev, Parts: updatedParts };
                                                        });
                                                    }}
                                                />
                                                /
                                                <input 
                                                    className='createRecipePartAmountInput' 
                                                    type="number" 
                                                    value={part.Amount.Noemer} 
                                                    onChange={(e) => {
                                                        const newNoemer = parseInt(e.target.value, 10) || 0;
                                                        setRecipe(prev => {
                                                            const updatedParts = prev.Parts.map(p => 
                                                                p.PartName === part.PartName ? { ...p, Amount: { ...p.Amount, Noemer: newNoemer } } : p
                                                            );
                                                            return { ...prev, Parts: updatedParts };
                                                        });
                                                    }}
                                                />
                                                <span> per minute</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='createNewRecipeSubmitButton'>
                        <button className='submitRecipeButton' onClick={handleNewRecipeSubmit}>
                            Submit new recipe
                        </button>
                        <button className='clearRecipeButton' onClick={resetRecipe}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default CreateRecipe;