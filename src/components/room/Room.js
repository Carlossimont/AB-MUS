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
import Marcador from "../marcador/Marcador";
import bocadillo_1 from "./img/Bocadillo_1.png";
import bocadillo_2 from "./img/Bocadillo_2.png";
import bocadillo_3 from "./img/Bocadillo_3.png";
import bocadillo_4 from "./img/Bocadillo_4.png";
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
  let [onePlayer, setOnePlayer] = useState({});
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
  let [turno, setTurno] = useState(-1);
  let [arrayTurnos, setArrayTurnos] = useState([false, false, false, false]);
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
  let [boolJuego, setBoolJuego] = useState([]);
  let [boolPares, setBoolPares] = useState([]);
  let [tengoPares, setTengoPares] = useState(false);
  let [tengoJuego, setTengoJuego] = useState(false);
  let [playerAvatar, setPlayerAvatar] = useState("");
  let [avatar, setAvatar] = useState("");
  let [avatares, setAvatares] = useState(["", "", "", ""]);
  let [deskAvatares, setDeskAvatares] = useState([]);
  let [othersCards, setOthersCards] = useState([
    ["000", "000", "000", "000"],
    ["000", "000", "000", "000"],
    ["000", "000", "000", "000"],
  ]);
  let [playingHands, setPlayingHands] = useState([[], [], [], []]);

  let [blueFold, setBlueFold] = useState(false);
  let [redFold, setRedFold] = useState(false);
  let [contadorFold, setContadorFold] = useState(0);
  let [newJuego,setNewJuego] = useState(false);

  let [check, setCheck] = useState("nada");

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  let playersAux = [];

  useEffect(() => {
    if (showAnswer) {
    if (round > 0) {
      setSecondBet(2);
    }
    if (round === 5 && !tengoPares) {
      setShowAnswer(false);
    }
    if (round === 7 && !tengoPares) {
      setShowAnswer(false);
    }
  }
  }, [showAnswer]);

  useEffect(() => {
    console.log("envida el equipo " + betTeam);
    if (betTeam !== "white") {
      setFlagBet(true);
      if (myTeam !== betTeam) {
        //si mi equipo es el que NO apuesta abrimos los botones al resto;
        setShowAnswer(true);
      } else {
        setShowAnswer(false);
      }
    }
  }, [betTeam]);

  useEffect(() => {
    let deskPlayersAux = [];
    let deskAvataresAux = [];
    let pos = myChair;
    let barajaAux = [];
    if (game) {
      for (let i = 0; i < 4; i++) {
        if (pos == 4) {
          pos = 0;
        }
        deskPlayersAux[i] = players[pos];
        deskAvataresAux[i] = avatares[pos];
        pos++;
        console.log(deskPlayersAux);
      }
      setDeskPlayers(deskPlayersAux);
      setDeskAvatares(deskAvataresAux);
      palos.forEach((p) => {
        numeros.forEach((n) => {
          barajaAux.push(p + n);
        });
      });
      console.log(barajaAux);
      setBaraja(barajaAux);
    }
  }, [game]);

  useEffect(()=>{
    let barajaAux = [];
    if (newJuego) {
    palos.forEach((p) => {
      numeros.forEach((n) => {
        barajaAux.push(p + n);
      });
    });
    console.log(barajaAux);
    setBaraja(barajaAux);
    setMyCards([]);
    setBarajaDescartes([]);
    setDeckHands([],[],[],[]);
    setOrdenRonda([]);
    setChangeRepartir(false);
    setBet(2);
    setContadorMayor(1);
    setContadorPeque(1);
    setContadorPares(0);
    setContadorJuego(0);
    setContadorPunto(1);
    setMazoPos(["F000","F000","F000","F000"]);
    setContador(-1);
    setAnswer(false);
    setDiscNum(0);
    setOthersDiscards([]);
    setArrayDescartes([]);
    setFlagBet(false);
    setShowAnswer(false);
    setBetTeam('white');
    setSecondBet(0);
    setFoldNum(-1);
    setBoolJuego([]);
    setBoolPares([]);
    setTengoJuego(false);
    setTengoPares(false);
    setCheck('nada');
    setRound(-1);
    setNewJuego(false);
  }
  },[newJuego])

  useEffect(() => {
    console.log(players);
    let playersAux = [...players];
    playersAux[number] = name;
    setPlayers(playersAux);
  }, [number]);

  function setRoundMal(ronda){
      setRound(ronda)
  }

  useEffect(() => {
    setTurno(-5);
    console.log("primero nombres de ronda");
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
        if (myChair === playerThree) {
          nuevaMano();
        }
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
        debugger;
        setRoundName("Contando...");
        setTurno(playerThree);
        break;

      case 10: //contar mayor
        if (myChair === playerThree) {
          console.log(contadorMayor +' '+ contadorRedTeam +' '+ contadorBlueTeam);
          accountantMayor(
            deckHands,
            contadorMayor,
            contadorRedTeam,
            contadorBlueTeam
          );
        }
        break;

      case 11: //contar peque
        if (myChair === playerThree) {
          console.log(contadorPeque +' '+ contadorRedTeam +' '+ contadorBlueTeam);
          accountantPeque(
            deckHands,
            contadorPeque,
            contadorRedTeam,
            contadorBlueTeam
          );
        }
        break;

      case 12: //contar par
        if (myChair === playerThree) {
          console.log(contadorPares +' '+ contadorRedTeam +' '+ contadorBlueTeam);
          pares(deckHands, contadorPares, contadorRedTeam, contadorBlueTeam);
        }
        break;

      case 13: //contar juego
        if (myChair === playerThree) {
          console.log(contadorJuego +' '+ contadorRedTeam +' '+ contadorBlueTeam);
          juego(deckHands, contadorJuego, contadorRedTeam, contadorBlueTeam);
        }
        break;

      case 14: //boton siguiente punto
        if (myChair === playerThree) {
          console.log(contadorPunto +' '+ contadorRedTeam +' '+ contadorBlueTeam);
          punto(deckHands, contadorPunto, contadorRedTeam, contadorBlueTeam);
        }
        break;
      case 15:
        console.log("RONDA FINAAAAAAAAAAAAAAAAAAAAAL");
        break;
      default:
        alert("Ha entrado default en switch de ronda");
        break;
    }
  }, [round]);

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
    if (turno > -1) {
      let arrayTurnosAux = [];
      let posiAux = myChair;
      for (let i = 0; i < 4; i++) {
        if (posiAux === turno) {
          arrayTurnosAux.push(true);
        } else {
          arrayTurnosAux.push(false);
        }
        posiAux++;
        if (posiAux === 4) {
          posiAux = 0;
        }
      }
      setArrayTurnos(arrayTurnosAux);

      if (turno === 4) {
        setTurno(0);
      }
      debugger;
      if (turno === myChair) {
        if (round === 4 || round === 5) {
          if (!boolPares[ordenRonda.indexOf(user)]) {
            changeTurn(playerThree, round);
          }
        }
        if (round === 6 || round === 7) {
          if (!boolJuego[ordenRonda.indexOf(user)]) {
            changeTurn(playerThree, round);
          }
        }

        if (round === 9) {
          levantarCartas(deckHands);
        }
        if (round === 10) {
          accountantMayor(
            deckHands,
            contadorMayor,
            contadorRedTeam,
            contadorBlueTeam
          );
        }
        if (round === 11) {
          accountantPeque(
            deckHands,
            contadorPeque,
            contadorRedTeam,
            contadorBlueTeam
          );
        }
        if (round === 12) {
          pares(deckHands, contadorPares, contadorRedTeam, contadorBlueTeam);
        }
        if (round === 13) {
          juego(deckHands, contadorJuego, contadorRedTeam, contadorBlueTeam);
        }
        if (round === 14) {
          punto(deckHands, contadorPunto, contadorRedTeam, contadorBlueTeam);
        }
      }
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

  useEffect(() => {
    debugger;
    if (contador > -1) {
      switch (round) {
        case 2:
          setContadorMayor(contador);
          if (playerThree === myChair) {
            changeRound(2);
          }
          break;

        case 3:
          setContadorPeque(contador);
          if (playerThree === myChair) {
          changeRound(3);
          }
          break;

        case 4:
          setContadorPares(contador);
          if (playerThree === myChair) {
          changeRound(5);
          }
          break;

        case 5:
          setContadorPares(contador);
          if (playerThree === myChair) {
          changeRound(5);
          }
          break;

        case 6:
          setContadorJuego(contador);
          if (playerThree === myChair) {
          changeRound(8);
          }
          break;

        case 7:
          setContadorJuego(contador);
          if (playerThree === myChair) {
          changeRound(8);
          }
          break;

        case 8:
          setContadorPunto(contador);
          if (playerThree === myChair) {
          changeRound(8);
          }
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

  function addDiscardArray(array) {//viene de un conecction.on no pilla el array
    setArrayDescartes(array);
    console.log("recibo cartas");
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
    if (num < 0) {
      setBet(2);
    } else {
      setBet(bet + num);
    }
  }

  function sumSecondBet(num) {
    if (num < 0) {
      setSecondBet(2);
    } else {
      setSecondBet(secondBet + num);
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
    console.log("primero postre");
    if (myChair === playerThree) {
      //ESTO LO HACE SOLO EL POSTRE
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
        console.log("contadores");
        console.log(contadorMayor);
        console.log(contadorPeque);
        console.log(contadorPares);
        console.log(contadorJuego);
        console.log(contadorPunto);
        // countAll(deckHands);
      }
    }
    setAllNull();
  }, [round]);

  function setAllNull() {
    console.log("SETEA TODA LA MIERDA");
    setBet(2);
    setSecondBet(2);
    setShowAnswer(false);
    setBetTeam("white");
    setFlagBet(false);
    setContadorFold(0);
    if (round !== 5 && round !== 4) {
      setTengoPares(false);
    }
    if (round !== 7 && round !== 6) {
      setTengoJuego(false);
    }
  }

  useEffect(() => {
    // if (blueFold) {
      console.log("sumamos el fold al contador " + round);
      setContadorRedTeam(contadorRedTeam + contadorFold);
      switch (round) {
        case 2:
          setContadorMayor(0);
          break;

        case 3:
          setContadorPeque(0);
          break;

        case 4:
          setContadorPares(0);
          break;

        case 5:
          setContadorPares(0);
          break;

        case 6:
          setContadorJuego(0);
          break;

        case 7:
          setContadorJuego(0);
          break;

        case 8:
          setContadorPunto(1);
          break;

        default:
          break;
      }
    // }
    setBlueFold(false);
  }, [blueFold]);

  useEffect(() => {
    // if (redFold) {
      console.log("sumamos el fold al contador " + round);
      setContadorBlueTeam(contadorBlueTeam + contadorFold);
      switch (round) {
        case 2:
          setContadorMayor(0);
          break;

        case 3:
          setContadorPeque(0);
          break;

        case 4:
          setContadorPares(0);
          break;

        case 5:
          setContadorPares(0);
          break;

        case 6:
          setContadorJuego(0);
          break;

        case 7:
          setContadorJuego(0);
          break;

        case 8:
          setContadorPunto(1);
          break;

        default:
          break;
      }
    // }
    setRedFold(false);
  }, [redFold]);

  function call() {
    switch (round) {
      case 2:
        callSignal(contadorMayor);
        break;

      case 3:
        callSignal(contadorPeque);
        break;

      case 4:
        callSignal(contadorPares);
        break;

      case 6:
        callSignal(contadorPares);
        break;

      case 7:
        callSignal(contadorJuego);
        break;

      case 8:
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

  useEffect(() => {
    let count = 0;
    if (round > -1) {
      boolPares.forEach((booleano, i) => {
        if (booleano) {
          if (i === ordenRonda.indexOf(user)) {
            console.log("SETEO TENGO PARES");
            setTengoPares(true);
          } else {
            count++;
          }
        }
      });
    }
    if (playerThree === myChair) {
      if (count === 4) {
        noPares();
      }
    }
  }, [boolPares]);

  useEffect(() => {
    let count = 0;
    if (round > -1) {
      boolJuego.forEach((booleano, i) => {
        if (booleano) {
          if (i === ordenRonda.indexOf(user)) {
            console.log("SETEO TENGO JUEGO");
            setTengoJuego(true);
          } else {
            count++;
          }
        }
      });
    }
    if (playerThree === myChair) {
      if (count === 4) {
        noJuego();
      }
    }
  }, [boolJuego]);

  function fold() {
    switch (round) {
      case 2:
        foldSignal(contadorMayor, 2);
        break;

      case 3:
        foldSignal(contadorPeque, 3);
        break;

      case 4:
        foldSignal(contadorPares, 5);
        break;

      case 5:
        foldSignal(contadorPares, 5);
        break;

      case 6:
        foldSignal(contadorJuego, 7);
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
    if (myChair > -1) {
      if (myChair % 2 === 0) {
        setMyTeam("blue");
      } else {
        setMyTeam("red");
      }
    }
  }, [myChair]);

  useEffect(() => {
    let playingHandsAux = [];
    let count = myChair;
    if (round === 9) {
      for (let i = 0; i < 3; i++) {
        count++;
        if (count === 4) {
          count = 0;
        }
        playingHandsAux.push(playingHands[count]);
      }
      setOthersCards(playingHandsAux);
    }
  }, playingHands);

  useEffect(() => {
    let avataresAux = [...avatares];
    console.log(avatares);
    avataresAux[playerAvatar] = avatar;
    console.log(avataresAux);
    setAvatares(avataresAux);
  }, [playerAvatar]);

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

      connection.on("ReceivePlayerAvatar", (playerNum, avatar) => {
        console.log("recibo jug" + playerNum + "avatr" + avatar);
        setAvatar(avatar);
        setPlayerAvatar(playerNum);
      });

      connection.on("NewTurn", (num) => {
        setTurno(num);
      });

      connection.on("NextRound", (ronda) => {
        console.log("entra nextround desde signalr " + ronda);
        setRoundMal(ronda);
      });

      connection.on("NoMus", () => {
        setRound(2);
      });

      connection.on("NextJuego",(player3)=>{
        setNewJuego(true);
        setPlayerThree(player3);
        console.log(player3);
        setTurno(player3);
      });

      connection.on("Bet", (bet, team) => {
        setBet(bet);
        setBetTeam(team);
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

      connection.on("SecondBet", (contador, secondBet, team) => {
        setBet(secondBet);
        setBetTeam(team);
        setContador(contador);
      });

      connection.on("Fold", (contador, team) => {
        console.log("equipo"+ team+" foldea");
        if (team === "blue") {
          setContadorFold(contador);
          setRedFold(true);
        } else {
          setContadorFold(contador);
          setBlueFold(true);
        }
      });

      connection.on("Call", (contador) => {
        setContador(contador);
      });

      connection.on("TeamAccountants", (contadorRed, contadorBlue) => {
        console.log('rojo' + contadorRed + 'blue' + contadorBlue);
        setContadorBlueTeam(contadorBlue);
        setContadorRedTeam(contadorRed);
      });

      connection.on("LevantarCartas", (deck) => {
        setPlayingHands(deck);
      });

      connection.on("BoolPares", (bool) => {
        setBoolPares(bool);
      });

      connection.on("BoolJuego", (bool) => {
        setBoolJuego(bool);
      });

      connection.on("DroppedCards", (arrayDesc) => {
        addDiscardArray(arrayDesc);
        // let arrayDescAux = [...othersDiscards];
        // console.log('recibo cartas');
        // arrayDescAux.push(arrayDesc);
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
        orden++;
        if (orden === 4) {
          orden = 0;
        }
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

  const betSecondBet = async (contador, bet, secondBet) => {
    console.log("entra betsecondbet");
    try {
      await connection.invoke("SecondBet", contador, bet, secondBet);
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

  const levantarCartas = async (manos) => {
    try {
      await connection.invoke("LevantarCartas", manos);
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

  const setOneAvatar = async (avatarNum) => {
    try {
      console.log("entra a setAvatar");
      console.log("mando a signal avatar" + avatarNum);
      await connection.invoke("SetAvatar", avatarNum);
    } catch (e) {
      console.log(e + " setavatarererror");
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

  const nuevaMano = async () => {
    try {
      await connection.invoke("NuevaMano");
    } catch (e) {
      console.log(e + " nueva mano");
    }
  };

  const teamAccountants = async (
    deck,
    contadorMayor,
    contadorRedTeam,
    contadorBlueTeam
  ) => {
    try {
      await connection.invoke(
        "TeamAccountants",
        deck,
        contadorMayor,
        contadorRedTeam,
        contadorBlueTeam
      );
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

  const accountantMayor = async (deck, contadorUno, red, blue) => {
    try {
      console.log("entra accountant maayor");
      await connection.invoke("AccountantMayor", deck, contadorUno, red, blue);
    } catch (e) {
      console.log(e + "acc mayor");
    }
  };

  const accountantPeque = async (deck, contador, red, blue) => {
    try {
      await connection.invoke("AccountantPeque", deck, contador, red, blue);
    } catch (e) {
      console.log(e);
    }
  };

  const pares = async (deck, contador, red, blue) => {
    try {
      await connection.invoke("Pares", deck, contador, red, blue);
    } catch (e) {
      console.log(e);
    }
  };

  const juego = async (deck, contador, red, blue) => {
    try {
      await connection.invoke("Juego", deck, contador, red, blue);
    } catch (e) {
      console.log(e);
    }
  };

  const punto = async (deck, contador, red, blue) => {
    try {
      await connection.invoke("Punto", deck, contador, red, blue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${suelo})` }} className="background">
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
          setOneAvatar={setOneAvatar}
        />
      ) : (
        <>
          <Marcador
            contadorBlueTeam={contadorBlueTeam}
            contadorRedTeam={contadorRedTeam}
            contadorGamesBlueTeam={contadorGamesBlueTeam}
            contadorGamesRedTeam={contadorGamesRedTeam}
          />
          <div className="flex">
            <div className="team2">
              <div className="tablero">
                <div className="jugador-activo">
                  <div className="superflex2">
                    <div className="flex_buttons_up2">
                      <div>2 Reyes</div>
                      <div>3 Reyes</div>
                    </div>
                    <div className="flex_buttons_up2">
                      <div>2 Ases</div>
                      <div>3 Ases</div>
                    </div>
                    <div className="flex_buttons_down2">
                      <div>Duplex</div>
                      <div>31</div>
                      <div>Pedrete</div>
                    </div>
                  </div>

                  <div
                    className={`avatar avatar-activo ${
                      myTeam === "red" ? "t2" : "t1"
                    } ${arrayTurnos[0] ? "shadow" : ""}`}
                  >
                    <img
                      src={"/img/Pj_" + deskAvatares[0] + "/normal.png"}
                      alt=""
                    />
                    <p>{deskPlayers[0]}</p>
                  </div>
                  {!flagBet ? (
                    <>
                      {myChair === turno ? (
                        <div className="flexbuttons">
                          {myChair === playerThree && round === -1 ? (
                            <div className="prenohaymus">
                              <div
                                className="mus_buttons"
                                onClick={() => barajar()}
                              >
                                barajar
                              </div>
                              <div
                                className="mus_buttons"
                                onClick={() => repartir()}
                              >
                                repartir
                              </div>
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

                          {round === 2 ||
                          round === 3 ||
                          round === 8 ||
                          tengoJuego ||
                          tengoPares ? (
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
                                  onClick={() =>
                                    betSecondBet(contador, bet, secondBet)
                                  }
                                >
                                  <span>SUBO</span>
                                  <span className="suma">{secondBet}</span>
                                </div>
                              </div>
                              <div className="flex_buttons_down">
                                <div onClick={() => sumSecondBet(-1)}>
                                  BORRAR
                                </div>
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

                <div
                  className={`avatar avatar-oponente-dr ${
                    myTeam === "red" ? "t1" : "t2"
                  } ${arrayTurnos[1] ? "shadow" : ""}`}
                >
                  <img
                    src={"/img/Pj_" + deskAvatares[1] + "/normal.png"}
                    alt=""
                  />
                  <p>{deskPlayers[1]}</p>
                </div>

                <div
                  className={`avatar avatar-compa ${
                    myTeam === "red" ? "t2" : "t1"
                  } ${arrayTurnos[2] ? "shadow" : ""}`}
                >
                  <img
                    src={"/img/Pj_" + deskAvatares[2] + "/normal.png"}
                    alt=""
                  />
                  <p>{deskPlayers[2]}</p>
                </div>

                <div
                  className={`avatar avatar-oponente-iz ${
                    myTeam === "red" ? "t1" : "t2"
                  } ${arrayTurnos[3] ? "shadow" : ""}`}
                >
                  <img
                    src={"/img/Pj_" + deskAvatares[3] + "/normal.png"}
                    alt=""
                  />
                  <p>{deskPlayers[3]}</p>
                </div>

                <div className="cards2 cartas-oponente-iz">
                  {round > -1 ? (
                    <>
                      {/* // hacer .map */}
                      <div className="card-contri">
                        <img src={"/img/" + othersCards[2][3] + ".png"} />
                      </div>
                      <div className="card-contri">
                        <img src={"/img/" + othersCards[2][2] + ".png"} />
                      </div>
                      <div className="card-contri">
                        <img src={"/img/" + othersCards[2][1] + ".png"} />
                      </div>
                      <div className="card-contri">
                        <img src={"/img/" + othersCards[2][0] + ".png"} />
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
                        <img src={"/img/" + othersCards[1][3] + ".png"} />
                      </div>
                      <div className="card-compa">
                        <img src={"/img/" + othersCards[1][2] + ".png"} />
                      </div>
                      <div className="card-compa">
                        <img src={"/img/" + othersCards[1][1] + ".png"} />
                      </div>
                      <div className="card-compa">
                        <img src={"/img/" + othersCards[1][0] + ".png"} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="info">
                  <p>{roundName}</p>
                </div>
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
                        <img src={"/img/" + othersCards[0][0] + ".png"} />
                      </div>
                      <div className="card-contrd">
                        <img src={"/img/" + othersCards[0][1] + ".png"} />
                      </div>
                      <div className="card-contrd">
                        <img src={"/img/" + othersCards[0][2] + ".png"} />
                      </div>
                      <div className="card-contrd">
                        <img src={"/img/" + othersCards[0][3] + ".png"} />
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
                {false ? (
                  <>
                    <div className="bocadillo team1_pj1">
                      <img src={bocadillo_1} alt="" />
                      <div className="texto_bocadillo text1_pj1">
                        Llevo pares
                      </div>
                    </div>
                    <div className="bocadillo team1_pj2">
                      <img src={bocadillo_2} alt="" />
                      <div className="texto_bocadillo text1_pj2">
                        Llevo pares
                      </div>
                    </div>
                    <div className="bocadillo team2_pj1">
                      <img src={bocadillo_3} alt="" />
                      <div className="texto_bocadillo text2_pj1">
                        Llevo pares
                      </div>
                    </div>
                    <div className="bocadillo team2_pj2">
                      <img src={bocadillo_4} alt="" />
                      <div className="texto_bocadillo text2_pj2">
                        Llevo pares
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Chat
        closeConnection={closeConnection}
        sendMessage={sendMessage}
        messages={messages}
        setMessage={setMessage}
        message={message}
        user={user}
      ></Chat>
    </div>
  );
}
export default Room;