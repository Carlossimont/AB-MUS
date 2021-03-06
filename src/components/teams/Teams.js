import tapete from './img/tapete.jpg';
import { useState,useEffect } from 'react';
import './Teams.scss'
import Chat from '../chat/Chat';


function Teams({setOneAvatar,joinRoom,room,user,setMyChair,myChair,setPlayer,connection,users,players}) {
    //ngOnInit
    useEffect(()=>{
        joinRoom(user,room);
    },[])

    function assignChair(chairNum){
        setPlayer(chairNum);
        setMyChair(chairNum);
    }

    function assignAvatar(avatarNum){
        setOneAvatar(avatarNum);
    }

    const isReady = async () => {
        try {
          await connection.invoke("IsReady", true);
        } catch (e) {
          console.log(e + ' isReady');
        }
      };

    return (

        <div className="teambox">
            <div className="flex1">
                <div className="players">
                    <p>JUGADORES CONECTADOS</p>
                {users.map((user,i)=>(
                    <div key={i}>{user}</div>
                    ))}
                </div>
                {users.length == 4 ? <div className='minitablero'> 
                    <div>
                    <div className="center" onClick={()=>assignChair(0)}>{players[0]}</div>
                    <div className="row">
                        <div className='rowplayer' onClick={()=>assignChair(1)}>{players[1]}</div>
                        <div className="imagen"><img src={tapete} alt="" /></div>
                        <div className='rowplayer' onClick={()=>assignChair(3)}>{players[3]}</div>
                    </div>
                    <div className="center" onClick={()=>assignChair(2)}>{players[2]}</div>
                    {myChair>-1 ? <div onClick={()=>isReady()} className="okbutton">OK</div> : <></>}
                    </div>
                    <div className='avatares'>
                        <p>Avatares</p>
                        <div>
                            {/* hay que hacer un map con un array de personajes */}
                            <div onClick={()=>assignAvatar(1)}><img src="img\Pj_1\normal.png" alt="" /></div> 
                            <div onClick={()=>assignAvatar(2)}><img src="img\Pj_2\normal.png" alt="" /></div>
                            <div onClick={()=>assignAvatar(3)}><img src="img\Pj_3\normal.png" alt="" /></div>
                            <div onClick={()=>assignAvatar(4)}><img src="img\Pj_4\normal.png" alt="" /></div>
                        </div>

                    </div>    
                    </div> : <div>
                            <p>CARGANDO JUGADORES</p>
                        
                            <progress className="nes-progress" value={`${users.length*25}`} max="100"></progress>
                    
                        </div>}
            </div>
        </div>

        
    )

}
export default Teams;