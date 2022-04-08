import './LobbyOptions.scss'
import {Link} from 'react-router-dom'

function LobbyOptions() {

    return (
        <div id="set">
            <div className="set1"><Link to="/login">START</Link></div>
            <div className="set1"><Link to="/rules">RULES</Link></div>
            <div className="set1">OPTIONS</div>
        </div>
    )
}
export default LobbyOptions;