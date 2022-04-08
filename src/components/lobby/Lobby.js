import fondo_login from './img/fondo_login.jpg';
import fondogif from './img/fondogif.gif';
import fondogif2 from './img/fondogif2.gif';
import './Lobby.scss'
import Header from '../header/Header'

function Lobby({content, options, chat, infobox, rules, marcador}) {

    return (
        
        <div style={{backgroundImage: `url(${fondogif2})`}} id="background">
            <Header/>
            <div>
                {rules}
                {content}
                {options}
                {infobox}
                {chat}
                {marcador}
     
            </div>
        </div>
        
    )
}
export default Lobby;