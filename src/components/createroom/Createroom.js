import fondo_login from './img/fondo_login.jpg'
import {Link} from 'react-router-dom'
import './Createroom.scss'


function CreateRoom() {

    return (
        <div>
            <div class="loginboxcontainer">
                <div class="loginbox">
                    <div class="border">CREAR TAPETE</div>
                    <input type="text" />
                    <div class="okbutton"><Link to="/teams">OK</Link></div>
                    <div class="border">UNIRSE A TAPETE</div>
                    <input type="text" />
                    <div class="okbutton"><Link to="/teams">OK</Link></div> 
                </div>
            </div>  
        </div>
    )
}
export default CreateRoom;