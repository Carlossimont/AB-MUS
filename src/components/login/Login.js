
import {Link} from 'react-router-dom'
import './Login.scss'

function Login() {

    return (
        <div className="loginboxcontainer">
            <div className="loginbox">
                
                    <div className='size_font'>
                        <p>User login</p>
                        <input type="text" />
                    </div>
                    <div className='size_font'>
                        <p>Password</p>
                        <input type="password" />
                    </div>
                    <div className="sendbutton"><Link to="/createroom">Login</Link></div>
            </div>
        </div>

    )
}
export default Login;