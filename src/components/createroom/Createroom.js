import fondo_login from './img/fondo_login.jpg'
import {Link} from 'react-router-dom'
import './Createroom.scss'


function CreateRoom() {
    return (
        <div>
            <div className="loginboxcontainer">
                <div className="loginbox">
                    <div className="border">ALIAS EN PARTIDA</div>
                    <input type="text" />
                    <div className="border">CREAR TAPETE</div>
                    <input type="text" />
                    <div className="okbutton"><Link to="/room">OK</Link></div>
                    <div className="border">UNIRSE A TAPETE</div>
                    <input type="text" />
                    <div className="okbutton"><Link to="/room">OK</Link></div> 
                </div>
            </div>  
        </div>
    )
}
export default CreateRoom;