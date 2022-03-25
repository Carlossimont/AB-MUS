import tapete from './img/tapete.jpg';
import fondo_login from './img/fondo_login.jpg';
import {Link} from 'react-router-dom'
import './Teams.scss'
function Teams() {

    return (
        <div class="loginboxcontainer">
                <div class="loginbox">
                        <div id="flex1">
                            <div id="players">
                                <div>Player1</div>
                                <div>Player2</div>
                                <div>Player3</div>
                                <div>Player4</div>
                            </div>
                            <div>
                                <div class="center">Player1</div>
                                <div id="row">
                                    <div>Player2</div>
                                    <div id="imagen"><img src={tapete} alt="" /></div>
                                    <div>Player3</div>
                                </div>
                                <div class="center">player4</div> 
                            </div>
                            <div class="okbutton"><Link to="/room">OK</Link></div>
                        </div>
                </div>
            </div>
    )
}
export default Teams;