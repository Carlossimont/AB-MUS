import tapete from './img/tapete.jpg';
import { useState,useEffect } from 'react';
import './Teams.scss'
function Teams({joinRoom,room,user,setMyChair,myChair,setPlayer,connection,users,players}) {
    //ngOnInit
    useEffect(()=>{
        joinRoom(user,room);
    },[])

    function assignChair(chairNum){
        setPlayer(chairNum);
        setMyChair(chairNum);
    }

    const isReady = async () => {
        try {
          await connection.invoke("IsReady", true);
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
                {users.length == 4 ? <div>
                    <div className="center" onClick={()=>assignChair(0)}>{players[0]}</div>
                    <div id="row">
                        <div onClick={()=>assignChair(1)}>{players[1]}</div>
                        <div id="imagen"><img src={tapete} alt="" /></div>
                        <div onClick={()=>assignChair(3)}>{players[3]}</div>
                    </div>
                    <div className="center" onClick={()=>assignChair(2)}>{players[2]}</div>
                    {myChair>-1 ? <div onClick={()=>isReady()} className="okbutton">OK</div> : <></>}
                </div> : <></>}
            </div>
        </div>
    )

}
export default Teams;