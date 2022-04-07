import tapete from "./img/tapete.jpg";
import tapetepixel from "./img/Table4.png";
import "./room.scss";
import Teams from "../teams/Teams";
import { useState, useEffect } from "react";
import Chat from "../chat/Chat";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import erlang from "./img/erlang.png";
import B1 from "./img/B1.png";
import F000 from "./img/F000.png";
import suelo from "./img/suelo_piedra.png";
import Marcador from '../marcador/Marcador'

function Room({ user, room}) {
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
  let [deckHands, setDeckHands] = useState([], [], [], []); //creo que debería ser [[],[],[],[]] pero así funciona asi k...sssshhh
  let [ordenRonda, setOrdenRonda] = useState([]);
  let [turno, setTurno] = useState(-1);
  let [changeRepartir, setChangeRepartir] = useState(false);
  let [round, setRound] = useState(3);
  let [roundName, setRoundName] = useState("Mus");
  let [bet, setBet] = useState(2);
  let [arrayPruebas, setArrayPruebas] = useState([
    ["E11,O12,C1,E12"],
    ["E1,O2,C1,E10"],
    ["E6,O4,C5,E7"],
    ["E10,O10,C10,E7"],
  ]);

  let [contadorMayor, setContadorMayor] = useState(1);
  let [contadorPeque, setContadorPeque] = useState(1);
  let [contadorPares, setContadorPares] = useState(0);
  let [contadorJuego, setContadorJuego] = useState(0);
  let [contadorPunto, setContadorPunto] = useState(1);
  let [contadorRedTeam, setContadorRedTeam] = useState(0);
  let [contadorBlueTeam, setContadorBlueTeam] = useState(0);
  let [contadorGamesRedTeam, setContadorGamesRedTeam] = useState(0);
  let [contadorGamesBlueTeam, setContadorGamesBlueTeam] = useState(0);
  let [mazoPos, setMazoPos] = useState(["F000", "F000", "F000", "F000"]);
  let [contador, setContador] = useState(-1);

  let [answer, setAnswer] = useState(false);
  let [faseApuesta, setFaseApuesta] = useState(0);
  let [discNum, setDiscNum] = useState(0);
  let [myDiscards, setMyDiscards] = useState([]);
  let [droppedCards, setDroppedCards] = useState([]);
  let [othersDiscards, setOthersDiscards] = useState([]);
  let [arrayDescartes, setArrayDescartes] = useState([]);
  let [flagBet, setFlagBet] = useState(false);
  let [myTeam, setMyTeam] = useState("white");
  let [showAnswer, setShowAnswer] = useState(false);
  let [betTeam, setBetTeam] = useState("white");
  let [secondBet, setSecondBet] = useState(0);
  let [foldNum, setFoldNum] = useState(-1);
  let [boolJuego,setBoolJuego] = useState([]);
  let [boolPares,setBoolPares] = useState([]);
  let [tengoPares,setTengoPares] = useState(false);
  let [tengoJuego,setTengoJuego] = useState(false);

  let [check, setCheck] = useState("nada");

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(["Edu", "Maren", "Carlos", "Asier"]);
  let playersAux = [];

  useEffect(() => {
    if (round > 0) {
      setSecondBet(1);
    }
  }, [showAnswer]);

  useEffect(() => {
    if (betTeam !== "white") {
      setFlagBet(true);
      console.log("mi equipo");
      console.log(myTeam);
      console.log("equipo entra");
      console.log(betTeam);
      if (myTeam !== betTeam) {
        //si mi equipo es el que NO apuesta abrimos los botones al resto;
        setShowAnswer(true);
      } else {
        setShowAnswer(false);
      }
      console.log(flagBet);
    }
  }, [betTeam]);

  useEffect(() => {
    let deskPlayersAux = [];
    let pos = myChair;
    let barajaAux = [];
    if (game) {
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
    }
  }, [game]);


  useEffect(() => {
    console.log(players);
    let playersAux = [...players];
    playersAux[number] = name;
    setPlayers(playersAux);
  }, [number]);

  useEffect(() => {
    switch (round) {
      case -1:
        setRoundName("Repartiendo...");
        setTurno(playerThree + 1);
        break;

      case 0:
        setRoundName("Mus");
        setTurno(playerThree + 1);
        break;

      case 1:
        setRoundName("Descartes");
        setTurno(playerThree + 1);
        break;

      case 2:
        setRoundName("Mayor");
        setTurno(playerThree + 1);
        break;

      case 3:
        setRoundName("Pequeña");
        setTurno(playerThree + 1);
        break;

      case 4:
        setRoundName("Hay pares");
        setTurno(playerThree + 1);
        break;

      case 5:
        setRoundName("Pares");
        setTurno(playerThree + 1);
        break;

      case 6:
        setRoundName("Hay Juego");
        setTurno(playerThree + 1);
        break;

      case 7:
        setRoundName("Juego");
        setTurno(playerThree + 1);
        break;

      case 8:
        setRoundName("Punto");
        setTurno(playerThree + 1);
        break;

      case 9:
        setRoundName("Contando...");
        setTurno(playerThree + 1);
        break;

      default:
        alert("Ha entrado default en switch de ronda");
        break;
    }
  }, [round]);

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
    setCheck("barajar");
  }

  // useEffect(() => {
  //   if (check == "nada") {
  //     if (check == "barajar") {
  //     }
  //   }
  // }, [check]);

  function repartir() {
    console.log("entra repartir");
    console.log(baraja);
    let cont = -1;
    let deckHandsAux = [[], [], [], []];
    let barajaAux = [...baraja];
    setCheck("barajar");

    for (let i = 0; i < 16; i++) {
      cont++;
      deckHandsAux[cont].push(barajaAux[i]);
      if (cont === 3) {
        cont = -1;
      }
    }
    setCheck("repartir");
    barajaAux.splice(0, 16);
    console.log(deckHandsAux);
    setDeckHands(deckHandsAux);
    setBaraja(barajaAux);
    console.log("baraja restante");
    console.log(barajaAux);
    changeTurn(playerThree, round);
    setChangeRepartir(true);
  }

  useEffect(() => {
    if (check === "repartir") {
      sendDeckHands(deckHands);
    }
    console.log("Se actualiza deckhands");
    console.log(deckHands);
  }, [deckHands]);

  useEffect(() => {
    if (turno === 4) {
      setTurno(0);
    }
  }, [turno]);

  function repartirMus() {
    console.log("entra repartir mus");
    let deckHandsAux = [...othersDiscards];
    let barajaAux = [...baraja]; //esta es la baraja restante
    setCheck("repartir");
    othersDiscards.forEach((jugador, i) => {
      jugador.forEach((carta, j) => {
        if (carta === "F000") {
          console.log("carta coincide con F000");
          deckHandsAux[i][j] = barajaAux[0];
          barajaAux.splice(0, 1);
          if (!barajaAux.length) {
            //esto nunca va  a entrar por AHORA
            console.log("espero que no entre");
            barajaAux = [...barajaDescartes];
            setBaraja(barajaAux); //TODO: barajar los descartes al meterlos en la baraja
            setBarajaDescartes([]);
          }
        }
      });
    });
    setBaraja(barajaAux);
    console.log(deckHandsAux);
    setDeckHands(deckHandsAux);
    sendDeckHands(deckHandsAux);
    changeTurn(playerThree, -1); //TODO: cambio turno cuando el postre reparte los descartes
  }

  useEffect(() => {
    console.log("entra set baraja descartes");
    if (turno === myChair && barajaDescartes.length > 3) {
      repartirMus();
    }
  }, [barajaDescartes]);

  // switch (round) {
  //   case 2:
  //     setContadorMayor(contador);
  //     changeRound(2);
  //     break;

  //   case 3:
  //     setContadorPeque(contador);
  //     changeRound(3);
  //     break;

  //   case 5:
  //     setContadorPares(contador);
  //     changeRound(5);
  //     break;

  //   case 7:
  //     setContadorJuego(contador);
  //     changeRound(7);
  //     break;

  //   default:
  //     console.log("no entra una puta variable en async");
  //     break;

  useEffect(() => {
    if (contador > -1) {
      switch (round) {
        case 2:
          setContadorMayor(contador);
          changeRound(2);
          break;

        case 3:
          setContadorPeque(contador);
          changeRound(3);
          break;

        case 5:
          setContadorPares(contador);
          changeRound(5);
          break;

        case 7:
          setContadorJuego(contador);
          changeRound(7);
          break;

        case 8:
          setContadorPunto(contador);
          changeRound(8);
          break;

        default:
          console.log("entra default en switch de contador");
          break;
      }
    }
  }, [contador]);

  function discardOneCard(pos) {
    let myDiscardsAux = [...myDiscards];
    if (myDiscardsAux[pos] === myCards[pos]) {
      myDiscardsAux[pos] = "000";
    } else {
      myDiscardsAux[pos] = myCards[pos];
    }
    setMyDiscards(myDiscardsAux);
  }

  useEffect(() => {
    if (round === 1) {
      let arrayDescAux = [...othersDiscards];
      console.log("recibo cartas");
      arrayDescAux.push(arrayDescartes);
      setOthersDiscards(arrayDescAux);
    }
  }, [arrayDescartes]);

  function addDiscardArray(array) {
    setArrayDescartes(array);
    console.log("recibo cartas");
    //TODO: esto peta, no rellena el array con el array que viene, se queda solo con el ultimo
  }

  useEffect(() => {
    let count = 0;
    myDiscards.forEach((carta) => {
      if (carta === "000") {
        count++;
      }
    });
    setDiscNum(count);
  }, [myDiscards]);

  function sumBet(num) {
    //puede fallar el num
    if (num < 0) {
      setBet(2);
    } else {
      setBet(bet + num);
    }
  }

  function sumSecondBet(num) {
    //puede fallar el num
    if (num < 0) {
      setSecondBet(2);
    } else {
      setSecondBet(bet + num);
    }
  }

  useEffect(() => {
    console.log("se actualiza othersDiscards");
    console.log(othersDiscards); //tenemos el array de todos los descartes
    let discardDeck = [...barajaDescartes];
    if (othersDiscards.length === 4) {
      console.log("entra por longitud 4");
      othersDiscards.forEach((mano, i) => {
        mano.forEach((carta, j) => {
          if (carta !== deckHands[i][j]) {
            discardDeck.push(deckHands[i][j]);
            console.log(discardDeck);
          }
        });
      });
      console.log(discardDeck);
      setBarajaDescartes(discardDeck);
    }
  }, [othersDiscards]);

  useEffect(() => {
    console.log("nueva ronda");
    console.log(round);
    if (round === 1) {
      setMyDiscards(myCards);
    }
    console.log(myChair);
    console.log(playerThree);
    if (myChair === playerThree) {
      if (round === 2) {
        recibirCartas(deckHands);
      }
      if (round === 4) {
        hayPares(deckHands);
      }
      if (round === 6) {
        hayJuego(deckHands);
      }
      if (round === 9) {
        countAll(deckHands);
      }
    }

    setBet(2);
    setSecondBet(0);
    setShowAnswer(false);
    setBetTeam("white");
    setFlagBet(false);
    //TODO: aaaa
  }, [round]);

  function call() {
    switch (round) {
      case 2:
        callSignal(contadorMayor);
        break;

      case 3:
        callSignal(contadorPeque);
        break;

      case 5:
        callSignal(contadorPares);
        break;

      case 7:
        callSignal(contadorJuego);
        break;

      case 8:
        callSignal(contadorPunto);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (foldNum > -1) {
      if (playerThree === myChair) {
        changeRound(round);
      }
    }
  }, [foldNum]);

  useEffect(()=>{
    let count = 0;
    if (round > -1 ) {
      boolPares.forEach((booleano,i)=>{
        if (booleano) {
          if (i===myChair) {
            setTengoPares(true);
          } else {
            count++;
          }
        }
      })
    }
    if (count===4) {
      noPares();
    }
  },[boolPares])

  useEffect(()=>{
    let count = 0;
    if (round === 4 ) {
      boolJuego.forEach((booleano,i)=>{
        if (booleano) {
          if (i===myChair) {
            setTengoJuego(true);
          } else {
            count++;
          }
        }
      })
    }
    if (count===4) {
      noJuego();
    }
  },[boolJuego])

  function fold() {
    switch (round) {
      case 2:
        foldSignal(contadorMayor, 2);
        break;

      case 3:
        foldSignal(contadorPeque, 3);
        break;

      case 5:
        foldSignal(contadorPares, 5);
        break;

      case 7:
        foldSignal(contadorJuego, 7);
        break;

      case 8:
        foldSignal(contadorPunto, 8);
        break;

      default:
        alert("Entra default del switch de fold");
        break;
    }
  }

  useEffect(() => {
    console.log("cambio de chair");
    if (myChair > -1) {
      console.log("cambio de chair bien");
      if (myChair % 2 === 0) {
        console.log("seteo team blue");
        setMyTeam("blue");
      } else {
        console.log("seteo team red");
        setMyTeam("red");
      }
    }
  }, [myChair]);

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

      connection.on("NewTurn", (num) => {
        //ddddddddddddhdhdedvbeifvbefbvebrvibewrbivewirb
        setTurno(num);
      });

      connection.on("NextRound", (ronda) => {
        console.log("entra nextround desde signalr");
        setRound(ronda);
      });

      connection.on("NoMus", () => {
        setRound(2);
      });

      connection.on("Bet", (bet, team) => {
        setBet(bet);
        setBetTeam(team);
      });

      connection.on("ReceiveHandCards", (handCards) => {
        setMyCards(handCards);
        console.log(handCards);
      });

      // connection.on("Accountant", () => {
      //   if (myChair === playerThree) {
      //     console.log("entra por postre ");
      //     countAll();
      //   }
      // });

      connection.on("StartGame", (player3) => {
        setGame(true);
        setRound(-1);
        setPlayerThree(player3);
        console.log(player3);
        setTurno(player3);
      });

      connection.on("SecondBet", (contador, secondBet, team) => {
        setBet(secondBet);
        setBetTeam(team);
        setContador(contador);
      });

      connection.on("Fold", (contador, team) => {
        if (team === "blue") {
          setContadorBlueTeam(contadorBlueTeam + contador);
        } else {
          setContadorRedTeam(contadorRedTeam + contador);
        }
        setBet(2);
        setSecondBet(1);
        setFlagBet(false);
        //setFoldNum(foldNum + 1);  si alguien no quiere hacemos nextround desde el back
      });

      connection.on("Call", (contador) => {
        setContador(contador);
        setBet(2);
        setSecondBet(1);
        setFlagBet(false);
      });

      connection.on("boolPares", (bool) => {
        setBoolPares(bool);
      });

      connection.on("boolJuego", (bool) => {
        setBoolJuego(bool);
      });

      connection.on("DroppedCards", (arrayDesc) => {
        addDiscardArray(arrayDesc);
        // let arrayDescAux = [...othersDiscards];
        // console.log('recibo cartas');
        // arrayDescAux.push(arrayDesc);//TODO: esto peta, no rellena el array con el array que viene, se queda solo con el ultimo
        // console.log(arrayDescAux);
        // setOthersDiscards(arrayDescAux);
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
    let mazoPosAux = [];
    let orden = playerThree;
    let mazo = myChair;
    if (playerThree !== -1) {
      for (let i = 0; i < 4; i++) {
        if (orden === 4) {
          orden = 0;
        }
        orden++;
        ordenRondaAux.push(players[orden]);
      }
      for (let i = 0; i < 4; i++) {
        if (mazo === 4) {
          mazo = 0;
        }
        if (mazo === playerThree) {
          mazoPosAux.push("000");
        } else {
          mazoPosAux.push("F000");
        }
        mazo++;
      }
      setMazoPos(mazoPosAux);
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

  const changeTurn = async (postre, ronda) => {
    console.log("entra changeturn");
    try {
      await connection.invoke("ChangeTurn", postre, ronda);
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

  const recibirCartas = async (manos) => {
    console.log(manos);
    try {
      await connection.invoke("RecibirCartas", manos);
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

  const noPares = async () => {
    try {
      console.log("NADIE TIENE PARES");
      await connection.invoke("NextRound", 5);
    } catch (e) {
      console.log(e + " nadie pares");
    }
  };

  const noJuego = async () => {
    try {
      console.log("NADIE TIENE JUEGO");
      await connection.invoke("NextRound", 7);
    } catch (e) {
      console.log(e + " nadie juego");
    }
  };

  const countAll = async (deck) => {
    try {
      await connection.invoke("AccountantMayor", deck);
    } catch (e) {
      console.log(e + " accountant mayor");
    }
  };

  const hayPares = async (deck) => {
    try {
      console.log("invoca a hay pares");
      await connection.invoke("HayPares", deck);
    } catch (e) {
      console.log(e + " hay pares");
    }
  };

  const hayJuego = async (deck) => {
    try {
      console.log("invoca a hay juego");
      await connection.invoke("HayJuego", deck);
    } catch (e) {
      console.log(e + " hay juego");
    }
  };

  const dropMyCards = async () => {
    //al pulsar el boton de descartar cambiamos las partes de atras de las cartas por invisibles
    let myDiscardsAuxAux = [...myDiscards];
    console.log("entra dropmycards");
    for (let i = 0; i < 4; i++) {
      if (myDiscardsAuxAux[i] !== myCards[i]) {
        myDiscardsAuxAux[i] = "F000";
        console.log(myDiscardsAuxAux);
      }
    }
    setMyDiscards(myDiscardsAuxAux);
    try {
      await connection.invoke("DropCards", myDiscardsAuxAux, playerThree);
    } catch (e) {
      console.log(e);
    }
  };

  const foldSignal = async (contador, ronda) => {
    try {
      await connection.invoke("Fold", contador, ronda);
    } catch (e) {
      console.log(e);
    }
  };

  const changeRound = async (ronda) => {
    try {
      await connection.invoke("ChangeRound", ronda);
    } catch (e) {
      console.log(e);
    }
  };
  
  const callSignal = async (contador) => {
    try {
      await connection.invoke("Call", bet, contador);
    } catch (e) {
      console.log(e);
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
    <div style={{ backgroundImage: `url(${suelo})` }} className="background">
      <Marcador/>
      {!game ? (
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
          players={players}
        />
      ) : (
        <div className="flex">
          <div className="team2">
            <div className="tablero">
              <div className="jugador-activo">
                <div className="avatar t1 avatar-activo">
                  <img src="/img/Pj_2/1_Normal_pj2.png" alt="" />
                  <p>{deskPlayers[0]}</p>
                </div>
                {!flagBet ? (
                  <>
                    {myChair === turno ? (
                      <div className="flexbuttons">
                        {myChair === playerThree && round === -1 ? (
                          <div className="prenohaymus">
                            <div className="mus_buttons" onClick={() => barajar()}>barajar</div>
                            <div className="mus_buttons" onClick={() => repartir()}>repartir</div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {round === 0 ? (
                          <div className="prenohaymus">
                            <div
                              className="mus_buttons"
                              onClick={() => changeTurn(playerThree, round)}
                            >
                              Mus
                            </div>
                            <div
                              className="mus_buttons"
                              onClick={() => noMus()}
                            >
                              No hay mus
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                        {round === 1 && discNum > 0 ? ( //meter condicion de que se haya descartado de una carta minimo
                          <div
                            className="mus_buttons"
                            onClick={() => dropMyCards()}
                          >
                            Descartar
                          </div>
                        ) : round === 1 && discNum === 0 ? (
                          <div className="mus_buttons">
                            Debes descartarte de una mínimo
                          </div>
                        ) : (
                          <></>
                        )}

                        {round === 2 && round === 3 && round === 8 ? (
                          <div className="postnohaymus">
                            <div className="superflex">
                              <div>
                                <div className="flex_buttons_up">
                                  <div onClick={() => sumBet(1)}>+1</div>
                                  <div onClick={() => sumBet(5)}>+5</div>
                                  <div
                                    className="flex_buttons_up"
                                    onClick={() => envido()}
                                  >
                                    <span>Envido</span>
                                    <span className="suma">{bet}</span>
                                  </div>
                                </div>
                                <div className="flex_buttons_down">
                                  <div onClick={() => sumBet(-1)}>BORRAR</div>
                                  <div
                                    onClick={() =>
                                      changeTurn(playerThree, round)
                                    }
                                  >
                                    PASAR
                                  </div>
                                </div>
                              </div>
                              <div className="ordago">
                                <div>
                                  <p>ÓRDAGO</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : showAnswer ? (
                  <>
                    <div className="flexbuttons">
                      <div className="postnohaymus">
                        <div className="superflex">
                          <div>
                            <div className="flex_buttons_up">
                              <div onClick={() => sumSecondBet(1)}>+1</div>
                              <div onClick={() => sumSecondBet(5)}>+5</div>
                              <div
                                className="flex_buttons_up"
                                onClick={() => sumSecondBet(0)}
                              >
                                <span>SUBO</span>
                                <span className="suma">{secondBet}</span>
                              </div>
                            </div>
                            <div className="flex_buttons_down">
                              <div onClick={() => sumSecondBet(-1)}>BORRAR</div>
                              <div onClick={() => call()}>QUIERO</div>
                              <div onClick={() => fold()}>NO QUIERO</div>
                            </div>
                          </div>
                          <div className="ordago">
                            <div>
                              <p>ÓRDAGO</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="avatar t2 avatar-oponente-dr">
                <img src={"/img/Pj_2/1_Normal_pj2.png"} alt="" />
                <p>{deskPlayers[1]}</p>
              </div>

              <div className="avatar t1 avatar-compa">
                <img src={"/img/Pj_3/1_Normal_pj3.png"} alt="" />
                <p>{deskPlayers[2]}</p>
              </div>

              <div className="avatar t2 avatar-oponente-iz">
                <img src={"/img/Pj_4/1_Normal_pj4.png"} alt="" />
                <p>{deskPlayers[3]}</p>
              </div>

              <div className="cards2 cartas-oponente-iz">
                {round > -1 ? (
                  <>
                    <div className="card-contri">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contri">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contri">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contri">
                      <img src={"/img/000.png"} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="cards3 cartas-compa">
                {round > -1 ? (
                  <>
                    <div className="card-compa">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-compa">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-compa">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-compa">
                      <img src={"/img/000.png"} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="info">{roundName}</div>
              <div>Red: {contadorRedTeam}</div>
              <div>Blue: {contadorBlueTeam}</div>
              <div className="mesa">
                <img src={tapetepixel} alt="" />
              </div>

              <div className="cards1 cartas-activo">
                {round === 1 ? (
                  <>
                    <div className="card p1">
                      <img
                        src={"/img/" + myDiscards[0] + ".png"}
                        onClick={() => discardOneCard(0)}
                        alt=""
                      />
                    </div>
                    <div className="card p1">
                      <img
                        src={"/img/" + myDiscards[1] + ".png"}
                        onClick={() => discardOneCard(1)}
                        alt=""
                      />
                    </div>
                    <div className="card p1">
                      <img
                        src={"/img/" + myDiscards[2] + ".png"}
                        onClick={() => discardOneCard(2)}
                        alt=""
                      />
                    </div>
                    <div className="card p1">
                      <img
                        src={"/img/" + myDiscards[3] + ".png"}
                        onClick={() => discardOneCard(3)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card p1">
                      <img src={"/img/" + myCards[0] + ".png"} alt="" />
                    </div>
                    <div className="card p1">
                      <img src={"/img/" + myCards[1] + ".png"} alt="" />
                    </div>
                    <div className="card p1">
                      <img src={"/img/" + myCards[2] + ".png"} alt="" />
                    </div>
                    <div className="card p1">
                      <img src={"/img/" + myCards[3] + ".png"} alt="" />
                    </div>
                  </>
                )}
              </div>
              <div className="cards2  cartas-oponente-dr">
                {round > -1 ? (
                  <>
                    <div className="card-contrd">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contrd">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contrd">
                      <img src={"/img/000.png"} />
                    </div>
                    <div className="card-contrd">
                      <img src={"/img/000.png"} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="mazo1">
                <img src={"/img/" + mazoPos[0] + ".png"} alt="" />
              </div>
              <div className="mazo2">
                <img src={"/img/" + mazoPos[1] + ".png"} alt="" />
              </div>
              <div className="mazo3">
                <img src={"/img/" + mazoPos[2] + ".png"} alt="" />
              </div>
              <div className="mazo4">
                <img src={"/img/" + mazoPos[3] + ".png"} alt="" />
              </div>
            </div>
          </div>
        </div>
        
      )}
      <Chat
        closeConnection={closeConnection}
        sendMessage={sendMessage}
        messages={messages}
        setMessage={setMessage}
        message={message}
      ></Chat>
    </div>
  );
}
export default Room;
//viernes 1 de abril 783 lineas
//martes  5 de abril 1072 lineas
