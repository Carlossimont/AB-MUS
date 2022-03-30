import tapete from './img/tapete.jpg';
import tapetepixel from './img/tapetepixel.png';
import './Room.scss'
import Teams from '../teams/Teams'
import { useState,useEffect } from 'react';
import Chat from '../chat/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import erlang from './img/erlang.png';
import B1 from './img/B1.png';
import suelo from './img/suelo.png';

function Room({ user, room }) {
  let numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  let palos = ["O", "C", "E", "B"];
  let [ready, setReady] = useState(false);
  let [alias, setAlias] = useState();
  let [message, setMessage] = useState("");
  let [lobbyId, setLobbyId] = useState();
  let [players, setPlayers] = useState([
    "Player1",
    "Player2",
    "Player3",
    "Player4",
  ]);
  let [player, setOnePlayer] = useState("");
  let [myChair, setMyChair] = useState(-1);
  let [number, setNumber] = useState("");
  let [name, setName] = useState("");
  let [game, setGame] = useState(false);
  let [playerThree, setPlayerThree] = useState(-1);
  let [myCards, setMyCards] = useState([]);
  let [deskPlayers, setDeskPlayers] = useState([]);
  let [baraja, setBaraja] = useState([]);
  let [barajaDescartes, setBarajaDescartes] = useState([]);
  let [deckHands, setDeckHands] = useState([], [], [], []);
  let [ordenRonda, setOrdenRonda] = useState([]);
  
  let [check,setCheck] = useState('nada');
  let [arrayPrueba, setArrayPrueba] = useState([
    [O5, C10, B3, C10],
    [C10, C10, C10, C10],
    [C10, C10, C10, C10],
    [C10, C10, C10, O1],
  ]);

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  let playersAux = [];

  useEffect(() => {
    let deskPlayersAux = [];
    let pos = myChair;
    let barajaAux = [];
    if (game){
    for (let i = 0; i < 4; i++) {
      if (pos == 4) {
        pos = 0;
      }
      deskPlayersAux[i] = players[pos];
      pos++;
      console.log(deskPlayersAux);
    }
    setDeskPlayers(deskPlayersAux);
    palos.forEach((p) => {
      numeros.forEach((n) => {
        barajaAux.push(p + n);
      });
    });
    console.log(barajaAux);
    setBaraja(barajaAux);
  }}, [game]);

  useEffect(() => {
    console.log(players);
    let playersAux = [...players];
    playersAux[number] = name;
    setPlayers(playersAux);
  }, [number]);

  // useEffect(() => {
  //   let barajaAux = [];
  //   palos.forEach((p) => {
  //     numeros.forEach((n) => {
  //       barajaAux.push(p + n);
  //     });
  //   });
  //   console.log(barajaAux);
  //   setBaraja(barajaAux);
  // }, []);

  function barajar() {
    console.log("entra barajar");
    let arrayAux = [];
    let posiciones = [];
    for (let i = 0; i < baraja.length; i++) {
      let exit = false;
      let posicion = -1;
      while (!exit) {
        exit = true;
        posicion = Math.floor(Math.random() * baraja.length);
        posiciones.forEach((p) => {
          if (p == posicion) {
            exit = false;
          }
        });
      }
      posiciones.push(posicion);
      arrayAux[i] = baraja[posicion];
    }
    console.log(arrayAux);
    setBaraja(arrayAux); //mete en baraja las cartas barajadas BIEN
    console.log("acaba barajar");
    setCheck('barajar');

  }

  useEffect(()=>{
    if (check=='nada') {

    if (check=='barajar') {
      
    }
  }
},[check])

  function repartir() {
    console.log("entra repartir");
    console.log(baraja)
    let cont = -1;
    let deckHandsAux = [[], [], [], []];
    let barajaAux = [...baraja];
    
      
    
    setCheck('barajar')

    for (let i = 0; i < 16; i++) {
      cont++;
      deckHandsAux[cont].push(barajaAux[i]);
      if (cont === 3) {
        cont = -1;
      }
    }
    setCheck('repartir');
    barajaAux.splice(0, 16);
    console.log(deckHandsAux);
    setDeckHands(deckHandsAux);
    setBaraja(barajaAux);
    console.log('baraja restante');
    console.log(barajaAux);
  
  }

  useEffect(()=>{
    if(check==='repartir'){
      sendDeckHands(deckHands);
    }
  },[deckHands])

  function seleccionarDescarte() {
    let deckHandsAux = [...deckHands];
    let barajaAux = [...baraja];
    deckHands.forEach((jugador, i) => {
      jugador.forEach((carta, j) => {
        if (carta == 0) {
          deckHandsAux[i][j] = barajaAux[0];
          barajaAux.splice(0, 1);
          if (!barajaAux.length) {
            barajaAux = [...barajaDescartes];
            setBaraja(barajaAux);
            setBarajaDescartes([]);
          }
        }
      });
    });
    setBaraja(barajaAux);
    setDeckHands(deckHandsAux);
  }

  // useEffect(() => {
  //   if (barajaDescartes.length == 0 && playerThree>-1) {
  //     barajar();
  //   }
  // }, [barajaDescartes]);

  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  function descartarCarta(jugador, carta) {
    let deckHandsAux = [...deckHands]; //... operator spread clona array para tener dos arrays de forma independiente
    let barajaDescAux = [...barajaDescartes];
    barajaDescAux.push(deckHandsAux[jugador][carta]);
    deckHandsAux[jugador][carta] = 0;
    setDeckHands(deckHandsAux);

    setBarajaDescartes(barajaDescAux);
    console.log(barajaDescAux);
  }

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

      connection.on("ReceivePlayerNumber", (user, playerNumber) => {
        console.log(players);
        setName(user);
        setNumber(playerNumber);
      });

      connection.on("ReceiveHandCards", (handCards) => {
        setMyCards(handCards);
        console.log(handCards);
      });

      connection.on("StartGame", (player3) => {
        setGame(true);
        setPlayerThree(player3);
        console.log(player3);
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

  useEffect(() => {
    let ordenRondaAux = [];
    let orden = playerThree;
    if (playerThree !== -1) {
      for (let i = 0; i < 4; i++) {
        if (orden === 4) {
          orden = 0;
        }
        orden++;
        ordenRondaAux.push(players[orden]);
      }
      setOrdenRonda(ordenRondaAux);
    }
  }, [playerThree]);

  // useEffect(()=>{
  //   if (myChair===playerThree) {
  //     console.log('soy postre');

  //     // sleep(500).then(()=>{
  //     //   repartir();
  //     // })
  //     repartir().then(()=>{
  //       sendDeckHands(deckHands);
  //     })

  //     console.log(deckHands)
  //   }
  // },[ordenRonda])

  const sendDeckHands = async (hands) => {
    console.log("entra senddeckhands");
    try {
      await connection.invoke("SendCards", hands);
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
      console.log("entra a app.js setPlayer");
      await connection.invoke("SetPlayer", playerNumber);
    } catch (e) {
      console.log(e + "setplayererror");
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, [myChair]);

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
                <div className="card p1">
                  <img src={"/img/"+myCards[0]+".png"} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myCards[1]+".png"} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myCards[2]+".png"} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myCards[3]+".png"} alt="" />
                </div>
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

