import { Link } from 'react-router-dom';
import { FaCalculator, FaSave } from 'react-icons/fa';
import { useState } from 'react';
import '../MainPage_Styling/global.css'
import '../MainPage_Styling/topbar.css'

function Topbar(){
    const API_URL = import.meta.env.VITE_API_URL;
    const [apiIsOnline, setApiIsOnline] = useState(false);

    const APIStatusCheck = async () => {
        try{
            const res =  await fetch(`${API_URL}/api/Recipe/status`)
            if(res.status === 200){
                setApiIsOnline(true);
            }
        }
        catch{
            setApiIsOnline(false);
        }
    }
    APIStatusCheck();

    return(
    <>
    <div className="navBar">
        <div className="navLeft">
            <img className="mainLogo" src="/SfcLogo.png" alt="logo" />
            <Link to="/" className="navButton">
                <FaCalculator size={18} style={{ marginRight: '0.4rem' }} />
                Calculator
            </Link>
            <Link to="/saved" className="navButton">
                <FaSave size={18} style={{ marginRight: '0.4rem' }} />
                Saved
            </Link>
        </div>
        <div className="navRight">
            <span className={`status-dot ${apiIsOnline ? 'status-online' : 'status-offline'}`} aria-hidden="true"></span>
            <p>API {apiIsOnline ? 'online' : 'offline'} ||</p>
            <a className='shoutout' href='https://github.com/BaasW'>made by baasW</a>
        </div>
    </div>
    </>
    ) 
}
export default Topbar