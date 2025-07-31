import { FaCalculator, FaSave } from 'react-icons/fa';
import '../MainPage_Styling/global.css'
import '../MainPage_Styling/topbar.css'

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