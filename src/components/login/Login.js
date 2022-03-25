import fondo_login from './img/fondo_login.jpg';
import {Link} from 'react-router-dom'
import './Login.scss'

function Login() {

    return (
        <div class="loginboxcontainer">
            <div class="loginbox">
                    <div>
                        LOGIN<input type="text" />
                    </div>
                    <div>
                        PASSWORD<input type="text" />
                    </div>
                    <div class="sendbutton"><Link to="/createroom">SEND</Link></div>
                    <div>
                        <p>play as a guest</p>
                        <p>register</p>
                    </div>
            </div>
        </div>

    )
}
export default Login;