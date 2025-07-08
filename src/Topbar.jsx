import './global.css'
import { FaCalculator, FaSave } from 'react-icons/fa';


function Topbar(){

    return(
        <>
        <div className="navBar">
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
        </>
    ) 

}
export default Topbar