import '../MainPage_Styling/global.css'
import '../MainPage_Styling/flowchart.css'
import { useEffect, useState} from 'react';
import FlowCanvas from './components/ReactFlow.jsx';

function Flowchart({ recipes, setRecipes }){
    // The amount of items a user wants
    const [amounts, setAmounts] = useState({});

    // Function add g,t,n to object
    const handleAmountChange = (name, version, field, value) => {
        const key = `${name}_${version}`;
        setAmounts(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                    g: prev[key]?.g ?? '',
                    t: prev[key]?.t ?? '',
                    n: prev[key]?.n ?? '',
                    [field]: value
            }
        }));
    };

    // Function to remove a part
    const handleRemovePart = (name, version) => {
        setRecipes(prev => prev.filter(part => !(part.name === name && part.version === version)));

        const key = `${name}_${version}`;
        setAmounts(prev => {
            const updatedAmounts = { ...prev };
            delete updatedAmounts[key]; // This deletes the specific entry for this recipe
            return updatedAmounts;
        });
    }

    // Function combining parts and amounts
    const handleSubmit = () => {
        const payload = recipes.map(part => {
            const key = `${part.name}_${part.version}`;
            
            const userAmount = amounts[key] || { g: 0, t: 0, n: 1 };

            return {
                recipe: part, 
                amount: {
                    g: Number(userAmount.g) || 0,
                    t: Number(userAmount.t) || 0,
                    n: Number(userAmount.n) || 1  
                }
            };
        });

        // TODO: Call backend function
        console.log("Combined Payload for Backend:", payload);
    };

    // Mapping to add selected parts into the list on the left of flowchart area
    let selectedParts;
    selectedParts = recipes.map(part => {
        const key = `${part.name}_${part.version}`;
        const currentAmount = amounts[key] || { g: '', t: '', n: ''}

        return(
            <div className='singleSelectedPart' key={`${part.name} ${part.version}`} onContextMenu={(e) => {
                e.preventDefault(); 
                handleRemovePart(part.name, part.version);
            }}>
                <div className='selectPartTopHalf'>
                    <div className='partImageDiv' onClick={() => addRecipeToSelected(object)}>
                        <img 
                            className='partImage'
                            src={`/recipeImages/${part.image}.png`}
                            alt={part.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/recipeImages/unknown.png';
                            }}
                        />
                    </div>
                    <div className='partDescriptionDiv'>
                        <div className='partBasicDescription'>
                            <p><b>Name:</b> {part.name}</p>
                            <p><b>Machine:</b> {part.machine}</p>
                            <p><b>Parts:</b> {part.parts.map(part => `${part.partName}(${part.amount.teller}/${part.amount.noemer})`).join(', ')}</p>
                        </div>
                    </div>
                </div>
                <div className='selectedPartBottomHalf'>
                    <b>Amount: </b>
                    <input 
                        className='createRecipePartAmountInput' 
                        type="number" 
                        placeholder='G'
                        value={currentAmount.g}
                        onChange={(e) => handleAmountChange(part.name, part.version, 'g', e.target.value)} 
                    />
                    <input 
                        className='createRecipePartAmountInput' 
                        type="number" 
                        placeholder='T'
                        value={currentAmount.t}
                        onChange={(e) => handleAmountChange(part.name, part.version, 't', e.target.value)} 
                    />
                    <p>/ </p>
                    <input 
                        className='createRecipePartAmountInput' 
                        type="number" 
                        placeholder='N'
                        value={currentAmount.n}
                        onChange={(e) => handleAmountChange(part.name, part.version, 'n', e.target.value)} 
                    />
                    <p>Per minute</p>
                </div>
            </div>
            );
        });


    return (
        <>
        <div className='flowBox'>
            <div className='selectedRecipesList'>
                <div>
                    <h1>Selected Recipes</h1>
                    <div style={{ borderBottom: '2px solid white', width: '100%', margin: '0.2em 0 1em 0' }}></div>
                    <div className='selectedPartsList'>
                        {selectedParts}
                    </div>
                </div>
                <div className='selectedPartsActionButtons'>
                    <button className='calculateButton' onClick={handleSubmit}><b>Calculate</b></button>
                    <button className='clearButton' onClick={() => { setRecipes([]); setAmounts({}); } }><b>Clear</b></button>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                <div className='flowchartArea'>
                    <FlowCanvas />
                </div>
                {/* TODO: Here will come settings like Miner: mk1,mk2,mk3. ALso maybe where the total calculated power is shown, etc. */}
                <div className='controlDashBoard'>
                    <p>kaas</p>
                </div>
            </div>

        </div>
        </>
    )
};

export default Flowchart