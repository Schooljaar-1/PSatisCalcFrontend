import { FaCalculator, FaSave } from 'react-icons/fa';
import '../Styling/global.css'
import '../Styling/topbar.css'

//TODO: make styling use percentages instead of ER units. It looks whacko on my laptop run cuh

function Topbar(){
    return(
    <>
    <div className="navBar">
        <div className="navLeft">
        <img className="mainLogo" src="/SfcLogo.png" alt="logo" />
        <button className="navButton">
            <FaCalculator size={18} style={{ marginRight: '0.4rem' }} />
            Calculator
        </button>
        <button className="navButton">
            <FaSave size={18} style={{ marginRight: '0.4rem' }} />
            Saved
        </button>
        </div>
        <div className="navRight">
        <a href='https://github.com/BaasW'>made by baasW</a>
        </div>
    </div>
    </>
    ) 
}
export default Topbar