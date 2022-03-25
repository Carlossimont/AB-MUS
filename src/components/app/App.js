
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from '../room/Room';
import Lobby from '../lobby/Lobby';
import Header from '../header/Header';
import Login from '../login/Login'
import Teams from '../teams/Teams'
import CreateRoom from '../createroom/Createroom';
import LobbyOptions from '../lobbyOptions/LobbyOptions';
import Logo from '../logo/Logo';
import ReturnLobbyOption from '../returnLobbyOption/ReturnLobbyOption';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby content={<Logo/>} options={<LobbyOptions/>}/>} />
        <Route path="/login" element={<Lobby content={<Login/>} options={<ReturnLobbyOption/>}/>} />
        <Route path="/teams" element={<Lobby content={<Teams/>} options={<ReturnLobbyOption/>} />} />
        <Route path="/createroom" element={<Lobby content={<CreateRoom/>} options={<ReturnLobbyOption/>} />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
