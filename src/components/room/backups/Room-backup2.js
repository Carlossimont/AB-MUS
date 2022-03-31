import tapete from './img/tapete.jpg';
import tapetepixel from './img/tapetepixel.png';
import './Room.scss'
import Teams from '../../teams/Teams'
import { useState,useEffect } from 'react';
import Chat from '../../chat/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import erlang from './img/erlang.png';
import B1 from './img/B1.png';
import suelo from './img/suelo.png';

function Room({user,room}) {

    let [ready, setReady] = useState(false);
    let [alias,setAlias] = useState();
    let [message,setMessage] = useState('');
    let [lobbyId,setLobbyId] = useState();
    let [players,setPlayers] = useState(['Player1','Player2','Player3','Player4']);
    let [player,setOnePlayer] = useState('');
    let [myChair,setMyChair] = useState(-1);
    let [number,setNumber] = useState('');
    let [name,setName] = useState('');
    let [game,setGame] = useState(false);
    let [playerThree,setPlayerThree] = useState('');
    let [myCards,setMyCards] = useState([]);
    let [deskPlayers,setDeskPlayers] = useState([]);
    
  
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    let playersAux = [];

    useEffect(()=>{
      let  deskPlayersAux = [];
      let pos = myChair;
      for (let i = 0; i < 4; i++) {
        if (pos==4) {
          pos=0;
        }
        deskPlayersAux[i]=(players[pos]);
        pos++;
        console.log(deskPlayersAux);
      }
      setDeskPlayers(deskPlayersAux);
    },[game])
  
    useEffect(()=>{
      console.log(players);
      let playersAux = [...players];
      playersAux[number] = name;
      setPlayers(playersAux);
    },[number])

    
    
  
    const joinRoom = async (user, room) => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:5001/chat")
          .configureLogging(LogLevel.Information)
          .build();
  
        connection.on("UsersInRoom", (users) => {
          setUsers(users);
        });
  
        connection.on("ReceiveMessage", (user, message) => {
          setMessages((messages) => [...messages, { user, message }]);
        });
  
        connection.on("ReceivePlayerNumber", (user,playerNumber)=>{
          console.log(players);
          setName(user);
          setNumber(playerNumber);
          
        });
  
        connection.on("ReceiveHandCards", (handCards)=>{
          setMyCards(handCards);
        });
  
        connection.on("StartGame", (player3)=>{
          setGame(true);
          setPlayerThree(player3);
          console.log(player3)
          
        });
  
        connection.onclose((e) => {
          setConnection();
          setMessages([]);
          setUsers([]);
        });
  
        await connection.start();
        await connection.invoke("JoinRoom", { user, room });
        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    };
  
    const sendMessage = async (message) => {
      try {
        await connection.invoke("SendMessage", message);
      } catch (e) {
        console.log(e);
      }
    };
  
    const setPlayer = async (playerNumber) => {
      try {
        console.log('entra a app.js setPlayer')
        await connection.invoke("SetPlayer", playerNumber);
      } catch (e) {
        console.log(e + 'setplayer');
      }
    };
  
    const closeConnection = async () => {
      try {
        await connection.stop();
      } catch (e) {
        console.log(e)
      }
    };

    useEffect(()=>{

    },[myChair])

    return (

        <div style={{ backgroundImage: `url(${suelo})` }} id="background">
            {game ? 
                <Teams 
                joinRoom={joinRoom} 
                user={user} 
                room={room} 
                setMyChair={setMyChair} 
                myChair={myChair}
                setPlayer={setPlayer} 
                connection={connection} 
                users={users} 
                setReady={setReady} 
                ready={ready} 
                players={players}/> 
            :
            <div className="flex">
            

            <div className="team2">
                
                <div className='tablero'>
                        <div className="jugador-activo">
                          <div className="avatar j1 avatar-activo">
                            <img src={erlang} alt="" />
                            <p>{deskPlayers[0]}</p>
                          </div>
                          <div>
                              <div className="buttons">Mus</div>
                              <div className="buttons">No hay mus</div>
                              <div className="buttons">ÓRDAGO ME CAGO EN DIOS</div>
                          </div>
                        </div>

                        <div className="avatar j2 avatar-oponente-dr">
                          <img src={erlang} alt="" />
                          <p>{deskPlayers[1]}</p>
                        </div>
                        
                        <div className="avatar j3 avatar-compa">
                          <img src={erlang} alt="" />
                          <p>{deskPlayers[2]}</p>
                        </div>

                        <div className="avatar j4 avatar-oponente-iz">
                          <img src={erlang} alt="" />
                          <p>{deskPlayers[3]}</p>
                        </div>

                        <div className="cards2 cartas-oponente-iz">
                          <div className="card-contri"><img src={B1} alt="" /></div>
                          <div className="card-contri"><img src={B1} alt="" /></div>
                          <div className="card-contri"><img src={B1} alt="" /></div>
                          <div className="card-contri"><img src={B1} alt="" /></div>
                        </div>

                          <div className="cards3 cartas-compa">
                            <div className="card-compa"><img src={B1} alt="" /></div>
                            <div className="card-compa"><img src={B1} alt="" /></div>
                            <div className="card-compa"><img src={B1} alt="" /></div>
                            <div className="card-compa"><img src={B1} alt="" /></div>
                          </div>

                          <div className="info">Twitch</div>
                          <div className='mesa'><img src={tapetepixel} alt="" /></div>
                          
                          <div className="cards1 cartas-activo">
                              <div className="card p1"><img src={B1} alt="" /></div>
                              <div className="card p1"><img src={B1} alt="" /></div>
                              <div className="card p1"><img src={B1} alt="" /></div>
                              <div className="card p1"><img src={B1} alt="" /></div>
                          </div>
                        
                        <div className="cards2  cartas-oponente-dr">
                            <div className="card-contrd"><img src={B1} alt="" /></div>
                            <div className="card-contrd"><img src={B1} alt="" /></div>
                            <div className="card-contrd"><img src={B1} alt="" /></div>
                            <div className="card-contrd"><img src={B1} alt="" /></div>
                        </div>

                        <Chat 
                          closeConnection={closeConnection} 
                          sendMessage={sendMessage} 
                          messages={messages}
                          setMessage={setMessage}
                          message={message}
                        ></Chat>
                </div>



            </div>

            
        </div>

    }

            
            

        </div>

    )
}
export default Room;