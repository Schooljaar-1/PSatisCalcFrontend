import '../MainPage_Styling/global.css'
import '../MainPage_Styling/flowchart.css'
import FlowCanvas from './components/ReactFlow.jsx';

function Flowchart({ recipes, setRecipes }){

    // Function to remove a part
    const handleRemovePart = (name, version) => {
        setRecipes(prev => prev.filter(part => !(part.name === name && part.version === version)));
    }

    // Mapping to add selected parts into the list on the left of flowchart area
    let selectedParts;
    selectedParts = recipes.map(part => {
        return(
            <div className='singleSelectedPart' key={`${part.name} ${part.version}`} onContextMenu={(e) => {
                e.preventDefault(); 
                console.log("cheesy")
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
                        placeholder='T'
                    />
                    <p>/ </p>
                    <input 
                        className='createRecipePartAmountInput' 
                        type="number" 
                        placeholder='N'
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
                <h1>Selected Recipes</h1>
                <div style={{ borderBottom: '2px solid white', width: '100%', margin: '0.2em 0 1em 0' }}></div>
                <div className='selectedPartsList'>
                    {selectedParts}
                </div>
                <div className='selectedPartsActionButtons'>

                </div>
            </div>
                <div className='flowchartArea'>
                <FlowCanvas />
            </div>
        </div>
        </>
    )
};

export default Flowchart