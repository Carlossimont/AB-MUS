import fondo_login from './img/fondo_login.jpg';
import fondogif from './img/fondogif.gif';
import fondogif2 from './img/fondogif2.gif';
import './Lobby.scss'

function Lobby({content, options, chat}) {

    return (
        
        <div style={{backgroundImage: `url(${fondogif2})`}} id="background">
            <div>
                {content}
                {options}
                {chat != undefined ? chat : <></>}
     
            </div>
        </div>
        
    )
}
export default Lobby;