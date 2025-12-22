import '../MainPage_Styling/global.css'
import '../MainPage_Styling/flowchart.css'
import { useEffect, useState} from 'react';
import FlowCanvas from './components/ReactFlow.jsx';

function Flowchart({ recipes, setRecipes }){
    const [amounts, setAmounts] = useState({});
    const [flowData, setFlowData] = useState(null);
    const [wattage, setWattage] = useState(null);

    // API base URL from env
    const API_URL = import.meta.env.VITE_API_URL;

    const handleErrorMessage = (error) => {
        alert(error);
    }

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
        const items = recipes.map(part => {
            const key = `${part.name}_${part.version}`;

            const userAmount = amounts[key] || { g: 0, t: 0, n: 1 };

            return {
                recipe: part,
                amount: {
                    integer: Number(userAmount.g) || 1,
                    fraction: {
                        teller: Number(userAmount.t) || 0,
                        noemer: Number(userAmount.n) || 1
                    }
                }
            };
        });
        console.log("Combined Payload for Backend (items):", items);

        fetch(`${API_URL}/api/Flowchart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items })
        })
        .then(async (res) => {
            const text = await res.text(); 
            try {
                return JSON.parse(text); 
            } catch {
                return { error: text }; 
            }
        })
        .then((data) => {
            if ("error" in data) {
                handleErrorMessage(data.error);
                return;
            }
            setFlowData({ nodes: data.nodes, edges: data.edges });
            setWattage(data.wattage);
        })
        .catch((err) => {
            handleErrorMessage(err.message || 'Failed to send flowchart payload');
        });
    };

    // Mapping to add selected parts into the list on the left of flowchart area
    let selectedParts;
    selectedParts = recipes.map(part => {
        const key = `${part.name}_${part.version}`;
        const currentAmount = amounts[key] || { g: '1', t: '0', n: '1'}

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
                    <button className='clearButton' onClick={() => { setRecipes([]); setAmounts({}); setFlowData(null); setWattage(null); } }><b>Clear</b></button>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                <div className='flowchartArea'>
                    <FlowCanvas flowData={flowData} />
                </div>
                {/* TODO: Here will come settings like Miner: mk1,mk2,mk3. ALso maybe where the total calculated power is shown, etc. */}
                <div className='controlDashBoard'>
                    <div className='controlWattage'>
                            <b>Wattage (excl. miners): <span style={{ fontSize: '1.2em' }}>{wattage}{wattage !== null && '⚡'}</span></b>
                    </div>
                    <div className='controlTables'>
                        <div className="minerTableDiv">
                            <table className="minerTable">
                                <thead>
                                    <tr>
                                        <th>MINER (MW)</th>
                                        <th>50%</th>
                                        <th>100%</th>
                                        <th>150%</th>
                                        <th>200%</th>
                                        <th>250%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Miner mk1</th>
                                        <td>2.0</td>
                                        <td>5.0</td>
                                        <td>8.5</td>
                                        <td>12.5</td>
                                        <td>16.8</td>
                                    </tr>
                                    <tr>
                                        <th>Miner mk2</th>
                                        <td>6.0</td>
                                        <td>15.0</td>
                                        <td>25.6</td>
                                        <td>37.5</td>
                                        <td>50.4</td>
                                    </tr>
                                    <tr>
                                        <th>Miner mk3</th>
                                        <td>9.9</td>
                                        <td>30.0</td>
                                        <td>57.4</td>
                                        <td>90.9</td>
                                        <td>130.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="minerTableDiv">
                            <table className="minerTable">
                                <thead>
                                    <tr>
                                        <th>MINER (NODE)</th>
                                        <th>Impure</th>
                                        <th>Normal</th>
                                        <th>Pure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Miner mk1</th>
                                        <td>30</td>
                                        <td>60</td>
                                        <td>120</td>
                                    </tr>
                                    <tr>
                                        <th>Miner mk2</th>
                                        <td>60</td>
                                        <td>120</td>
                                        <td>240</td>
                                    </tr>
                                    <tr>
                                        <th>Miner mk3</th>
                                        <td>120</td>
                                        <td>240</td>
                                        <td>480</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
};

export default Flowchart