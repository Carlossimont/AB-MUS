import './LobbyOptions.scss'
import {Link} from 'react-router-dom'

function LobbyOptions() {

    return (
        <div id="set">
            <div class="set1"><Link to="/login">START</Link></div>
            <div class="set1">RULES</div>
            <div class="set1">OPTIONS</div>
        </div>
    )
}
export default LobbyOptions;