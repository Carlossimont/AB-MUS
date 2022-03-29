import tapete from './img/tapete.jpg';
import fondo_login from './img/fondo_login.jpg';
import { Link } from 'react-router-dom'
import './Teams.scss'
function Teams({setReady,ready,connection,users,players}) {

    const isReady = async () => {
        console.log('ready')
        try {
          setReady(!ready)//el await de abajo se ejecuta antes?
          await connection.invoke("IsReady", ready);
        } catch (e) {
          console.log(e + 'isReady');
        }
      };

    return (

        <div className="loginbox">
            <div id="flex1">
                <div id="players">
                {users.map((user,i)=>(
                    <div key={i}>{user}</div>
                    ))}
                </div>
                <div>
                    <div className="center">{players[0]}</div>
                    <div id="row">
                        <div>{players[1]}</div>
                        <div id="imagen"><img src={tapete} alt="" /></div>
                        <div>{players[2]}</div>
                    </div>
                    <div className="center">{players[3]}</div>
                </div>
                <div onClick={()=>isReady()} className="okbutton">OK</div>
            </div>
        </div>
    )

}
export default Teams;