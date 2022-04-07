import {Link} from 'react-router-dom'
import './Header.scss'


function Header() {

  return (
    <header>
      <div>
          <h1><Link to="/">AB MUS</Link></h1>
      </div>
      <div> 
          <p><Link to="/login">Login</Link></p>
          <p>Register</p>
      </div>
    </header>
  )
}
export default Header;
