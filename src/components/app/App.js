
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from '../room/Room';
import Lobby from '../lobby/Lobby';
import Header from '../header/Header';
import Login from '../login/Login'
import CreateRoom from '../createroom/Createroom';
import LobbyOptions from '../lobbyOptions/LobbyOptions';
import Logo from '../logo/Logo';
import ReturnLobbyOption from '../returnLobbyOption/ReturnLobbyOption';
import Chat from '../chat/Chat';
import { useState } from 'react';
import Infobox from '../infobox/Infobox'
import Rules from '../rules/Rules'
import Marcador from '../marcador/Marcador'
import Notfound404 from '../notfound404/Notfound404';

function App() {
let [user,setUser] = useState('');
let [room,setRoom] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby content={<Logo/>} options={<LobbyOptions/>} header={<Header/>} />} />

        <Route path="/login" element={<Lobby content={<Login/>} options={<ReturnLobbyOption/>}/>} />

        <Route path="/createroom" element={<Lobby content={<CreateRoom user={user} room={room} setUser={setUser} setRoom={setRoom}/>} options={<ReturnLobbyOption/>} infobox={<Infobox />}/>} />

        <Route path="/room" element={<Room user={user} room={room}/>} />

        <Route path="/rules" element={<Lobby header={<Header/>} rules={<Rules/>} options={<ReturnLobbyOption/>}/>} />
        
        <Route path="/*" element={<Lobby content={<Notfound404/>} header={<Header/>} />} />
        {/* <Route path="/room" element={<Room />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
