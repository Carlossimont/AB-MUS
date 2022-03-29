import tapete from './img/tapete.jpg';
import './Room.scss'
import Teams from '../teams/Teams'
import { useState,useEffect } from 'react';
import Chat from '../chat/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import erlang from './img/erlang.png';

function Room({user,room}) {

    let [ready, setReady] = useState(false);
    let [alias,setAlias] = useState();
    let [lobbyId,setLobbyId] = useState();
    let [players,setPlayers] = useState(['Player1','Player2','Player3','Player4']);
    let [player,setOnePlayer] = useState('');
    let [myChair,setMyChair] = useState(-1);
    let [number,setNumber] = useState('');
    let [name,setName] = useState('');
    let [game,setGame] = useState(false);
    let [playerThree,setPlayerThree] = useState('');
    let [myCards,setMyCards] = useState([]);
  
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    let playersAux = [];
  
    useEffect(()=>{
      console.log(players);
      let playersAux = [...players];
      playersAux[number] = name;
      setPlayers(playersAux);
    },[number])

    useEffect(()=>{//ngOnInit
        console.log(user);
        console.log(room);
        joinRoom(user,room);
    },[])
    
  
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

    return (

        <div style={{ backgroundImage: `url(${tapete})` }} id="background">
            {!ready ? 
                <Teams setMyChair={setMyChair} setPlayer={setPlayer} connection={connection} users={users} setReady={setReady} ready={ready} players={players}/> 
            :
                <div className="flex">
                    <div className="team1">
                        <div className="player1">
                            <div>
                                <div className="avatar j3">
                                  <img src={erlang} alt="" />
                                </div>
                                
                            </div>

                        </div>
                    </div>

                    <div className="team2">
                        <div className="player2">
                            <div className="avatar j4">
                              <img src={erlang} alt="" />
                            </div>
                            
                        </div>
                        <div>
                                <div className="cards1">
                                    <div className="card ">1card3p</div>
                                    <div className="card">2card3p</div>
                                    <div className="card">3card3p</div>
                                    <div className="card">4card3p</div>
                                </div>
                                
                                <div className="cards2">
                                    <div className="card 4p1">1card4p</div>
                                    <div className="card 4p2">2card4p</div>
                                    <div className="card 4p3">3card4p</div>
                                    <div className="card 4p4">4card4p</div>
                                </div>

                                <div className="cards2">
                                    <div className="card 2p1">1card2p</div>
                                    <div className="card 2p2">2card2p</div>
                                    <div className="card 2p3">3card2p</div>
                                    <div className="card 2p4">4card2p</div>
                                </div>
                                
                                <div className="cards1">
                                    <div className="card p1">1card1p</div>
                                    <div className="card p1">2card1p</div>
                                    <div className="card p1">3card1p</div>
                                    <div className="card p1">4card1p</div>
                                </div>
                        </div>



                        <div className="player2">


                            <div className="avatar j2">
                              <img src={erlang} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="team1">
                        <div className="player3">
                            
                              
                            
                              <div className="avatar j1">
                                  <img src={erlang} alt="" />
                              </div>
                            
                            <div>
                                <div className="buttons">Mus</div>
                                <div className="buttons">No hay mus</div>
                                <div className="buttons">ÓRDAGO ME CAGO EN DIOS</div>
                            </div>
                            
                            
                        </div>
                    </div>

                </div>

            }
            <Chat closeConnection={closeConnection} sendMessage={sendMessage} messages={messages}></Chat>

        </div>

    )
}
export default Room;