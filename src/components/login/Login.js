
import {Link} from 'react-router-dom'
import './Login.scss'

function Login() {

    return (
        <div className="loginboxcontainer">
            <div className="loginbox">
                
                    <div>
                        <p>User login</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" />
                    </div>
                    <div className="sendbutton"><Link to="/createroom">Access</Link></div>
            </div>
        </div>

    )
}
export default Login;