
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
                    <Link to="/createroom"><div className="sendbutton">Login</div></Link>
            </div>
        </div>

    )
}
export default Login;