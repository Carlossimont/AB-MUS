import fondo_login from './img/fondo_login.jpg'
import {Link} from 'react-router-dom'
import './Createroom.scss'


function CreateRoom({user,setUser,room,setRoom}) {
    return (
        <div>
           <div className="loginboxcontainer">
                <div className="loginbox">
                    <h1>CREAR SALA</h1>
                    <div className="border">
                        <p>ALIAS EN PARTIDA</p>
                        <input type="text" onChange={(e)=>setUser(e.target.value)} value={user} />
                    </div>
                    <div className="border">
                    <p>TAPETE</p>
                    <input type="text" onChange={(b)=>setRoom(b.target.value)} value={room}/>
                    </div>
                    
                    <div className="okbutton"><Link to="/room">OK</Link></div>
                </div>
            </div>  
        </div>
    )
}
export default CreateRoom;