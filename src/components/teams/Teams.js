import tapete from './img/tapete.jpg';
import fondo_login from './img/fondo_login.jpg';
import { Link } from 'react-router-dom'
import './Teams.scss'
function Teams({ setCnntn }) {

    return (

        <div className="loginbox">
            <div id="flex1">
                <div id="players">
                    <div>Player1</div>
                    <div>Player2</div>
                    <div>Player3</div>
                    <div>Player4</div>
                </div>
                <div>
                    <div className="center">Player1</div>
                    <div id="row">
                        <div>Player2</div>
                        <div id="imagen"><img src={tapete} alt="" /></div>
                        <div>Player3</div>
                    </div>
                    <div className="center">player4</div>
                </div>
                <div onClick={()=>setCnntn(true)} className="okbutton">OK</div>
            </div>
        </div>
    )

}
export default Teams;