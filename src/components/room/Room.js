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
  let [turno,setTurno] = useState(-1);
  let [changeRepartir,setChangeRepartir] = useState(false);
  let [round,setRound] = useState(-1);
  let [roundName,setRoundName] = useState('Mus');
  let [bet,setBet] = useState(2);
  let [contadorMayor,setContadorMayor] = useState(1);
  let [contadorPeque,setContadorPeque] = useState(1);
  let [contadorPares,setContadorPares] = useState(0);
  let [contadorJuego,setContadorJuego] = useState(0);
  let [contadorOddTeam,setContadorOddTeam] = useState(0);
  let [contadorParTeam,setContadorParTeam] = useState(0);
  let [contadorGamesOddTeam,setContadorGamesOddTeam] = useState(0);
  let [contadorGamesParTeam,setContadorGamesParTeam] = useState(0);
  let [answer,setAnswer] = useState(false);
  let [faseApuesta,setFaseApuesta] = useState(0);
  let [discNum,setDiscNum] = useState(0);
  let [myDiscards,setMyDiscards] = useState([]);
  let [droppedCards,setDroppedCards] = useState([]);
  let [othersDiscards,setOthersDiscards] = useState([]);

  let [check,setCheck] = useState('nada');

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

  useEffect(()=>{
    switch (round) {
      case -1:
        setRoundName('Repartiendo...');
      setTurno(playerThree+1);
        break;

        case 0:
        setRoundName('Mus');
      setTurno(playerThree+1);
        break;

        case 1:
        setRoundName('Descartes');
      setTurno(playerThree+1);
        break;

        case 2:
        setRoundName('Mayor');
      setTurno(playerThree+1);
        break;

        case 3:
        setRoundName('Pequeña');
      setTurno(playerThree+1);
        break;

        case 4:
        setRoundName('Hay pares');
      setTurno(playerThree+1);
        break;

        case 5:
        setRoundName('Pares');
      setTurno(playerThree+1);
        break;

        case 6:
        setRoundName('Hay Juego');
      setTurno(playerThree+1);
        break;

        case 7:
        setRoundName('Juego');
      setTurno(playerThree+1);
        break;

        case 8:
        setRoundName('Punto');
      setTurno(playerThree+1);
        break;

        case 9:
        setRoundName('Contando...');
      setTurno(playerThree+1);
        break;
    
      default:
        alert('Ha entrado default en switch de ronda')
        break;
    }
    
  },[round])

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
    changeTurn(playerThree,round);
    setChangeRepartir(true);
  
  }

  useEffect(()=>{
    if(check==='repartir'){
      sendDeckHands(deckHands);
    }
  },[deckHands])

  useEffect(()=>{
    if (turno===4) {
      setTurno(0);
    }
  },[turno])

  function seleccionarDescarte() {
    let deckHandsAux = [...deckHands];
    let barajaAux = [...baraja];//esta es la baraja restante
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

  function discardMyCards(){
    let droppedCardsAux = [...droppedCards];
    if (myChair===playerThree) {
      
    }
  }

  // useEffect(() => {
  //   if (barajaDescartes.length == 0 && playerThree>-1) {
  //     barajar();
  //   }
  // }, [barajaDescartes]);

  function discardOneCard(pos) {
    let myDiscardsAux=[...myDiscards];
    if (myDiscardsAux[pos]===myCards[pos]) {
      myDiscardsAux[pos]='000';
    } else {
      myDiscardsAux[pos] = myCards[pos];
    }
    setMyDiscards(myDiscardsAux);
  }

  useEffect(()=>{
    let count = 0;
    myDiscards.forEach((carta)=>{
      if (carta === '000') {
        count++;
      }
    })
    setDiscNum(count);
  },[myDiscards])

  function sumBet(num){//puede fallar el num
    if (num<0) {
      setBet(2);
    } else {
      setBet(bet+num);
    }
  }

  useEffect(()=>{
    if (round === 1) {
      setMyDiscards(myCards);
    }
  },[round])

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

      connection.on("NewTurn", (num) => {//ddddddddddddhdhdedvbeifvbefbvebrvibewrbivewirb
        setTurno(num);
      });

      connection.on("NextRound", (ronda) => {
        console.log('entra nextround desde signalr');
        setRound(ronda);
      });

      connection.on("NoMus", () => {
        setRound(2);
        console.log(playerThree+1);
      });

      connection.on("ReceiveHandCards", (handCards) => {
        setMyCards(handCards);
        console.log(handCards);
      });

      connection.on("StartGame", (player3) => {
        setGame(true);
        setRound(-1);
        setPlayerThree(player3);
        console.log(player3);
        setTurno(player3);
      });

      connection.on("OddTeamBets", (teamBet) => {
        if (myChair%2===0) {
          setAnswer(true);
        }
      });

      connection.on("DroppedCards", (arrayDesc) => {
        let arrayDescAux = [...othersDiscards]
        console.log(arrayDesc);
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

  const noMus = async () => {
    console.log("entra nomus");
    try {
      await connection.invoke("NoMus");
    } catch (e) {
      console.log(e);
    }
  };

  const changeTurn = async (postre,ronda) => {
    console.log("entra changeturn");
    try {
      await connection.invoke("ChangeTurn",postre,ronda);
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

  const dropMyCards = async () => {//al pulsar el boton de descartar cambiamos las partes de atras de las cartas por invisibles
    let myDiscardsAuxAux = [...myDiscards];
    console.log("entra dropmycards");
    for (let i = 0; i < 4; i++) {
      if (myDiscardsAuxAux[i]!==myCards[i]) {
        myDiscardsAuxAux[i]='F000';
        console.log(myDiscardsAuxAux)
      }
      
    }
    setMyDiscards(myDiscardsAuxAux);
    if (turno!==playerThree) {
    try {//si no soy postre lo mando por signalr
      await connection.invoke("DropCards",myDiscardsAuxAux,playerThree);
      changeTurn(playerThree,round);
    } catch (e) {
      console.log(e);
    }
  } else {
    let othersDiscardsAux = [...othersDiscards];
    othersDiscardsAux.push(myDiscards);
  }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const envido = async () => {
    console.log("entra bet");
    try {
      await connection.invoke("Bet", bet);
    } catch (e) {
      console.log(e);
    }
  };

  

  return (

    <div style={{ backgroundImage: `url(${suelo})` }} id="background">
        {!game ? 
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
                        {myChair===turno ?
                      <div className='flexbuttons'>
                        {myChair===playerThree && round===-1 ? 
                          <div className='prenohaymus'>
                            <div onClick={()=>barajar()}>barajar</div>
                            <div onClick={()=>repartir()}>repartir</div>
                          </div> : <></>}
                        {round === 0 ?
                        <div className='prenohaymus'>
                          <div className="buttons" onClick={()=>changeTurn(playerThree,round)}>Mus</div>
                          <div className="buttons" onClick={()=>noMus()}>No hay mus</div>
                        </div> : <></>
                        }

                        {round === 1 && discNum > 0 ?//meter condicion de que se haya descartado de una carta minimo
                        <div className="buttons" onClick={()=>dropMyCards()}>Descartar</div>
                        : round === 1 && discNum === 0 ? 
                        <div className="buttons">Debes descartarte de una mínimo</div>
                        : <></>}
                 
                        {round > 1 ?
                        <div className='postnohaymus'>
                            <div>
                              <div onClick={()=>sumBet(1)}><h1>+1</h1></div>
                              <div onClick={()=>sumBet(5)}><h1>+5</h1></div>
                             

                            </div>
                            <div>
                              <div>
                                <div onClick={()=>envido()}>
                                <h2 >Envido</h2>
                                </div>
                                <p className='suma'>{bet}</p>
                              </div>
                              <div onClick={()=>sumBet(-1)}><h2>BORRAR</h2></div>
                             
                            </div>
                             <div onClick={()=>changeTurn(playerThree,round)}><h1>PASAR</h1></div>
                            <div><h2>ÓRDAGO</h2></div>
                        </div>
                        : <></>}
                      
                        </div> : <></>}
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
                      {round>-1 ? <>
                      <div className="card-contri"><img src={"/img/000.png"} /></div>
                      <div className="card-contri"><img src={"/img/000.png"} /></div>
                      <div className="card-contri"><img src={"/img/000.png"} /></div>
                      <div className="card-contri"><img src={"/img/000.png"} /></div>
                      </>
                      : <></>}
                    </div>

                      <div className="cards3 cartas-compa">
                      {round>-1 ? <>
                        <div className="card-compa"><img src={"/img/000.png"} /></div>
                        <div className="card-compa"><img src={"/img/000.png"} /></div>
                        <div className="card-compa"><img src={"/img/000.png"} /></div>
                        <div className="card-compa"><img src={"/img/000.png"} /></div>
                        </>
                      : <></>}
                      </div>

                      <div className="info">{roundName}</div>
                      <div>Impar: {contadorOddTeam}</div>
                      <div>Par: {contadorParTeam}</div>
                      <div className='mesa'><img src={tapetepixel} alt="" /></div>
                      
                      <div className="cards1 cartas-activo">
                {round === 1 ? 
                <>
                <div className="card p1">
                  <img src={"/img/"+myDiscards[0]+".png"} onClick={()=>discardOneCard(0)} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myDiscards[1]+".png"} onClick={()=>discardOneCard(1)} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myDiscards[2]+".png"} onClick={()=>discardOneCard(2)} alt="" />
                </div>
                <div className="card p1">
                  <img src={"/img/"+myDiscards[3]+".png"} onClick={()=>discardOneCard(3)} alt="" />
                </div>
                </> : 
                <>
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
                </>
                
                }


              </div>
              
                    
                    <div className="cards2  cartas-oponente-dr">
                      {round>-1 ? <>
                        <div className="card-contrd"><img src={"/img/000.png"} /></div>
                        <div className="card-contrd"><img src={"/img/000.png"} /></div>
                        <div className="card-contrd"><img src={"/img/000.png"} /></div>
                        <div className="card-contrd"><img src={"/img/000.png"} /></div>
                        </>
                      : <></>}
                    </div>
                        
                    <div className='mazo1'><img src={"/img/000.png"} alt=""/></div>
                    <div className='mazo2'><img src={"/img/000.png"} alt=""/></div>
                    <div className='mazo3'><img src={"/img/000.png"} alt=""/></div>
                    <div className='mazo4'><img src={"/img/000.png"} alt=""/></div>

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

