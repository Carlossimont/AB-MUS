import fondo_login from './img/fondo_login.jpg';
import './Lobby.scss'

function Lobby({content, options}) {

    return (
        <div style={{backgroundImage: `url(${fondo_login})`}} id="background">
            <div>
                {content}
                {options}
            </div>
        </div>
    )
}
export default Lobby;