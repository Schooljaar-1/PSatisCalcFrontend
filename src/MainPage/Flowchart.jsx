import '../MainPage_Styling/global.css'
import '../MainPage_Styling/flowchart.css'

function Flowchart({ recipes }){
    return (
        <>
        <div className='flowBox'>
            <div className='SelectedRecipesList'>
                <h1>Selected Recipes</h1>
                <div style={{ borderBottom: '2px solid black', width: '100%', margin: '0.2em 0 1em 0' }}></div>

                
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <p key={recipe.name}>{recipe.name}</p> // show recipe names
                    ))
                ) : (
                    <p>No recipes selected</p>
                )}

                
            </div>
            <div className='FlowchartArea'>

            </div>
        </div>
        </>
    )
};

export default Flowchart