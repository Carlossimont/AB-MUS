import fondo_login from './img/fondo_login.jpg';
import logo from './img/logo.png'
import './Lobby.scss'
import {Link} from 'react-router-dom'

function Lobby() {

    return (
        <div style={{backgroundImage: `url(${fondo_login})`}} id="background">
            <div>
                <div id="logo">
                    <img src={logo} alt="" />
                </div>
                <div id="set">
                    <div class="set1"><Link to="/login">START</Link></div>
                    <div class="set1">RULES</div>
                    <div class="set1">OPTIONS</div>
                </div>
            </div>
            
           
        </div>


    )
}
export default Lobby;