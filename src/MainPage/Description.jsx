import '../MainPage_Styling/global.css'
import '../MainPage_Styling/description.css'

function Description() {
    return (
        <>
            <div className='descriptionBox'>
                <div className='descriptionText'>
                    <h1>Welcome to the SFC (Satisfactory Calculator) tool!</h1>
                    <hr />
                    <p>
                        This tool has been developed to assist you while playing the <a className='linkje' href='https://www.satisfactorygame.com/'>Satisfactory</a> game.
                        With this tool you can:
                    </p>
                    
                        <ul>
                            <li>Manually enter found <b>recipes</b>.</li>
                            <li><b>Plan</b> your factories.</li>
                            <li><b>Save</b> your schematics.</li>
                            <li><b>Manage</b> your <u>power</u> and <u>resources</u>.</li>
                        </ul>

                        Without a tool such as SFC it becomes almost impossible to keep your game-world organized. As you explore the world you will find more resources and fabricate more complex parts, increasing your factories' complexity.
                </div>
            </div>
        </>
    )
}

export default Description;