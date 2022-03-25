import fondo_login from './img/fondo_login.jpg'
import {Link} from 'react-router-dom'
import './Createroom.scss'


function CreateRoom() {

    return (
        <div style={{backgroundImage: `url(${fondo_login})`}} id="background">
            <div>
                <div class="loginboxcontainer">
                    <div class="loginbox">
                        <div class="border">CREAR TAPETE</div>
                        <input type="text" />
                        <div class="button">
                            Ok
                        </div>
                        <div class="border">UNIRSE A TAPETE</div>
                        <input type="text" />
                        <div class="button">
                            ok
                        </div>
                        
                        
                    </div>
                    
                </div> 
                    
                
                <div id="set">
                    <div class="set1"><Link to="/login">BACK TO LOGIN</Link></div>
                    <div class="set1"><Link to="/">BACK TO LOBBY</Link></div>
                </div>
            </div>
            
           
        </div>


    )
}
export default CreateRoom;