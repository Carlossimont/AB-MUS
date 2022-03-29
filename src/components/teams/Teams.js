import tapete from './img/tapete.jpg';
import fondo_login from './img/fondo_login.jpg';
import { Link } from 'react-router-dom'
import './Teams.scss'
function Teams({setMyChair,setPlayer,setReady,ready,connection,users,players}) {

    function assignChair(chairNum){
        console.log(players);
        setPlayer(chairNum);
        setMyChair(chairNum);
        console.log('mi silla');
        console.log(chairNum)
    }

    const isReady = async () => {
        console.log('ready')
        try {
          setReady(!ready)//el await de abajo se ejecuta antes?
          await connection.invoke("IsReady", ready);
        } catch (e) {
          console.log(e + ' isReady');
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
                    <div className="center" onClick={()=>assignChair(0)}>{players[0]}</div>
                    <div id="row">
                        <div onClick={()=>assignChair(1)}>{players[1]}</div>
                        <div id="imagen"><img src={tapete} alt="" /></div>
                        <div onClick={()=>assignChair(2)}>{players[2]}</div>
                    </div>
                    <div className="center" onClick={()=>assignChair(3)}>{players[3]}</div>
                </div>
                {users.length==4 ? <div onClick={()=>isReady()} className="okbutton">OK</div> : <></>}
            </div>
        </div>
    )

}
export default Teams;